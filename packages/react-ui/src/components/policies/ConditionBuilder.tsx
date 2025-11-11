import {
  ConditionBuilder as ABACConditionBuilder,
  AttributeRef,
  ComparisonOperator,
  LogicalOperator,
  type Condition,
} from "abac-engine";
import { HelpCircle, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export interface ConditionBuilderProps {
  condition: Condition | null;
  onChange: (condition: Condition | null) => void;
  level?: number;
  onRemove?: () => void;
}

// Type guards
function isComparisonCondition(condition: Condition): boolean {
  return "operator" in condition && "left" in condition;
}

function isLogicalCondition(condition: Condition): boolean {
  return "operator" in condition && "conditions" in condition;
}

function isFunctionCondition(condition: Condition): boolean {
  return "function" in condition && "args" in condition;
}

function isAttributeReference(value: any): boolean {
  return (
    typeof value === "object" &&
    value !== null &&
    "category" in value &&
    "attributeId" in value
  );
}

const COMPARISON_OPERATORS = [
  { value: ComparisonOperator.Equals, label: "Equals (==)" },
  { value: ComparisonOperator.NotEquals, label: "Not Equals (!=)" },
  { value: ComparisonOperator.GreaterThan, label: "Greater Than (>)" },
  {
    value: ComparisonOperator.GreaterThanOrEqual,
    label: "Greater Than or Equal (>=)",
  },
  { value: ComparisonOperator.LessThan, label: "Less Than (<)" },
  {
    value: ComparisonOperator.LessThanOrEqual,
    label: "Less Than or Equal (<=)",
  },
  { value: ComparisonOperator.In, label: "In (array membership)" },
  { value: ComparisonOperator.NotIn, label: "Not In" },
  { value: ComparisonOperator.Contains, label: "Contains" },
  { value: ComparisonOperator.StartsWith, label: "Starts With" },
  { value: ComparisonOperator.EndsWith, label: "Ends With" },
  { value: ComparisonOperator.MatchesRegex, label: "Matches (regex)" },
  { value: ComparisonOperator.Exists, label: "Exists (attribute is present)" },
  {
    value: ComparisonOperator.NotExists,
    label: "Not Exists (attribute is absent)",
  },
];

const LOGICAL_OPERATORS = [
  { value: LogicalOperator.And, label: "AND (all must be true)" },
  { value: LogicalOperator.Or, label: "OR (at least one true)" },
  { value: LogicalOperator.Not, label: "NOT (negate condition)" },
];

const ATTRIBUTE_CATEGORIES = [
  { value: "subject", label: "Subject", helper: AttributeRef.subject },
  { value: "resource", label: "Resource", helper: AttributeRef.resource },
  { value: "action", label: "Action", helper: AttributeRef.action },
  {
    value: "environment",
    label: "Environment",
    helper: AttributeRef.environment,
  },
];

export const ConditionBuilder: React.FC<ConditionBuilderProps> = ({
  condition,
  onChange,
  level = 0,
  onRemove,
}) => {
  const [showHelp, setShowHelp] = useState(level === 0);
  const [conditionType, setConditionType] = useState<
    "comparison" | "logical" | "function"
  >(
    condition && isLogicalCondition(condition)
      ? "logical"
      : condition && isFunctionCondition(condition)
        ? "function"
        : "comparison",
  );

  // Comparison condition state
  const [leftCategory, setLeftCategory] = useState("subject");
  const [leftAttributeId, setLeftAttributeId] = useState("");
  const [operator, setOperator] = useState(ComparisonOperator.Equals);
  const [rightType, setRightType] = useState<"value" | "reference">("value");
  const [rightValue, setRightValue] = useState("");
  const [rightCategory, setRightCategory] = useState("resource");
  const [rightAttributeId, setRightAttributeId] = useState("");

  // Logical condition state
  const [logicalOperator, setLogicalOperator] = useState(LogicalOperator.And);
  const [nestedConditions, setNestedConditions] = useState<Condition[]>([]);

  // Function condition state
  const [functionName, setFunctionName] = useState("");
  const [functionArgs, setFunctionArgs] = useState<string[]>([""]);

  // Initialize state from existing condition
  React.useEffect(() => {
    if (!condition) return;

    if (isLogicalCondition(condition)) {
      setConditionType("logical");
      const logicalCond = condition as any;
      setLogicalOperator(logicalCond.operator);
      setNestedConditions(logicalCond.conditions || []);
    } else if (isComparisonCondition(condition)) {
      setConditionType("comparison");
      const compCond = condition as any;
      setOperator(compCond.operator);

      if (isAttributeReference(compCond.left)) {
        setLeftCategory(compCond.left.category);
        setLeftAttributeId(compCond.left.attributeId);
      }

      if (isAttributeReference(compCond.right)) {
        setRightType("reference");
        setRightCategory(compCond.right.category);
        setRightAttributeId(compCond.right.attributeId);
      } else {
        setRightType("value");
        setRightValue(
          typeof compCond.right === "object"
            ? JSON.stringify(compCond.right)
            : String(compCond.right ?? ""),
        );
      }
    } else if (isFunctionCondition(condition)) {
      setConditionType("function");
      const funcCond = condition as any;
      setFunctionName(funcCond.function);
      setFunctionArgs(
        funcCond.args.map((arg: any) =>
          typeof arg === "object" ? JSON.stringify(arg) : String(arg),
        ),
      );
    }
  }, []);

  const buildCondition = () => {
    if (conditionType === "logical") {
      if (nestedConditions.length === 0) return null;

      const builder = new ABACConditionBuilder(nestedConditions[0]);
      for (let i = 1; i < nestedConditions.length; i++) {
        if (logicalOperator === LogicalOperator.And) {
          builder.and(nestedConditions[i]);
        } else if (logicalOperator === LogicalOperator.Or) {
          builder.or(nestedConditions[i]);
        }
      }

      if (logicalOperator === LogicalOperator.Not) {
        builder.not();
      }

      return builder.build();
    } else if (conditionType === "function") {
      // Build function condition
      if (!functionName) return null;

      const args = functionArgs.map((arg) => {
        try {
          if (arg.startsWith("[") || arg.startsWith("{")) {
            return JSON.parse(arg);
          } else if (!isNaN(Number(arg)) && arg.trim() !== "") {
            return Number(arg);
          }
          return arg;
        } catch {
          return arg;
        }
      });

      return ABACConditionBuilder.function(functionName, ...args).build();
    } else {
      // Build comparison condition
      if (!leftAttributeId) return null;

      const leftRef = ATTRIBUTE_CATEGORIES.find(
        (c) => c.value === leftCategory,
      )?.helper(leftAttributeId);

      if (!leftRef) return null;

      // For Exists and NotExists operators, no right operand is needed
      if (operator === ComparisonOperator.Exists) {
        return ABACConditionBuilder.exists(leftRef).build();
      }

      if (operator === ComparisonOperator.NotExists) {
        return ABACConditionBuilder.compare(
          leftRef,
          ComparisonOperator.NotExists,
          null as any,
        ).build();
      }

      let rightOperand: any;
      if (rightType === "reference") {
        if (!rightAttributeId) return null;
        rightOperand = ATTRIBUTE_CATEGORIES.find(
          (c) => c.value === rightCategory,
        )?.helper(rightAttributeId);
      } else {
        // Parse value
        try {
          if (
            rightValue.startsWith("[") ||
            rightValue.startsWith("{") ||
            rightValue === "true" ||
            rightValue === "false" ||
            rightValue === "null"
          ) {
            rightOperand = JSON.parse(rightValue);
          } else if (!isNaN(Number(rightValue)) && rightValue.trim() !== "") {
            rightOperand = Number(rightValue);
          } else {
            rightOperand = rightValue;
          }
        } catch {
          rightOperand = rightValue;
        }
      }

      // Use ConditionBuilder from abac-engine
      switch (operator) {
        case ComparisonOperator.Equals:
          return ABACConditionBuilder.equals(leftRef, rightOperand).build();
        case ComparisonOperator.NotEquals:
          return ABACConditionBuilder.notEquals(leftRef, rightOperand).build();
        case ComparisonOperator.GreaterThan:
          return ABACConditionBuilder.greaterThan(
            leftRef,
            rightOperand,
          ).build();
        case ComparisonOperator.GreaterThanOrEqual:
          return ABACConditionBuilder.greaterThanOrEqual(
            leftRef,
            rightOperand,
          ).build();
        case ComparisonOperator.LessThan:
          return ABACConditionBuilder.lessThan(leftRef, rightOperand).build();
        case ComparisonOperator.LessThanOrEqual:
          return ABACConditionBuilder.lessThanOrEqual(
            leftRef,
            rightOperand,
          ).build();
        case ComparisonOperator.In:
          return ABACConditionBuilder.in(leftRef, rightOperand).build();
        case ComparisonOperator.NotIn:
          return ABACConditionBuilder.compare(
            leftRef,
            ComparisonOperator.NotIn,
            rightOperand,
          ).build();
        case ComparisonOperator.Contains:
          return ABACConditionBuilder.contains(leftRef, rightOperand).build();
        case ComparisonOperator.StartsWith:
          return ABACConditionBuilder.compare(
            leftRef,
            ComparisonOperator.StartsWith,
            rightOperand,
          ).build();
        case ComparisonOperator.EndsWith:
          return ABACConditionBuilder.compare(
            leftRef,
            ComparisonOperator.EndsWith,
            rightOperand,
          ).build();
        case ComparisonOperator.MatchesRegex:
          return ABACConditionBuilder.compare(
            leftRef,
            ComparisonOperator.MatchesRegex,
            rightOperand,
          ).build();
        default:
          return ABACConditionBuilder.compare(
            leftRef,
            operator,
            rightOperand,
          ).build();
      }
    }
  };

  const handleApply = () => {
    const built = buildCondition();
    onChange(built);
  };

  const handleConditionTypeChange = (
    type: "comparison" | "logical" | "function",
  ) => {
    setConditionType(type);
    if (type === "logical" && nestedConditions.length === 0) {
      // Add default nested condition
      const defaultCondition = ABACConditionBuilder.equals(
        AttributeRef.subject(""),
        "",
      ).build();
      setNestedConditions([defaultCondition]);
    } else if (type === "function") {
      setFunctionName("");
      setFunctionArgs([""]);
    }
  };

  const handleAddNestedCondition = () => {
    const newCondition = ABACConditionBuilder.equals(
      AttributeRef.subject(""),
      "",
    ).build();
    setNestedConditions([...nestedConditions, newCondition]);
  };

  const handleUpdateNestedCondition = (
    index: number,
    cond: Condition | null,
  ) => {
    if (!cond) return;
    const updated = [...nestedConditions];
    updated[index] = cond;
    setNestedConditions(updated);
  };

  const handleRemoveNestedCondition = (index: number) => {
    setNestedConditions(nestedConditions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Help Section */}
      {level === 0 && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <button
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-100 hover:underline w-full text-left"
          >
            <HelpCircle className="w-4 h-4" />
            How to build conditions
          </button>
          {showHelp && (
            <ul className="mt-2 text-xs text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
              <li>
                <strong>Comparison:</strong> Compare attribute values (e.g.,
                subject.role equals "admin")
              </li>
              <li>
                <strong>Logical:</strong> Combine multiple conditions with
                AND/OR/NOT
              </li>
              <li>
                <strong>Function:</strong> Use custom functions for advanced
                logic (e.g., dateInRange, hasPermission)
              </li>
              <li>
                <strong>Attribute Reference:</strong> Compare two attributes
                (e.g., subject.department equals resource.department)
              </li>
              <li>
                <strong>Exists/NotExists:</strong> Check if an attribute exists
                without comparing its value
              </li>
              <li>
                <strong>Values:</strong> Use JSON for arrays/objects (e.g.,
                ["admin", "user"]), or plain values
              </li>
            </ul>
          )}
        </div>
      )}

      {/* Condition Type Selection */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant={conditionType === "comparison" ? "primary" : "outline"}
          size="sm"
          onClick={() => handleConditionTypeChange("comparison")}
        >
          Comparison
        </Button>
        <Button
          type="button"
          variant={conditionType === "logical" ? "primary" : "outline"}
          size="sm"
          onClick={() => handleConditionTypeChange("logical")}
        >
          Logical (AND/OR/NOT)
        </Button>
        <Button
          type="button"
          variant={conditionType === "function" ? "primary" : "outline"}
          size="sm"
          onClick={() => handleConditionTypeChange("function")}
        >
          Function
        </Button>
      </div>

      {/* Condition Content */}
      <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
        {conditionType === "comparison" ? (
          <div className="space-y-4">
            {/* Left Operand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Left Operand (Attribute)
              </label>
              <div className="flex gap-2">
                <select
                  value={leftCategory}
                  onChange={(e) => setLeftCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {ATTRIBUTE_CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <Input
                  type="text"
                  value={leftAttributeId}
                  onChange={(e) => setLeftAttributeId(e.target.value)}
                  placeholder="attributeId (e.g., role, userId)"
                  className="flex-1"
                />
              </div>
              <Badge variant="default" className="mt-2">
                {leftCategory}.{leftAttributeId || "attributeId"}
              </Badge>
            </div>

            {/* Operator */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Operator
              </label>
              <select
                value={operator}
                onChange={(e) =>
                  setOperator(e.target.value as ComparisonOperator)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {COMPARISON_OPERATORS.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Right Operand - hide for Exists/NotExists */}
            {operator !== ComparisonOperator.Exists &&
              operator !== ComparisonOperator.NotExists && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Right Operand
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={rightType === "value"}
                        onChange={() => setRightType("value")}
                      />
                      <span className="text-sm">Static Value</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={rightType === "reference"}
                        onChange={() => setRightType("reference")}
                      />
                      <span className="text-sm">Attribute Reference</span>
                    </label>
                  </div>

                  {rightType === "reference" ? (
                    <div className="flex gap-2">
                      <select
                        value={rightCategory}
                        onChange={(e) => setRightCategory(e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      >
                        {ATTRIBUTE_CATEGORIES.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                      <Input
                        type="text"
                        value={rightAttributeId}
                        onChange={(e) => setRightAttributeId(e.target.value)}
                        placeholder="attributeId"
                        className="flex-1"
                      />
                    </div>
                  ) : (
                    <Input
                      type="text"
                      value={rightValue}
                      onChange={(e) => setRightValue(e.target.value)}
                      placeholder='e.g., "admin", 42, ["a","b"], true'
                      className="w-full"
                    />
                  )}

                  {rightType === "reference" && (
                    <Badge variant="default" className="mt-2">
                      {rightCategory}.{rightAttributeId || "attributeId"}
                    </Badge>
                  )}
                </div>
              )}

            <Button type="button" onClick={handleApply} className="w-full">
              Apply Condition
            </Button>
          </div>
        ) : conditionType === "function" ? (
          <div className="space-y-4">
            {/* Function Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Function Name
              </label>
              <Input
                type="text"
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                placeholder="e.g., dateInRange, hasPermission, contains"
                className="w-full"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Custom function registered in your ABAC engine
              </p>
            </div>

            {/* Function Arguments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Arguments ({functionArgs.length})
              </label>
              <div className="space-y-2">
                {functionArgs.map((arg, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      type="text"
                      value={arg}
                      onChange={(e) => {
                        const updated = [...functionArgs];
                        updated[index] = e.target.value;
                        setFunctionArgs(updated);
                      }}
                      placeholder={`Argument ${index + 1}`}
                      className="flex-1"
                    />
                    {functionArgs.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setFunctionArgs(
                            functionArgs.filter((_, i) => i !== index),
                          )
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFunctionArgs([...functionArgs, ""])}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Argument
                </Button>
              </div>
            </div>

            <Button type="button" onClick={handleApply} className="w-full">
              Apply Function Condition
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Logical Operator */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Logical Operator
              </label>
              <select
                value={logicalOperator}
                onChange={(e) =>
                  setLogicalOperator(e.target.value as LogicalOperator)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {LOGICAL_OPERATORS.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Nested Conditions */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Conditions ({nestedConditions.length})
              </label>
              {nestedConditions.map((nestedCond, index) => (
                <div
                  key={index}
                  className="relative p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <ConditionBuilder
                    condition={nestedCond}
                    onChange={(cond) =>
                      handleUpdateNestedCondition(index, cond)
                    }
                    level={level + 1}
                    onRemove={
                      nestedConditions.length > 1
                        ? () => handleRemoveNestedCondition(index)
                        : undefined
                    }
                  />
                </div>
              ))}

              {logicalOperator !== LogicalOperator.Not && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddNestedCondition}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Condition
                </Button>
              )}
            </div>

            <Button type="button" onClick={handleApply} className="w-full">
              Apply Logical Condition
            </Button>
          </div>
        )}

        {/* Remove Button */}
        {onRemove && level > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="absolute -top-2 -right-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

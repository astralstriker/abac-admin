import type { Condition, ConditionType } from "@devcraft-ts/abac-admin-core";
import { Plus, Trash2 } from "lucide-react";
import React from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export interface ConditionBuilderProps {
  condition: Condition;
  onChange: (condition: Condition) => void;
  level?: number;
  onRemove?: () => void;
}

const SIMPLE_OPERATORS: ConditionType[] = [
  "equals",
  "notEquals",
  "in",
  "notIn",
  "gte",
  "gt",
  "lte",
  "lt",
  "contains",
  "startsWith",
  "endsWith",
  "matches",
];

const LOGICAL_OPERATORS: ConditionType[] = ["and", "or", "not"];

const OPERATOR_LABELS: Record<string, string> = {
  equals: "Equals",
  notEquals: "Not Equals",
  in: "In",
  notIn: "Not In",
  gte: "Greater Than or Equal",
  gt: "Greater Than",
  lte: "Less Than or Equal",
  lt: "Less Than",
  contains: "Contains",
  startsWith: "Starts With",
  endsWith: "Ends With",
  matches: "Matches (Regex)",
  and: "AND",
  or: "OR",
  not: "NOT",
};

const ATTRIBUTE_CATEGORIES = [
  {
    value: "subject",
    label: "Subject",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    value: "resource",
    label: "Resource",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    value: "action",
    label: "Action",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    value: "environment",
    label: "Environment",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
];

export const ConditionBuilder: React.FC<ConditionBuilderProps> = ({
  condition,
  onChange,
  level = 0,
  onRemove,
}) => {
  const isLogicalOperator = LOGICAL_OPERATORS.includes(condition.type);
  const nestedConditions = (condition as any).conditions || [];

  const handleTypeChange = (newType: ConditionType) => {
    if (LOGICAL_OPERATORS.includes(newType)) {
      onChange({
        type: newType,
        conditions:
          newType === "not" ? [{ type: "equals", left: "", right: "" }] : [],
      } as any);
    } else {
      onChange({
        type: newType,
        left: "",
        right: "",
      });
    }
  };

  const handleLeftChange = (value: string) => {
    onChange({ ...condition, left: value });
  };

  const handleRightChange = (value: string) => {
    // Try to parse as JSON for arrays/objects
    let parsedValue: any = value;
    if (value.startsWith("[") || value.startsWith("{")) {
      try {
        parsedValue = JSON.parse(value);
      } catch (e) {
        parsedValue = value;
      }
    } else if (value === "true") {
      parsedValue = true;
    } else if (value === "false") {
      parsedValue = false;
    } else if (!isNaN(Number(value)) && value !== "") {
      parsedValue = Number(value);
    }
    onChange({ ...condition, right: parsedValue });
  };

  const addNestedCondition = () => {
    const newCondition: Condition = { type: "equals", left: "", right: "" };
    onChange({
      ...condition,
      conditions: [...nestedConditions, newCondition],
    } as any);
  };

  const removeNestedCondition = (index: number) => {
    onChange({
      ...condition,
      conditions: nestedConditions.filter((_: any, i: number) => i !== index),
    } as any);
  };

  const updateNestedCondition = (index: number, newCondition: Condition) => {
    const updated = [...nestedConditions];
    updated[index] = newCondition;
    onChange({
      ...condition,
      conditions: updated,
    } as any);
  };

  const indentClass =
    level > 0
      ? "ml-6 border-l-2 border-gray-200 dark:border-gray-700 pl-4"
      : "";

  return (
    <div className={`space-y-3 ${indentClass}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide min-w-[80px]">
                Operator
              </label>
              <select
                value={condition.type}
                onChange={(e) =>
                  handleTypeChange(e.target.value as ConditionType)
                }
                className="flex-1 h-9 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-1 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent shadow-sm"
              >
                <optgroup label="Comparison">
                  {SIMPLE_OPERATORS.map((op) => (
                    <option key={op} value={op}>
                      {OPERATOR_LABELS[op]}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Logical">
                  {LOGICAL_OPERATORS.map((op) => (
                    <option key={op} value={op}>
                      {OPERATOR_LABELS[op]}
                    </option>
                  ))}
                </optgroup>
              </select>
              <Badge
                variant={isLogicalOperator ? "info" : "default"}
                className="min-w-[70px] justify-center"
              >
                {isLogicalOperator ? "Logical" : "Compare"}
              </Badge>
            </div>

            {!isLogicalOperator && (
              <>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide min-w-[80px]">
                    Left Side
                  </label>
                  <Input
                    placeholder="e.g., subject.role or resource.id"
                    value={String(condition.left || "")}
                    onChange={(e) => handleLeftChange(e.target.value)}
                    className="flex-1"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide min-w-[80px]">
                    Right Side
                  </label>
                  <Input
                    placeholder={
                      ["in", "notIn"].includes(condition.type)
                        ? 'e.g., ["admin", "user"]'
                        : "e.g., admin or true or 100"
                    }
                    value={
                      typeof condition.right === "object"
                        ? JSON.stringify(condition.right)
                        : String(condition.right || "")
                    }
                    onChange={(e) => handleRightChange(e.target.value)}
                    className="flex-1"
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Quick insert:
                  </span>
                  {ATTRIBUTE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => handleLeftChange(`${cat.value}.`)}
                      className={`text-xs px-2 py-1 rounded-md ${cat.color} hover:opacity-80 transition-opacity`}
                    >
                      {cat.label}.
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {onRemove && level > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isLogicalOperator && (
        <div className="space-y-3 ml-4">
          {nestedConditions.length === 0 && (
            <div className="text-sm text-gray-500 dark:text-gray-400 italic p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
              No conditions added yet. Click "Add Condition" below.
            </div>
          )}

          {nestedConditions.map((nested: Condition, index: number) => (
            <div key={index} className="relative">
              {index > 0 && (
                <div className="absolute -top-2 left-8 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-2">
                  {condition.type.toUpperCase()}
                </div>
              )}
              <ConditionBuilder
                condition={nested}
                onChange={(updated) => updateNestedCondition(index, updated)}
                level={level + 1}
                onRemove={() => removeNestedCondition(index)}
              />
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addNestedCondition}
            leftIcon={<Plus className="h-4 w-4" />}
            className="w-full"
          >
            Add{" "}
            {condition.type === "not"
              ? "Condition"
              : `${condition.type.toUpperCase()} Condition`}
          </Button>
        </div>
      )}
    </div>
  );
};

import { usePolicy } from "@devcraft-ts/abac-admin-react";
import { Effect } from "abac-engine";
import { AlertCircle, CheckCircle2, Code2, Play, XCircle } from "lucide-react";
import React from "react";
import { formatDate } from "../../lib/utils";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Input } from "../ui/Input";

export interface PolicyViewerProps {
  policyId: string;
  onEdit?: () => void;
  onClose?: () => void;
}

interface EvaluationContext {
  subject: Record<string, any>;
  resource: Record<string, any>;
  action: string;
  environment: Record<string, any>;
}

interface EvaluationResult {
  decision: "PERMIT" | "DENY";
  matchedPolicies: string[];
  timestamp: string;
}

export const PolicyViewer: React.FC<PolicyViewerProps> = ({
  policyId,
  onEdit,
  onClose,
}) => {
  const { policy, isLoading, error } = usePolicy(policyId);
  const [showJson, setShowJson] = React.useState(false);
  const [isEvaluating, setIsEvaluating] = React.useState(false);
  const [evaluationResult, setEvaluationResult] =
    React.useState<EvaluationResult | null>(null);
  const [evaluationError, setEvaluationError] = React.useState<string | null>(
    null,
  );

  const [context, setContext] = React.useState<EvaluationContext>({
    subject: { role: "user", id: "user-123" },
    resource: { type: "document", id: "doc-456" },
    action: "read",
    environment: { time: new Date().toISOString() },
  });

  const [contextJson, setContextJson] = React.useState(
    JSON.stringify(context, null, 2),
  );

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    setEvaluationError(null);

    try {
      // Parse context JSON
      const parsedContext = JSON.parse(contextJson);

      // Call evaluation endpoint
      const response = await fetch("/api/abac/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          policies: [policy],
          context: parsedContext,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to evaluate policy");
      }

      const result = await response.json();
      setEvaluationResult(result);
    } catch (err) {
      console.error("Evaluation error:", err);
      setEvaluationError(
        err instanceof Error ? err.message : "Failed to evaluate policy",
      );
    } finally {
      setIsEvaluating(false);
    }
  };

  const updateContextField = (
    section: keyof EvaluationContext,
    key: string,
    value: any,
  ) => {
    const newContext = { ...context };
    if (section === "action") {
      newContext.action = value;
    } else {
      newContext[section] = { ...newContext[section], [key]: value };
    }
    setContext(newContext);
    setContextJson(JSON.stringify(newContext, null, 2));
  };

  const renderCondition = (
    condition: any,
    level: number = 0,
  ): React.ReactNode => {
    if (!condition) return null;

    const indent = level * 24;
    const isLogical = condition.conditions !== undefined;
    const isFunction = condition.function !== undefined;

    const formatValue = (val: any): string => {
      if (typeof val === "object" && val !== null) {
        if ("category" in val && "attributeId" in val) {
          return `${val.category}.${val.attributeId}`;
        }
        return JSON.stringify(val);
      }
      return String(val);
    };

    return (
      <div
        key={Math.random()}
        className="space-y-2"
        style={{ marginLeft: `${indent}px` }}
      >
        <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
          <Badge
            variant={isLogical ? "info" : isFunction ? "warning" : "default"}
            className="mt-0.5 shrink-0"
          >
            {condition.operator?.toUpperCase() ||
              condition.function?.toUpperCase() ||
              "UNKNOWN"}
          </Badge>
          <div className="flex-1 space-y-1 text-sm">
            {!isLogical && !isFunction && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 dark:text-gray-400 font-mono text-xs">
                    Left:
                  </span>
                  <code className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded">
                    {formatValue(condition.left)}
                  </code>
                </div>
                {condition.right !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 dark:text-gray-400 font-mono text-xs">
                      Right:
                    </span>
                    <code className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded">
                      {formatValue(condition.right)}
                    </code>
                  </div>
                )}
              </>
            )}
            {isFunction && condition.args && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500 dark:text-gray-400 font-mono text-xs">
                  Args:
                </span>
                <code className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded">
                  {JSON.stringify(condition.args)}
                </code>
              </div>
            )}
          </div>
        </div>
        {isLogical && condition.conditions && (
          <div className="space-y-2 border-l-2 border-gray-300 dark:border-gray-700 pl-4 ml-2">
            {condition.conditions.map((nested: any, idx: number) => (
              <div key={idx}>
                {idx > 0 && (
                  <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 my-2">
                    {condition.operator?.toUpperCase()}
                  </div>
                )}
                {renderCondition(nested, level + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <Card className="border-gray-200 dark:border-gray-800">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !policy) {
    return (
      <Card className="border-gray-200 dark:border-gray-800">
        <CardContent className="pt-6">
          <div className="text-center text-red-600 dark:text-red-400">
            <p className="font-semibold">Error loading policy</p>
            <p className="text-sm mt-1">
              {error?.message || "Policy not found"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Policy Details */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader className="border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{policy.id}</CardTitle>
              <CardDescription>{policy.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {onEdit && (
                <Button variant="outline" onClick={onEdit} size="sm">
                  Edit Policy
                </Button>
              )}
              {onClose && (
                <Button variant="ghost" onClick={onClose} size="sm">
                  ✕
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Version
              </p>
              <Badge variant="info">{policy.version}</Badge>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Effect
              </p>
              <Badge
                variant={
                  policy.effect === Effect.Permit
                    ? "success"
                    : policy.effect === Effect.Deny
                      ? "error"
                      : "default"
                }
              >
                {policy.effect}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Priority
              </p>
              <Badge variant="info">{policy.priority || 100}</Badge>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Tags
              </p>
              {policy.metadata?.tags && policy.metadata.tags.length > 0 && (
                <Badge variant="default">{policy.metadata.tags[0]}</Badge>
              )}
            </div>
          </div>

          {policy.metadata?.tags && policy.metadata.tags.length > 1 && (
            <div className="mb-6">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                All Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {policy.metadata.tags.map((tag: string) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Conditions
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowJson(!showJson)}
                leftIcon={<Code2 className="h-4 w-4" />}
              >
                {showJson ? "Show Visual" : "Show JSON"}
              </Button>
            </div>

            {showJson ? (
              <pre className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-gray-300 dark:border-gray-700">
                {JSON.stringify(policy.condition, null, 2)}
              </pre>
            ) : (
              <div className="space-y-2">
                {renderCondition(policy.condition)}
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Created</p>
              <p className="text-gray-900 dark:text-gray-100">
                {policy.metadata?.createdAt &&
                  formatDate(policy.metadata.createdAt)}
                {policy.metadata?.createdBy &&
                  ` by ${policy.metadata.createdBy}`}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Updated</p>
              <p className="text-gray-900 dark:text-gray-100">
                {policy.metadata?.modifiedAt &&
                  formatDate(policy.metadata.modifiedAt)}
                {policy.metadata?.modifiedBy &&
                  ` by ${policy.metadata.modifiedBy}`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sandbox */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader className="border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Policy Sandbox
              </CardTitle>
              <CardDescription>
                Test this policy with different contexts to see the evaluation
                result
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Quick Context Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject Role
                </label>
                <Input
                  placeholder="e.g., admin, user"
                  value={context.subject.role || ""}
                  onChange={(e) =>
                    updateContextField("subject", "role", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject ID
                </label>
                <Input
                  placeholder="e.g., user-123"
                  value={context.subject.id || ""}
                  onChange={(e) =>
                    updateContextField("subject", "id", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Resource Type
                </label>
                <Input
                  placeholder="e.g., document, file"
                  value={context.resource.type || ""}
                  onChange={(e) =>
                    updateContextField("resource", "type", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Action
                </label>
                <Input
                  placeholder="e.g., read, write, delete"
                  value={context.action}
                  onChange={(e) =>
                    updateContextField("action", "", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Full JSON Context */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Context (JSON)
              </label>
              <textarea
                className="w-full min-h-[200px] px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                value={contextJson}
                onChange={(e) => setContextJson(e.target.value)}
              />
            </div>

            <Button
              onClick={handleEvaluate}
              isLoading={isEvaluating}
              leftIcon={<Play className="h-4 w-4" />}
              className="w-full"
            >
              {isEvaluating ? "Evaluating..." : "Run Evaluation"}
            </Button>

            {/* Evaluation Result */}
            {evaluationResult && (
              <div
                className={`p-4 rounded-lg border ${
                  evaluationResult.decision === "PERMIT"
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                }`}
              >
                <div className="flex items-start gap-3">
                  {evaluationResult.decision === "PERMIT" ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h4
                      className={`font-semibold ${
                        evaluationResult.decision === "PERMIT"
                          ? "text-green-900 dark:text-green-100"
                          : "text-red-900 dark:text-red-100"
                      }`}
                    >
                      Decision: {evaluationResult.decision}
                    </h4>
                    <p
                      className={`text-sm mt-1 ${
                        evaluationResult.decision === "PERMIT"
                          ? "text-green-700 dark:text-green-300"
                          : "text-red-700 dark:text-red-300"
                      }`}
                    >
                      {evaluationResult.decision === "PERMIT"
                        ? "Access is granted based on the policy conditions"
                        : "Access is denied based on the policy conditions"}
                    </p>
                    <p
                      className={`text-xs mt-2 ${
                        evaluationResult.decision === "PERMIT"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      Evaluated at{" "}
                      {new Date(evaluationResult.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {evaluationError && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-red-900 dark:text-red-100">
                      Evaluation Error
                    </h4>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      {evaluationError}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

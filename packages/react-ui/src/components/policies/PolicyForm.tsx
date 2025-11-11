import { usePolicies, usePolicy } from "@devcraft-ts/abac-admin-react";
import { Effect, type ABACPolicy, type Condition } from "abac-engine";
import { Code2, Wand2 } from "lucide-react";
import React from "react";
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
import { ConditionBuilder } from "./ConditionBuilder";

export interface PolicyFormProps {
  policyId?: string;
  onSuccess?: (policy: ABACPolicy) => void;
  onCancel?: () => void;
}

export const PolicyForm: React.FC<PolicyFormProps> = ({
  policyId,
  onSuccess,
  onCancel,
}) => {
  const { createPolicy, updatePolicy } = usePolicies();
  const { policy, isLoading: isPolicyLoading } = usePolicy(policyId || "");
  const isEditMode = !!policyId;

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [useVisualBuilder, setUseVisualBuilder] = React.useState(true);

  const [formData, setFormData] = React.useState<Partial<ABACPolicy>>({
    id: "",
    version: "1.0.0",
    effect: Effect.Permit,
    description: "",
    condition: undefined,
    priority: 100,
    metadata: {
      createdBy: "user",
      createdAt: new Date(),
      tags: [],
    },
  });

  const [tagInput, setTagInput] = React.useState("");
  const [conditionJson, setConditionJson] = React.useState("");

  React.useEffect(() => {
    if (policy && isEditMode) {
      setFormData({
        id: policy.id,
        version: policy.version,
        effect: policy.effect,
        description: policy.description,
        condition: policy.condition,
        target: policy.target,
        priority: policy.priority,
        obligations: policy.obligations,
        advice: policy.advice,
        metadata: policy.metadata,
      });
      setConditionJson(JSON.stringify(policy.condition, null, 2));
    }
  }, [policy, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      let condition;
      if (useVisualBuilder) {
        condition = formData.condition;
      } else {
        try {
          condition = JSON.parse(conditionJson);
        } catch (err) {
          throw new Error("Invalid JSON in condition field");
        }
      }

      const policyData: ABACPolicy = {
        id: formData.id || "",
        version: formData.version || "1.0.0",
        effect: formData.effect || Effect.Permit,
        description: formData.description,
        condition,
        target: formData.target,
        priority: formData.priority || 100,
        obligations: formData.obligations,
        advice: formData.advice,
        metadata: {
          ...formData.metadata,
          createdBy: formData.metadata?.createdBy || "user",
          createdAt: formData.metadata?.createdAt || new Date(),
        },
      };

      if (isEditMode && policyId) {
        const updated = await updatePolicy(policyId, policyData);
        if (onSuccess) onSuccess(updated);
      } else {
        const created = await createPolicy(policyData);
        if (onSuccess) onSuccess(created);
      }
    } catch (err) {
      console.error("Failed to save policy:", err);
      setError(err instanceof Error ? err.message : "Failed to save policy");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = () => {
    if (
      tagInput.trim() &&
      !formData.metadata?.tags?.includes(tagInput.trim())
    ) {
      setFormData({
        ...formData,
        metadata: {
          ...formData.metadata,
          tags: [...(formData.metadata?.tags || []), tagInput.trim()],
        },
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      metadata: {
        ...formData.metadata,
        tags: formData.metadata?.tags?.filter((t: string) => t !== tag) || [],
      },
    });
  };

  const handleConditionChange = (newCondition: Condition | null) => {
    if (!newCondition) return;
    setFormData({ ...formData, condition: newCondition });
    setConditionJson(JSON.stringify(newCondition, null, 2));
  };

  const toggleBuilderMode = () => {
    if (useVisualBuilder) {
      // Switching to JSON mode
      setConditionJson(JSON.stringify(formData.condition, null, 2));
    } else {
      // Switching to visual mode
      try {
        const parsed = JSON.parse(conditionJson);
        setFormData({ ...formData, condition: parsed });
      } catch (e) {
        setError("Invalid JSON. Please fix before switching to visual mode.");
        return;
      }
    }
    setUseVisualBuilder(!useVisualBuilder);
  };

  if (isPolicyLoading && isEditMode) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-200 dark:border-gray-800">
      <CardHeader className="border-b border-gray-200 dark:border-gray-800">
        <CardTitle className="text-2xl">
          {isEditMode ? "Edit Policy" : "Create New Policy"}
        </CardTitle>
        <CardDescription>
          {isEditMode
            ? "Update the policy details and conditions"
            : "Define a new ABAC policy with conditions and rules"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
              <p className="font-semibold">Error</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Policy ID <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g., allow-read-documents"
                  value={formData.id || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
                  }
                  required
                  disabled={isEditMode}
                  className={
                    isEditMode
                      ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                      : ""
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Version <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g., 1.0.0"
                  value={formData.version}
                  onChange={(e) =>
                    setFormData({ ...formData, version: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Effect <span className="text-red-500">*</span>
                </label>
                <select
                  className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent shadow-sm"
                  value={formData.effect}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      effect: e.target.value as Effect,
                    })
                  }
                  required
                >
                  <option value={Effect.Permit}>Permit</option>
                  <option value={Effect.Deny}>Deny</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Priority
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 100"
                  value={formData.priority || 100}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: parseInt(e.target.value) || 100,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                className="flex min-h-[100px] w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent shadow-sm"
                placeholder="Describe what this policy does..."
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tags
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={handleAddTag}>
                  Add
                </Button>
              </div>
              {formData.metadata?.tags && formData.metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.metadata.tags?.map((tag: string) => (
                    <Badge key={tag} variant="default">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 hover:text-red-600"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Conditions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Conditions
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={toggleBuilderMode}
                leftIcon={
                  useVisualBuilder ? (
                    <Code2 className="h-4 w-4" />
                  ) : (
                    <Wand2 className="h-4 w-4" />
                  )
                }
              >
                {useVisualBuilder ? "Switch to JSON" : "Switch to Builder"}
              </Button>
            </div>

            {useVisualBuilder ? (
              <ConditionBuilder
                condition={formData.condition || null}
                onChange={handleConditionChange}
              />
            ) : (
              <div className="space-y-2">
                <textarea
                  className="flex min-h-[300px] w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent shadow-sm"
                  placeholder={`{\n  "operator": "equals",\n  "left": { "category": "subject", "attributeId": "role" },\n  "right": "admin"\n}`}
                  value={conditionJson}
                  onChange={(e) => setConditionJson(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>{isEditMode ? "Update Policy" : "Create Policy"}</>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

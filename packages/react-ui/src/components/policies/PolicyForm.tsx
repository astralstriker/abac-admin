import type {
  Condition,
  Policy,
  PolicyInput,
} from "@devcraft-ts/abac-admin-core";
import { usePolicies, usePolicy } from "@devcraft-ts/abac-admin-react";
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
  onSuccess?: (policy: Policy) => void;
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

  const [formData, setFormData] = React.useState<Partial<PolicyInput>>({
    policyId: "",
    version: "1.0.0",
    effect: "PERMIT",
    description: "",
    conditions: { type: "equals", left: "", right: "" },
    isActive: true,
    category: "",
    tags: [],
    createdBy: "user",
    updatedBy: null,
  });

  const [tagInput, setTagInput] = React.useState("");
  const [conditionJson, setConditionJson] = React.useState("");

  React.useEffect(() => {
    if (policy && isEditMode) {
      setFormData({
        policyId: policy.policyId,
        version: policy.version,
        effect: policy.effect,
        description: policy.description,
        conditions: policy.conditions,
        isActive: policy.isActive,
        category: policy.category,
        tags: policy.tags,
        createdBy: policy.createdBy,
        updatedBy: policy.updatedBy,
      });
      setConditionJson(JSON.stringify(policy.conditions, null, 2));
    }
  }, [policy, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      let conditions;
      if (useVisualBuilder) {
        conditions = formData.conditions;
      } else {
        try {
          conditions = JSON.parse(conditionJson);
        } catch (err) {
          throw new Error("Invalid JSON in conditions field");
        }
      }

      const policyData: PolicyInput = {
        policyId: formData.policyId || "",
        version: formData.version || "1.0.0",
        effect: formData.effect as "PERMIT" | "DENY",
        description: formData.description || "",
        conditions,
        isActive: formData.isActive !== false,
        category: formData.category || "",
        tags: formData.tags || [],
        createdBy: formData.createdBy || "user",
        updatedBy: formData.updatedBy || null,
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
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t) => t !== tag) || [],
    });
  };

  const handleConditionChange = (newCondition: Condition) => {
    setFormData({ ...formData, conditions: newCondition });
    setConditionJson(JSON.stringify(newCondition, null, 2));
  };

  const toggleBuilderMode = () => {
    if (useVisualBuilder) {
      // Switching to JSON mode
      setConditionJson(JSON.stringify(formData.conditions, null, 2));
    } else {
      // Switching to visual mode
      try {
        const parsed = JSON.parse(conditionJson);
        setFormData({ ...formData, conditions: parsed });
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
                  value={formData.policyId}
                  onChange={(e) =>
                    setFormData({ ...formData, policyId: e.target.value })
                  }
                  required
                  disabled={isEditMode}
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
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Description <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Describe what this policy does"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Effect <span className="text-red-500">*</span>
                </label>
                <select
                  className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  value={formData.effect}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      effect: e.target.value as "PERMIT" | "DENY",
                    })
                  }
                  required
                >
                  <option value="PERMIT">PERMIT</option>
                  <option value="DENY">DENY</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <Input
                  placeholder="e.g., document, admin"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tags
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddTag}
                  variant="secondary"
                >
                  Add
                </Button>
              </div>
              {formData.tags && formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="default">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 hover:text-red-600 dark:hover:text-red-400"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <label
                htmlFor="isActive"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                Policy is active
              </label>
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
                {useVisualBuilder ? "Switch to JSON" : "Switch to Visual"}
              </Button>
            </div>

            {useVisualBuilder ? (
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-300 dark:border-gray-800">
                <ConditionBuilder
                  condition={formData.conditions as Condition}
                  onChange={handleConditionChange}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <textarea
                  className="flex min-h-[300px] w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent shadow-sm"
                  placeholder={`{\n  "type": "equals",\n  "left": "subject.role",\n  "right": "admin"\n}`}
                  value={conditionJson}
                  onChange={(e) => setConditionJson(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Define conditions in JSON format. Use types like: equals,
                  notEquals, in, and, or, not.
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                  ? "Update Policy"
                  : "Create Policy"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

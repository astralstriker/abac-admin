// Context
export { ABACProvider, useABACClient } from "./context/ABACContext";

// Hooks
export { usePolicies } from "./hooks/usePolicies";

// Re-export types from core
export type {
  Condition,
  ConditionType,
  Policy,
  PolicyEffect,
  PolicyInput,
  PolicyUpdate,
} from "@abac-admin/core";

export type {
  AttributeValue,
  AttributeValueType,
  ResourceType,
} from "@abac-admin/core";

export type { AuditAction, AuditLogEntry } from "@abac-admin/core";

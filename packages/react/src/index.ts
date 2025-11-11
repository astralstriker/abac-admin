// Context
export { ABACProvider, useABACClient } from "./context/ABACContext";

// Hooks
export {
  useAttribute,
  useAttributeComparison,
  useAttributeHistory,
  // Attribute hooks
  useAttributes,
  // Audit hooks
  useAuditLog,
  useAuditStatistics,
  useEntityHistory,
  // Policy hooks
  usePolicies,
  usePolicy,
  usePolicyTest,
  usePolicyVersions,
  useRecentActivity,
  useUserActivity,
} from "./hooks";

// Hook result types
export type {
  UseAttributesResult,
  UseAuditLogResult,
  UsePoliciesResult,
} from "./hooks";

// Re-export types from core
export type {
  Condition,
  Policy,
  PolicyEffect,
  PolicyInput,
  PolicyUpdate,
} from "@devcraft-ts/abac-admin-core";

export type {
  AttributeValue,
  AttributeValueType,
  ResourceType,
} from "@devcraft-ts/abac-admin-core";

export type { AuditAction, AuditLogEntry } from "@devcraft-ts/abac-admin-core";

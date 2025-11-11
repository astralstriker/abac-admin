// Re-export all React hooks and components from @devcraft-ts/abac-admin-react
export {
  ABACProvider,
  useABACClient,
  useAttribute,
  useAttributeComparison,
  useAttributeHistory,
  useAttributes,
  useAuditLog,
  useAuditStatistics,
  useEntityHistory,
  usePolicies,
  usePolicy,
  usePolicyTest,
  usePolicyVersions,
  useRecentActivity,
  useUserActivity,
} from "@devcraft-ts/abac-admin-react";

// Re-export types from React package
export type {
  UseAttributesResult,
  UseAuditLogResult,
  UsePoliciesResult,
} from "@devcraft-ts/abac-admin-react";

// Re-export core types for convenience
export type {
  AttributeValue,
  AttributeValueType,
  AuditAction,
  AuditLogEntry,
  Condition,
  Policy,
  PolicyEffect,
  PolicyInput,
  PolicyUpdate,
  ResourceType,
} from "@devcraft-ts/abac-admin-core";

// Note: Server utilities are exported from '@abac-admin/nextjs/server'
// import { createPolicyRoutes } from '@abac-admin/nextjs/server'

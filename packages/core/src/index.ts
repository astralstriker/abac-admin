/**
 * @abac-admin/core
 * Lightweight, framework-agnostic core for ABAC Policy Administration
 *
 * @packageDocumentation
 */

// ============================================================================
// RE-EXPORT CORE TYPES FROM ABAC-ENGINE
// ============================================================================
// The admin UI uses the official abac-engine types directly
// No custom schemas, no adapters, no confusion!

export type {
  Action,
  Advice,
  AttributeProvider,
  Condition,
  ABACDecision as Decision,
  Environment,
  Obligation,
  ABACPolicy as Policy,
  PolicyTarget,
  ABACRequest as Request,
  Resource,
  Subject,
} from "abac-engine";

// Type aliases for policy operations
export type { ABACPolicy } from "abac-engine";
export type PolicyInput = import("abac-engine").ABACPolicy;
export type PolicyUpdate = import("abac-engine").ABACPolicy;

export {
  AttributeCategory,
  AttributeDataType,
  CombiningAlgorithm,
  ComparisonOperator,
  Decision as DecisionEnum,
  LogicalOperator,
  Effect as PolicyEffect,
} from "abac-engine";

// ============================================================================
// RE-EXPORT BUILDERS AND UTILITIES FROM ABAC-ENGINE
// ============================================================================

export {
  AttributeRef,
  Attributes,
  ConditionBuilder,
  PolicyBuilder,
  PolicyPatterns,
  TargetBuilder,
} from "abac-engine";

export {
  validatePolicies,
  validatePolicy,
  validatePolicyOrThrow,
  type PolicyValidationError,
  type PolicyValidationResult,
  type PolicyValidationWarning,
} from "abac-engine";

// Note: File system utilities (loadPoliciesFromFile, savePoliciesToFile, etc.)
// are NOT exported here as they require Node.js 'fs' module.
// Use them directly from 'abac-engine' in server-side code only.
export {
  exportPoliciesToJSON,
  exportPolicyToJSON,
  filterPoliciesByTarget,
  groupPoliciesByEffect,
  loadPoliciesFromJSON,
  PolicyCache,
} from "abac-engine";

// ============================================================================
// API CLIENT AND SERVICES
// ============================================================================

export { ABACAdminClient } from "./api/client";
export type { ABACAdminConfig } from "./api/client";

export { PolicyService } from "./api/policies";
export type {
  PolicyExportResult,
  PolicyFilters,
  PolicyImportResult,
  PolicyTestRequest,
  PolicyTestResult,
} from "./api/policies";

export { AttributeService } from "./api/attributes";
export type {
  AttributeHistoryOptions,
  BulkAttributeResult,
} from "./api/attributes";

export { AuditService } from "./api/audit";
export type { AuditLogResponse, AuditStatistics } from "./api/audit";

// ============================================================================
// ATTRIBUTE SCHEMAS AND TYPES
// ============================================================================

export {
  AttributeDefinitionSchema,
  AttributeInputSchema,
  AttributeValueSchema,
  AttributeValueTypeSchema,
  BulkAttributeInputSchema,
  ResourceTypeSchema,
} from "./schemas/attribute";

export type {
  AttributeDefinition,
  AttributeInput,
  AttributeValue,
  AttributeValueType,
  BulkAttributeInput,
  ResourceType,
} from "./schemas/attribute";

// ============================================================================
// AUDIT SCHEMAS AND TYPES
// ============================================================================

export {
  AuditActionSchema,
  AuditLogEntrySchema,
  AuditLogFilterSchema,
} from "./schemas/audit";

export type {
  AuditAction,
  AuditLogEntry,
  AuditLogFilter,
} from "./schemas/audit";

// ============================================================================
// CUSTOM UTILITIES (Admin UI specific)
// ============================================================================

export {
  isInRange,
  sanitizeString,
  validateAttributeKey,
  validateAttributeValue,
  validateAttributeValueStructure,
  validateCategory,
  validateEmail,
  validateISODate,
  validatePagination,
  validatePolicyId,
  validatePolicyStructure,
  validateResourceId,
  validateTag,
  validateTags,
  validateVersion,
} from "./utils/validators";

export {
  formatAttributeValue,
  formatAuditAction,
  formatAuditMessage,
  formatCondition,
  formatConditionCompact,
  formatConditionOperator,
  formatConditionValue,
  formatDate,
  formatDuration,
  formatFileSize,
  formatNumber,
  formatPercentage,
  formatPolicyEffect,
  formatPolicyStatus,
  formatPolicySummary,
  formatRelativeTime,
  formatResourceType,
  formatTags,
  formatUser,
  formatValidationError,
  formatValidationErrors,
  toTitleCase,
  truncate,
} from "./utils/formatters";

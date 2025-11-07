/**
 * @abac-admin/core
 * Lightweight, framework-agnostic core for ABAC Policy Administration
 *
 * @packageDocumentation
 */

// Export API client and services
export { ABACAdminClient } from './api/client';
export type { ABACAdminConfig } from './api/client';

export { PolicyService } from './api/policies';
export type {
    PolicyExportResult, PolicyFilters, PolicyImportResult, PolicyTestRequest,
    PolicyTestResult
} from './api/policies';

export { AttributeService } from './api/attributes';
export type {
    AttributeHistoryOptions,
    BulkAttributeResult
} from './api/attributes';

export { AuditService } from './api/audit';
export type {
    AuditLogResponse,
    AuditStatistics
} from './api/audit';

// Export schemas and types
export {
    AttributeRefSchema, ConditionSchema,
    ConditionTypeSchema, PolicyEffectSchema, PolicyInputSchema, PolicySchema, PolicyUpdateSchema
} from './schemas/policy';

export type {
    AttributeRef, Condition,
    ConditionType, Policy, PolicyEffect, PolicyInput,
    PolicyUpdate
} from './schemas/policy';

export {
    AttributeDefinitionSchema,
    AttributeInputSchema, AttributeValueSchema, AttributeValueTypeSchema, BulkAttributeInputSchema, ResourceTypeSchema
} from './schemas/attribute';

export type {
    AttributeDefinition,
    AttributeInput, AttributeValue, AttributeValueType, BulkAttributeInput, ResourceType
} from './schemas/attribute';

export {
    AuditActionSchema,
    AuditLogEntrySchema,
    AuditLogFilterSchema
} from './schemas/audit';

export type {
    AuditAction,
    AuditLogEntry,
    AuditLogFilter
} from './schemas/audit';

// Export utilities
export {
    ConditionBuilder, conditionToString, countConditions, deserializeCondition, extractAttributeRefs, flattenCondition, getConditionDepth, serializeCondition, simplifyCondition, validateCondition
} from './utils/conditionBuilder';

export {
    isInRange, sanitizeString, validateAttributeKey, validateAttributeValue,
    validateAttributeValueStructure, validateCategory, validateConditionStructure, validateEmail,
    validateISODate, validatePagination, validatePolicyId, validatePolicyInput, validatePolicyStructure, validateResourceId, validateTag,
    validateTags, validateVersion
} from './utils/validators';

export {
    formatAttributeValue, formatAuditAction,
    formatAuditMessage, formatCondition, formatConditionCompact, formatConditionOperator, formatConditionValue, formatDate, formatDuration, formatFileSize,
    formatNumber,
    formatPercentage, formatPolicyEffect,
    formatPolicyStatus, formatPolicySummary, formatRelativeTime, formatResourceType, formatTags, formatUser,
    formatValidationError,
    formatValidationErrors, toTitleCase, truncate
} from './utils/formatters';


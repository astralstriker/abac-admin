import type { ResourceType } from "../schemas/attribute";
import type { AuditAction, AuditLogEntry } from "../schemas/audit";
import type { Condition, Policy, PolicyEffect } from "../schemas/policy";

/**
 * Formats a date string to a human-readable format
 */
export function formatDate(dateString: string, includeTime = true): string {
  try {
    const date = new Date(dateString);

    if (includeTime) {
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

/**
 * Formats a date to a relative time string (e.g., "2 hours ago")
 */
export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) {
      return "just now";
    } else if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? "minute" : "minutes"} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
    } else if (diffDays < 30) {
      return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
    } else {
      return formatDate(dateString, false);
    }
  } catch {
    return dateString;
  }
}

/**
 * Formats a policy effect to a display string
 */
export function formatPolicyEffect(effect: PolicyEffect): string {
  return effect === "PERMIT" ? "Allow" : "Deny";
}

/**
 * Formats a policy status to a display string with color indicator
 */
export function formatPolicyStatus(isActive: boolean): {
  label: string;
  color: "green" | "red" | "gray";
} {
  if (isActive) {
    return { label: "Active", color: "green" };
  }
  return { label: "Inactive", color: "gray" };
}

/**
 * Formats a condition type to a human-readable operator
 */
export function formatConditionOperator(type: string): string {
  const operatorMap: Record<string, string> = {
    equals: "=",
    notEquals: "≠",
    in: "∈",
    notIn: "∉",
    gte: "≥",
    gt: ">",
    lte: "≤",
    lt: "<",
    contains: "contains",
    startsWith: "starts with",
    endsWith: "ends with",
    matches: "matches",
    and: "AND",
    or: "OR",
    not: "NOT",
  };

  return operatorMap[type] || type;
}

/**
 * Formats a condition to a human-readable string
 */
export function formatCondition(condition: Condition, depth = 0): string {
  const indent = "  ".repeat(depth);

  if (condition.type === "and" || condition.type === "or") {
    const operator = condition.type.toUpperCase();
    const nested =
      condition.nested
        ?.map((c: Condition) => formatCondition(c, depth + 1))
        .join(`\n${indent}${operator} `) || "";
    return `${indent}(${nested})`;
  }

  if (condition.type === "not") {
    const nested = condition.nested?.[0]
      ? formatCondition(condition.nested[0], depth + 1)
      : "";
    return `${indent}NOT ${nested}`;
  }

  const leftStr = formatConditionValue(condition.left);
  const rightStr = formatConditionValue(condition.right);
  const operator = formatConditionOperator(condition.type);

  return `${indent}${leftStr} ${operator} ${rightStr}`;
}

/**
 * Formats a condition value (handles attribute refs)
 */
export function formatConditionValue(value: any): string {
  if (
    value &&
    typeof value === "object" &&
    "category" in value &&
    "key" in value
  ) {
    return `${value.category}.${value.key}`;
  }

  if (Array.isArray(value)) {
    return `[${value.map((v) => JSON.stringify(v)).join(", ")}]`;
  }

  if (typeof value === "string") {
    return `"${value}"`;
  }

  return String(value);
}

/**
 * Formats a condition to a compact single-line string
 */
export function formatConditionCompact(condition: Condition): string {
  if (condition.type === "and" || condition.type === "or") {
    const operator = condition.type.toUpperCase();
    const nested =
      condition.nested?.map(formatConditionCompact).join(` ${operator} `) || "";
    return `(${nested})`;
  }

  if (condition.type === "not") {
    const nested = condition.nested?.[0]
      ? formatConditionCompact(condition.nested[0])
      : "";
    return `NOT ${nested}`;
  }

  const leftStr = formatConditionValue(condition.left);
  const rightStr = formatConditionValue(condition.right);
  const operator = formatConditionOperator(condition.type);

  return `${leftStr} ${operator} ${rightStr}`;
}

/**
 * Formats an audit action to a display string
 */
export function formatAuditAction(action: AuditAction): string {
  const actionMap: Record<AuditAction, string> = {
    CREATE: "Created",
    UPDATE: "Updated",
    DELETE: "Deleted",
    ACTIVATE: "Activated",
    DEACTIVATE: "Deactivated",
    TEST: "Tested",
  };

  return actionMap[action] || action;
}

/**
 * Formats an audit log entry to a human-readable message
 */
export function formatAuditMessage(entry: AuditLogEntry): string {
  const action = formatAuditAction(entry.action);
  const entityType = entry.entityType === "policy" ? "Policy" : "Attribute";
  const userName = entry.userName || entry.userId;

  return `${userName} ${action.toLowerCase()} ${entityType.toLowerCase()} ${entry.entityId}`;
}

/**
 * Formats a resource type to a display string
 */
export function formatResourceType(resourceType: ResourceType): string {
  const typeMap: Record<ResourceType, string> = {
    user: "User",
    company: "Company",
    bond: "Bond",
    claim: "Claim",
    approval: "Approval",
    document: "Document",
    tender: "Tender",
  };

  return typeMap[resourceType] || resourceType;
}

/**
 * Formats an attribute value for display
 */
export function formatAttributeValue(value: any): string {
  if (value === null || value === undefined) {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    if (value.length <= 3) {
      return `[${value.map((v) => JSON.stringify(v)).join(", ")}]`;
    }
    return `[${value
      .slice(0, 3)
      .map((v) => JSON.stringify(v))
      .join(", ")}, ... +${value.length - 3}]`;
  }

  if (typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length === 0) return "{}";
    if (keys.length <= 3) {
      return `{${keys.join(", ")}}`;
    }
    return `{${keys.slice(0, 3).join(", ")}, ... +${keys.length - 3}}`;
  }

  if (typeof value === "string" && value.length > 100) {
    return `${value.substring(0, 100)}...`;
  }

  return String(value);
}

/**
 * Formats file size in bytes to human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${units[i]}`;
}

/**
 * Formats a number with thousand separators
 */
export function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

/**
 * Formats a percentage
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Formats a duration in milliseconds to human-readable format
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  }

  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 60) {
    return remainingSeconds > 0
      ? `${minutes}m ${remainingSeconds}s`
      : `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

/**
 * Truncates a string to a maximum length
 */
export function truncate(
  str: string,
  maxLength: number,
  suffix = "...",
): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Formats a policy summary for display
 */
export function formatPolicySummary(policy: Policy): string {
  const effect = formatPolicyEffect(policy.effect);
  const status = policy.isActive ? "Active" : "Inactive";
  return `${policy.policyId} v${policy.version} - ${effect} (${status})`;
}

/**
 * Formats tags as a comma-separated string
 */
export function formatTags(tags: string[]): string {
  if (tags.length === 0) return "None";
  if (tags.length <= 3) return tags.join(", ");
  return `${tags.slice(0, 3).join(", ")}, +${tags.length - 3} more`;
}

/**
 * Converts camelCase or snake_case to Title Case
 */
export function toTitleCase(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

/**
 * Formats a user ID or name for display
 */
export function formatUser(userId: string, userName?: string | null): string {
  return userName || userId;
}

/**
 * Formats a validation error message
 */
export function formatValidationError(field: string, error: string): string {
  return `${toTitleCase(field)}: ${error}`;
}

/**
 * Formats multiple validation errors into a single message
 */
export function formatValidationErrors(errors: string[]): string {
  if (errors.length === 0) return "";
  if (errors.length === 1) return errors[0] || "";
  return `${errors.length} validation errors:\n${errors.map((e, i) => `${i + 1}. ${e}`).join("\n")}`;
}

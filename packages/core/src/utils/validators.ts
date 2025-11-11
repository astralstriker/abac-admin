import { validatePolicy } from "abac-engine";
import type { AttributeValue } from "../schemas/attribute";

/**
 * Validates a policy ID format
 */
export function validatePolicyId(policyId: string): boolean {
  // Policy ID should be alphanumeric with hyphens/underscores, 3-100 chars
  const regex = /^[a-zA-Z0-9_-]{3,100}$/;
  return regex.test(policyId);
}

/**
 * Validates a version string format (semantic versioning)
 */
export function validateVersion(version: string): boolean {
  // Semantic versioning: major.minor.patch
  const regex = /^\d+\.\d+\.\d+$/;
  return regex.test(version);
}

/**
 * Validates a policy structure using abac-engine's validator
 *
 * Note: Use validatePolicy from abac-engine for complete validation
 */
export function validatePolicyStructure(policy: any): {
  valid: boolean;
  errors: string[];
} {
  try {
    const result = validatePolicy(policy);
    return {
      valid: result.valid,
      errors: result.errors?.map((e) => e.message) || [],
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        error instanceof Error ? error.message : "Invalid policy structure",
      ],
    };
  }
}

/**
 * Validates an attribute key format
 */
export function validateAttributeKey(key: string): boolean {
  // Attribute keys should be camelCase or snake_case, 2-100 chars
  const regex = /^[a-zA-Z][a-zA-Z0-9_]{1,99}$/;
  return regex.test(key);
}

/**
 * Validates a resource ID format
 */
export function validateResourceId(resourceId: string): boolean {
  // Resource ID should be alphanumeric with hyphens/underscores, 3-200 chars
  const regex = /^[a-zA-Z0-9_-]{3,200}$/;
  return regex.test(resourceId);
}

/**
 * Validates an attribute value based on its type
 */
export function validateAttributeValue(
  value: any,
  expectedType: "string" | "number" | "boolean" | "array" | "object",
): {
  valid: boolean;
  error?: string;
} {
  switch (expectedType) {
    case "string":
      if (typeof value !== "string") {
        return { valid: false, error: "Value must be a string" };
      }
      break;

    case "number":
      if (typeof value !== "number" || isNaN(value)) {
        return { valid: false, error: "Value must be a valid number" };
      }
      break;

    case "boolean":
      if (typeof value !== "boolean") {
        return { valid: false, error: "Value must be a boolean" };
      }
      break;

    case "array":
      if (!Array.isArray(value)) {
        return { valid: false, error: "Value must be an array" };
      }
      break;

    case "object":
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        return { valid: false, error: "Value must be an object" };
      }
      break;

    default:
      return { valid: false, error: `Unknown type: ${expectedType}` };
  }

  return { valid: true };
}

/**
 * Validates a complete attribute value object
 */
export function validateAttributeValueStructure(
  attr: Partial<AttributeValue>,
): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!attr.resourceType) {
    errors.push("resourceType is required");
  }

  if (!attr.resourceId) {
    errors.push("resourceId is required");
  } else if (!validateResourceId(attr.resourceId)) {
    errors.push("resourceId format is invalid");
  }

  if (!attr.attributeKey) {
    errors.push("attributeKey is required");
  } else if (!validateAttributeKey(attr.attributeKey)) {
    errors.push(
      "attributeKey format is invalid (must be camelCase or snake_case)",
    );
  }

  if (attr.attributeValue === undefined) {
    errors.push("attributeValue is required");
  }

  if (!attr.valueType) {
    errors.push("valueType is required");
  } else if (attr.attributeValue !== undefined) {
    const typeValidation = validateAttributeValue(
      attr.attributeValue,
      attr.valueType,
    );
    if (!typeValidation.valid) {
      errors.push(typeValidation.error || "Value type mismatch");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates a tag format
 */
export function validateTag(tag: string): boolean {
  // Tags should be alphanumeric with hyphens/underscores, 3-50 chars
  const regex = /^[a-zA-Z0-9_-]{3,50}$/;
  return regex.test(tag);
}

/**
 * Validates an array of tags
 */
export function validateTags(tags: string[]): {
  valid: boolean;
  invalidTags: string[];
} {
  const invalidTags = tags.filter((tag) => !validateTag(tag));
  return {
    valid: invalidTags.length === 0,
    invalidTags,
  };
}

/**
 * Validates a category format
 */
export function validateCategory(category: string): boolean {
  // Categories should be lowercase alphanumeric with hyphens, 2-50 chars
  const regex = /^[a-z0-9][a-z0-9-]{1,49}$/;
  return regex.test(category);
}

/**
 * Sanitizes a string for safe use (removes potential XSS vectors)
 */
export function sanitizeString(input: string): string {
  return input.replace(/[<>]/g, "").trim().substring(0, 1000); // Limit length
}

/**
 * Validates an email format
 */
export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validates a date string is in ISO 8601 format
 */
export function validateISODate(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    return date.toISOString() === dateString;
  } catch {
    return false;
  }
}

/**
 * Checks if a value is within a numeric range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Validates pagination parameters
 */
export function validatePagination(
  limit?: number,
  offset?: number,
): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (limit !== undefined) {
    if (!Number.isInteger(limit) || limit < 1 || limit > 1000) {
      errors.push("limit must be an integer between 1 and 1000");
    }
  }

  if (offset !== undefined) {
    if (!Number.isInteger(offset) || offset < 0) {
      errors.push("offset must be a non-negative integer");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

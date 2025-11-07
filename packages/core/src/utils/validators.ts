import type { AttributeValue } from '../schemas/attribute';
import type { Condition, Policy, PolicyInput } from '../schemas/policy';

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
 * Validates that a policy has all required fields
 */
export function validatePolicyStructure(policy: Partial<Policy>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!policy.policyId) {
    errors.push('policyId is required');
  } else if (!validatePolicyId(policy.policyId)) {
    errors.push('policyId must be alphanumeric with hyphens/underscores, 3-100 characters');
  }

  if (!policy.version) {
    errors.push('version is required');
  } else if (!validateVersion(policy.version)) {
    errors.push('version must follow semantic versioning (e.g., 1.0.0)');
  }

  if (!policy.effect) {
    errors.push('effect is required');
  } else if (policy.effect !== 'PERMIT' && policy.effect !== 'DENY') {
    errors.push('effect must be either PERMIT or DENY');
  }

  if (!policy.description || policy.description.trim() === '') {
    errors.push('description is required');
  }

  if (!policy.conditions) {
    errors.push('conditions are required');
  }

  if (!policy.category) {
    errors.push('category is required');
  }

  if (!Array.isArray(policy.tags)) {
    errors.push('tags must be an array');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validates a condition structure recursively
 */
export function validateConditionStructure(condition: Condition): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!condition || typeof condition !== 'object') {
    errors.push('Condition must be an object');
    return { valid: false, errors };
  }

  if (!condition.type) {
    errors.push('Condition type is required');
    return { valid: false, errors };
  }

  const logicalOps = ['and', 'or', 'not'];
  const comparisonOps = [
    'equals',
    'notEquals',
    'in',
    'notIn',
    'gte',
    'gt',
    'lte',
    'lt',
    'contains',
    'startsWith',
    'endsWith',
    'matches'
  ];

  const validOps = [...logicalOps, ...comparisonOps];
  if (!validOps.includes(condition.type)) {
    errors.push(`Invalid condition type: ${condition.type}`);
  }

  if (logicalOps.includes(condition.type)) {
    if (!condition.nested || !Array.isArray(condition.nested)) {
      errors.push(`Logical operator ${condition.type} requires nested array`);
    } else if (condition.nested.length === 0) {
      errors.push(`Logical operator ${condition.type} requires at least one nested condition`);
    } else {
      condition.nested.forEach((nested: Condition, index: number) => {
        const result = validateConditionStructure(nested);
        if (!result.valid) {
          result.errors.forEach(err => {
            errors.push(`Nested condition ${index}: ${err}`);
          });
        }
      });
    }
  } else if (comparisonOps.includes(condition.type)) {
    if (condition.left === undefined) {
      errors.push(`Comparison operator ${condition.type} requires left operand`);
    }
    if (condition.right === undefined) {
      errors.push(`Comparison operator ${condition.type} requires right operand`);
    }

    // Validate 'in' and 'notIn' have array as right operand
    if ((condition.type === 'in' || condition.type === 'notIn') && !Array.isArray(condition.right)) {
      errors.push(`Operator ${condition.type} requires right operand to be an array`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
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
  // Resource ID should not be empty and be reasonable length
  return resourceId.length > 0 && resourceId.length <= 255;
}

/**
 * Validates an attribute value based on its type
 */
export function validateAttributeValue(
  value: any,
  expectedType: 'string' | 'number' | 'boolean' | 'array' | 'object'
): {
  valid: boolean;
  error?: string;
} {
  switch (expectedType) {
    case 'string':
      if (typeof value !== 'string') {
        return { valid: false, error: 'Value must be a string' };
      }
      break;

    case 'number':
      if (typeof value !== 'number' || isNaN(value)) {
        return { valid: false, error: 'Value must be a valid number' };
      }
      break;

    case 'boolean':
      if (typeof value !== 'boolean') {
        return { valid: false, error: 'Value must be a boolean' };
      }
      break;

    case 'array':
      if (!Array.isArray(value)) {
        return { valid: false, error: 'Value must be an array' };
      }
      break;

    case 'object':
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return { valid: false, error: 'Value must be an object' };
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
  attr: Partial<AttributeValue>
): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!attr.resourceType) {
    errors.push('resourceType is required');
  }

  if (!attr.resourceId) {
    errors.push('resourceId is required');
  } else if (!validateResourceId(attr.resourceId)) {
    errors.push('resourceId format is invalid');
  }

  if (!attr.attributeKey) {
    errors.push('attributeKey is required');
  } else if (!validateAttributeKey(attr.attributeKey)) {
    errors.push('attributeKey format is invalid (must be camelCase or snake_case)');
  }

  if (attr.attributeValue === undefined) {
    errors.push('attributeValue is required');
  }

  if (!attr.valueType) {
    errors.push('valueType is required');
  } else if (attr.attributeValue !== undefined) {
    const typeValidation = validateAttributeValue(attr.attributeValue, attr.valueType);
    if (!typeValidation.valid) {
      errors.push(typeValidation.error || 'Value type mismatch');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validates a tag format
 */
export function validateTag(tag: string): boolean {
  // Tags should be lowercase alphanumeric with hyphens, 2-50 chars
  const regex = /^[a-z0-9][a-z0-9-]{1,49}$/;
  return regex.test(tag);
}

/**
 * Validates an array of tags
 */
export function validateTags(tags: string[]): {
  valid: boolean;
  invalidTags: string[];
} {
  const invalidTags = tags.filter(tag => !validateTag(tag));
  return {
    valid: invalidTags.length === 0,
    invalidTags
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
 * Checks if a policy input is valid for creation
 */
export function validatePolicyInput(input: PolicyInput): {
  valid: boolean;
  errors: string[];
} {
  const structureValidation = validatePolicyStructure(input);
  if (!structureValidation.valid) {
    return structureValidation;
  }

  const conditionValidation = validateConditionStructure(input.conditions);
  if (!conditionValidation.valid) {
    return {
      valid: false,
      errors: ['Invalid conditions', ...conditionValidation.errors]
    };
  }

  const errors: string[] = [];

  if (!validateCategory(input.category)) {
    errors.push('category must be lowercase alphanumeric with hyphens, 2-50 characters');
  }

  const tagValidation = validateTags(input.tags);
  if (!tagValidation.valid) {
    errors.push(`Invalid tags: ${tagValidation.invalidTags.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Sanitizes a string for safe use (removes potential XSS vectors)
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, 1000); // Limit length
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
  offset?: number
): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (limit !== undefined) {
    if (!Number.isInteger(limit) || limit < 1 || limit > 1000) {
      errors.push('limit must be an integer between 1 and 1000');
    }
  }

  if (offset !== undefined) {
    if (!Number.isInteger(offset) || offset < 0) {
      errors.push('offset must be a non-negative integer');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

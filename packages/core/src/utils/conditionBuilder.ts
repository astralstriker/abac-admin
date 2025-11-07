import type { AttributeRef, Condition, ConditionType } from '../schemas/policy';

/**
 * Utility class for building policy conditions programmatically
 * Provides a fluent API for creating complex condition trees
 */
export class ConditionBuilder {
  /**
   * Creates an equality condition
   */
  static equals(left: any, right: any): Condition {
    return { type: 'equals', left, right };
  }

  /**
   * Creates a not-equals condition
   */
  static notEquals(left: any, right: any): Condition {
    return { type: 'notEquals', left, right };
  }

  /**
   * Creates an 'in' condition (left value is in right array)
   */
  static in(left: any, right: any[]): Condition {
    return { type: 'in', left, right };
  }

  /**
   * Creates a 'not in' condition
   */
  static notIn(left: any, right: any[]): Condition {
    return { type: 'notIn', left, right };
  }

  /**
   * Creates a greater-than-or-equal condition
   */
  static gte(left: any, right: any): Condition {
    return { type: 'gte', left, right };
  }

  /**
   * Creates a greater-than condition
   */
  static gt(left: any, right: any): Condition {
    return { type: 'gt', left, right };
  }

  /**
   * Creates a less-than-or-equal condition
   */
  static lte(left: any, right: any): Condition {
    return { type: 'lte', left, right };
  }

  /**
   * Creates a less-than condition
   */
  static lt(left: any, right: any): Condition {
    return { type: 'lt', left, right };
  }

  /**
   * Creates a contains condition (string/array contains value)
   */
  static contains(left: any, right: any): Condition {
    return { type: 'contains', left, right };
  }

  /**
   * Creates a startsWith condition
   */
  static startsWith(left: any, right: any): Condition {
    return { type: 'startsWith', left, right };
  }

  /**
   * Creates an endsWith condition
   */
  static endsWith(left: any, right: any): Condition {
    return { type: 'endsWith', left, right };
  }

  /**
   * Creates a regex matches condition
   */
  static matches(left: any, pattern: string): Condition {
    return { type: 'matches', left, right: pattern };
  }

  /**
   * Creates an AND condition (all nested conditions must be true)
   */
  static and(...conditions: Condition[]): Condition {
    return { type: 'and', nested: conditions };
  }

  /**
   * Creates an OR condition (at least one nested condition must be true)
   */
  static or(...conditions: Condition[]): Condition {
    return { type: 'or', nested: conditions };
  }

  /**
   * Creates a NOT condition (negates the nested condition)
   */
  static not(condition: Condition): Condition {
    return { type: 'not', nested: [condition] };
  }

  /**
   * Helper to create an attribute reference
   */
  static attr(
    category: 'subject' | 'resource' | 'action' | 'environment',
    key: string
  ): AttributeRef {
    return { category, key };
  }
}

/**
 * Serializes a condition to JSON string
 */
export function serializeCondition(condition: Condition, pretty = false): string {
  return JSON.stringify(condition, null, pretty ? 2 : undefined);
}

/**
 * Deserializes a condition from JSON string
 */
export function deserializeCondition(json: string): Condition {
  return JSON.parse(json) as Condition;
}

/**
 * Validates that a condition has the correct structure
 */
export function validateCondition(condition: Condition): boolean {
  if (!condition || typeof condition !== 'object') {
    return false;
  }

  if (!condition.type) {
    return false;
  }

  const logicalOps: ConditionType[] = ['and', 'or', 'not'];
  const comparisonOps: ConditionType[] = [
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

  if (logicalOps.includes(condition.type)) {
    // Logical operators require nested conditions
    if (!condition.nested || !Array.isArray(condition.nested)) {
      return false;
    }
    return condition.nested.every(validateCondition);
  } else if (comparisonOps.includes(condition.type)) {
    // Comparison operators require left and right (except 'not')
    return condition.left !== undefined && condition.right !== undefined;
  }

  return false;
}

/**
 * Flattens a nested condition tree into an array
 */
export function flattenCondition(condition: Condition): Condition[] {
  const result: Condition[] = [condition];

  if (condition.nested) {
    condition.nested.forEach((nested: Condition) => {
      result.push(...flattenCondition(nested));
    });
  }

  return result;
}

/**
 * Counts the number of conditions in a condition tree
 */
export function countConditions(condition: Condition): number {
  let count = 1;

  if (condition.nested) {
    condition.nested.forEach((nested: Condition) => {
      count += countConditions(nested);
    });
  }

  return count;
}

/**
 * Gets the maximum depth of a condition tree
 */
export function getConditionDepth(condition: Condition): number {
  if (!condition.nested || condition.nested.length === 0) {
    return 1;
  }

  const nestedDepths = condition.nested.map(getConditionDepth);
  return 1 + Math.max(...nestedDepths);
}

/**
 * Simplifies a condition by removing redundant nesting
 */
export function simplifyCondition(condition: Condition): Condition {
  // If it's a logical operator with only one nested condition, return that condition
  if (
    (condition.type === 'and' || condition.type === 'or') &&
    condition.nested?.length === 1
  ) {
    return simplifyCondition(condition.nested[0]);
  }

  // If it's a double negation, remove both
  if (
    condition.type === 'not' &&
    condition.nested?.[0]?.type === 'not'
  ) {
    return simplifyCondition(condition.nested[0].nested![0]);
  }

  // Recursively simplify nested conditions
  if (condition.nested) {
    return {
      ...condition,
      nested: condition.nested.map(simplifyCondition)
    };
  }

  return condition;
}

/**
 * Extracts all attribute references from a condition tree
 */
export function extractAttributeRefs(condition: Condition): AttributeRef[] {
  const refs: AttributeRef[] = [];

  const extractFromValue = (value: any) => {
    if (
      value &&
      typeof value === 'object' &&
      'category' in value &&
      'key' in value
    ) {
      refs.push(value as AttributeRef);
    }
  };

  extractFromValue(condition.left);
  extractFromValue(condition.right);

  if (condition.nested) {
    condition.nested.forEach((nested: Condition) => {
      refs.push(...extractAttributeRefs(nested));
    });
  }

  return refs;
}

/**
 * Converts a condition to a human-readable string
 */
export function conditionToString(condition: Condition, indent = 0): string {
  const spaces = '  '.repeat(indent);

  if (condition.type === 'and') {
    const nested = condition.nested?.map((c: Condition) => conditionToString(c, indent + 1)).join('\n');
    return `${spaces}AND:\n${nested}`;
  }

  if (condition.type === 'or') {
    const nested = condition.nested?.map((c: Condition) => conditionToString(c, indent + 1)).join('\n');
    return `${spaces}OR:\n${nested}`;
  }

  if (condition.type === 'not') {
    const nested = condition.nested?.[0] ? conditionToString(condition.nested[0], indent + 1) : '';
    return `${spaces}NOT:\n${nested}`;
  }

  const leftStr = typeof condition.left === 'object'
    ? `${condition.left.category}.${condition.left.key}`
    : String(condition.left);

  const rightStr = Array.isArray(condition.right)
    ? `[${condition.right.join(', ')}]`
    : String(condition.right);

  return `${spaces}${leftStr} ${condition.type} ${rightStr}`;
}

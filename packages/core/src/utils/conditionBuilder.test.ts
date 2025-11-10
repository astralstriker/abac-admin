import { describe, expect, it } from "vitest";
import type { Condition } from "../schemas/policy";
import {
  ConditionBuilder,
  conditionToString,
  countConditions,
  deserializeCondition,
  extractAttributeRefs,
  flattenCondition,
  getConditionDepth,
  serializeCondition,
  simplifyCondition,
  validateCondition,
} from "./conditionBuilder";

describe("ConditionBuilder", () => {
  describe("comparison operators", () => {
    it("should create equals condition", () => {
      const condition = ConditionBuilder.equals("a", "b");
      expect(condition).toEqual({ type: "equals", left: "a", right: "b" });
    });

    it("should create notEquals condition", () => {
      const condition = ConditionBuilder.notEquals("a", "b");
      expect(condition).toEqual({ type: "notEquals", left: "a", right: "b" });
    });

    it("should create in condition", () => {
      const condition = ConditionBuilder.in("a", ["b", "c"]);
      expect(condition).toEqual({ type: "in", left: "a", right: ["b", "c"] });
    });

    it("should create notIn condition", () => {
      const condition = ConditionBuilder.notIn("a", ["b", "c"]);
      expect(condition).toEqual({
        type: "notIn",
        left: "a",
        right: ["b", "c"],
      });
    });

    it("should create gte condition", () => {
      const condition = ConditionBuilder.gte(5, 10);
      expect(condition).toEqual({ type: "gte", left: 5, right: 10 });
    });

    it("should create gt condition", () => {
      const condition = ConditionBuilder.gt(5, 10);
      expect(condition).toEqual({ type: "gt", left: 5, right: 10 });
    });

    it("should create lte condition", () => {
      const condition = ConditionBuilder.lte(5, 10);
      expect(condition).toEqual({ type: "lte", left: 5, right: 10 });
    });

    it("should create lt condition", () => {
      const condition = ConditionBuilder.lt(5, 10);
      expect(condition).toEqual({ type: "lt", left: 5, right: 10 });
    });

    it("should create contains condition", () => {
      const condition = ConditionBuilder.contains("string", "sub");
      expect(condition).toEqual({
        type: "contains",
        left: "string",
        right: "sub",
      });
    });

    it("should create startsWith condition", () => {
      const condition = ConditionBuilder.startsWith("string", "str");
      expect(condition).toEqual({
        type: "startsWith",
        left: "string",
        right: "str",
      });
    });

    it("should create endsWith condition", () => {
      const condition = ConditionBuilder.endsWith("string", "ing");
      expect(condition).toEqual({
        type: "endsWith",
        left: "string",
        right: "ing",
      });
    });

    it("should create matches condition", () => {
      const condition = ConditionBuilder.matches("string", "^[a-z]+$");
      expect(condition).toEqual({
        type: "matches",
        left: "string",
        right: "^[a-z]+$",
      });
    });
  });

  describe("logical operators", () => {
    it("should create AND condition", () => {
      const c1 = ConditionBuilder.equals("a", "b");
      const c2 = ConditionBuilder.equals("c", "d");
      const condition = ConditionBuilder.and(c1, c2);
      expect(condition).toEqual({
        type: "and",
        nested: [c1, c2],
      });
    });

    it("should create OR condition", () => {
      const c1 = ConditionBuilder.equals("a", "b");
      const c2 = ConditionBuilder.equals("c", "d");
      const condition = ConditionBuilder.or(c1, c2);
      expect(condition).toEqual({
        type: "or",
        nested: [c1, c2],
      });
    });

    it("should create NOT condition", () => {
      const c1 = ConditionBuilder.equals("a", "b");
      const condition = ConditionBuilder.not(c1);
      expect(condition).toEqual({
        type: "not",
        nested: [c1],
      });
    });

    it("should support multiple conditions in AND", () => {
      const c1 = ConditionBuilder.equals("a", "b");
      const c2 = ConditionBuilder.equals("c", "d");
      const c3 = ConditionBuilder.equals("e", "f");
      const condition = ConditionBuilder.and(c1, c2, c3);
      expect(condition.nested).toHaveLength(3);
    });

    it("should support multiple conditions in OR", () => {
      const c1 = ConditionBuilder.equals("a", "b");
      const c2 = ConditionBuilder.equals("c", "d");
      const c3 = ConditionBuilder.equals("e", "f");
      const condition = ConditionBuilder.or(c1, c2, c3);
      expect(condition.nested).toHaveLength(3);
    });
  });

  describe("attr helper", () => {
    it("should create attribute reference for subject", () => {
      const attr = ConditionBuilder.attr("subject", "role");
      expect(attr).toEqual({ category: "subject", key: "role" });
    });

    it("should create attribute reference for resource", () => {
      const attr = ConditionBuilder.attr("resource", "type");
      expect(attr).toEqual({ category: "resource", key: "type" });
    });

    it("should create attribute reference for action", () => {
      const attr = ConditionBuilder.attr("action", "operation");
      expect(attr).toEqual({ category: "action", key: "operation" });
    });

    it("should create attribute reference for environment", () => {
      const attr = ConditionBuilder.attr("environment", "time");
      expect(attr).toEqual({ category: "environment", key: "time" });
    });
  });

  describe("complex conditions", () => {
    it("should build nested AND/OR conditions", () => {
      const condition = ConditionBuilder.and(
        ConditionBuilder.equals("a", "b"),
        ConditionBuilder.or(
          ConditionBuilder.equals("c", "d"),
          ConditionBuilder.equals("e", "f"),
        ),
      );
      expect(condition.type).toBe("and");
      expect(condition.nested).toHaveLength(2);
      expect(condition.nested![1].type).toBe("or");
    });

    it("should build conditions with attribute references", () => {
      const condition = ConditionBuilder.equals(
        ConditionBuilder.attr("subject", "role"),
        "admin",
      );
      expect(condition.left).toEqual({ category: "subject", key: "role" });
      expect(condition.right).toBe("admin");
    });
  });
});

describe("serializeCondition", () => {
  it("should serialize condition to JSON", () => {
    const condition: Condition = { type: "equals", left: "a", right: "b" };
    const result = serializeCondition(condition);
    expect(result).toBe('{"type":"equals","left":"a","right":"b"}');
  });

  it("should serialize with pretty formatting", () => {
    const condition: Condition = { type: "equals", left: "a", right: "b" };
    const result = serializeCondition(condition, true);
    expect(result).toContain("\n");
    expect(result).toContain("  ");
  });

  it("should serialize nested conditions", () => {
    const condition: Condition = {
      type: "and",
      nested: [
        { type: "equals", left: "a", right: "b" },
        { type: "equals", left: "c", right: "d" },
      ],
    };
    const result = serializeCondition(condition);
    expect(result).toContain('"nested"');
  });
});

describe("deserializeCondition", () => {
  it("should deserialize JSON to condition", () => {
    const json = '{"type":"equals","left":"a","right":"b"}';
    const result = deserializeCondition(json);
    expect(result).toEqual({ type: "equals", left: "a", right: "b" });
  });

  it("should deserialize nested conditions", () => {
    const json =
      '{"type":"and","nested":[{"type":"equals","left":"a","right":"b"}]}';
    const result = deserializeCondition(json);
    expect(result.type).toBe("and");
    expect(result.nested).toHaveLength(1);
  });
});

describe("validateCondition", () => {
  it("should validate simple comparison conditions", () => {
    const condition: Condition = { type: "equals", left: "a", right: "b" };
    expect(validateCondition(condition)).toBe(true);
  });

  it("should validate logical AND conditions", () => {
    const condition: Condition = {
      type: "and",
      nested: [
        { type: "equals", left: "a", right: "b" },
        { type: "equals", left: "c", right: "d" },
      ],
    };
    expect(validateCondition(condition)).toBe(true);
  });

  it("should validate logical OR conditions", () => {
    const condition: Condition = {
      type: "or",
      nested: [{ type: "equals", left: "a", right: "b" }],
    };
    expect(validateCondition(condition)).toBe(true);
  });

  it("should validate NOT conditions", () => {
    const condition: Condition = {
      type: "not",
      nested: [{ type: "equals", left: "a", right: "b" }],
    };
    expect(validateCondition(condition)).toBe(true);
  });

  it("should reject non-object conditions", () => {
    expect(validateCondition(null as any)).toBe(false);
    expect(validateCondition("string" as any)).toBe(false);
  });

  it("should reject conditions without type", () => {
    expect(validateCondition({} as any)).toBe(false);
  });

  it("should reject logical operators without nested array", () => {
    const condition = { type: "and" } as any;
    expect(validateCondition(condition)).toBe(false);
  });

  it("should reject comparison operators without operands", () => {
    const condition1 = { type: "equals", left: "a" } as any;
    expect(validateCondition(condition1)).toBe(false);

    const condition2 = { type: "equals", right: "b" } as any;
    expect(validateCondition(condition2)).toBe(false);
  });

  it("should validate nested conditions recursively", () => {
    const condition: Condition = {
      type: "and",
      nested: [
        { type: "equals", left: "a", right: "b" },
        { type: "invalid" } as any,
      ],
    };
    expect(validateCondition(condition)).toBe(false);
  });

  it("should validate deeply nested conditions", () => {
    const condition: Condition = {
      type: "and",
      nested: [
        {
          type: "or",
          nested: [
            { type: "equals", left: "a", right: "b" },
            { type: "equals", left: "c", right: "d" },
          ],
        },
      ],
    };
    expect(validateCondition(condition)).toBe(true);
  });
});

describe("flattenCondition", () => {
  it("should flatten simple condition", () => {
    const condition: Condition = { type: "equals", left: "a", right: "b" };
    const result = flattenCondition(condition);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(condition);
  });

  it("should flatten nested conditions", () => {
    const condition: Condition = {
      type: "and",
      nested: [
        { type: "equals", left: "a", right: "b" },
        { type: "equals", left: "c", right: "d" },
      ],
    };
    const result = flattenCondition(condition);
    expect(result).toHaveLength(3); // parent + 2 children
  });

  it("should flatten deeply nested conditions", () => {
    const condition: Condition = {
      type: "and",
      nested: [
        {
          type: "or",
          nested: [
            { type: "equals", left: "a", right: "b" },
            { type: "equals", left: "c", right: "d" },
          ],
        },
      ],
    };
    const result = flattenCondition(condition);
    expect(result).toHaveLength(4); // and + or + 2 equals
  });
});

describe("countConditions", () => {
  it("should count simple condition", () => {
    const condition: Condition = { type: "equals", left: "a", right: "b" };
    expect(countConditions(condition)).toBe(1);
  });

  it("should count nested conditions", () => {
    const condition: Condition = {
      type: "and",
      nested: [
        { type: "equals", left: "a", right: "b" },
        { type: "equals", left: "c", right: "d" },
      ],
    };
    expect(countConditions(condition)).toBe(3);
  });

  it("should count deeply nested conditions", () => {
    const condition: Condition = {
      type: "and",
      nested: [
        {
          type: "or",
          nested: [
            { type: "equals", left: "a", right: "b" },
            { type: "equals", left: "c", right: "d" },
          ],
        },
        { type: "equals", left: "e", right: "f" },
      ],
    };
    expect(countConditions(condition)).toBe(5);
  });
});

describe("getConditionDepth", () => {
  it("should return 1 for simple condition", () => {
    const condition: Condition = { type: "equals", left: "a", right: "b" };
    expect(getConditionDepth(condition)).toBe(1);
  });

  it("should return 2 for one level nesting", () => {
    const condition: Condition = {
      type: "and",
      nested: [
        { type: "equals", left: "a", right: "b" },
        { type: "equals", left: "c", right: "d" },
      ],
    };
    expect(getConditionDepth(condition)).toBe(2);
  });

  it("should return correct depth for deeply nested conditions", () => {
    const condition: Condition = {
      type: "and",
      nested: [
        {
          type: "or",
          nested: [
            {
              type: "not",
              nested: [{ type: "equals", left: "a", right: "b" }],
            },
          ],
        },
      ],
    };
    expect(getConditionDepth(condition)).toBe(4);
  });

  it("should handle empty nested array", () => {
    const condition: Condition = { type: "and", nested: [] };
    expect(getConditionDepth(condition)).toBe(1);
  });
});

describe("simplifyCondition", () => {
  it("should simplify AND with single condition", () => {
    const condition: Condition = {
      type: "and",
      nested: [{ type: "equals", left: "a", right: "b" }],
    };
    const result = simplifyCondition(condition);
    expect(result.type).toBe("equals");
  });

  it("should simplify OR with single condition", () => {
    const condition: Condition = {
      type: "or",
      nested: [{ type: "equals", left: "a", right: "b" }],
    };
    const result = simplifyCondition(condition);
    expect(result.type).toBe("equals");
  });

  it("should remove double negation", () => {
    const condition: Condition = {
      type: "not",
      nested: [
        {
          type: "not",
          nested: [{ type: "equals", left: "a", right: "b" }],
        },
      ],
    };
    const result = simplifyCondition(condition);
    expect(result.type).toBe("equals");
  });

  it("should not simplify AND/OR with multiple conditions", () => {
    const condition: Condition = {
      type: "and",
      nested: [
        { type: "equals", left: "a", right: "b" },
        { type: "equals", left: "c", right: "d" },
      ],
    };
    const result = simplifyCondition(condition);
    expect(result.type).toBe("and");
    expect(result.nested).toHaveLength(2);
  });

  it("should recursively simplify nested conditions", () => {
    const condition: Condition = {
      type: "and",
      nested: [
        {
          type: "or",
          nested: [{ type: "equals", left: "a", right: "b" }],
        },
        { type: "equals", left: "c", right: "d" },
      ],
    };
    const result = simplifyCondition(condition);
    expect(result.nested![0].type).toBe("equals");
  });

  it("should not modify simple conditions", () => {
    const condition: Condition = { type: "equals", left: "a", right: "b" };
    const result = simplifyCondition(condition);
    expect(result).toEqual(condition);
  });
});

describe("extractAttributeRefs", () => {
  it("should extract attribute refs from left operand", () => {
    const condition: Condition = {
      type: "equals",
      left: { category: "subject", key: "role" },
      right: "admin",
    };
    const result = extractAttributeRefs(condition);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ category: "subject", key: "role" });
  });

  it("should extract attribute refs from right operand", () => {
    const condition: Condition = {
      type: "equals",
      left: "admin",
      right: { category: "subject", key: "role" },
    };
    const result = extractAttributeRefs(condition);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ category: "subject", key: "role" });
  });

  it("should extract attribute refs from both operands", () => {
    const condition: Condition = {
      type: "equals",
      left: { category: "subject", key: "role" },
      right: { category: "resource", key: "owner" },
    };
    const result = extractAttributeRefs(condition);
    expect(result).toHaveLength(2);
  });

  it("should extract attribute refs from nested conditions", () => {
    const condition: Condition = {
      type: "and",
      nested: [
        {
          type: "equals",
          left: { category: "subject", key: "role" },
          right: "admin",
        },
        {
          type: "equals",
          left: { category: "resource", key: "type" },
          right: "document",
        },
      ],
    };
    const result = extractAttributeRefs(condition);
    expect(result).toHaveLength(2);
  });

  it("should return empty array for conditions without attribute refs", () => {
    const condition: Condition = { type: "equals", left: "a", right: "b" };
    const result = extractAttributeRefs(condition);
    expect(result).toHaveLength(0);
  });

  it("should extract from deeply nested conditions", () => {
    const condition: Condition = {
      type: "and",
      nested: [
        {
          type: "or",
          nested: [
            {
              type: "equals",
              left: { category: "subject", key: "role" },
              right: "admin",
            },
            {
              type: "equals",
              left: { category: "subject", key: "department" },
              right: "engineering",
            },
          ],
        },
      ],
    };
    const result = extractAttributeRefs(condition);
    expect(result).toHaveLength(2);
  });
});

describe("conditionToString", () => {
  it("should convert simple condition to string", () => {
    const condition: Condition = { type: "equals", left: "a", right: "b" };
    const result = conditionToString(condition);
    expect(result).toContain("a");
    expect(result).toContain("equals");
    expect(result).toContain("b");
  });

  it("should convert AND condition to string", () => {
    const condition: Condition = {
      type: "and",
      nested: [
        { type: "equals", left: "a", right: "b" },
        { type: "equals", left: "c", right: "d" },
      ],
    };
    const result = conditionToString(condition);
    expect(result).toContain("AND:");
  });

  it("should convert OR condition to string", () => {
    const condition: Condition = {
      type: "or",
      nested: [{ type: "equals", left: "a", right: "b" }],
    };
    const result = conditionToString(condition);
    expect(result).toContain("OR:");
  });

  it("should convert NOT condition to string", () => {
    const condition: Condition = {
      type: "not",
      nested: [{ type: "equals", left: "a", right: "b" }],
    };
    const result = conditionToString(condition);
    expect(result).toContain("NOT:");
  });

  it("should handle empty NOT condition", () => {
    const condition: Condition = {
      type: "not",
      nested: [],
    };
    const result = conditionToString(condition);
    expect(result).toContain("NOT:");
  });

  it("should format attribute references", () => {
    const condition: Condition = {
      type: "equals",
      left: { category: "subject", key: "role" },
      right: "admin",
    };
    const result = conditionToString(condition);
    expect(result).toContain("subject.role");
  });

  it("should format array values", () => {
    const condition: Condition = {
      type: "in",
      left: "value",
      right: ["a", "b", "c"],
    };
    const result = conditionToString(condition);
    expect(result).toContain("[a, b, c]");
  });

  it("should indent nested conditions", () => {
    const condition: Condition = {
      type: "and",
      nested: [{ type: "equals", left: "a", right: "b" }],
    };
    const result = conditionToString(condition, 1);
    expect(result.startsWith("  ")).toBe(true);
  });

  it("should handle deeply nested conditions", () => {
    const condition: Condition = {
      type: "and",
      nested: [
        {
          type: "or",
          nested: [{ type: "equals", left: "a", right: "b" }],
        },
      ],
    };
    const result = conditionToString(condition);
    expect(result).toContain("AND:");
    expect(result).toContain("OR:");
  });
});

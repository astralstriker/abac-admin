import { describe, expect, it } from "vitest";
import type { AttributeValue } from "../schemas/attribute";
import type { Condition, Policy, PolicyInput } from "../schemas/policy";
import {
  isInRange,
  sanitizeString,
  validateAttributeKey,
  validateAttributeValue,
  validateAttributeValueStructure,
  validateCategory,
  validateConditionStructure,
  validateEmail,
  validateISODate,
  validatePagination,
  validatePolicyId,
  validatePolicyInput,
  validatePolicyStructure,
  validateResourceId,
  validateTag,
  validateTags,
  validateVersion,
} from "./validators";

describe("validatePolicyId", () => {
  it("should accept valid policy IDs", () => {
    expect(validatePolicyId("valid-policy")).toBe(true);
    expect(validatePolicyId("policy_123")).toBe(true);
    expect(validatePolicyId("ABC-123_xyz")).toBe(true);
    expect(validatePolicyId("a".repeat(100))).toBe(true);
  });

  it("should reject invalid policy IDs", () => {
    expect(validatePolicyId("ab")).toBe(false); // too short
    expect(validatePolicyId("a".repeat(101))).toBe(false); // too long
    expect(validatePolicyId("invalid policy")).toBe(false); // space
    expect(validatePolicyId("invalid@policy")).toBe(false); // special char
    expect(validatePolicyId("")).toBe(false); // empty
  });
});

describe("validateVersion", () => {
  it("should accept valid semantic versions", () => {
    expect(validateVersion("1.0.0")).toBe(true);
    expect(validateVersion("0.0.1")).toBe(true);
    expect(validateVersion("10.20.30")).toBe(true);
    expect(validateVersion("999.999.999")).toBe(true);
  });

  it("should reject invalid versions", () => {
    expect(validateVersion("1.0")).toBe(false);
    expect(validateVersion("1")).toBe(false);
    expect(validateVersion("1.0.0-alpha")).toBe(false);
    expect(validateVersion("v1.0.0")).toBe(false);
    expect(validateVersion("a.b.c")).toBe(false);
    expect(validateVersion("")).toBe(false);
  });
});

describe("validatePolicyStructure", () => {
  const validPolicy: Policy = {
    id: "test-id",
    policyId: "test-policy",
    version: "1.0.0",
    effect: "PERMIT",
    description: "Test policy",
    conditions: { type: "equals", left: "a", right: "b" },
    isActive: true,
    category: "test",
    tags: ["tag1"],
    createdBy: "user-1",
    createdAt: new Date().toISOString(),
    updatedBy: null,
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    deletedBy: null,
  };

  it("should accept valid policy structure", () => {
    const result = validatePolicyStructure(validPolicy);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("should reject missing policyId", () => {
    const policy = { ...validPolicy };
    delete (policy as any).policyId;
    const result = validatePolicyStructure(policy);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("policyId is required");
  });

  it("should reject invalid policyId format", () => {
    const policy = { ...validPolicy, policyId: "ab" };
    const result = validatePolicyStructure(policy);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("policyId"))).toBe(true);
  });

  it("should reject missing version", () => {
    const policy = { ...validPolicy };
    delete (policy as any).version;
    const result = validatePolicyStructure(policy);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("version is required");
  });

  it("should reject invalid version format", () => {
    const policy = { ...validPolicy, version: "1.0" };
    const result = validatePolicyStructure(policy);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("semantic versioning"))).toBe(
      true,
    );
  });

  it("should reject missing effect", () => {
    const policy = { ...validPolicy };
    delete (policy as any).effect;
    const result = validatePolicyStructure(policy);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("effect is required");
  });

  it("should reject invalid effect", () => {
    const policy = { ...validPolicy, effect: "INVALID" as any };
    const result = validatePolicyStructure(policy);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("effect must be either PERMIT or DENY");
  });

  it("should reject missing description", () => {
    const policy = { ...validPolicy };
    delete (policy as any).description;
    const result = validatePolicyStructure(policy);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("description is required");
  });

  it("should reject empty description", () => {
    const policy = { ...validPolicy, description: "   " };
    const result = validatePolicyStructure(policy);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("description is required");
  });

  it("should reject missing conditions", () => {
    const policy = { ...validPolicy };
    delete (policy as any).conditions;
    const result = validatePolicyStructure(policy);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("conditions are required");
  });

  it("should reject missing category", () => {
    const policy = { ...validPolicy };
    delete (policy as any).category;
    const result = validatePolicyStructure(policy);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("category is required");
  });

  it("should reject non-array tags", () => {
    const policy = { ...validPolicy, tags: "not-array" as any };
    const result = validatePolicyStructure(policy);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("tags must be an array");
  });
});

describe("validateConditionStructure", () => {
  it("should accept valid comparison conditions", () => {
    const condition: Condition = { type: "equals", left: "a", right: "b" };
    const result = validateConditionStructure(condition);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("should accept valid logical AND conditions", () => {
    const condition: Condition = {
      type: "and",
      nested: [
        { type: "equals", left: "a", right: "b" },
        { type: "equals", left: "c", right: "d" },
      ],
    };
    const result = validateConditionStructure(condition);
    expect(result.valid).toBe(true);
  });

  it("should accept valid logical OR conditions", () => {
    const condition: Condition = {
      type: "or",
      nested: [
        { type: "equals", left: "a", right: "b" },
        { type: "equals", left: "c", right: "d" },
      ],
    };
    const result = validateConditionStructure(condition);
    expect(result.valid).toBe(true);
  });

  it("should accept valid NOT conditions", () => {
    const condition: Condition = {
      type: "not",
      nested: [{ type: "equals", left: "a", right: "b" }],
    };
    const result = validateConditionStructure(condition);
    expect(result.valid).toBe(true);
  });

  it("should reject non-object conditions", () => {
    const result = validateConditionStructure(null as any);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Condition must be an object");
  });

  it("should reject conditions without type", () => {
    const condition = { left: "a", right: "b" } as any;
    const result = validateConditionStructure(condition);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Condition type is required");
  });

  it("should reject invalid condition type", () => {
    const condition = { type: "invalid", left: "a", right: "b" } as any;
    const result = validateConditionStructure(condition);
    expect(result.valid).toBe(false);
    expect(
      result.errors.some((e) => e.includes("Invalid condition type")),
    ).toBe(true);
  });

  it("should reject logical operators without nested array", () => {
    const condition = { type: "and" } as any;
    const result = validateConditionStructure(condition);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("requires nested array"))).toBe(
      true,
    );
  });

  it("should reject logical operators with empty nested array", () => {
    const condition: Condition = { type: "and", nested: [] };
    const result = validateConditionStructure(condition);
    expect(result.valid).toBe(false);
    expect(
      result.errors.some((e) => e.includes("at least one nested condition")),
    ).toBe(true);
  });

  it("should reject comparison operators without left operand", () => {
    const condition = { type: "equals", right: "b" } as any;
    const result = validateConditionStructure(condition);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("requires left operand"))).toBe(
      true,
    );
  });

  it("should reject comparison operators without right operand", () => {
    const condition = { type: "equals", left: "a" } as any;
    const result = validateConditionStructure(condition);
    expect(result.valid).toBe(false);
    expect(
      result.errors.some((e) => e.includes("requires right operand")),
    ).toBe(true);
  });

  it('should reject "in" operator with non-array right operand', () => {
    const condition: Condition = { type: "in", left: "a", right: "b" as any };
    const result = validateConditionStructure(condition);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("array"))).toBe(true);
  });

  it("should validate nested conditions recursively", () => {
    const condition: Condition = {
      type: "and",
      nested: [
        { type: "equals", left: "a", right: "b" },
        { type: "invalid" } as any,
      ],
    };
    const result = validateConditionStructure(condition);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("Nested condition"))).toBe(
      true,
    );
  });
});

describe("validateAttributeKey", () => {
  it("should accept valid attribute keys", () => {
    expect(validateAttributeKey("validKey")).toBe(true);
    expect(validateAttributeKey("valid_key")).toBe(true);
    expect(validateAttributeKey("validKey123")).toBe(true);
    expect(validateAttributeKey("a1")).toBe(true);
  });

  it("should reject invalid attribute keys", () => {
    expect(validateAttributeKey("1invalid")).toBe(false); // starts with number
    expect(validateAttributeKey("_invalid")).toBe(false); // starts with underscore
    expect(validateAttributeKey("a")).toBe(false); // too short
    expect(validateAttributeKey("a".repeat(101))).toBe(false); // too long
    expect(validateAttributeKey("invalid-key")).toBe(false); // hyphen
    expect(validateAttributeKey("invalid key")).toBe(false); // space
    expect(validateAttributeKey("")).toBe(false); // empty
  });
});

describe("validateResourceId", () => {
  it("should accept valid resource IDs", () => {
    expect(validateResourceId("a")).toBe(true);
    expect(validateResourceId("resource-123")).toBe(true);
    expect(validateResourceId("a".repeat(255))).toBe(true);
  });

  it("should reject invalid resource IDs", () => {
    expect(validateResourceId("")).toBe(false); // empty
    expect(validateResourceId("a".repeat(256))).toBe(false); // too long
  });
});

describe("validateAttributeValue", () => {
  it("should validate string values", () => {
    expect(validateAttributeValue("test", "string").valid).toBe(true);
    expect(validateAttributeValue(123, "string").valid).toBe(false);
  });

  it("should validate number values", () => {
    expect(validateAttributeValue(123, "number").valid).toBe(true);
    expect(validateAttributeValue(123.45, "number").valid).toBe(true);
    expect(validateAttributeValue("123", "number").valid).toBe(false);
    expect(validateAttributeValue(NaN, "number").valid).toBe(false);
  });

  it("should validate boolean values", () => {
    expect(validateAttributeValue(true, "boolean").valid).toBe(true);
    expect(validateAttributeValue(false, "boolean").valid).toBe(true);
    expect(validateAttributeValue("true", "boolean").valid).toBe(false);
  });

  it("should validate array values", () => {
    expect(validateAttributeValue([], "array").valid).toBe(true);
    expect(validateAttributeValue([1, 2, 3], "array").valid).toBe(true);
    expect(validateAttributeValue("[]", "array").valid).toBe(false);
  });

  it("should validate object values", () => {
    expect(validateAttributeValue({}, "object").valid).toBe(true);
    expect(validateAttributeValue({ key: "value" }, "object").valid).toBe(true);
    expect(validateAttributeValue(null, "object").valid).toBe(false);
    expect(validateAttributeValue([], "object").valid).toBe(false);
  });

  it("should reject unknown types", () => {
    const result = validateAttributeValue("test", "unknown" as any);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("Unknown type");
  });
});

describe("validateAttributeValueStructure", () => {
  const validAttribute: AttributeValue = {
    id: "attr-1",
    resourceType: "user",
    resourceId: "user-123",
    attributeKey: "role",
    attributeValue: "admin",
    valueType: "string",
    updatedBy: "user-1",
    updatedAt: new Date().toISOString(),
  };

  it("should accept valid attribute value structure", () => {
    const result = validateAttributeValueStructure(validAttribute);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("should reject missing resourceType", () => {
    const attr = { ...validAttribute };
    delete (attr as any).resourceType;
    const result = validateAttributeValueStructure(attr);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("resourceType is required");
  });

  it("should reject missing resourceId", () => {
    const attr = { ...validAttribute };
    delete (attr as any).resourceId;
    const result = validateAttributeValueStructure(attr);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("resourceId is required");
  });

  it("should reject invalid resourceId format", () => {
    const attr = { ...validAttribute, resourceId: "a".repeat(300) }; // too long (>255)
    const result = validateAttributeValueStructure(attr);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("resourceId format is invalid");
  });

  it("should reject empty resourceId", () => {
    const attr = { ...validAttribute, resourceId: "" };
    const result = validateAttributeValueStructure(attr);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("resourceId"))).toBe(true);
  });

  it("should reject missing attributeKey", () => {
    const attr = { ...validAttribute };
    delete (attr as any).attributeKey;
    const result = validateAttributeValueStructure(attr);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("attributeKey is required");
  });

  it("should reject invalid attributeKey format", () => {
    const attr = { ...validAttribute, attributeKey: "invalid-key" };
    const result = validateAttributeValueStructure(attr);
    expect(result.valid).toBe(false);
    expect(
      result.errors.some((e) => e.includes("camelCase or snake_case")),
    ).toBe(true);
  });

  it("should reject attributeKey with dashes", () => {
    const attr = { ...validAttribute, attributeKey: "my-invalid-key" };
    const result = validateAttributeValueStructure(attr);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "attributeKey format is invalid (must be camelCase or snake_case)",
    );
  });

  it("should reject attributeKey with special characters", () => {
    const attr = { ...validAttribute, attributeKey: "key@value" };
    const result = validateAttributeValueStructure(attr);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "attributeKey format is invalid (must be camelCase or snake_case)",
    );
  });

  it("should reject attributeKey starting with number", () => {
    const attr = { ...validAttribute, attributeKey: "123key" };
    const result = validateAttributeValueStructure(attr);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "attributeKey format is invalid (must be camelCase or snake_case)",
    );
  });

  it("should reject attributeKey with spaces", () => {
    const attr = { ...validAttribute, attributeKey: "key with spaces" };
    const result = validateAttributeValueStructure(attr);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "attributeKey format is invalid (must be camelCase or snake_case)",
    );
  });

  it("should reject missing attributeValue", () => {
    const attr = { ...validAttribute };
    delete (attr as any).attributeValue;
    const result = validateAttributeValueStructure(attr);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("attributeValue is required");
  });

  it("should reject missing valueType", () => {
    const attr = { ...validAttribute };
    delete (attr as any).valueType;
    const result = validateAttributeValueStructure(attr);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("valueType is required");
  });

  it("should reject mismatched value and valueType", () => {
    const attr = {
      ...validAttribute,
      attributeValue: 123,
      valueType: "string" as any,
    };
    const result = validateAttributeValueStructure(attr);
    expect(result.valid).toBe(false);
    expect(
      result.errors.some(
        (e) =>
          e.includes("Value type mismatch") || e.includes("must be a string"),
      ),
    ).toBe(true);
  });
});

describe("validateTag", () => {
  it("should accept valid tags", () => {
    expect(validateTag("valid")).toBe(true);
    expect(validateTag("valid-tag")).toBe(true);
    expect(validateTag("tag123")).toBe(true);
    expect(validateTag("a1")).toBe(true);
  });

  it("should reject invalid tags", () => {
    expect(validateTag("A")).toBe(false); // uppercase
    expect(validateTag("Invalid")).toBe(false); // uppercase
    expect(validateTag("invalid_tag")).toBe(false); // underscore
    expect(validateTag("a")).toBe(false); // too short
    expect(validateTag("a".repeat(51))).toBe(false); // too long
    expect(validateTag("-invalid")).toBe(false); // starts with hyphen
    expect(validateTag("")).toBe(false); // empty
  });
});

describe("validateTags", () => {
  it("should accept valid tag arrays", () => {
    const result = validateTags(["tag1", "tag2", "tag3"]);
    expect(result.valid).toBe(true);
    expect(result.invalidTags).toHaveLength(0);
  });

  it("should reject invalid tags in array", () => {
    const result = validateTags([
      "valid",
      "Invalid",
      "another-valid",
      "UPPERCASE",
    ]);
    expect(result.valid).toBe(false);
    expect(result.invalidTags).toEqual(["Invalid", "UPPERCASE"]);
  });

  it("should handle empty array", () => {
    const result = validateTags([]);
    expect(result.valid).toBe(true);
    expect(result.invalidTags).toHaveLength(0);
  });
});

describe("validateCategory", () => {
  it("should accept valid categories", () => {
    expect(validateCategory("valid")).toBe(true);
    expect(validateCategory("valid-category")).toBe(true);
    expect(validateCategory("category123")).toBe(true);
  });

  it("should reject invalid categories", () => {
    expect(validateCategory("Invalid")).toBe(false); // uppercase
    expect(validateCategory("a")).toBe(false); // too short
    expect(validateCategory("a".repeat(51))).toBe(false); // too long
    expect(validateCategory("")).toBe(false); // empty
  });
});

describe("validatePolicyInput", () => {
  const validInput: PolicyInput = {
    policyId: "test-policy",
    version: "1.0.0",
    effect: "PERMIT",
    description: "Test policy",
    conditions: { type: "equals", left: "a", right: "b" },
    isActive: true,
    category: "test",
    tags: ["tag1"],
    createdBy: "user-1",
    updatedBy: null,
  };

  it("should accept valid policy input", () => {
    const result = validatePolicyInput(validInput);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("should reject invalid structure", () => {
    const input = { ...validInput };
    delete (input as any).policyId;
    const result = validatePolicyInput(input);
    expect(result.valid).toBe(false);
  });

  it("should reject invalid conditions", () => {
    const input = { ...validInput, conditions: { type: "invalid" } as any };
    const result = validatePolicyInput(input);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("conditions"))).toBe(true);
  });

  it("should reject invalid category", () => {
    const input = { ...validInput, category: "Invalid-Category" };
    const result = validatePolicyInput(input);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("category"))).toBe(true);
  });

  it("should reject invalid tags", () => {
    const input = { ...validInput, tags: ["valid", "Invalid"] };
    const result = validatePolicyInput(input);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("Invalid tags"))).toBe(true);
  });
});

describe("sanitizeString", () => {
  it("should remove angle brackets", () => {
    expect(sanitizeString('<script>alert("xss")</script>')).toBe(
      'scriptalert("xss")/script',
    );
    expect(sanitizeString("test <> test")).toBe("test  test");
  });

  it("should trim whitespace", () => {
    expect(sanitizeString("  test  ")).toBe("test");
    expect(sanitizeString("\n\ttest\n\t")).toBe("test");
  });

  it("should limit length to 1000 characters", () => {
    const longString = "a".repeat(1500);
    const result = sanitizeString(longString);
    expect(result.length).toBe(1000);
  });

  it("should handle empty strings", () => {
    expect(sanitizeString("")).toBe("");
    expect(sanitizeString("   ")).toBe("");
  });
});

describe("validateEmail", () => {
  it("should accept valid emails", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("user.name@example.co.uk")).toBe(true);
    expect(validateEmail("user+tag@example.com")).toBe(true);
  });

  it("should reject invalid emails", () => {
    expect(validateEmail("invalid")).toBe(false);
    expect(validateEmail("invalid@")).toBe(false);
    expect(validateEmail("@example.com")).toBe(false);
    expect(validateEmail("invalid@example")).toBe(false);
    expect(validateEmail("invalid @example.com")).toBe(false);
    expect(validateEmail("")).toBe(false);
  });
});

describe("validateISODate", () => {
  it("should accept valid ISO 8601 dates", () => {
    const date = new Date();
    expect(validateISODate(date.toISOString())).toBe(true);
    expect(validateISODate("2024-01-01T00:00:00.000Z")).toBe(true);
  });

  it("should reject invalid ISO dates", () => {
    expect(validateISODate("2024-01-01")).toBe(false);
    expect(validateISODate("2024-01-01 00:00:00")).toBe(false);
    expect(validateISODate("invalid")).toBe(false);
    expect(validateISODate("")).toBe(false);
  });
});

describe("isInRange", () => {
  it("should return true for values within range", () => {
    expect(isInRange(5, 0, 10)).toBe(true);
    expect(isInRange(0, 0, 10)).toBe(true);
    expect(isInRange(10, 0, 10)).toBe(true);
  });

  it("should return false for values outside range", () => {
    expect(isInRange(-1, 0, 10)).toBe(false);
    expect(isInRange(11, 0, 10)).toBe(false);
  });
});

describe("validatePagination", () => {
  it("should accept valid pagination parameters", () => {
    expect(validatePagination(10, 0).valid).toBe(true);
    expect(validatePagination(100, 50).valid).toBe(true);
    expect(validatePagination(1, 0).valid).toBe(true);
    expect(validatePagination(1000, 0).valid).toBe(true);
  });

  it("should accept undefined parameters", () => {
    expect(validatePagination(undefined, undefined).valid).toBe(true);
    expect(validatePagination(10, undefined).valid).toBe(true);
    expect(validatePagination(undefined, 0).valid).toBe(true);
  });

  it("should reject invalid limit", () => {
    expect(validatePagination(0, 0).valid).toBe(false);
    expect(validatePagination(-1, 0).valid).toBe(false);
    expect(validatePagination(1001, 0).valid).toBe(false);
    expect(validatePagination(10.5, 0).valid).toBe(false);
  });

  it("should reject invalid offset", () => {
    expect(validatePagination(10, -1).valid).toBe(false);
    expect(validatePagination(10, 10.5).valid).toBe(false);
  });

  it("should return appropriate error messages", () => {
    const result = validatePagination(0, -1);
    expect(result.errors).toContain(
      "limit must be an integer between 1 and 1000",
    );
    expect(result.errors).toContain("offset must be a non-negative integer");
  });
});

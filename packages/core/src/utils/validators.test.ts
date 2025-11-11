import type { Effect, ABACPolicy as Policy } from "abac-engine";
import { ComparisonOperator } from "abac-engine";
import { describe, expect, it } from "vitest";
import type { AttributeValue } from "../schemas/attribute";
import {
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
    version: "1.0.0",
    effect: "Permit" as Effect,
    description: "Test policy",
    condition: {
      operator: ComparisonOperator.Equals,
      left: { category: "subject", attributeId: "role" },
      right: "admin",
    },
    priority: 100,
    metadata: {
      createdBy: "user-1",
      createdAt: new Date(),
      tags: ["tag1"],
    },
  };

  it("should accept valid policy structure", () => {
    const result = validatePolicyStructure(validPolicy);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("should reject missing id", () => {
    const policy = { ...validPolicy };
    delete (policy as any).id;
    const result = validatePolicyStructure(policy);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("should reject invalid effect", () => {
    const policy = { ...validPolicy, effect: "INVALID" as any };
    const result = validatePolicyStructure(policy);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});

describe("validateAttributeKey", () => {
  it("should accept valid attribute keys", () => {
    expect(validateAttributeKey("userId")).toBe(true);
    expect(validateAttributeKey("user_id")).toBe(true);
    expect(validateAttributeKey("createdAt")).toBe(true);
    expect(validateAttributeKey("isActive")).toBe(true);
  });

  it("should reject invalid attribute keys", () => {
    expect(validateAttributeKey("User-Id")).toBe(false); // kebab-case
    expect(validateAttributeKey("user id")).toBe(false); // space
    expect(validateAttributeKey("user@id")).toBe(false); // special char
    expect(validateAttributeKey("123user")).toBe(false); // starts with number
    expect(validateAttributeKey("")).toBe(false); // empty
  });
});

describe("validateResourceId", () => {
  it("should accept valid resource IDs", () => {
    expect(validateResourceId("user-123")).toBe(true);
    expect(validateResourceId("doc_456")).toBe(true);
    expect(validateResourceId("UUID-1234-5678")).toBe(true);
  });

  it("should reject invalid resource IDs", () => {
    expect(validateResourceId("ab")).toBe(false); // too short
    expect(validateResourceId("a".repeat(201))).toBe(false); // too long
    expect(validateResourceId("invalid resource")).toBe(false); // space
    expect(validateResourceId("")).toBe(false); // empty
  });
});

describe("validateAttributeValue", () => {
  it("should accept valid string values", () => {
    const result = validateAttributeValue("test", "string");
    expect(result.valid).toBe(true);
  });

  it("should reject non-string when string expected", () => {
    const result = validateAttributeValue(123, "string");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Value must be a string");
  });

  it("should accept valid number values", () => {
    const result = validateAttributeValue(42, "number");
    expect(result.valid).toBe(true);
  });

  it("should reject non-number when number expected", () => {
    const result = validateAttributeValue("42", "number");
    expect(result.valid).toBe(false);
  });

  it("should accept valid boolean values", () => {
    const result = validateAttributeValue(true, "boolean");
    expect(result.valid).toBe(true);
  });

  it("should accept valid array values", () => {
    const result = validateAttributeValue([1, 2, 3], "array");
    expect(result.valid).toBe(true);
  });

  it("should accept valid object values", () => {
    const result = validateAttributeValue({ key: "value" }, "object");
    expect(result.valid).toBe(true);
  });

  it("should reject null as object", () => {
    const result = validateAttributeValue(null, "object");
    expect(result.valid).toBe(false);
  });
});

describe("validateAttributeValueStructure", () => {
  const validAttribute: Partial<AttributeValue> = {
    resourceType: "user",
    resourceId: "user-123",
    attributeKey: "role",
    attributeValue: "admin",
    valueType: "string",
  };

  it("should accept valid attribute structure", () => {
    const result = validateAttributeValueStructure(validAttribute);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("should reject missing resourceType", () => {
    const attr = { ...validAttribute };
    delete attr.resourceType;
    const result = validateAttributeValueStructure(attr);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("resourceType is required");
  });

  it("should reject missing resourceId", () => {
    const attr = { ...validAttribute };
    delete attr.resourceId;
    const result = validateAttributeValueStructure(attr);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("resourceId is required");
  });

  it("should reject invalid attributeKey", () => {
    const attr = { ...validAttribute, attributeKey: "invalid-key" };
    const result = validateAttributeValueStructure(attr);
    expect(result.valid).toBe(false);
    expect(
      result.errors.some((e) => e.includes("attributeKey format is invalid")),
    ).toBe(true);
  });

  it("should reject value type mismatch", () => {
    const attr = {
      ...validAttribute,
      attributeValue: 123,
      valueType: "string" as const,
    };
    const result = validateAttributeValueStructure(attr);
    expect(result.valid).toBe(false);
  });
});

describe("validateTag", () => {
  it("should accept valid tags", () => {
    expect(validateTag("valid-tag")).toBe(true);
    expect(validateTag("tag_123")).toBe(true);
    expect(validateTag("CamelCaseTag")).toBe(true);
  });

  it("should reject invalid tags", () => {
    expect(validateTag("invalid tag")).toBe(false); // space
    expect(validateTag("tag@special")).toBe(false); // special char
    expect(validateTag("ab")).toBe(false); // too short
    expect(validateTag("a".repeat(51))).toBe(false); // too long
  });
});

describe("validateTags", () => {
  it("should accept valid tag arrays", () => {
    const result = validateTags(["tag1", "tag2", "tag3"]);
    expect(result.valid).toBe(true);
    expect(result.invalidTags).toHaveLength(0);
  });

  it("should reject arrays with invalid tags", () => {
    const result = validateTags(["valid-tag", "invalid tag", "another@bad"]);
    expect(result.valid).toBe(false);
    expect(result.invalidTags).toEqual(["invalid tag", "another@bad"]);
  });
});

describe("validateCategory", () => {
  it("should accept valid categories", () => {
    expect(validateCategory("document")).toBe(true);
    expect(validateCategory("user-profile")).toBe(true);
    expect(validateCategory("access-control")).toBe(true);
  });

  it("should reject invalid categories", () => {
    expect(validateCategory("A")).toBe(false); // too short
    expect(validateCategory("UPPERCASE")).toBe(false); // uppercase
    expect(validateCategory("invalid_category")).toBe(false); // underscore
    expect(validateCategory("a".repeat(51))).toBe(false); // too long
  });
});

describe("sanitizeString", () => {
  it("should remove angle brackets", () => {
    expect(sanitizeString("<script>alert('xss')</script>")).toBe(
      "scriptalert('xss')/script",
    );
    expect(sanitizeString("Hello <b>World</b>")).toBe("Hello bWorld/b");
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
});

describe("isInRange", () => {
  it("should check if number is in range", () => {
    expect(isInRange(5, 1, 10)).toBe(true);
    expect(isInRange(1, 1, 10)).toBe(true);
    expect(isInRange(10, 1, 10)).toBe(true);
    expect(isInRange(0, 1, 10)).toBe(false);
    expect(isInRange(11, 1, 10)).toBe(false);
  });
});

describe("validateEmail", () => {
  it("should accept valid emails", () => {
    expect(validateEmail("user@example.com")).toBe(true);
    expect(validateEmail("test.user@example.co.uk")).toBe(true);
    expect(validateEmail("user+tag@example.com")).toBe(true);
  });

  it("should reject invalid emails", () => {
    expect(validateEmail("invalid")).toBe(false);
    expect(validateEmail("@example.com")).toBe(false);
    expect(validateEmail("user@")).toBe(false);
    expect(validateEmail("user @example.com")).toBe(false);
  });
});

describe("validateISODate", () => {
  it("should accept valid ISO date strings", () => {
    expect(validateISODate("2024-01-01T00:00:00.000Z")).toBe(true);
    expect(validateISODate("2024-12-31T23:59:59.999Z")).toBe(true);
  });

  it("should reject invalid date strings", () => {
    expect(validateISODate("2024-01-01")).toBe(false);
    expect(validateISODate("not-a-date")).toBe(false);
    expect(validateISODate("2024-13-01T00:00:00.000Z")).toBe(false);
  });
});

describe("validatePagination", () => {
  it("should accept valid pagination params", () => {
    const result = validatePagination(50, 0);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("should reject limit out of range", () => {
    const result1 = validatePagination(0, 0);
    expect(result1.valid).toBe(false);
    expect(result1.errors).toContain(
      "limit must be an integer between 1 and 1000",
    );

    const result2 = validatePagination(1001, 0);
    expect(result2.valid).toBe(false);
  });

  it("should reject negative offset", () => {
    const result = validatePagination(50, -1);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("offset must be a non-negative integer");
  });

  it("should accept undefined params", () => {
    const result = validatePagination();
    expect(result.valid).toBe(true);
  });
});

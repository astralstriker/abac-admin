import type { Condition, Effect, ABACPolicy as Policy } from "abac-engine";
import { describe, expect, it } from "vitest";
import type { AuditLogEntry } from "../schemas/audit";
import {
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
} from "./formatters";

describe("formatDate", () => {
  it("should format date with time by default", () => {
    const date = "2024-01-15T10:30:00.000Z";
    const result = formatDate(date);
    expect(result).toContain("Jan");
    expect(result).toContain("15");
    expect(result).toContain("2024");
  });

  it("should format date without time when includeTime is false", () => {
    const date = "2024-01-15T10:30:00.000Z";
    const result = formatDate(date, false);
    expect(result).toContain("Jan");
    expect(result).toContain("15");
    expect(result).toContain("2024");
  });

  it("should return Invalid Date on invalid date", () => {
    const invalidDate = "invalid-date";
    const result = formatDate(invalidDate);
    expect(result).toBe("Invalid Date");
  });

  it("should handle date parsing errors gracefully", () => {
    const result = formatDate("not-a-date", false);
    expect(result).toBe("Invalid Date");
  });

  it("should handle exceptions in date formatting", () => {
    const mockDate = {
      toString: () => "Mock Date",
      toLocaleString: () => {
        throw new Error("Locale error");
      },
      toLocaleDateString: () => {
        throw new Error("Locale error");
      },
    };

    const originalDate = global.Date;
    global.Date = function (dateString: any) {
      if (dateString === "trigger-error") {
        return mockDate as any;
      }
      return new originalDate(dateString);
    } as any;

    const result = formatDate("trigger-error");
    expect(result).toBe("trigger-error");

    global.Date = originalDate;
  });
});

describe("formatRelativeTime", () => {
  it('should return "just now" for recent dates', () => {
    const now = new Date();
    const date = new Date(now.getTime() - 30000);
    expect(formatRelativeTime(date.toISOString())).toBe("just now");
  });

  it("should return minutes for dates within an hour", () => {
    const now = new Date();
    const date = new Date(now.getTime() - 5 * 60000);
    expect(formatRelativeTime(date.toISOString())).toBe("5 minutes ago");
  });

  it("should return singular minute", () => {
    const now = new Date();
    const date = new Date(now.getTime() - 60000);
    expect(formatRelativeTime(date.toISOString())).toBe("1 minute ago");
  });

  it("should return hours for dates within a day", () => {
    const now = new Date();
    const date = new Date(now.getTime() - 5 * 3600000);
    expect(formatRelativeTime(date.toISOString())).toBe("5 hours ago");
  });

  it("should return singular hour", () => {
    const now = new Date();
    const date = new Date(now.getTime() - 3600000);
    expect(formatRelativeTime(date.toISOString())).toBe("1 hour ago");
  });

  it("should return days for dates within 30 days", () => {
    const now = new Date();
    const date = new Date(now.getTime() - 5 * 86400000);
    expect(formatRelativeTime(date.toISOString())).toBe("5 days ago");
  });

  it("should return singular day", () => {
    const now = new Date();
    const date = new Date(now.getTime() - 86400000);
    expect(formatRelativeTime(date.toISOString())).toBe("1 day ago");
  });

  it("should return formatted date for dates older than 30 days", () => {
    const now = new Date();
    const date = new Date(now.getTime() - 31 * 86400000);
    const result = formatRelativeTime(date.toISOString());
    expect(result).not.toContain("ago");
  });

  it("should return Invalid Date on invalid date", () => {
    const result = formatRelativeTime("invalid-date");
    expect(result).toBe("Invalid Date");
  });

  it("should handle relative time parsing errors", () => {
    const result = formatRelativeTime("completely-invalid");
    expect(result).toBe("Invalid Date");
  });

  it("should handle exceptions in relative time formatting", () => {
    const mockDate = {
      toString: () => "Mock Date",
      getTime: () => {
        throw new Error("getTime error");
      },
    };

    const originalDate = global.Date;
    global.Date = function (dateString: any) {
      if (dateString === "trigger-relative-error") {
        return mockDate as any;
      }
      return new originalDate(dateString);
    } as any;

    const result = formatRelativeTime("trigger-relative-error");
    expect(result).toBe("trigger-relative-error");

    global.Date = originalDate;
  });
});

describe("formatPolicyEffect", () => {
  it("should format Permit as Allow", () => {
    expect(formatPolicyEffect("Permit" as Effect)).toBe("Allow");
  });

  it("should format Deny as Deny", () => {
    expect(formatPolicyEffect("Deny" as Effect)).toBe("Deny");
  });
});

describe("formatPolicyStatus", () => {
  it("should format active status", () => {
    const result = formatPolicyStatus(true);
    expect(result.label).toBe("Active");
    expect(result.color).toBe("green");
  });

  it("should format inactive status", () => {
    const result = formatPolicyStatus(false);
    expect(result.label).toBe("Inactive");
    expect(result.color).toBe("gray");
  });
});

describe("formatConditionOperator", () => {
  it("should format comparison operators", () => {
    expect(formatConditionOperator("equals")).toBe("=");
    expect(formatConditionOperator("notEquals")).toBe("≠");
    expect(formatConditionOperator("gt")).toBe(">");
    expect(formatConditionOperator("lt")).toBe("<");
    expect(formatConditionOperator("gte")).toBe("≥");
    expect(formatConditionOperator("lte")).toBe("≤");
  });

  it("should format set operators", () => {
    expect(formatConditionOperator("in")).toBe("∈");
    expect(formatConditionOperator("notIn")).toBe("∉");
  });

  it("should format string operators", () => {
    expect(formatConditionOperator("contains")).toBe("contains");
    expect(formatConditionOperator("startsWith")).toBe("starts with");
    expect(formatConditionOperator("endsWith")).toBe("ends with");
  });

  it("should format logical operators", () => {
    expect(formatConditionOperator("and")).toBe("AND");
    expect(formatConditionOperator("or")).toBe("OR");
    expect(formatConditionOperator("not")).toBe("NOT");
  });

  it("should return unknown operators as-is", () => {
    expect(formatConditionOperator("unknown" as any)).toBe("unknown");
  });
});

describe("formatConditionValue", () => {
  it("should format attribute references", () => {
    const result = formatConditionValue({
      category: "subject",
      attributeId: "role",
    });
    expect(result).toBe("subject.role");
  });

  it("should format arrays", () => {
    const result = formatConditionValue(["admin", "user"]);
    expect(result).toBe('["admin", "user"]');
  });

  it("should format strings with quotes", () => {
    expect(formatConditionValue("test")).toBe('"test"');
  });

  it("should format numbers", () => {
    expect(formatConditionValue(42)).toBe("42");
  });

  it("should format booleans", () => {
    expect(formatConditionValue(true)).toBe("true");
    expect(formatConditionValue(false)).toBe("false");
  });
});

describe("formatCondition", () => {
  it("should format comparison conditions as JSON", () => {
    const condition: Condition = {
      operator: "==" as any,
      left: { category: "subject" as const, attributeId: "role" },
      right: "admin",
    };
    const result = formatCondition(condition);
    expect(result).toContain('"operator"');
    expect(result).toContain('"=="');
  });

  it("should format logical conditions as JSON", () => {
    const condition: Condition = {
      operator: "and" as any,
      conditions: [
        {
          operator: "==" as any,
          left: { category: "subject" as const, attributeId: "role" },
          right: "admin",
        },
      ],
    };
    const result = formatCondition(condition);
    expect(result).toContain('"operator"');
    expect(result).toContain('"and"');
  });

  it("should indent nested conditions", () => {
    const condition: Condition = {
      operator: "and" as any,
      conditions: [
        {
          operator: "==" as any,
          left: { category: "subject" as const, attributeId: "role" },
          right: "admin",
        },
      ],
    };
    const result = formatCondition(condition, 1);
    expect(result.startsWith("  ")).toBe(true);
  });
});

describe("formatConditionCompact", () => {
  it("should format simple conditions compactly", () => {
    const condition: Condition = {
      operator: "==" as any,
      left: { category: "subject" as const, attributeId: "role" },
      right: "admin",
    };
    const result = formatConditionCompact(condition);
    expect(result).not.toContain("\n");
    expect(result).toContain('"operator"');
  });

  it("should format nested conditions as compact JSON", () => {
    const condition: Condition = {
      operator: "and" as any,
      conditions: [
        {
          operator: "==" as any,
          left: { category: "subject" as const, attributeId: "role" },
          right: "admin",
        },
      ],
    };
    const result = formatConditionCompact(condition);
    expect(result).not.toContain("\n");
    expect(result).toContain("operator");
  });
});

describe("formatAuditAction", () => {
  it("should format audit actions", () => {
    expect(formatAuditAction("CREATE")).toBe("Created");
    expect(formatAuditAction("UPDATE")).toBe("Updated");
    expect(formatAuditAction("DELETE")).toBe("Deleted");
    expect(formatAuditAction("ACTIVATE")).toBe("Activated");
    expect(formatAuditAction("DEACTIVATE")).toBe("Deactivated");
    expect(formatAuditAction("TEST")).toBe("Tested");
  });

  it("should return unknown actions as-is", () => {
    expect(formatAuditAction("UNKNOWN" as any)).toBe("UNKNOWN");
  });
});

describe("formatAuditMessage", () => {
  it("should format audit message with userName", () => {
    const entry: AuditLogEntry = {
      id: "1",
      entityType: "policy",
      entityId: "policy-1",
      action: "CREATE",
      oldValue: null,
      newValue: { description: "New policy" },
      userId: "user-1",
      userName: "John Doe",
      timestamp: "2024-01-01T00:00:00Z",
    };
    const result = formatAuditMessage(entry);
    expect(result).toContain("John Doe");
    expect(result).toContain("created");
    expect(result).toContain("policy");
  });

  it("should format audit message without userName", () => {
    const entry: AuditLogEntry = {
      id: "1",
      entityType: "attribute",
      entityId: "attr-1",
      action: "UPDATE",
      oldValue: { value: "old" },
      newValue: { value: "new" },
      userId: "user-1",
      userName: undefined,
      timestamp: "2024-01-01T00:00:00Z",
    };
    const result = formatAuditMessage(entry);
    expect(result).toContain("user-1");
    expect(result).toContain("updated");
    expect(result).toContain("attribute");
  });
});

describe("formatResourceType", () => {
  it("should format resource types", () => {
    expect(formatResourceType("user")).toBe("User");
    expect(formatResourceType("document")).toBe("Document");
    expect(formatResourceType("company")).toBe("Company");
    expect(formatResourceType("bond")).toBe("Bond");
    expect(formatResourceType("claim")).toBe("Claim");
  });

  it("should return unknown types as-is", () => {
    expect(formatResourceType("unknown" as any)).toBe("unknown");
  });
});

describe("formatAttributeValue", () => {
  it("should format null and undefined as em dash", () => {
    expect(formatAttributeValue(null)).toBe("—");
    expect(formatAttributeValue(undefined)).toBe("—");
  });

  it("should format booleans as Yes/No", () => {
    expect(formatAttributeValue(true)).toBe("Yes");
    expect(formatAttributeValue(false)).toBe("No");
  });

  it("should format empty arrays", () => {
    expect(formatAttributeValue([])).toBe("[]");
  });

  it("should format short arrays", () => {
    expect(formatAttributeValue(["a", "b"])).toBe('["a", "b"]');
  });

  it("should truncate long arrays", () => {
    const longArray = Array(10).fill("item");
    const result = formatAttributeValue(longArray);
    expect(result).toContain("...");
    expect(result).toContain("+7");
  });

  it("should format empty objects", () => {
    expect(formatAttributeValue({})).toBe("{}");
  });

  it("should format objects with few keys", () => {
    const obj = { a: 1, b: 2 };
    const result = formatAttributeValue(obj);
    expect(result).toContain("a");
    expect(result).toContain("b");
  });

  it("should truncate objects with many keys", () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
    };
    const result = formatAttributeValue(obj);
    expect(result).toContain("...");
    expect(result).toContain("+3");
  });

  it("should truncate long strings", () => {
    const longString = "a".repeat(150);
    const result = formatAttributeValue(longString);
    expect(result.length).toBeLessThan(longString.length);
    expect(result).toContain("...");
  });

  it("should format numbers", () => {
    expect(formatAttributeValue(42)).toBe("42");
  });

  it("should format regular strings", () => {
    expect(formatAttributeValue("test")).toBe("test");
  });
});

describe("formatFileSize", () => {
  it("should format zero bytes", () => {
    expect(formatFileSize(0)).toBe("0 B");
  });

  it("should format bytes", () => {
    expect(formatFileSize(500)).toBe("500.00 B");
  });

  it("should format kilobytes", () => {
    const result = formatFileSize(1536);
    expect(result).toContain("KB");
  });

  it("should format megabytes", () => {
    expect(formatFileSize(1048576)).toContain("MB");
  });

  it("should format gigabytes", () => {
    expect(formatFileSize(1073741824)).toContain("GB");
  });

  it("should format terabytes", () => {
    expect(formatFileSize(1099511627776)).toContain("TB");
  });
});

describe("formatNumber", () => {
  it("should format numbers with thousand separators", () => {
    expect(formatNumber(1000)).toBe("1,000");
    expect(formatNumber(1000000)).toBe("1,000,000");
  });

  it("should format small numbers", () => {
    expect(formatNumber(42)).toBe("42");
    expect(formatNumber(999)).toBe("999");
  });
});

describe("formatPercentage", () => {
  it("should format percentages with default decimals", () => {
    expect(formatPercentage(50)).toBe("50.0%");
  });

  it("should format percentages with custom decimals", () => {
    expect(formatPercentage(12.345, 3)).toBe("12.345%");
  });
});

describe("formatDuration", () => {
  it("should format milliseconds", () => {
    expect(formatDuration(500)).toBe("500ms");
  });

  it("should format seconds", () => {
    const result = formatDuration(1500);
    expect(result).toBe("1s");
  });

  it("should format minutes", () => {
    const result = formatDuration(90000);
    expect(result).toBe("1m 30s");
  });

  it("should format exact minutes without seconds", () => {
    const result = formatDuration(120000); // exactly 2 minutes
    expect(result).toBe("2m");
  });

  it("should format hours", () => {
    const result = formatDuration(3700000);
    expect(result).toBe("1h 1m");
  });

  it("should format exact hours without minutes", () => {
    const result = formatDuration(3600000); // exactly 1 hour
    expect(result).toBe("1h");
  });
});

describe("truncate", () => {
  it("should not truncate short strings", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("should truncate long strings", () => {
    expect(truncate("hello world", 5)).toBe("he...");
  });

  it("should use custom suffix", () => {
    expect(truncate("hello world", 5, "---")).toBe("he---");
  });

  it("should handle exact length", () => {
    expect(truncate("hello", 5)).toBe("hello");
  });
});

describe("formatPolicySummary", () => {
  it("should format policy with priority", () => {
    const policy: Policy = {
      id: "policy-1",
      version: "1.0.0",
      description: "Test policy",
      effect: "Permit" as Effect,
      priority: 100,
      metadata: {
        createdBy: "user-1",
        createdAt: new Date("2024-01-01T00:00:00Z"),
        tags: ["test"],
      },
    };
    const result = formatPolicySummary(policy);
    expect(result).toContain("policy-1");
    expect(result).toContain("v1.0.0");
    expect(result).toContain("Allow");
    expect(result).toContain("Priority: 100");
  });

  it("should format policy without priority", () => {
    const policy: Policy = {
      id: "policy-2",
      version: "2.0.0",
      description: "Test policy",
      effect: "Deny" as Effect,
      metadata: {
        createdBy: "user-1",
        createdAt: new Date("2024-01-01T00:00:00Z"),
      },
    };
    const result = formatPolicySummary(policy);
    expect(result).toContain("policy-2");
    expect(result).toContain("v2.0.0");
    expect(result).toContain("Deny");
    expect(result).not.toContain("Priority");
  });
});

describe("formatTags", () => {
  it("should format empty tags", () => {
    expect(formatTags([])).toBe("None");
  });

  it("should format few tags", () => {
    expect(formatTags(["tag1", "tag2"])).toBe("tag1, tag2");
  });

  it("should truncate many tags", () => {
    const tags = ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"];
    const result = formatTags(tags);
    expect(result).toContain("+3 more");
  });
});

describe("toTitleCase", () => {
  it("should convert camelCase to Title Case", () => {
    expect(toTitleCase("camelCase")).toBe("Camel Case");
    expect(toTitleCase("userName")).toBe("User Name");
  });

  it("should convert snake_case to Title Case", () => {
    expect(toTitleCase("snake_case")).toBe("Snake case");
    expect(toTitleCase("user_name")).toBe("User name");
  });

  it("should handle single words", () => {
    expect(toTitleCase("test")).toBe("Test");
  });
});

describe("formatUser", () => {
  it("should use userName when provided", () => {
    expect(formatUser("user-1", "John Doe")).toBe("John Doe");
  });

  it("should use userId when userName is null", () => {
    expect(formatUser("user-1", null)).toBe("user-1");
  });

  it("should use userId when userName is undefined", () => {
    expect(formatUser("user-1", undefined)).toBe("user-1");
  });

  it("should use userId when userName is not provided", () => {
    expect(formatUser("user-1")).toBe("user-1");
  });
});

describe("formatValidationError", () => {
  it("should format validation error", () => {
    const result = formatValidationError("email", "Invalid email");
    expect(result).toBe("Email: Invalid email");
  });

  it("should convert camelCase field names", () => {
    const result = formatValidationError("userName", "Required");
    expect(result).toBe("User Name: Required");
  });
});

describe("formatValidationErrors", () => {
  it("should return empty string for no errors", () => {
    expect(formatValidationErrors([])).toBe("");
  });

  it("should return single error", () => {
    const errors = ["Invalid email format"];
    expect(formatValidationErrors(errors)).toBe("Invalid email format");
  });

  it("should return empty string for single empty error", () => {
    const errors = [""];
    expect(formatValidationErrors(errors)).toBe("");
  });

  it("should format multiple errors", () => {
    const errors = ["Invalid email format", "Password is required"];
    const result = formatValidationErrors(errors);
    expect(result).toContain("2 validation errors");
    expect(result).toContain("Invalid email format");
    expect(result).toContain("Password is required");
  });
});

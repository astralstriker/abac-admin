import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AttributeValue } from "../schemas/attribute";
import { AttributeService, type BulkAttributeResult } from "./attributes";
import type { ABACAdminClient } from "./client";

describe("AttributeService", () => {
  let mockClient: ABACAdminClient;
  let attributeService: AttributeService;

  const mockAttributeValue: AttributeValue = {
    id: "attr-1",
    resourceType: "user",
    resourceId: "user-123",
    attributeKey: "role",
    attributeValue: "admin",
    valueType: "string",
    updatedBy: "user-1",
    updatedAt: "2024-01-01T00:00:00.000Z",
  };

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    } as any;

    attributeService = new AttributeService(mockClient);
  });

  describe("getResourceAttributes", () => {
    it("should fetch all attributes for a resource", async () => {
      const mockAttributes = {
        role: "admin",
        department: "engineering",
        status: "active",
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockAttributes);

      const result = await attributeService.getResourceAttributes(
        "user",
        "user-123",
      );

      expect(mockClient.get).toHaveBeenCalledWith("/attributes/user/user-123");
      expect(result).toEqual(mockAttributes);
    });

    it("should handle empty attributes", async () => {
      vi.mocked(mockClient.get).mockResolvedValue({});

      const result = await attributeService.getResourceAttributes(
        "user",
        "user-123",
      );

      expect(result).toEqual({});
    });

    it("should work with different resource types", async () => {
      const mockAttributes = { status: "approved" };
      vi.mocked(mockClient.get).mockResolvedValue(mockAttributes);

      await attributeService.getResourceAttributes("claim", "claim-456");

      expect(mockClient.get).toHaveBeenCalledWith("/attributes/claim/claim-456");
    });
  });

  describe("getResourceAttribute", () => {
    it("should fetch a single attribute value", async () => {
      vi.mocked(mockClient.get).mockResolvedValue({ value: "admin" });

      const result = await attributeService.getResourceAttribute(
        "user",
        "user-123",
        "role",
      );

      expect(mockClient.get).toHaveBeenCalledWith(
        "/attributes/user/user-123/role",
      );
      expect(result).toBe("admin");
    });

    it("should handle different value types", async () => {
      vi.mocked(mockClient.get).mockResolvedValue({ value: 42 });

      const result = await attributeService.getResourceAttribute(
        "user",
        "user-123",
        "age",
      );

      expect(result).toBe(42);
    });

    it("should handle boolean values", async () => {
      vi.mocked(mockClient.get).mockResolvedValue({ value: true });

      const result = await attributeService.getResourceAttribute(
        "user",
        "user-123",
        "isActive",
      );

      expect(result).toBe(true);
    });

    it("should handle array values", async () => {
      vi.mocked(mockClient.get).mockResolvedValue({
        value: ["tag1", "tag2", "tag3"],
      });

      const result = await attributeService.getResourceAttribute(
        "user",
        "user-123",
        "tags",
      );

      expect(result).toEqual(["tag1", "tag2", "tag3"]);
    });

    it("should handle object values", async () => {
      vi.mocked(mockClient.get).mockResolvedValue({
        value: { city: "NYC", country: "USA" },
      });

      const result = await attributeService.getResourceAttribute(
        "user",
        "user-123",
        "address",
      );

      expect(result).toEqual({ city: "NYC", country: "USA" });
    });
  });

  describe("setResourceAttribute", () => {
    it("should set a string attribute", async () => {
      vi.mocked(mockClient.put).mockResolvedValue(mockAttributeValue);

      const result = await attributeService.setResourceAttribute(
        "user",
        "user-123",
        "role",
        "admin",
      );

      expect(mockClient.put).toHaveBeenCalledWith(
        "/attributes/user/user-123/role",
        { value: "admin" },
      );
      expect(result).toEqual(mockAttributeValue);
    });

    it("should set a number attribute", async () => {
      const numericAttr = { ...mockAttributeValue, attributeValue: 42 };
      vi.mocked(mockClient.put).mockResolvedValue(numericAttr);

      const result = await attributeService.setResourceAttribute(
        "user",
        "user-123",
        "age",
        42,
      );

      expect(mockClient.put).toHaveBeenCalledWith(
        "/attributes/user/user-123/age",
        { value: 42 },
      );
      expect(result.attributeValue).toBe(42);
    });

    it("should set a boolean attribute", async () => {
      const booleanAttr = { ...mockAttributeValue, attributeValue: true };
      vi.mocked(mockClient.put).mockResolvedValue(booleanAttr);

      await attributeService.setResourceAttribute(
        "user",
        "user-123",
        "isActive",
        true,
      );

      expect(mockClient.put).toHaveBeenCalledWith(
        "/attributes/user/user-123/isActive",
        { value: true },
      );
    });

    it("should set an array attribute", async () => {
      const arrayAttr = {
        ...mockAttributeValue,
        attributeValue: ["tag1", "tag2"],
      };
      vi.mocked(mockClient.put).mockResolvedValue(arrayAttr);

      await attributeService.setResourceAttribute(
        "user",
        "user-123",
        "tags",
        ["tag1", "tag2"],
      );

      expect(mockClient.put).toHaveBeenCalledWith(
        "/attributes/user/user-123/tags",
        { value: ["tag1", "tag2"] },
      );
    });

    it("should set an object attribute", async () => {
      const objectAttr = {
        ...mockAttributeValue,
        attributeValue: { city: "NYC" },
      };
      vi.mocked(mockClient.put).mockResolvedValue(objectAttr);

      await attributeService.setResourceAttribute(
        "user",
        "user-123",
        "address",
        { city: "NYC" },
      );

      expect(mockClient.put).toHaveBeenCalledWith(
        "/attributes/user/user-123/address",
        { value: { city: "NYC" } },
      );
    });
  });

  describe("bulkSetAttributes", () => {
    it("should set multiple attributes at once", async () => {
      const attributes = {
        role: "admin",
        department: "engineering",
        status: "active",
      };

      const mockResults = [
        { ...mockAttributeValue, attributeKey: "role", attributeValue: "admin" },
        { ...mockAttributeValue, attributeKey: "department", attributeValue: "engineering" },
        { ...mockAttributeValue, attributeKey: "status", attributeValue: "active" },
      ];

      vi.mocked(mockClient.put).mockResolvedValue(mockResults);

      const result = await attributeService.bulkSetAttributes(
        "user",
        "user-123",
        attributes,
      );

      expect(mockClient.put).toHaveBeenCalledWith(
        "/attributes/user/user-123",
        attributes,
      );
      expect(result).toHaveLength(3);
      expect(result[0].attributeKey).toBe("role");
    });

    it("should handle empty bulk set", async () => {
      vi.mocked(mockClient.put).mockResolvedValue([]);

      const result = await attributeService.bulkSetAttributes(
        "user",
        "user-123",
        {},
      );

      expect(result).toEqual([]);
    });
  });

  describe("deleteResourceAttribute", () => {
    it("should delete an attribute", async () => {
      vi.mocked(mockClient.delete).mockResolvedValue(undefined);

      await attributeService.deleteResourceAttribute(
        "user",
        "user-123",
        "role",
      );

      expect(mockClient.delete).toHaveBeenCalledWith(
        "/attributes/user/user-123/role",
      );
    });

    it("should handle deletion errors", async () => {
      vi.mocked(mockClient.delete).mockRejectedValue(new Error("Not found"));

      await expect(
        attributeService.deleteResourceAttribute("user", "user-123", "role"),
      ).rejects.toThrow("Not found");
    });
  });

  describe("bulkDeleteAttributes", () => {
    it("should delete multiple attributes", async () => {
      const bulkResult: BulkAttributeResult = {
        success: 3,
        failed: 0,
      };

      vi.mocked(mockClient.post).mockResolvedValue(bulkResult);

      const result = await attributeService.bulkDeleteAttributes(
        "user",
        "user-123",
        ["role", "department", "status"],
      );

      expect(mockClient.post).toHaveBeenCalledWith(
        "/attributes/user/user-123/bulk-delete",
        { keys: ["role", "department", "status"] },
      );
      expect(result.success).toBe(3);
      expect(result.failed).toBe(0);
    });

    it("should handle partial failures in bulk delete", async () => {
      const bulkResult: BulkAttributeResult = {
        success: 2,
        failed: 1,
        errors: [{ key: "nonexistent", error: "Attribute not found" }],
      };

      vi.mocked(mockClient.post).mockResolvedValue(bulkResult);

      const result = await attributeService.bulkDeleteAttributes(
        "user",
        "user-123",
        ["role", "department", "nonexistent"],
      );

      expect(result.failed).toBe(1);
      expect(result.errors).toHaveLength(1);
    });

    it("should handle empty key array", async () => {
      const bulkResult: BulkAttributeResult = {
        success: 0,
        failed: 0,
      };

      vi.mocked(mockClient.post).mockResolvedValue(bulkResult);

      const result = await attributeService.bulkDeleteAttributes(
        "user",
        "user-123",
        [],
      );

      expect(result.success).toBe(0);
    });
  });

  describe("getHistory", () => {
    it("should fetch history for all attributes", async () => {
      const mockHistory = [
        mockAttributeValue,
        { ...mockAttributeValue, id: "attr-2", updatedAt: "2024-01-02T00:00:00.000Z" },
      ];

      vi.mocked(mockClient.get).mockResolvedValue(mockHistory);

      const result = await attributeService.getHistory("user", "user-123");

      expect(mockClient.get).toHaveBeenCalledWith(
        "/attributes/user/user-123/history",
        {},
      );
      expect(result).toHaveLength(2);
    });

    it("should fetch history for specific attribute", async () => {
      const mockHistory = [mockAttributeValue];
      vi.mocked(mockClient.get).mockResolvedValue(mockHistory);

      const result = await attributeService.getHistory(
        "user",
        "user-123",
        "role",
      );

      expect(mockClient.get).toHaveBeenCalledWith(
        "/attributes/user/user-123/role/history",
        {},
      );
      expect(result).toHaveLength(1);
    });

    it("should fetch history with limit and offset", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([mockAttributeValue]);

      await attributeService.getHistory("user", "user-123", undefined, {
        limit: 10,
        offset: 5,
      });

      expect(mockClient.get).toHaveBeenCalledWith(
        "/attributes/user/user-123/history",
        { limit: "10", offset: "5" },
      );
    });

    it("should fetch history with date range", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([mockAttributeValue]);

      await attributeService.getHistory("user", "user-123", "role", {
        startDate: "2024-01-01T00:00:00.000Z",
        endDate: "2024-01-31T23:59:59.999Z",
      });

      expect(mockClient.get).toHaveBeenCalledWith(
        "/attributes/user/user-123/role/history",
        {
          startDate: "2024-01-01T00:00:00.000Z",
          endDate: "2024-01-31T23:59:59.999Z",
        },
      );
    });

    it("should fetch history with all options", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([mockAttributeValue]);

      await attributeService.getHistory("user", "user-123", "role", {
        limit: 20,
        offset: 10,
        startDate: "2024-01-01T00:00:00.000Z",
        endDate: "2024-01-31T23:59:59.999Z",
      });

      expect(mockClient.get).toHaveBeenCalledWith(
        "/attributes/user/user-123/role/history",
        {
          limit: "20",
          offset: "10",
          startDate: "2024-01-01T00:00:00.000Z",
          endDate: "2024-01-31T23:59:59.999Z",
        },
      );
    });

    it("should return empty array when no history", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([]);

      const result = await attributeService.getHistory("user", "user-123");

      expect(result).toEqual([]);
    });
  });

  describe("compareAttributes", () => {
    it("should compare attributes between two resources", async () => {
      const mockComparison = {
        common: { status: "active" },
        onlyInFirst: { role: "admin" },
        onlyInSecond: { department: "sales" },
        different: {
          level: { first: 5, second: 3 },
        },
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockComparison);

      const result = await attributeService.compareAttributes(
        "user",
        "user-123",
        "user-456",
      );

      expect(mockClient.get).toHaveBeenCalledWith("/attributes/user/compare", {
        id1: "user-123",
        id2: "user-456",
      });
      expect(result).toEqual(mockComparison);
      expect(result.common.status).toBe("active");
      expect(result.onlyInFirst.role).toBe("admin");
      expect(result.different.level.first).toBe(5);
    });

    it("should handle resources with no common attributes", async () => {
      const mockComparison = {
        common: {},
        onlyInFirst: { role: "admin" },
        onlyInSecond: { department: "sales" },
        different: {},
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockComparison);

      const result = await attributeService.compareAttributes(
        "user",
        "user-123",
        "user-456",
      );

      expect(result.common).toEqual({});
    });

    it("should handle identical resources", async () => {
      const mockComparison = {
        common: { role: "admin", status: "active" },
        onlyInFirst: {},
        onlyInSecond: {},
        different: {},
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockComparison);

      const result = await attributeService.compareAttributes(
        "user",
        "user-123",
        "user-123",
      );

      expect(result.common).toEqual({ role: "admin", status: "active" });
      expect(result.onlyInFirst).toEqual({});
      expect(result.onlyInSecond).toEqual({});
    });
  });

  describe("copyAttributes", () => {
    it("should copy all attributes between resources", async () => {
      const bulkResult: BulkAttributeResult = {
        success: 5,
        failed: 0,
      };

      vi.mocked(mockClient.post).mockResolvedValue(bulkResult);

      const result = await attributeService.copyAttributes(
        "user",
        "user-123",
        "user",
        "user-456",
      );

      expect(mockClient.post).toHaveBeenCalledWith("/attributes/copy", {
        source: {
          resourceType: "user",
          resourceId: "user-123",
        },
        target: {
          resourceType: "user",
          resourceId: "user-456",
        },
        keys: undefined,
      });
      expect(result.success).toBe(5);
    });

    it("should copy specific attributes", async () => {
      const bulkResult: BulkAttributeResult = {
        success: 2,
        failed: 0,
      };

      vi.mocked(mockClient.post).mockResolvedValue(bulkResult);

      const result = await attributeService.copyAttributes(
        "user",
        "user-123",
        "user",
        "user-456",
        ["role", "department"],
      );

      expect(mockClient.post).toHaveBeenCalledWith("/attributes/copy", {
        source: {
          resourceType: "user",
          resourceId: "user-123",
        },
        target: {
          resourceType: "user",
          resourceId: "user-456",
        },
        keys: ["role", "department"],
      });
      expect(result.success).toBe(2);
    });

    it("should copy between different resource types", async () => {
      const bulkResult: BulkAttributeResult = {
        success: 3,
        failed: 0,
      };

      vi.mocked(mockClient.post).mockResolvedValue(bulkResult);

      await attributeService.copyAttributes(
        "user",
        "user-123",
        "company",
        "company-789",
      );

      expect(mockClient.post).toHaveBeenCalledWith("/attributes/copy", {
        source: {
          resourceType: "user",
          resourceId: "user-123",
        },
        target: {
          resourceType: "company",
          resourceId: "company-789",
        },
        keys: undefined,
      });
    });

    it("should handle partial copy failures", async () => {
      const bulkResult: BulkAttributeResult = {
        success: 3,
        failed: 2,
        errors: [
          { key: "restricted", error: "Permission denied" },
          { key: "computed", error: "Cannot copy computed attributes" },
        ],
      };

      vi.mocked(mockClient.post).mockResolvedValue(bulkResult);

      const result = await attributeService.copyAttributes(
        "user",
        "user-123",
        "user",
        "user-456",
        ["role", "department", "restricted", "status", "computed"],
      );

      expect(result.failed).toBe(2);
      expect(result.errors).toHaveLength(2);
    });
  });

  describe("validateAttribute", () => {
    it("should validate a valid attribute", async () => {
      vi.mocked(mockClient.post).mockResolvedValue({ valid: true });

      const result = await attributeService.validateAttribute(
        "user",
        "email",
        "user@example.com",
      );

      expect(mockClient.post).toHaveBeenCalledWith("/attributes/validate", {
        resourceType: "user",
        key: "email",
        value: "user@example.com",
      });
      expect(result.valid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it("should validate an invalid attribute", async () => {
      vi.mocked(mockClient.post).mockResolvedValue({
        valid: false,
        errors: ["Invalid email format"],
      });

      const result = await attributeService.validateAttribute(
        "user",
        "email",
        "invalid-email",
      );

      expect(result.valid).toBe(false);
      expect(result.errors).toEqual(["Invalid email format"]);
    });

    it("should validate numeric constraints", async () => {
      vi.mocked(mockClient.post).mockResolvedValue({
        valid: false,
        errors: ["Value must be between 0 and 100"],
      });

      const result = await attributeService.validateAttribute(
        "user",
        "age",
        -5,
      );

      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Value must be between 0 and 100");
    });

    it("should validate with multiple errors", async () => {
      vi.mocked(mockClient.post).mockResolvedValue({
        valid: false,
        errors: ["Field is required", "Minimum length is 3 characters"],
      });

      const result = await attributeService.validateAttribute("user", "name", "");

      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(2);
    });
  });

  describe("searchResources", () => {
    it("should search resources by attribute", async () => {
      const mockResourceIds = ["user-123", "user-456", "user-789"];
      vi.mocked(mockClient.get).mockResolvedValue(mockResourceIds);

      const result = await attributeService.searchResources(
        "user",
        "role",
        "admin",
      );

      expect(mockClient.get).toHaveBeenCalledWith("/attributes/user/search", {
        key: "role",
        value: "admin",
      });
      expect(result).toEqual(mockResourceIds);
    });

    it("should handle numeric search values", async () => {
      const mockResourceIds = ["user-123"];
      vi.mocked(mockClient.get).mockResolvedValue(mockResourceIds);

      await attributeService.searchResources("user", "age", 25);

      expect(mockClient.get).toHaveBeenCalledWith("/attributes/user/search", {
        key: "age",
        value: "25",
      });
    });

    it("should handle boolean search values", async () => {
      const mockResourceIds = ["user-123", "user-456"];
      vi.mocked(mockClient.get).mockResolvedValue(mockResourceIds);

      await attributeService.searchResources("user", "isActive", true);

      expect(mockClient.get).toHaveBeenCalledWith("/attributes/user/search", {
        key: "isActive",
        value: "true",
      });
    });

    it("should return empty array when no matches", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([]);

      const result = await attributeService.searchResources(
        "user",
        "department",
        "nonexistent",
      );

      expect(result).toEqual([]);
    });

    it("should search across different resource types", async () => {
      const mockResourceIds = ["claim-123", "claim-456"];
      vi.mocked(mockClient.get).mockResolvedValue(mockResourceIds);

      await attributeService.searchResources("claim", "status", "approved");

      expect(mockClient.get).toHaveBeenCalledWith("/attributes/claim/search", {
        key: "status",
        value: "approved",
      });
    });
  });
});

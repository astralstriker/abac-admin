import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Policy, PolicyInput, PolicyUpdate } from "../schemas/policy";
import type { ABACAdminClient } from "./client";
import {
  PolicyService,
  type PolicyExportResult,
  type PolicyImportResult,
  type PolicyTestRequest,
  type PolicyTestResult,
} from "./policies";

describe("PolicyService", () => {
  let mockClient: ABACAdminClient;
  let policyService: PolicyService;

  const mockPolicy: Policy = {
    id: "policy-1",
    policyId: "test-policy",
    version: "1.0.0",
    effect: "PERMIT",
    description: "Test policy",
    conditions: { type: "equals", left: "a", right: "b" },
    isActive: true,
    category: "test",
    tags: ["test-tag"],
    createdBy: "user-1",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedBy: null,
    updatedAt: "2024-01-01T00:00:00.000Z",
    deletedAt: null,
    deletedBy: null,
  };

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    } as any;

    policyService = new PolicyService(mockClient);
  });

  describe("list", () => {
    it("should fetch all policies without filters", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([mockPolicy]);

      const result = await policyService.list();

      expect(mockClient.get).toHaveBeenCalledWith("/policies", {});
      expect(result).toEqual([mockPolicy]);
    });

    it("should fetch policies with category filter", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([mockPolicy]);

      const result = await policyService.list({ category: "test" });

      expect(mockClient.get).toHaveBeenCalledWith("/policies", {
        category: "test",
      });
      expect(result).toEqual([mockPolicy]);
    });

    it("should fetch policies with isActive filter", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([mockPolicy]);

      const result = await policyService.list({ isActive: true });

      expect(mockClient.get).toHaveBeenCalledWith("/policies", {
        isActive: "true",
      });
      expect(result).toEqual([mockPolicy]);
    });

    it("should fetch policies with search filter", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([mockPolicy]);

      const result = await policyService.list({ search: "test" });

      expect(mockClient.get).toHaveBeenCalledWith("/policies", {
        search: "test",
      });
      expect(result).toEqual([mockPolicy]);
    });

    it("should fetch policies with tags filter", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([mockPolicy]);

      const result = await policyService.list({ tags: ["tag1", "tag2"] });

      expect(mockClient.get).toHaveBeenCalledWith("/policies", {
        tags: "tag1,tag2",
      });
      expect(result).toEqual([mockPolicy]);
    });

    it("should fetch policies with multiple filters", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([mockPolicy]);

      const result = await policyService.list({
        category: "test",
        isActive: true,
        search: "query",
        tags: ["tag1"],
      });

      expect(mockClient.get).toHaveBeenCalledWith("/policies", {
        category: "test",
        isActive: "true",
        search: "query",
        tags: "tag1",
      });
      expect(result).toEqual([mockPolicy]);
    });

    it("should return empty array when no policies found", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([]);

      const result = await policyService.list();

      expect(result).toEqual([]);
    });
  });

  describe("get", () => {
    it("should fetch a single policy by id", async () => {
      vi.mocked(mockClient.get).mockResolvedValue(mockPolicy);

      const result = await policyService.get("policy-1");

      expect(mockClient.get).toHaveBeenCalledWith("/policies/policy-1");
      expect(result).toEqual(mockPolicy);
    });

    it("should throw error when policy not found", async () => {
      vi.mocked(mockClient.get).mockRejectedValue(new Error("Not found"));

      await expect(policyService.get("invalid-id")).rejects.toThrow(
        "Not found",
      );
    });
  });

  describe("create", () => {
    it("should create a new policy", async () => {
      const policyInput: PolicyInput = {
        policyId: "new-policy",
        version: "1.0.0",
        effect: "PERMIT",
        description: "New policy",
        conditions: { type: "equals", left: "a", right: "b" },
        isActive: true,
        category: "test",
        tags: ["new"],
        createdBy: "user-1",
        updatedBy: null,
      };

      const createdPolicy = { ...mockPolicy, ...policyInput, id: "policy-2" };
      vi.mocked(mockClient.post).mockResolvedValue(createdPolicy);

      const result = await policyService.create(policyInput);

      expect(mockClient.post).toHaveBeenCalledWith("/policies", policyInput);
      expect(result).toEqual(createdPolicy);
    });

    it("should throw error on invalid input", async () => {
      const invalidInput = {} as PolicyInput;
      vi.mocked(mockClient.post).mockRejectedValue(
        new Error("Validation error"),
      );

      await expect(policyService.create(invalidInput)).rejects.toThrow(
        "Validation error",
      );
    });
  });

  describe("update", () => {
    it("should update an existing policy", async () => {
      const policyUpdate: PolicyUpdate = {
        description: "Updated description",
        isActive: false,
      };

      const updatedPolicy = { ...mockPolicy, ...policyUpdate };
      vi.mocked(mockClient.put).mockResolvedValue(updatedPolicy);

      const result = await policyService.update("policy-1", policyUpdate);

      expect(mockClient.put).toHaveBeenCalledWith(
        "/policies/policy-1",
        policyUpdate,
      );
      expect(result).toEqual(updatedPolicy);
    });

    it("should throw error when updating non-existent policy", async () => {
      vi.mocked(mockClient.put).mockRejectedValue(new Error("Not found"));

      await expect(
        policyService.update("invalid-id", { description: "test" }),
      ).rejects.toThrow("Not found");
    });
  });

  describe("delete", () => {
    it("should delete a policy", async () => {
      vi.mocked(mockClient.delete).mockResolvedValue(undefined);

      await policyService.delete("policy-1");

      expect(mockClient.delete).toHaveBeenCalledWith("/policies/policy-1");
    });

    it("should throw error when deleting non-existent policy", async () => {
      vi.mocked(mockClient.delete).mockRejectedValue(new Error("Not found"));

      await expect(policyService.delete("invalid-id")).rejects.toThrow(
        "Not found",
      );
    });
  });

  describe("activate", () => {
    it("should activate a policy", async () => {
      const activatedPolicy = { ...mockPolicy, isActive: true };
      vi.mocked(mockClient.patch).mockResolvedValue(activatedPolicy);

      const result = await policyService.activate("policy-1");

      expect(mockClient.patch).toHaveBeenCalledWith(
        "/policies/policy-1/activate",
        {},
      );
      expect(result).toEqual(activatedPolicy);
    });
  });

  describe("deactivate", () => {
    it("should deactivate a policy", async () => {
      const deactivatedPolicy = { ...mockPolicy, isActive: false };
      vi.mocked(mockClient.patch).mockResolvedValue(deactivatedPolicy);

      const result = await policyService.deactivate("policy-1");

      expect(mockClient.patch).toHaveBeenCalledWith(
        "/policies/policy-1/deactivate",
        {},
      );
      expect(result).toEqual(deactivatedPolicy);
    });
  });

  describe("test", () => {
    it("should test a policy", async () => {
      const testRequest: PolicyTestRequest = {
        policy: mockPolicy,
        request: {
          subject: { role: "admin" },
          action: { type: "read" },
          resource: { type: "document" },
        },
      };

      const testResult: PolicyTestResult = {
        decision: "Permit",
        matchedPolicies: ["policy-1"],
        evaluationTime: 5,
      };

      vi.mocked(mockClient.post).mockResolvedValue(testResult);

      const result = await policyService.test(testRequest);

      expect(mockClient.post).toHaveBeenCalledWith(
        "/policies/test",
        testRequest,
      );
      expect(result).toEqual(testResult);
    });

    it("should return Deny decision", async () => {
      const testRequest: PolicyTestRequest = {
        policy: mockPolicy,
        request: {
          subject: { role: "user" },
          action: { type: "delete" },
          resource: { type: "document" },
        },
      };

      const testResult: PolicyTestResult = {
        decision: "Deny",
        matchedPolicies: [],
        evaluationTime: 3,
      };

      vi.mocked(mockClient.post).mockResolvedValue(testResult);

      const result = await policyService.test(testRequest);

      expect(result.decision).toBe("Deny");
    });
  });

  describe("getVersions", () => {
    it("should fetch all versions of a policy", async () => {
      const versions = [
        mockPolicy,
        { ...mockPolicy, id: "policy-1-v2", version: "2.0.0" },
      ];
      vi.mocked(mockClient.get).mockResolvedValue(versions);

      const result = await policyService.getVersions("test-policy");

      expect(mockClient.get).toHaveBeenCalledWith(
        "/policies/test-policy/versions",
      );
      expect(result).toEqual(versions);
    });

    it("should return empty array if no versions exist", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([]);

      const result = await policyService.getVersions("test-policy");

      expect(result).toEqual([]);
    });
  });

  describe("export", () => {
    it("should export all policies", async () => {
      const exportResult: PolicyExportResult = {
        policies: [mockPolicy],
        exportedAt: "2024-01-01T00:00:00.000Z",
        count: 1,
      };

      vi.mocked(mockClient.get).mockResolvedValue(exportResult);

      const result = await policyService.export();

      expect(mockClient.get).toHaveBeenCalledWith("/policies/export", {});
      expect(result).toEqual(exportResult);
    });

    it("should export specific policies by ids", async () => {
      const exportResult: PolicyExportResult = {
        policies: [mockPolicy],
        exportedAt: "2024-01-01T00:00:00.000Z",
        count: 1,
      };

      vi.mocked(mockClient.get).mockResolvedValue(exportResult);

      const result = await policyService.export(["policy-1", "policy-2"]);

      expect(mockClient.get).toHaveBeenCalledWith("/policies/export", {
        ids: "policy-1,policy-2",
      });
      expect(result).toEqual(exportResult);
    });
  });

  describe("import", () => {
    it("should import policies from file", async () => {
      const file = new File(["content"], "policies.json", {
        type: "application/json",
      });

      const importResult: PolicyImportResult = {
        imported: 5,
        failed: 0,
      };

      vi.mocked(mockClient.post).mockResolvedValue(importResult);

      const result = await policyService.import(file);

      expect(mockClient.post).toHaveBeenCalledWith(
        "/policies/import",
        expect.any(FormData),
      );
      expect(result).toEqual(importResult);
    });

    it("should handle import with errors", async () => {
      const file = new File(["content"], "policies.json", {
        type: "application/json",
      });

      const importResult: PolicyImportResult = {
        imported: 3,
        failed: 2,
        errors: [
          { policyId: "policy-1", error: "Invalid format" },
          { policyId: "policy-2", error: "Duplicate policy" },
        ],
      };

      vi.mocked(mockClient.post).mockResolvedValue(importResult);

      const result = await policyService.import(file);

      expect(result.failed).toBe(2);
      expect(result.errors).toHaveLength(2);
    });
  });

  describe("duplicate", () => {
    it("should duplicate a policy with new policy ID", async () => {
      const duplicatedPolicy = {
        ...mockPolicy,
        id: "policy-2",
        policyId: "duplicated-policy",
      };

      vi.mocked(mockClient.post).mockResolvedValue(duplicatedPolicy);

      const result = await policyService.duplicate(
        "policy-1",
        "duplicated-policy",
      );

      expect(mockClient.post).toHaveBeenCalledWith(
        "/policies/policy-1/duplicate",
        { newPolicyId: "duplicated-policy" },
      );
      expect(result).toEqual(duplicatedPolicy);
    });

    it("should duplicate a policy without specifying new ID", async () => {
      const duplicatedPolicy = {
        ...mockPolicy,
        id: "policy-2",
        policyId: "test-policy-copy",
      };

      vi.mocked(mockClient.post).mockResolvedValue(duplicatedPolicy);

      const result = await policyService.duplicate("policy-1");

      expect(mockClient.post).toHaveBeenCalledWith(
        "/policies/policy-1/duplicate",
        { newPolicyId: undefined },
      );
      expect(result).toEqual(duplicatedPolicy);
    });
  });

  describe("bulkActivate", () => {
    it("should activate multiple policies", async () => {
      const bulkResult = { success: 3, failed: 0 };
      vi.mocked(mockClient.post).mockResolvedValue(bulkResult);

      const result = await policyService.bulkActivate([
        "policy-1",
        "policy-2",
        "policy-3",
      ]);

      expect(mockClient.post).toHaveBeenCalledWith("/policies/bulk/activate", {
        ids: ["policy-1", "policy-2", "policy-3"],
      });
      expect(result).toEqual(bulkResult);
    });

    it("should handle partial failures", async () => {
      const bulkResult = { success: 2, failed: 1 };
      vi.mocked(mockClient.post).mockResolvedValue(bulkResult);

      const result = await policyService.bulkActivate([
        "policy-1",
        "policy-2",
        "invalid-id",
      ]);

      expect(result.success).toBe(2);
      expect(result.failed).toBe(1);
    });
  });

  describe("bulkDeactivate", () => {
    it("should deactivate multiple policies", async () => {
      const bulkResult = { success: 3, failed: 0 };
      vi.mocked(mockClient.post).mockResolvedValue(bulkResult);

      const result = await policyService.bulkDeactivate([
        "policy-1",
        "policy-2",
        "policy-3",
      ]);

      expect(mockClient.post).toHaveBeenCalledWith(
        "/policies/bulk/deactivate",
        { ids: ["policy-1", "policy-2", "policy-3"] },
      );
      expect(result).toEqual(bulkResult);
    });
  });

  describe("bulkDelete", () => {
    it("should delete multiple policies", async () => {
      const bulkResult = { success: 3, failed: 0 };
      vi.mocked(mockClient.post).mockResolvedValue(bulkResult);

      const result = await policyService.bulkDelete([
        "policy-1",
        "policy-2",
        "policy-3",
      ]);

      expect(mockClient.post).toHaveBeenCalledWith("/policies/bulk/delete", {
        ids: ["policy-1", "policy-2", "policy-3"],
      });
      expect(result).toEqual(bulkResult);
    });

    it("should handle empty array", async () => {
      const bulkResult = { success: 0, failed: 0 };
      vi.mocked(mockClient.post).mockResolvedValue(bulkResult);

      const result = await policyService.bulkDelete([]);

      expect(result).toEqual(bulkResult);
    });
  });

  describe("search", () => {
    it("should search policies by query", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([mockPolicy]);

      const result = await policyService.search("test");

      expect(mockClient.get).toHaveBeenCalledWith("/policies/search", {
        q: "test",
      });
      expect(result).toEqual([mockPolicy]);
    });

    it("should search with filters", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([mockPolicy]);

      const result = await policyService.search("test", {
        category: "access",
        isActive: true,
        tags: ["tag1"],
      });

      expect(mockClient.get).toHaveBeenCalledWith("/policies/search", {
        q: "test",
        category: "access",
        isActive: "true",
        tags: "tag1",
      });
      expect(result).toEqual([mockPolicy]);
    });

    it("should return empty array when no matches found", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([]);

      const result = await policyService.search("nonexistent");

      expect(result).toEqual([]);
    });
  });
});

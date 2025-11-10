import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AuditLogEntry, AuditLogFilter } from "../schemas/audit";
import {
  AuditService,
  type AuditLogResponse,
  type AuditStatistics,
} from "./audit";
import type { ABACAdminClient } from "./client";

describe("AuditService", () => {
  let mockClient: ABACAdminClient;
  let auditService: AuditService;

  const mockAuditEntry: AuditLogEntry = {
    id: "audit-1",
    entityType: "policy",
    entityId: "policy-123",
    action: "CREATE",
    userId: "user-1",
    userName: "John Doe",
    timestamp: "2024-01-01T00:00:00.000Z",
    oldValue: null,
    newValue: {
      policyId: "test-policy",
    },
    metadata: {
      ipAddress: "192.168.1.1",
      userAgent: "Mozilla/5.0",
    },
  };

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    } as any;

    auditService = new AuditService(mockClient);
  });

  describe("getAuditLog", () => {
    it("should fetch audit log without filters", async () => {
      const mockResponse: AuditLogResponse = {
        entries: [mockAuditEntry],
        total: 1,
        limit: 10,
        offset: 0,
        hasMore: false,
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const result = await auditService.getAuditLog();

      expect(mockClient.get).toHaveBeenCalledWith("/audit", {});
      expect(result.entries).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it("should fetch audit log with entity type filter", async () => {
      const mockResponse: AuditLogResponse = {
        entries: [mockAuditEntry],
        total: 1,
        limit: 10,
        offset: 0,
        hasMore: false,
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const filters: AuditLogFilter = { entityType: "policy" };
      await auditService.getAuditLog(filters);

      expect(mockClient.get).toHaveBeenCalledWith("/audit", {
        entityType: "policy",
      });
    });

    it("should fetch audit log with entity ID filter", async () => {
      const mockResponse: AuditLogResponse = {
        entries: [mockAuditEntry],
        total: 1,
        limit: 10,
        offset: 0,
        hasMore: false,
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const filters: AuditLogFilter = { entityId: "policy-123" };
      await auditService.getAuditLog(filters);

      expect(mockClient.get).toHaveBeenCalledWith("/audit", {
        entityId: "policy-123",
      });
    });

    it("should fetch audit log with user ID filter", async () => {
      const mockResponse: AuditLogResponse = {
        entries: [mockAuditEntry],
        total: 1,
        limit: 10,
        offset: 0,
        hasMore: false,
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const filters: AuditLogFilter = { userId: "user-1" };
      await auditService.getAuditLog(filters);

      expect(mockClient.get).toHaveBeenCalledWith("/audit", {
        userId: "user-1",
      });
    });

    it("should fetch audit log with action filter", async () => {
      const mockResponse: AuditLogResponse = {
        entries: [mockAuditEntry],
        total: 1,
        limit: 10,
        offset: 0,
        hasMore: false,
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const filters: AuditLogFilter = { action: "CREATE" };
      await auditService.getAuditLog(filters);

      expect(mockClient.get).toHaveBeenCalledWith("/audit", {
        action: "CREATE",
      });
    });

    it("should fetch audit log with date range filter", async () => {
      const mockResponse: AuditLogResponse = {
        entries: [mockAuditEntry],
        total: 1,
        limit: 10,
        offset: 0,
        hasMore: false,
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const filters: AuditLogFilter = {
        startDate: "2024-01-01T00:00:00.000Z",
        endDate: "2024-01-31T23:59:59.999Z",
      };
      await auditService.getAuditLog(filters);

      expect(mockClient.get).toHaveBeenCalledWith("/audit", {
        startDate: "2024-01-01T00:00:00.000Z",
        endDate: "2024-01-31T23:59:59.999Z",
      });
    });

    it("should fetch audit log with pagination", async () => {
      const mockResponse: AuditLogResponse = {
        entries: [mockAuditEntry],
        total: 100,
        limit: 10,
        offset: 20,
        hasMore: true,
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const filters: AuditLogFilter = { limit: 10, offset: 20 };
      await auditService.getAuditLog(filters);

      expect(mockClient.get).toHaveBeenCalledWith("/audit", {
        limit: "10",
        offset: "20",
      });
    });

    it("should fetch audit log with all filters", async () => {
      const mockResponse: AuditLogResponse = {
        entries: [mockAuditEntry],
        total: 1,
        limit: 5,
        offset: 10,
        hasMore: false,
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const filters: AuditLogFilter = {
        entityType: "policy",
        entityId: "policy-123",
        userId: "user-1",
        action: "UPDATE",
        startDate: "2024-01-01T00:00:00.000Z",
        endDate: "2024-01-31T23:59:59.999Z",
        limit: 5,
        offset: 10,
      };
      await auditService.getAuditLog(filters);

      expect(mockClient.get).toHaveBeenCalledWith("/audit", {
        entityType: "policy",
        entityId: "policy-123",
        userId: "user-1",
        action: "UPDATE",
        startDate: "2024-01-01T00:00:00.000Z",
        endDate: "2024-01-31T23:59:59.999Z",
        limit: "5",
        offset: "10",
      });
    });

    it("should return empty entries array when no logs found", async () => {
      const mockResponse: AuditLogResponse = {
        entries: [],
        total: 0,
        limit: 10,
        offset: 0,
        hasMore: false,
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const result = await auditService.getAuditLog();

      expect(result.entries).toEqual([]);
      expect(result.total).toBe(0);
    });
  });

  describe("getEntityHistory", () => {
    it("should fetch history for a policy", async () => {
      const mockHistory = [
        mockAuditEntry,
        { ...mockAuditEntry, id: "audit-2", action: "UPDATE" as const },
      ];

      vi.mocked(mockClient.get).mockResolvedValue(mockHistory);

      const result = await auditService.getEntityHistory(
        "policy",
        "policy-123",
      );

      expect(mockClient.get).toHaveBeenCalledWith(
        "/audit/policy/policy-123",
        {},
      );
      expect(result).toHaveLength(2);
    });

    it("should fetch history for an attribute", async () => {
      const attrAuditEntry = {
        ...mockAuditEntry,
        entityType: "attribute" as const,
        entityId: "attr-123",
      };

      vi.mocked(mockClient.get).mockResolvedValue([attrAuditEntry]);

      const result = await auditService.getEntityHistory(
        "attribute",
        "attr-123",
      );

      expect(mockClient.get).toHaveBeenCalledWith(
        "/audit/attribute/attr-123",
        {},
      );
      expect(result).toHaveLength(1);
      expect(result[0].entityType).toBe("attribute");
    });

    it("should fetch history with limit", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([mockAuditEntry]);

      await auditService.getEntityHistory("policy", "policy-123", 5);

      expect(mockClient.get).toHaveBeenCalledWith("/audit/policy/policy-123", {
        limit: "5",
      });
    });

    it("should return empty array when no history found", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([]);

      const result = await auditService.getEntityHistory(
        "policy",
        "policy-123",
      );

      expect(result).toEqual([]);
    });
  });

  describe("getUserActivity", () => {
    it("should fetch user activity without options", async () => {
      const mockResponse: AuditLogResponse = {
        entries: [mockAuditEntry],
        total: 1,
        limit: 10,
        offset: 0,
        hasMore: false,
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const result = await auditService.getUserActivity("user-1");

      expect(mockClient.get).toHaveBeenCalledWith("/audit/user", {
        userId: "user-1",
      });
      expect(result.entries).toHaveLength(1);
    });

    it("should fetch user activity with date range", async () => {
      const mockResponse: AuditLogResponse = {
        entries: [mockAuditEntry],
        total: 1,
        limit: 10,
        offset: 0,
        hasMore: false,
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      await auditService.getUserActivity("user-1", {
        startDate: "2024-01-01T00:00:00.000Z",
        endDate: "2024-01-31T23:59:59.999Z",
      });

      expect(mockClient.get).toHaveBeenCalledWith("/audit/user", {
        userId: "user-1",
        startDate: "2024-01-01T00:00:00.000Z",
        endDate: "2024-01-31T23:59:59.999Z",
      });
    });

    it("should fetch user activity with pagination", async () => {
      const mockResponse: AuditLogResponse = {
        entries: [mockAuditEntry],
        total: 50,
        limit: 10,
        offset: 10,
        hasMore: true,
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const result = await auditService.getUserActivity("user-1", {
        limit: 10,
        offset: 10,
      });

      expect(mockClient.get).toHaveBeenCalledWith("/audit/user", {
        userId: "user-1",
        limit: "10",
        offset: "10",
      });
      expect(result.offset).toBe(10);
    });

    it("should fetch user activity with all options", async () => {
      const mockResponse: AuditLogResponse = {
        entries: [mockAuditEntry],
        total: 5,
        limit: 20,
        offset: 0,
        hasMore: false,
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const result = await auditService.getUserActivity("user-1", {
        startDate: "2024-01-01T00:00:00.000Z",
        endDate: "2024-01-31T23:59:59.999Z",
        limit: 20,
      });

      const callArgs = vi.mocked(mockClient.get).mock.calls[0];
      expect(callArgs[0]).toBe("/audit/user");
      expect(callArgs[1]).toMatchObject({
        userId: "user-1",
        startDate: "2024-01-01T00:00:00.000Z",
        endDate: "2024-01-31T23:59:59.999Z",
        limit: "20",
      });
      expect(result.limit).toBe(20);
    });
  });

  describe("getStatistics", () => {
    it("should fetch statistics without date range", async () => {
      const mockStats: AuditStatistics = {
        totalEntries: 100,
        byAction: {
          CREATE: 30,
          UPDATE: 50,
          DELETE: 20,
        },
        byEntityType: {
          policy: 70,
          attribute: 30,
        },
        byUser: {
          "user-1": 40,
          "user-2": 60,
        },
        recentActivity: [
          { date: "2024-01-15", count: 25 },
          { date: "2024-01-14", count: 30 },
        ],
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockStats);

      const result = await auditService.getStatistics();

      expect(mockClient.get).toHaveBeenCalledWith("/audit/statistics", {});
      expect(result.totalEntries).toBe(100);
      expect(result.byAction.CREATE).toBe(30);
    });

    it("should fetch statistics with date range", async () => {
      const mockStats: AuditStatistics = {
        totalEntries: 50,
        byAction: { CREATE: 20, UPDATE: 30 },
        byEntityType: { policy: 40, attribute: 10 },
        byUser: { "user-1": 50 },
        recentActivity: [{ date: "2024-01-15", count: 25 }],
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockStats);

      await auditService.getStatistics(
        "2024-01-01T00:00:00.000Z",
        "2024-01-31T23:59:59.999Z",
      );

      expect(mockClient.get).toHaveBeenCalledWith("/audit/statistics", {
        startDate: "2024-01-01T00:00:00.000Z",
        endDate: "2024-01-31T23:59:59.999Z",
      });
    });

    it("should fetch statistics with start date only", async () => {
      const mockStats: AuditStatistics = {
        totalEntries: 75,
        byAction: { CREATE: 25, UPDATE: 50 },
        byEntityType: { policy: 60, attribute: 15 },
        byUser: { "user-1": 75 },
        recentActivity: [],
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockStats);

      await auditService.getStatistics("2024-01-01T00:00:00.000Z");

      expect(mockClient.get).toHaveBeenCalledWith("/audit/statistics", {
        startDate: "2024-01-01T00:00:00.000Z",
      });
    });
  });

  describe("exportAuditLog", () => {
    it("should export audit log as JSON by default", async () => {
      const mockBlob = new Blob(["data"], { type: "application/json" });
      vi.mocked(mockClient.get).mockResolvedValue(mockBlob);

      const result = await auditService.exportAuditLog();

      expect(mockClient.get).toHaveBeenCalledWith("/audit/export", {
        format: "json",
      });
      expect(result).toBeInstanceOf(Blob);
    });

    it("should export audit log as CSV", async () => {
      const mockBlob = new Blob(["data"], { type: "text/csv" });
      vi.mocked(mockClient.get).mockResolvedValue(mockBlob);

      const result = await auditService.exportAuditLog(undefined, "csv");

      expect(mockClient.get).toHaveBeenCalledWith("/audit/export", {
        format: "csv",
      });
      expect(result).toBeInstanceOf(Blob);
    });

    it("should export audit log with filters", async () => {
      const mockBlob = new Blob(["data"], { type: "application/json" });
      vi.mocked(mockClient.get).mockResolvedValue(mockBlob);

      const filters: AuditLogFilter = {
        entityType: "policy",
        userId: "user-1",
        action: "CREATE",
      };

      await auditService.exportAuditLog(filters, "json");

      expect(mockClient.get).toHaveBeenCalledWith("/audit/export", {
        format: "json",
        entityType: "policy",
        userId: "user-1",
        action: "CREATE",
      });
    });

    it("should export audit log with date range", async () => {
      const mockBlob = new Blob(["data"], { type: "application/json" });
      vi.mocked(mockClient.get).mockResolvedValue(mockBlob);

      const filters: AuditLogFilter = {
        startDate: "2024-01-01T00:00:00.000Z",
        endDate: "2024-01-31T23:59:59.999Z",
      };

      await auditService.exportAuditLog(filters, "csv");

      expect(mockClient.get).toHaveBeenCalledWith("/audit/export", {
        format: "csv",
        startDate: "2024-01-01T00:00:00.000Z",
        endDate: "2024-01-31T23:59:59.999Z",
      });
    });

    it("should export audit log with entity ID filter", async () => {
      const mockBlob = new Blob(["data"], { type: "application/json" });
      vi.mocked(mockClient.get).mockResolvedValue(mockBlob);

      const filters: AuditLogFilter = {
        entityId: "policy-123",
      };

      await auditService.exportAuditLog(filters);

      expect(mockClient.get).toHaveBeenCalledWith("/audit/export", {
        format: "json",
        entityId: "policy-123",
      });
    });
  });

  describe("compareVersions", () => {
    it("should compare two policy versions", async () => {
      const mockComparison = {
        oldValue: { description: "Old description" },
        newValue: { description: "New description" },
        differences: [
          {
            path: "description",
            oldValue: "Old description",
            newValue: "New description",
          },
        ],
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockComparison);

      const result = await auditService.compareVersions(
        "policy",
        "policy-123",
        "v1",
        "v2",
      );

      expect(mockClient.get).toHaveBeenCalledWith(
        "/audit/policy/policy-123/compare",
        {
          v1: "v1",
          v2: "v2",
        },
      );
      expect(result.differences).toHaveLength(1);
      expect(result.differences[0].path).toBe("description");
    });

    it("should compare two attribute versions", async () => {
      const mockComparison = {
        oldValue: { value: "old-value" },
        newValue: { value: "new-value" },
        differences: [
          {
            path: "value",
            oldValue: "old-value",
            newValue: "new-value",
          },
        ],
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockComparison);

      const result = await auditService.compareVersions(
        "attribute",
        "attr-123",
        "v1",
        "v2",
      );

      expect(mockClient.get).toHaveBeenCalledWith(
        "/audit/attribute/attr-123/compare",
        {
          v1: "v1",
          v2: "v2",
        },
      );
      expect(result.differences).toHaveLength(1);
    });

    it("should return no differences when versions are identical", async () => {
      const mockComparison = {
        oldValue: { description: "Same description" },
        newValue: { description: "Same description" },
        differences: [],
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockComparison);

      const result = await auditService.compareVersions(
        "policy",
        "policy-123",
        "v1",
        "v1",
      );

      expect(result.differences).toHaveLength(0);
    });

    it("should handle multiple differences", async () => {
      const mockComparison = {
        oldValue: { description: "Old", status: "draft" },
        newValue: { description: "New", status: "active" },
        differences: [
          { path: "description", oldValue: "Old", newValue: "New" },
          { path: "status", oldValue: "draft", newValue: "active" },
        ],
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockComparison);

      const result = await auditService.compareVersions(
        "policy",
        "policy-123",
        "v1",
        "v2",
      );

      expect(result.differences).toHaveLength(2);
    });
  });

  describe("getRecentActivity", () => {
    it("should fetch recent activity with default limit", async () => {
      const mockActivity = [
        mockAuditEntry,
        { ...mockAuditEntry, id: "audit-2", action: "UPDATE" as const },
      ];

      vi.mocked(mockClient.get).mockResolvedValue(mockActivity);

      const result = await auditService.getRecentActivity();

      expect(mockClient.get).toHaveBeenCalledWith("/audit/recent", {
        limit: "10",
      });
      expect(result).toHaveLength(2);
    });

    it("should fetch recent activity with custom limit", async () => {
      const mockActivity = [mockAuditEntry];
      vi.mocked(mockClient.get).mockResolvedValue(mockActivity);

      const result = await auditService.getRecentActivity(5);

      expect(mockClient.get).toHaveBeenCalledWith("/audit/recent", {
        limit: "5",
      });
      expect(result).toHaveLength(1);
    });

    it("should fetch recent activity with large limit", async () => {
      const mockActivity = Array(50)
        .fill(null)
        .map((_, i) => ({
          ...mockAuditEntry,
          id: `audit-${i}`,
        }));

      vi.mocked(mockClient.get).mockResolvedValue(mockActivity);

      const result = await auditService.getRecentActivity(50);

      expect(mockClient.get).toHaveBeenCalledWith("/audit/recent", {
        limit: "50",
      });
      expect(result).toHaveLength(50);
    });

    it("should return empty array when no recent activity", async () => {
      vi.mocked(mockClient.get).mockResolvedValue([]);

      const result = await auditService.getRecentActivity();

      expect(result).toEqual([]);
    });
  });
});

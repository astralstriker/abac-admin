import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Mock audit log entries (in a real app, this would be a database)
const mockAuditLog = [
  {
    id: "audit-1",
    entityType: "policy" as const,
    entityId: "policy-001",
    action: "CREATE" as const,
    userId: "user-123",
    userName: "John Doe",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    metadata: {
      source: "web-ui",
      ipAddress: "192.168.1.100",
    },
  },
  {
    id: "audit-2",
    entityType: "policy" as const,
    entityId: "policy-001",
    action: "UPDATE" as const,
    userId: "user-456",
    userName: "Jane Smith",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    oldValue: {
      name: "Read Documents Policy",
      effect: "allow",
    },
    newValue: {
      name: "Read Documents Policy (Updated)",
      effect: "allow",
    },
    metadata: {
      source: "web-ui",
      ipAddress: "192.168.1.101",
    },
  },
  {
    id: "audit-3",
    entityType: "attribute" as const,
    entityId: "user:user-123",
    action: "CREATE" as const,
    userId: "admin-001",
    userName: "Admin User",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
    metadata: {
      source: "api",
      attributeKey: "department",
    },
  },
  {
    id: "audit-4",
    entityType: "policy" as const,
    entityId: "policy-002",
    action: "ACTIVATE" as const,
    userId: "user-123",
    userName: "John Doe",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    metadata: {
      source: "web-ui",
      ipAddress: "192.168.1.100",
    },
  },
  {
    id: "audit-5",
    entityType: "attribute" as const,
    entityId: "document:doc-456",
    action: "UPDATE" as const,
    userId: "user-456",
    userName: "Jane Smith",
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(), // 20 minutes ago
    oldValue: {
      classification: "public",
    },
    newValue: {
      classification: "confidential",
    },
    metadata: {
      source: "web-ui",
      attributeKey: "classification",
    },
  },
  {
    id: "audit-6",
    entityType: "policy" as const,
    entityId: "policy-003",
    action: "DELETE" as const,
    userId: "admin-001",
    userName: "Admin User",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    metadata: {
      source: "web-ui",
      ipAddress: "192.168.1.102",
      reason: "Deprecated policy",
    },
  },
  {
    id: "audit-7",
    entityType: "policy" as const,
    entityId: "policy-004",
    action: "TEST" as const,
    userId: "user-123",
    userName: "John Doe",
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
    metadata: {
      source: "web-ui",
      testResult: "allow",
      subject: { role: "admin" },
    },
  },
  {
    id: "audit-8",
    entityType: "attribute" as const,
    entityId: "user:user-789",
    action: "DELETE" as const,
    userId: "admin-001",
    userName: "Admin User",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    metadata: {
      source: "api",
      attributeKey: "tempPermission",
    },
  },
  {
    id: "audit-9",
    entityType: "policy" as const,
    entityId: "policy-002",
    action: "DEACTIVATE" as const,
    userId: "user-456",
    userName: "Jane Smith",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 minutes ago
    metadata: {
      source: "web-ui",
      ipAddress: "192.168.1.101",
      reason: "Testing deactivation",
    },
  },
  {
    id: "audit-10",
    entityType: "attribute" as const,
    entityId: "organization:org-789",
    action: "UPDATE" as const,
    userId: "user-123",
    userName: "John Doe",
    timestamp: new Date(Date.now() - 1000 * 30).toISOString(), // 30 seconds ago
    oldValue: {
      active: false,
    },
    newValue: {
      active: true,
    },
    metadata: {
      source: "web-ui",
      attributeKey: "active",
    },
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get filter parameters
    const entityType = searchParams.get("entityType");
    const entityId = searchParams.get("entityId");
    const userId = searchParams.get("userId");
    const action = searchParams.get("action");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    // Filter audit log entries
    let filteredEntries = [...mockAuditLog];

    if (entityType) {
      filteredEntries = filteredEntries.filter(
        (entry) => entry.entityType === entityType,
      );
    }

    if (entityId) {
      filteredEntries = filteredEntries.filter(
        (entry) => entry.entityId === entityId,
      );
    }

    if (userId) {
      filteredEntries = filteredEntries.filter(
        (entry) => entry.userId === userId,
      );
    }

    if (action) {
      filteredEntries = filteredEntries.filter(
        (entry) => entry.action === action,
      );
    }

    if (startDate) {
      const start = new Date(startDate);
      filteredEntries = filteredEntries.filter(
        (entry) => new Date(entry.timestamp) >= start,
      );
    }

    if (endDate) {
      const end = new Date(endDate);
      filteredEntries = filteredEntries.filter(
        (entry) => new Date(entry.timestamp) <= end,
      );
    }

    // Sort by timestamp (newest first)
    filteredEntries.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

    // Apply pagination
    const total = filteredEntries.length;
    const paginatedEntries = filteredEntries.slice(offset, offset + limit);
    const hasMore = offset + limit < total;

    return NextResponse.json(
      {
        entries: paginatedEntries,
        total,
        limit,
        offset,
        hasMore,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching audit log:", error);
    return NextResponse.json(
      { error: "Failed to fetch audit log" },
      { status: 500 },
    );
  }
}

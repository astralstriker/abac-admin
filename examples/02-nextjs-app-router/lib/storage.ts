// Shared in-memory storage for the demo application
// This simulates a database and allows data to persist across requests during the session

// Attribute storage
export const attributesStore = new Map<string, Record<string, any>>();

// Audit log storage
export const auditLogStore: any[] = [];

// Initialize with sample data
function initializeSampleData() {
  if (attributesStore.size === 0) {
    attributesStore.set("user:user-123", {
      role: "admin",
      department: "engineering",
      level: 5,
      verified: true,
      joinDate: "2023-01-15",
      permissions: ["read", "write", "delete"],
    });

    attributesStore.set("document:doc-456", {
      classification: "confidential",
      owner: "user-123",
      createdAt: "2024-01-10",
      tags: ["finance", "Q1", "report"],
      version: 3,
    });

    attributesStore.set("organization:org-789", {
      name: "Acme Corp",
      industry: "Technology",
      size: "enterprise",
      country: "US",
      active: true,
    });
  }

  if (auditLogStore.length === 0) {
    auditLogStore.push(
      {
        id: "audit-1",
        entityType: "policy" as const,
        entityId: "policy-001",
        action: "CREATE" as const,
        userId: "user-123",
        userName: "John Doe",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
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
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
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
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
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
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
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
        timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
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
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
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
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
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
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
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
        timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
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
        timestamp: new Date(Date.now() - 1000 * 30).toISOString(),
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
    );
  }
}

// Initialize on module load
initializeSampleData();

// Helper function to add audit log entries
export function addAuditEntry(
  entityType: "policy" | "attribute",
  entityId: string,
  action: "CREATE" | "UPDATE" | "DELETE" | "ACTIVATE" | "DEACTIVATE" | "TEST",
  userId: string,
  oldValue?: any,
  newValue?: any,
  metadata?: any,
) {
  const entry = {
    id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    entityType,
    entityId,
    action,
    userId: userId || "anonymous",
    userName: "Demo User",
    timestamp: new Date().toISOString(),
    ...(oldValue !== undefined && { oldValue }),
    ...(newValue !== undefined && { newValue }),
    metadata: {
      source: "api",
      ...metadata,
    },
  };
  auditLogStore.unshift(entry);

  // Keep only last 100 entries to prevent memory issues
  if (auditLogStore.length > 100) {
    auditLogStore.length = 100;
  }

  return entry;
}

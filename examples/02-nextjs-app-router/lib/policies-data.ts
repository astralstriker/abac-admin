import {
  ComparisonOperator,
  Effect,
  LogicalOperator,
  type ABACPolicy,
} from "abac-engine";

/**
 * Sample ABAC Policies demonstrating best practices from documentation:
 *
 * ✅ DO:
 * - Use meaningful, descriptive policy IDs (e.g., "document-read-same-department")
 * - Add clear descriptions explaining business logic
 * - Use priority for exceptions (higher = evaluated first)
 * - Add obligations for audit trails
 * - Include version information for tracking
 * - Use targets to pre-filter policy applicability
 * - Keep conditions simple and maintainable
 *
 * ❌ DON'T:
 * - Use generic IDs like "policy-1", "policy-2"
 * - Create overly complex nested conditions
 * - Forget to version policies
 * - Skip audit obligations for sensitive operations
 *
 * These policies demonstrate:
 * - Pure attribute-based decisions
 * - Context-aware access control
 * - Time-bound access
 * - Clearance-level security
 * - Emergency break-glass procedures
 * - Compliance requirements (geo-restrictions, certifications)
 */

// In-memory policy storage using proper abac-engine ABACPolicy format
export const samplePolicies: ABACPolicy[] = [
  {
    id: "document-read-same-department",
    version: "1.0.0",
    description:
      "Allow users to read documents from their own department during business hours. " +
      "This policy implements department-based data isolation while ensuring access " +
      "is limited to active business hours for security.",
    target: {
      action: {
        operator: ComparisonOperator.Equals,
        left: { category: "action", attributeId: "type" },
        right: "read",
      },
      resource: {
        operator: ComparisonOperator.Equals,
        left: { category: "resource", attributeId: "type" },
        right: "document",
      },
    },
    condition: {
      operator: LogicalOperator.And,
      conditions: [
        {
          operator: ComparisonOperator.Equals,
          left: { category: "subject", attributeId: "department" },
          right: { category: "resource", attributeId: "department" },
        },
        {
          operator: ComparisonOperator.GreaterThanOrEqual,
          left: { category: "environment", attributeId: "currentHour" },
          right: 9,
        },
        {
          operator: ComparisonOperator.LessThan,
          left: { category: "environment", attributeId: "currentHour" },
          right: 18,
        },
        {
          operator: ComparisonOperator.Equals,
          left: { category: "subject", attributeId: "accountStatus" },
          right: "active",
        },
      ],
    },
    effect: Effect.Permit,
    priority: 100, // Normal priority for base access rules
    obligations: [
      {
        id: "log-document-access",
        type: "log",
        parameters: {
          level: "info",
          category: "document-access",
          action: "read",
        },
      },
    ],
    metadata: {
      createdBy: "policy-admin",
      createdAt: new Date("2024-01-10T10:00:00Z"),
      tags: ["document-access", "department-based", "business-hours"],
    },
  },

  {
    id: "document-edit-owner-or-collaborator",
    version: "1.0.0",
    description:
      "Allow document owners and designated collaborators to edit documents. " +
      "Enforces ownership principle: users can only modify content they own or " +
      "have been explicitly granted editor access to. Prevents modification of " +
      "locked or archived documents.",
    target: {
      action: {
        operator: ComparisonOperator.Equals,
        left: { category: "action", attributeId: "type" },
        right: "edit",
      },
      resource: {
        operator: ComparisonOperator.Equals,
        left: { category: "resource", attributeId: "type" },
        right: "document",
      },
    },
    condition: {
      operator: LogicalOperator.And,
      conditions: [
        {
          operator: LogicalOperator.Or,
          conditions: [
            {
              operator: ComparisonOperator.Equals,
              left: { category: "subject", attributeId: "userId" },
              right: { category: "resource", attributeId: "ownerId" },
            },
            {
              operator: ComparisonOperator.In,
              left: { category: "subject", attributeId: "userId" },
              right: { category: "resource", attributeId: "collaborators" },
            },
          ],
        },
        {
          operator: ComparisonOperator.NotEquals,
          left: { category: "resource", attributeId: "status" },
          right: "archived",
        },
        {
          operator: ComparisonOperator.NotEquals,
          left: { category: "resource", attributeId: "locked" },
          right: true,
        },
      ],
    },
    effect: Effect.Permit,
    priority: 200, // Higher than read-only policies
    obligations: [
      {
        id: "log-document-modification",
        type: "log",
        parameters: {
          level: "info",
          category: "document-edit",
          includeUserContext: true,
          captureSnapshot: true,
        },
      },
    ],
    metadata: {
      createdBy: "policy-admin",
      createdAt: new Date("2024-01-11T09:30:00Z"),
      tags: ["document-access", "ownership", "collaboration"],
    },
  },

  {
    id: "confidential-access-high-clearance-only",
    version: "1.0.0",
    description:
      "Restrict access to confidential/classified resources based on security clearance, " +
      "background check status, and need-to-know principle. Implements defense-in-depth " +
      "by checking multiple security attributes and environmental risk factors.",
    target: {
      resource: {
        operator: ComparisonOperator.In,
        left: { category: "resource", attributeId: "classification" },
        right: ["confidential", "secret", "top-secret"],
      },
    },
    condition: {
      operator: LogicalOperator.And,
      conditions: [
        {
          operator: ComparisonOperator.GreaterThanOrEqual,
          left: { category: "subject", attributeId: "clearanceLevel" },
          right: { category: "resource", attributeId: "requiredClearance" },
        },
        {
          operator: ComparisonOperator.Equals,
          left: { category: "subject", attributeId: "backgroundCheckStatus" },
          right: "approved",
        },
        {
          operator: ComparisonOperator.In,
          left: { category: "subject", attributeId: "department" },
          right: { category: "resource", attributeId: "authorizedDepartments" },
        },
        {
          operator: ComparisonOperator.LessThanOrEqual,
          left: { category: "environment", attributeId: "riskScore" },
          right: 30,
        },
      ],
    },
    effect: Effect.Permit,
    priority: 500, // Elevated priority for security-critical policies
    obligations: [
      {
        id: "audit-classified-access",
        type: "log",
        parameters: {
          level: "warning",
          category: "classified-access",
          includeFullContext: true,
          retentionDays: 2555, // 7 years
        },
      },
      {
        id: "notify-security-team",
        type: "notify",
        parameters: {
          recipient: "security-operations@example.com",
          template: "classified-access-notification",
        },
      },
    ],
    advice: [
      {
        id: "security-reminder",
        type: "warning",
        parameters: {
          message:
            "You are accessing classified information. Remember your security obligations and non-disclosure agreements.",
        },
      },
    ],
    metadata: {
      createdBy: "security-admin",
      createdAt: new Date("2024-01-12T14:00:00Z"),
      tags: ["security", "classification", "clearance-based", "NIST-800-53"],
    },
  },

  {
    id: "data-export-geo-restriction",
    version: "1.0.0",
    description:
      "Prevent data export operations from restricted geographic locations to comply " +
      "with data sovereignty laws, export control regulations, and sanctions. " +
      "This is a DENY policy that overrides other permissions when geographic " +
      "restrictions apply.",
    target: {
      action: {
        operator: ComparisonOperator.In,
        left: { category: "action", attributeId: "type" },
        right: ["export", "download", "transfer"],
      },
      resource: {
        operator: ComparisonOperator.Contains,
        left: { category: "resource", attributeId: "dataClassification" },
        right: "regulated",
      },
    },
    condition: {
      operator: ComparisonOperator.In,
      left: { category: "environment", attributeId: "geoLocation" },
      right: ["CN", "RU", "KP", "IR", "SY"], // ISO country codes
    },
    effect: Effect.Deny,
    priority: 800, // Very high priority - DENY rules should override most permits
    obligations: [
      {
        id: "log-restricted-export-attempt",
        type: "log",
        parameters: {
          level: "error",
          category: "compliance-violation",
          immediate: true,
        },
      },
      {
        id: "alert-compliance-team",
        type: "notify",
        parameters: {
          recipient: "compliance@example.com",
          urgency: "high",
          template: "geo-restriction-violation",
        },
      },
    ],
    advice: [
      {
        id: "geo-restriction-info",
        type: "info",
        parameters: {
          message:
            "This operation is restricted in your current location due to data sovereignty and export control regulations.",
        },
      },
    ],
    metadata: {
      createdBy: "compliance-admin",
      createdAt: new Date("2024-01-13T08:00:00Z"),
      tags: [
        "compliance",
        "geo-restriction",
        "data-export",
        "deny-rule",
        "GDPR",
        "EAR",
        "ITAR",
        "quarterly-review",
      ],
    },
  },

  {
    id: "financial-data-access-context-aware",
    version: "1.0.0",
    description:
      "Grant access to financial data based on job function, valid training certification, " +
      "and secure access context (corporate network or VPN with MFA). Ensures compliance " +
      "with financial data handling regulations (SOX, PCI-DSS) through multi-factor verification.",
    target: {
      resource: {
        operator: ComparisonOperator.Equals,
        left: { category: "resource", attributeId: "category" },
        right: "financial-data",
      },
    },
    condition: {
      operator: LogicalOperator.And,
      conditions: [
        {
          operator: ComparisonOperator.In,
          left: { category: "subject", attributeId: "jobFunction" },
          right: ["accountant", "auditor", "financial-analyst", "controller"],
        },
        {
          operator: ComparisonOperator.Contains,
          left: { category: "subject", attributeId: "certifications" },
          right: "financial-data-handling",
        },
        {
          operator: ComparisonOperator.GreaterThan,
          left: { category: "subject", attributeId: "certificationExpiryDate" },
          right: { category: "environment", attributeId: "currentDate" },
        },
        {
          operator: LogicalOperator.Or,
          conditions: [
            {
              operator: ComparisonOperator.Equals,
              left: { category: "environment", attributeId: "networkType" },
              right: "corporate",
            },
            {
              operator: LogicalOperator.And,
              conditions: [
                {
                  operator: ComparisonOperator.Equals,
                  left: {
                    category: "environment",
                    attributeId: "vpnConnected",
                  },
                  right: true,
                },
                {
                  operator: ComparisonOperator.Equals,
                  left: { category: "subject", attributeId: "mfaVerified" },
                  right: true,
                },
              ],
            },
          ],
        },
      ],
    },
    effect: Effect.Permit,
    priority: 300, // Moderate priority for specialized access
    obligations: [
      {
        id: "audit-financial-access",
        type: "log",
        parameters: {
          level: "info",
          category: "financial-data-access",
          retentionDays: 2555, // 7 years for financial compliance
        },
      },
    ],
    metadata: {
      createdBy: "compliance-admin",
      createdAt: new Date("2024-01-14T16:30:00Z"),
      tags: [
        "financial",
        "certification",
        "compliance",
        "context-aware",
        "SOX",
        "PCI-DSS",
        "annual-review",
      ],
    },
  },

  {
    id: "admin-operations-elevated-privileges",
    version: "1.0.0",
    description:
      "Allow privileged administrative operations only for verified admin users with " +
      "active MFA, from trusted IP ranges, and with recent session authentication. " +
      "Implements principle of least privilege with time-based session validation.",
    target: {
      action: {
        operator: ComparisonOperator.In,
        left: { category: "action", attributeId: "type" },
        right: ["delete", "purge", "configure", "grant-permission"],
      },
    },
    condition: {
      operator: LogicalOperator.And,
      conditions: [
        {
          operator: ComparisonOperator.Contains,
          left: { category: "subject", attributeId: "permissions" },
          right: "admin",
        },
        {
          operator: ComparisonOperator.Equals,
          left: { category: "subject", attributeId: "mfaVerified" },
          right: true,
        },
        {
          operator: ComparisonOperator.In,
          left: { category: "environment", attributeId: "ipAddress" },
          right: { category: "environment", attributeId: "trustedIpRanges" },
        },
        {
          operator: ComparisonOperator.LessThan,
          left: { category: "environment", attributeId: "sessionAge" },
          right: 1800, // 30 minutes in seconds
        },
      ],
    },
    effect: Effect.Permit,
    priority: 400, // Elevated priority for privileged operations
    obligations: [
      {
        id: "audit-admin-action",
        type: "log",
        parameters: {
          level: "warning",
          category: "privileged-operation",
          includeFullContext: true,
          immediate: true,
        },
      },
      {
        id: "notify-security-monitoring",
        type: "notify",
        parameters: {
          recipient: "security-monitoring@example.com",
          template: "admin-operation-alert",
        },
      },
    ],
    metadata: {
      createdBy: "security-admin",
      createdAt: new Date("2024-01-15T11:15:00Z"),
      tags: [
        "admin",
        "privileged-access",
        "mfa",
        "audit",
        "critical",
        "monthly-review",
      ],
    },
  },

  {
    id: "temp-contractor-limited-access",
    version: "1.0.0",
    description:
      "Provide time-bound, limited access for temporary contractors with automatic " +
      "expiration. Access is restricted to assigned projects, read-only operations, " +
      "and non-confidential resources. Automatically denies access past contract end date.",
    target: {
      subject: {
        operator: ComparisonOperator.Equals,
        left: { category: "subject", attributeId: "employmentType" },
        right: "contractor",
      },
    },
    condition: {
      operator: LogicalOperator.And,
      conditions: [
        {
          operator: ComparisonOperator.LessThan,
          left: { category: "environment", attributeId: "currentDate" },
          right: { category: "subject", attributeId: "contractEndDate" },
        },
        {
          operator: ComparisonOperator.In,
          left: { category: "action", attributeId: "type" },
          right: ["read", "comment"],
        },
        {
          operator: ComparisonOperator.In,
          left: { category: "resource", attributeId: "classification" },
          right: ["public", "internal"],
        },
        {
          operator: ComparisonOperator.Contains,
          left: { category: "subject", attributeId: "assignedProjects" },
          right: { category: "resource", attributeId: "projectId" },
        },
      ],
    },
    effect: Effect.Permit,
    priority: 250, // Medium priority for limited access
    advice: [
      {
        id: "contractor-access-notice",
        type: "info",
        parameters: {
          message:
            "You are accessing resources as a contractor. Your access is limited and will expire on your contract end date.",
        },
      },
    ],
    metadata: {
      createdBy: "hr-admin",
      createdAt: new Date("2024-01-16T13:45:00Z"),
      tags: [
        "contractor",
        "time-bound",
        "limited-access",
        "temporary-workforce",
      ],
    },
  },

  {
    id: "emergency-break-glass-access",
    version: "1.0.0",
    description:
      "Emergency break-glass procedure allowing elevated access during critical incidents " +
      "with full audit trail and mandatory post-incident review. This policy grants " +
      "exceptional access that overrides normal restrictions but requires incident " +
      "context and triggers immediate notifications to leadership.",
    target: {
      environment: {
        operator: ComparisonOperator.Equals,
        left: { category: "environment", attributeId: "emergencyMode" },
        right: true,
      },
    },
    condition: {
      operator: LogicalOperator.And,
      conditions: [
        {
          operator: ComparisonOperator.In,
          left: { category: "subject", attributeId: "role" },
          right: ["incident-responder", "senior-engineer", "on-call-admin"],
        },
        {
          operator: ComparisonOperator.Equals,
          left: { category: "subject", attributeId: "onCallStatus" },
          right: "active",
        },
        {
          operator: ComparisonOperator.NotEquals,
          left: { category: "environment", attributeId: "incidentTicketId" },
          right: "",
        },
      ],
    },
    effect: Effect.Permit,
    priority: 900, // Highest priority for emergency access - overrides most policies
    obligations: [
      {
        id: "break-glass-audit",
        type: "log",
        parameters: {
          level: "critical",
          category: "emergency-access",
          includeFullContext: true,
          immediate: true,
          alertRecipients: ["security@example.com", "leadership@example.com"],
        },
      },
      {
        id: "create-review-task",
        type: "custom",
        parameters: {
          action: "create-post-incident-review",
          assignTo: "security-team",
        },
      },
    ],
    advice: [
      {
        id: "break-glass-warning",
        type: "warning",
        parameters: {
          message:
            "⚠️ EMERGENCY ACCESS ACTIVATED - All actions are being recorded and will be reviewed. Only perform actions necessary to resolve the incident.",
        },
      },
    ],
    metadata: {
      createdBy: "security-admin",
      createdAt: new Date("2024-01-17T10:20:00Z"),
      tags: [
        "emergency",
        "break-glass",
        "incident-response",
        "high-priority",
        "critical",
        "requires-post-review",
        "quarterly-review",
      ],
    },
  },
];

// In-memory storage
let policies = [...samplePolicies];

export function getAllPolicies(): ABACPolicy[] {
  return [...policies];
}

export function getPolicyById(id: string): ABACPolicy | undefined {
  return policies.find((p) => p.id === id);
}

export function createPolicy(policy: ABACPolicy): ABACPolicy {
  policies.push(policy);
  return policy;
}

export function updatePolicy(
  id: string,
  updates: Partial<ABACPolicy>,
): ABACPolicy | null {
  const index = policies.findIndex((p) => p.id === id);
  if (index === -1) return null;

  policies[index] = {
    ...policies[index],
    ...updates,
    id: policies[index].id, // Prevent ID changes
    metadata: {
      ...policies[index].metadata,
      ...updates.metadata,
      modifiedAt: new Date(),
    },
  };

  return policies[index];
}

export function deletePolicy(id: string): boolean {
  const initialLength = policies.length;
  policies = policies.filter((p) => p.id !== id);
  return policies.length < initialLength;
}

export function searchPolicies(query: string): ABACPolicy[] {
  const lowerQuery = query.toLowerCase();
  return policies.filter(
    (p) =>
      p.id.toLowerCase().includes(lowerQuery) ||
      p.description?.toLowerCase().includes(lowerQuery) ||
      p.metadata?.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  );
}

/**
 * Get policies by priority range for testing priority-based evaluation
 */
export function getPoliciesByPriority(
  minPriority: number,
  maxPriority: number,
): ABACPolicy[] {
  return policies.filter(
    (p) =>
      p.priority !== undefined &&
      p.priority >= minPriority &&
      p.priority <= maxPriority,
  );
}

/**
 * Get policies by effect for analysis
 */
export function getPoliciesByEffect(effect: "Permit" | "Deny"): ABACPolicy[] {
  return policies.filter((p) => p.effect === effect);
}

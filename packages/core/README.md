# @devcraft-ts/abac-admin-core

> Lightweight, framework-agnostic core for ABAC Policy Administration

[![npm version](https://img.shields.io/npm/v/@devcraft-ts/abac-admin-core.svg)](https://www.npmjs.com/package/@devcraft-ts/abac-admin-core)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@devcraft-ts/abac-admin-core)](https://bundlephobia.com/package/@devcraft-ts/abac-admin-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Live Demo & Documentation

**[View Live Demo →](https://abac-admin-02-nextjs-app-router.vercel.app/)**

Explore a fully functional demo application showcasing all features, including complete documentation for **abac-engine** integration and best practices.

## Overview

`@devcraft-ts/abac-admin-core` is a minimal, framework-agnostic package that provides the foundational building blocks for ABAC (Attribute-Based Access Control) policy administration. It includes:

- **API Client**: Pure fetch-based client for communicating with ABAC backends
- **Type Definitions**: Comprehensive TypeScript types and Zod schemas
- **Service Classes**: PolicyService, AttributeService, and AuditService
- **Utilities**: Condition builders, validators, and formatters
- **Zero UI Dependencies**: Perfect for server-side, CLI, or custom implementations

## Features

✅ **Ultra-Lightweight**: ~15kb minified+gzipped
✅ **Framework Agnostic**: Works with any JavaScript environment
✅ **Type-Safe**: Full TypeScript support with Zod validation
✅ **Tree-Shakeable**: Import only what you need
✅ **Modern**: ES2020+, ESM and CJS support
✅ **Well-Tested**: Comprehensive test coverage
✅ **Built on abac-engine**: Leverages the official [abac-engine](https://www.npmjs.com/package/abac-engine) for policy evaluation

## Installation

```bash
npm install @devcraft-ts/abac-admin-core zod
```

```bash
yarn add @devcraft-ts/abac-admin-core zod
```

```bash
pnpm add @devcraft-ts/abac-admin-core zod
```

## Quick Start

### Initialize the Client

```typescript
import { ABACAdminClient, PolicyService } from "@devcraft-ts/abac-admin-core";

const client = new ABACAdminClient({
  baseURL: "https://api.example.com/abac",
  headers: {
    Authorization: "Bearer YOUR_TOKEN",
  },
});

const policyService = new PolicyService(client);
```

### Working with Policies

```typescript
// List all policies
const policies = await policyService.list();

// Get a specific policy
const policy = await policyService.get("policy-id");

// Create a new policy
const newPolicy = await policyService.create({
  policyId: "my-policy",
  version: "1.0.0",
  effect: "PERMIT",
  description: "Allow users to view documents",
  conditions: {
    type: "equals",
    left: { category: "action", key: "type" },
    right: "view",
  },
  isActive: true,
  category: "document",
  tags: ["document", "read"],
  createdBy: "user-123",
});

// Update a policy
const updated = await policyService.update("policy-id", {
  description: "Updated description",
});

// Activate/Deactivate
await policyService.activate("policy-id");
await policyService.deactivate("policy-id");

// Delete a policy
await policyService.delete("policy-id");
```

### Building Conditions

```typescript
import { ConditionBuilder } from "@devcraft-ts/abac-admin-core";

// Simple condition
const condition1 = ConditionBuilder.equals(
  ConditionBuilder.attr("subject", "role"),
  "admin",
);

// Complex condition with AND/OR
const condition2 = ConditionBuilder.and(
  ConditionBuilder.equals(
    ConditionBuilder.attr("subject", "department"),
    "engineering",
  ),
  ConditionBuilder.or(
    ConditionBuilder.in(ConditionBuilder.attr("subject", "role"), [
      "admin",
      "manager",
    ]),
    ConditionBuilder.gte(ConditionBuilder.attr("subject", "level"), 5),
  ),
);

// Use in policy
const policy = await policyService.create({
  policyId: "complex-policy",
  version: "1.0.0",
  effect: "PERMIT",
  description: "Complex access control",
  conditions: condition2,
  isActive: true,
  category: "access",
  tags: ["complex"],
  createdBy: "admin",
});
```

### Working with Attributes

```typescript
import { AttributeService } from "@devcraft-ts/abac-admin-core";

const attributeService = new AttributeService(client);

// Get all attributes for a resource
const attributes = await attributeService.getResourceAttributes(
  "user",
  "user-123",
);

// Set a single attribute
await attributeService.setResourceAttribute(
  "user",
  "user-123",
  "department",
  "engineering",
);

// Bulk set attributes
await attributeService.bulkSetAttributes("user", "user-123", {
  department: "engineering",
  role: "senior-engineer",
  level: 5,
});

// Get attribute history
const history = await attributeService.getHistory("user", "user-123", "role");

// Compare attributes between resources
const comparison = await attributeService.compareAttributes(
  "user",
  "user-123",
  "user-456",
);
```

### Audit Logs

```typescript
import { AuditService } from "@devcraft-ts/abac-admin-core";

const auditService = new AuditService(client);

// Get audit log with filters
const auditLog = await auditService.getAuditLog({
  entityType: "policy",
  action: "UPDATE",
  startDate: "2024-01-01T00:00:00Z",
  limit: 50,
});

// Get entity history
const policyHistory = await auditService.getEntityHistory(
  "policy",
  "policy-id",
);

// Get user activity
const userActivity = await auditService.getUserActivity("user-123", {
  startDate: "2024-01-01T00:00:00Z",
  limit: 100,
});

// Get statistics
const stats = await auditService.getStatistics();
```

## API Reference

### ABACAdminClient

The base HTTP client for all API operations.

```typescript
const client = new ABACAdminClient({
  baseURL: string;           // Required: API base URL
  headers?: Record<string, string>;  // Optional: Custom headers
  timeout?: number;          // Optional: Request timeout (default: 30000ms)
  onError?: (error: Error) => void;  // Optional: Error handler
  onSuccess?: (response: Response) => void;  // Optional: Success handler
});
```

### PolicyService

Service for managing policies.

**Methods:**

- `list(filters?: PolicyFilters): Promise<Policy[]>`
- `get(id: string): Promise<Policy>`
- `create(policy: PolicyInput): Promise<Policy>`
- `update(id: string, policy: PolicyUpdate): Promise<Policy>`
- `delete(id: string): Promise<void>`
- `activate(id: string): Promise<Policy>`
- `deactivate(id: string): Promise<Policy>`
- `test(request: PolicyTestRequest): Promise<PolicyTestResult>`
- `getVersions(policyId: string): Promise<Policy[]>`
- `export(ids?: string[]): Promise<PolicyExportResult>`
- `import(file: File | Blob): Promise<PolicyImportResult>`
- `duplicate(id: string, newPolicyId?: string): Promise<Policy>`
- `bulkActivate(ids: string[]): Promise<{ success: number; failed: number }>`
- `bulkDeactivate(ids: string[]): Promise<{ success: number; failed: number }>`
- `bulkDelete(ids: string[]): Promise<{ success: number; failed: number }>`
- `search(query: string, filters?: PolicyFilters): Promise<Policy[]>`

### AttributeService

Service for managing resource attributes.

**Methods:**

- `getResourceAttributes(resourceType: ResourceType, resourceId: string): Promise<Record<string, any>>`
- `getResourceAttribute(resourceType: ResourceType, resourceId: string, key: string): Promise<any>`
- `setResourceAttribute(resourceType: ResourceType, resourceId: string, key: string, value: any): Promise<AttributeValue>`
- `bulkSetAttributes(resourceType: ResourceType, resourceId: string, attributes: BulkAttributeInput): Promise<AttributeValue[]>`
- `deleteResourceAttribute(resourceType: ResourceType, resourceId: string, key: string): Promise<void>`
- `bulkDeleteAttributes(resourceType: ResourceType, resourceId: string, keys: string[]): Promise<BulkAttributeResult>`
- `getHistory(resourceType: ResourceType, resourceId: string, key?: string, options?: AttributeHistoryOptions): Promise<AttributeValue[]>`
- `compareAttributes(resourceType: ResourceType, resourceId1: string, resourceId2: string): Promise<ComparisonResult>`
- `copyAttributes(...): Promise<BulkAttributeResult>`
- `validateAttribute(...): Promise<{ valid: boolean; errors?: string[] }>`
- `searchResources(resourceType: ResourceType, attributeKey: string, attributeValue: any): Promise<string[]>`

### AuditService

Service for retrieving audit logs.

**Methods:**

- `getAuditLog(filters?: AuditLogFilter): Promise<AuditLogResponse>`
- `getEntityHistory(entityType: 'policy' | 'attribute', entityId: string, limit?: number): Promise<AuditLogEntry[]>`
- `getUserActivity(userId: string, options?: {...}): Promise<AuditLogResponse>`
- `getStatistics(startDate?: string, endDate?: string): Promise<AuditStatistics>`
- `exportAuditLog(filters?: AuditLogFilter, format?: 'json' | 'csv'): Promise<Blob>`
- `compareVersions(...): Promise<ComparisonResult>`
- `getRecentActivity(limit?: number): Promise<AuditLogEntry[]>`

### ConditionBuilder

Utility class for building policy conditions.

```typescript
// Comparison operators
ConditionBuilder.equals(left, right);
ConditionBuilder.notEquals(left, right);
ConditionBuilder.in(left, array);
ConditionBuilder.notIn(left, array);
ConditionBuilder.gte(left, right);
ConditionBuilder.gt(left, right);
ConditionBuilder.lte(left, right);
ConditionBuilder.lt(left, right);
ConditionBuilder.contains(left, right);
ConditionBuilder.startsWith(left, right);
ConditionBuilder.endsWith(left, right);
ConditionBuilder.matches(left, pattern);

// Logical operators
ConditionBuilder.and(...conditions);
ConditionBuilder.or(...conditions);
ConditionBuilder.not(condition);

// Helper
ConditionBuilder.attr(category, key); // Create attribute reference
```

### Validators

Utility functions for validation.

```typescript
validatePolicyId(policyId: string): boolean
validateVersion(version: string): boolean
validatePolicyStructure(policy: Partial<Policy>): { valid: boolean; errors: string[] }
validateConditionStructure(condition: Condition): { valid: boolean; errors: string[] }
validateAttributeKey(key: string): boolean
validateResourceId(resourceId: string): boolean
validateAttributeValue(value: any, expectedType: string): { valid: boolean; error?: string }
validateTag(tag: string): boolean
validateCategory(category: string): boolean
validatePolicyInput(input: PolicyInput): { valid: boolean; errors: string[] }
validateEmail(email: string): boolean
validateISODate(dateString: string): boolean
validatePagination(limit?: number, offset?: number): { valid: boolean; errors: string[] }
```

### Formatters

Utility functions for formatting data for display.

```typescript
formatDate(dateString: string, includeTime?: boolean): string
formatRelativeTime(dateString: string): string
formatPolicyEffect(effect: PolicyEffect): string
formatPolicyStatus(isActive: boolean): { label: string; color: string }
formatCondition(condition: Condition, depth?: number): string
formatConditionCompact(condition: Condition): string
formatAuditAction(action: AuditAction): string
formatAuditMessage(entry: AuditLogEntry): string
formatResourceType(resourceType: ResourceType): string
formatAttributeValue(value: any): string
formatFileSize(bytes: number): string
formatNumber(num: number): string
formatPercentage(value: number, decimals?: number): string
formatDuration(ms: number): string
truncate(str: string, maxLength: number, suffix?: string): string
formatPolicySummary(policy: Policy): string
formatTags(tags: string[]): string
toTitleCase(str: string): string
```

## Types

All types are exported and fully documented with TypeScript:

```typescript
import type {
  // Policy types
  Policy,
  PolicyInput,
  PolicyUpdate,
  PolicyEffect,
  Condition,
  ConditionType,
  AttributeRef,

  // Attribute types
  AttributeValue,
  AttributeDefinition,
  ResourceType,
  AttributeValueType,

  // Audit types
  AuditLogEntry,
  AuditAction,
  AuditLogFilter,

  // API types
  PolicyFilters,
  PolicyTestRequest,
  PolicyTestResult,
  AuditLogResponse,
  AuditStatistics,
} from "@devcraft-ts/abac-admin-core";
```

## Error Handling

The client throws standard JavaScript errors. Wrap calls in try-catch:

```typescript
try {
  const policy = await policyService.get("policy-id");
} catch (error) {
  if (error instanceof Error) {
    console.error("API Error:", error.message);
  }
}
```

Use the optional error handler for global error handling:

```typescript
const client = new ABACAdminClient({
  baseURL: "https://api.example.com",
  onError: (error) => {
    console.error("ABAC API Error:", error);
    // Send to error tracking service
  },
});
```

## Advanced Usage

### Custom Headers and Authentication

```typescript
const client = new ABACAdminClient({
  baseURL: process.env.ABAC_API_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "X-Tenant-ID": getTenantId(),
  },
});
```

### Timeout Configuration

```typescript
const client = new ABACAdminClient({
  baseURL: "https://api.example.com",
  timeout: 60000, // 60 seconds
});
```

### Pagination

```typescript
const auditLog = await auditService.getAuditLog({
  limit: 100,
  offset: 0,
});

console.log(`Showing ${auditLog.entries.length} of ${auditLog.total} entries`);
console.log(`Has more: ${auditLog.hasMore}`);
```

## Usage with Other Frameworks

This core package is framework-agnostic. For framework-specific integrations:

- **React**: Use `@devcraft-ts/abac-admin-react` (headless hooks)
- **Next.js**: Use `@devcraft-ts/abac-admin-nextjs` (server utilities)
- **Vue**: Use `@devcraft-ts/abac-admin-vue` (composables) - Coming soon
- **Angular**: Use `@devcraft-ts/abac-admin-angular` (services) - Coming soon

## Related Projects

This package is built on top of **[abac-engine](https://www.npmjs.com/package/abac-engine)** - the official ABAC policy evaluation engine. For complete documentation on abac-engine integration, policy best practices, and examples, visit the [live demo](https://abac-admin-02-nextjs-app-router.vercel.app/).

## Contributing

Contributions are welcome! Please read our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

MIT © [astralstriker]

## Support

- [Live Demo & Documentation](https://abac-admin-02-nextjs-app-router.vercel.app/)
- [abac-engine Documentation](https://abac-admin-02-nextjs-app-router.vercel.app/)
- [GitHub Issues](https://github.com/astralstriker/abac-admin/issues)
- [npm Package](https://www.npmjs.com/package/@devcraft-ts/abac-admin-core)

---

**Built with ❤️ for developers who need lightweight, flexible ABAC policy management.**

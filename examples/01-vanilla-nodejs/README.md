# Vanilla Node.js Example

This example demonstrates how to use `@devcraft-ts/abac-admin-core` in a pure Node.js environment without any framework.

## What This Example Shows

- ✅ Basic client initialization
- ✅ CRUD operations on policies
- ✅ Attribute management
- ✅ Audit log queries
- ✅ Complex condition building
- ✅ Error handling
- ✅ Batch operations

## Prerequisites

- Node.js 18+ (for native fetch support)
- npm or yarn

## Installation

```bash
npm install @devcraft-ts/abac-admin-core zod
```

## Running the Examples

```bash
# Basic policy operations
node basic-policies.js

# Attribute management
node attribute-management.js

# Audit log queries
node audit-queries.js

# Advanced condition building
node advanced-conditions.js

# Batch operations
node batch-operations.js

# Complete workflow
node complete-workflow.js
```

## Configuration

Set your API endpoint:

```bash
export ABAC_API_URL=https://api.example.com/abac
export ABAC_API_TOKEN=your-token-here
```

Or update the configuration directly in the files.

## Files Overview

### `basic-policies.js`
Basic CRUD operations for policies - create, read, update, delete.

### `attribute-management.js`
Working with resource attributes - setting, getting, bulk operations.

### `audit-queries.js`
Querying audit logs with various filters and getting statistics.

### `advanced-conditions.js`
Building complex policy conditions using the ConditionBuilder.

### `batch-operations.js`
Bulk operations for efficiency - bulk activate, deactivate, delete.

### `complete-workflow.js`
End-to-end workflow combining all features in a realistic scenario.

## Use Cases

This vanilla Node.js approach is perfect for:

- **CLI tools** - Build command-line interfaces for policy management
- **Background jobs** - Scheduled tasks that manage policies
- **Migration scripts** - Import/export policies between environments
- **Testing** - Automated testing of policy configurations
- **Server-side scripts** - Node.js backend services
- **Lambda functions** - Serverless functions that manage policies

## Key Concepts

### Client Initialization

```javascript
import { ABACAdminClient } from '@devcraft-ts/abac-admin-core';

const client = new ABACAdminClient({
  baseURL: process.env.ABAC_API_URL,
  headers: {
    'Authorization': `Bearer ${process.env.ABAC_API_TOKEN}`
  },
  timeout: 30000
});
```

### Service Pattern

All operations are organized into services:

```javascript
import { PolicyService, AttributeService, AuditService } from '@devcraft-ts/abac-admin-core';

const policyService = new PolicyService(client);
const attributeService = new AttributeService(client);
const auditService = new AuditService(client);
```

### Error Handling

Always wrap API calls in try-catch blocks:

```javascript
try {
  const policy = await policyService.get('policy-id');
  console.log('Policy:', policy);
} catch (error) {
  console.error('Failed to fetch policy:', error.message);
}
```

## Next Steps

- Explore the React hooks package: `@devcraft-ts/abac-admin-react`
- Check out the Next.js integration: `@devcraft-ts/abac-admin-nextjs`
- See the full documentation: [Core Package Docs](../../packages/core/README.md)

## License

MIT

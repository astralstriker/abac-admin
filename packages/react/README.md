# @devcraft-ts/abac-admin-react

> Headless React hooks for ABAC Policy Administration

[![npm version](https://img.shields.io/npm/v/@devcraft-ts/abac-admin-react.svg)](https://www.npmjs.com/package/@devcraft-ts/abac-admin-react)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@devcraft-ts/abac-admin-react)](https://bundlephobia.com/package/@devcraft-ts/abac-admin-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

`@devcraft-ts/abac-admin-react` provides headless React hooks for managing ABAC (Attribute-Based Access Control) policies, attributes, and audit logs. Built on top of `@devcraft-ts/abac-admin-core`, these hooks give you full control over your UI while handling all the data fetching and state management logic.

## Features

✅ **Headless by Design** - No UI components, full control over your interface
✅ **Simple & Lightweight** - Built with native React hooks (useState, useEffect)
✅ **Type-Safe** - Full TypeScript support with comprehensive types
✅ **Framework Agnostic Data Layer** - Works with any UI library or component framework
✅ **Optional TanStack Query Support** - Use with or without external data fetching libraries
✅ **Comprehensive Hook Set** - Policy, Attribute, and Audit management
✅ **Optimistic Updates** - Built-in state management for smooth UX

## Installation

```bash
npm install @devcraft-ts/abac-admin-react @devcraft-ts/abac-admin-core zod react
```

```bash
yarn add @devcraft-ts/abac-admin-react @devcraft-ts/abac-admin-core zod react
```

```bash
pnpm add @devcraft-ts/abac-admin-react @devcraft-ts/abac-admin-core zod react
```

## Quick Start

### 1. Wrap Your App with ABACProvider

```tsx
import { ABACProvider } from '@devcraft-ts/abac-admin-react';

function App() {
  return (
    <ABACProvider
      config={{
        baseURL: '/api/abac',
        headers: {
          'Authorization': `Bearer ${yourAuthToken}`
        }
      }}
    >
      <YourApp />
    </ABACProvider>
  );
}
```

### 2. Use Hooks in Your Components

```tsx
import { usePolicies } from '@devcraft-ts/abac-admin-react';

function PolicyList() {
  const {
    policies,
    isLoading,
    error,
    createPolicy,
    deletePolicy,
    activatePolicy
  } = usePolicies();

  if (isLoading) return <div>Loading policies...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Policies ({policies.length})</h2>
      {policies.map(policy => (
        <div key={policy.id}>
          <h3>{policy.policyId}</h3>
          <p>{policy.description}</p>
          <button onClick={() => activatePolicy(policy.id)}>
            Activate
          </button>
          <button onClick={() => deletePolicy(policy.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
```

## API Reference

### Context Provider

#### ABACProvider

Provides ABAC client instance to all child components.

```tsx
<ABACProvider config={config}>
  <YourApp />
</ABACProvider>
```

**Props:**
- `config: ABACAdminConfig` - Client configuration
  - `baseURL: string` - API base URL (required)
  - `headers?: Record<string, string>` - Custom headers (optional)
  - `timeout?: number` - Request timeout in ms (optional, default: 30000)

#### useABACClient

Access the ABAC client instance directly.

```tsx
const client = useABACClient();
```

---

## Policy Hooks

### usePolicies

Manage multiple policies with full CRUD operations.

```tsx
const {
  policies,        // Policy[] - Array of policies
  isLoading,       // boolean - Loading state
  error,           // Error | null - Error state
  refetch,         // () => Promise<void> - Refetch policies
  createPolicy,    // (policy: PolicyInput) => Promise<Policy>
  updatePolicy,    // (id: string, policy: PolicyUpdate) => Promise<Policy>
  deletePolicy,    // (id: string) => Promise<void>
  activatePolicy,  // (id: string) => Promise<Policy>
  deactivatePolicy // (id: string) => Promise<Policy>
} = usePolicies(filters?);
```

**Example:**

```tsx
function PolicyManager() {
  const {
    policies,
    createPolicy,
    updatePolicy,
    isLoading
  } = usePolicies({
    isActive: true,
    category: 'document'
  });

  const handleCreate = async () => {
    await createPolicy({
      policyId: 'new-policy',
      version: '1.0.0',
      effect: 'PERMIT',
      description: 'Allow document access',
      conditions: {
        type: 'equals',
        left: { category: 'subject', key: 'role' },
        right: 'admin'
      },
      isActive: true,
      category: 'document',
      tags: ['document', 'read'],
      createdBy: 'user-123'
    });
  };

  return (
    <div>
      <button onClick={handleCreate}>Create Policy</button>
      {policies.map(p => (
        <div key={p.id}>{p.policyId}</div>
      ))}
    </div>
  );
}
```

### usePolicy

Fetch a single policy by ID.

```tsx
const {
  policy,    // Policy | null - The policy
  isLoading, // boolean - Loading state
  error,     // Error | null - Error state
  refetch    // () => Promise<void> - Refetch policy
} = usePolicy(policyId);
```

**Example:**

```tsx
function PolicyDetails({ policyId }: { policyId: string }) {
  const { policy, isLoading, error } = usePolicy(policyId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!policy) return <div>Policy not found</div>;

  return (
    <div>
      <h2>{policy.policyId}</h2>
      <p>{policy.description}</p>
      <p>Status: {policy.isActive ? 'Active' : 'Inactive'}</p>
      <p>Version: {policy.version}</p>
    </div>
  );
}
```

### usePolicyTest

Test policy evaluation against a request.

```tsx
const {
  testPolicy, // (request: PolicyTestRequest) => Promise<PolicyTestResult>
  isLoading,  // boolean - Loading state
  error,      // Error | null - Error state
  result      // PolicyTestResult | null - Test result
} = usePolicyTest();
```

**Example:**

```tsx
function PolicyTester({ policy }: { policy: Policy }) {
  const { testPolicy, isLoading, result } = usePolicyTest();

  const handleTest = async () => {
    const testResult = await testPolicy({
      policy,
      request: {
        subject: { role: 'admin', department: 'engineering' },
        action: { type: 'read' },
        resource: { type: 'document', id: 'doc-123' }
      }
    });
    console.log('Decision:', testResult.decision);
  };

  return (
    <div>
      <button onClick={handleTest} disabled={isLoading}>
        Test Policy
      </button>
      {result && (
        <div>
          <p>Decision: {result.decision}</p>
          <p>Reason: {result.reason}</p>
        </div>
      )}
    </div>
  );
}
```

### usePolicyVersions

Fetch all versions of a policy.

```tsx
const {
  versions,  // Policy[] - Array of policy versions
  isLoading, // boolean - Loading state
  error,     // Error | null - Error state
  refetch    // () => Promise<void> - Refetch versions
} = usePolicyVersions(policyId);
```

---

## Attribute Hooks

### useAttributes

Manage resource attributes with full CRUD operations.

```tsx
const {
  attributes,           // Record<string, any> - All attributes for resource
  isLoading,            // boolean - Loading state
  error,                // Error | null - Error state
  refetch,              // () => Promise<void> - Refetch attributes
  setAttribute,         // (key: string, value: any) => Promise<AttributeValue>
  deleteAttribute,      // (key: string) => Promise<void>
  bulkSetAttributes,    // (attrs: Record<string, any>) => Promise<AttributeValue[]>
  bulkDeleteAttributes  // (keys: string[]) => Promise<void>
} = useAttributes(resourceType, resourceId);
```

**Example:**

```tsx
function UserAttributeManager({ userId }: { userId: string }) {
  const {
    attributes,
    setAttribute,
    deleteAttribute,
    bulkSetAttributes,
    isLoading
  } = useAttributes('user', userId);

  const makeAdmin = () => setAttribute('role', 'admin');

  const updateMultiple = () => bulkSetAttributes({
    role: 'senior-engineer',
    department: 'engineering',
    level: 5
  });

  return (
    <div>
      <h3>User Attributes</h3>
      {Object.entries(attributes).map(([key, value]) => (
        <div key={key}>
          <span>{key}: {JSON.stringify(value)}</span>
          <button onClick={() => deleteAttribute(key)}>Delete</button>
        </div>
      ))}
      <button onClick={makeAdmin}>Make Admin</button>
      <button onClick={updateMultiple}>Bulk Update</button>
    </div>
  );
}
```

### useAttribute

Fetch a single attribute value.

```tsx
const {
  value,     // any - Attribute value
  isLoading, // boolean - Loading state
  error,     // Error | null - Error state
  refetch    // () => Promise<void> - Refetch attribute
} = useAttribute(resourceType, resourceId, key);
```

### useAttributeHistory

View attribute change history.

```tsx
const {
  history,   // AttributeValue[] - History of changes
  isLoading, // boolean - Loading state
  error,     // Error | null - Error state
  refetch    // () => Promise<void> - Refetch history
} = useAttributeHistory(resourceType, resourceId, key?);
```

**Example:**

```tsx
function AttributeHistory({ userId }: { userId: string }) {
  const { history, isLoading } = useAttributeHistory('user', userId, 'role');

  return (
    <div>
      <h3>Role Change History</h3>
      {history.map(entry => (
        <div key={entry.id}>
          {entry.value} at {new Date(entry.timestamp).toLocaleString()}
        </div>
      ))}
    </div>
  );
}
```

### useAttributeComparison

Compare attributes between two resources.

```tsx
const {
  comparison, // ComparisonResult - Comparison data
  isLoading,  // boolean - Loading state
  error,      // Error | null - Error state
  refetch     // () => Promise<void> - Refetch comparison
} = useAttributeComparison(resourceType, resourceId1, resourceId2);
```

---

## Audit Hooks

### useAuditLog

Fetch audit logs with filters.

```tsx
const {
  entries,   // AuditLogEntry[] - Log entries
  total,     // number - Total count
  hasMore,   // boolean - More entries available
  isLoading, // boolean - Loading state
  error,     // Error | null - Error state
  refetch    // () => Promise<void> - Refetch logs
} = useAuditLog(filters?);
```

**Example:**

```tsx
function AuditLog() {
  const {
    entries,
    total,
    hasMore,
    isLoading
  } = useAuditLog({
    entityType: 'policy',
    action: 'UPDATE',
    startDate: '2024-01-01T00:00:00Z',
    limit: 50
  });

  return (
    <div>
      <h2>Audit Log ({total} entries)</h2>
      {entries.map(entry => (
        <div key={entry.id}>
          <strong>{entry.action}</strong> on {entry.entityType}
          <br />
          By {entry.userId} at {new Date(entry.timestamp).toLocaleString()}
        </div>
      ))}
      {hasMore && <button>Load More</button>}
    </div>
  );
}
```

### useEntityHistory

Fetch all audit entries for a specific entity.

```tsx
const {
  entries,   // AuditLogEntry[] - History entries
  isLoading, // boolean - Loading state
  error,     // Error | null - Error state
  refetch    // () => Promise<void> - Refetch history
} = useEntityHistory(entityType, entityId, limit?);
```

### useUserActivity

Fetch all audit entries for a specific user.

```tsx
const {
  entries,   // AuditLogEntry[] - User activity entries
  total,     // number - Total count
  hasMore,   // boolean - More entries available
  isLoading, // boolean - Loading state
  error,     // Error | null - Error state
  refetch    // () => Promise<void> - Refetch activity
} = useUserActivity(userId, options?);
```

### useAuditStatistics

Fetch audit statistics.

```tsx
const {
  statistics, // AuditStatistics - Statistics data
  isLoading,  // boolean - Loading state
  error,      // Error | null - Error state
  refetch     // () => Promise<void> - Refetch statistics
} = useAuditStatistics(startDate?, endDate?);
```

### useRecentActivity

Fetch recent audit activity.

```tsx
const {
  entries,   // AuditLogEntry[] - Recent entries
  isLoading, // boolean - Loading state
  error,     // Error | null - Error state
  refetch    // () => Promise<void> - Refetch activity
} = useRecentActivity(limit?);
```

---

## Advanced Usage

### Custom Error Handling

```tsx
function MyComponent() {
  const { policies, error, refetch } = usePolicies();

  useEffect(() => {
    if (error) {
      // Log to error tracking service
      console.error('Policy fetch failed:', error);

      // Show toast notification
      showToast('Failed to load policies', 'error');

      // Retry after delay
      setTimeout(() => refetch(), 5000);
    }
  }, [error, refetch]);

  return <div>{/* ... */}</div>;
}
```

### Dynamic Authentication

```tsx
function App() {
  const [authToken, setAuthToken] = useState<string | null>(null);

  return (
    <ABACProvider
      config={{
        baseURL: '/api/abac',
        headers: authToken ? {
          'Authorization': `Bearer ${authToken}`
        } : {}
      }}
    >
      <YourApp />
    </ABACProvider>
  );
}
```

### Optimistic UI Updates

All mutation hooks (create, update, delete) immediately update local state for instant UI feedback, then handle errors by reverting if the API call fails.

```tsx
function QuickToggle({ policyId }: { policyId: string }) {
  const { activatePolicy, deactivatePolicy } = usePolicies();
  const [isActive, setIsActive] = useState(false);

  const toggle = async () => {
    // Optimistically update UI
    setIsActive(!isActive);

    try {
      if (isActive) {
        await deactivatePolicy(policyId);
      } else {
        await activatePolicy(policyId);
      }
    } catch (error) {
      // Revert on error
      setIsActive(isActive);
      console.error('Toggle failed:', error);
    }
  };

  return (
    <button onClick={toggle}>
      {isActive ? 'Deactivate' : 'Activate'}
    </button>
  );
}
```

### With TanStack Query (Optional)

While not required, you can use these hooks alongside TanStack Query:

```tsx
import { useQuery } from '@tanstack/react-query';
import { useABACClient } from '@devcraft-ts/abac-admin-react';
import { PolicyService } from '@devcraft-ts/abac-admin-core';

function PolicyListWithQuery() {
  const client = useABACClient();

  const { data, isLoading } = useQuery({
    queryKey: ['policies'],
    queryFn: async () => {
      const service = new PolicyService(client);
      return service.list();
    }
  });

  return <div>{/* ... */}</div>;
}
```

---

## TypeScript Support

All hooks are fully typed with comprehensive TypeScript definitions:

```tsx
import type {
  UsePoliciesResult,
  UseAttributesResult,
  UseAuditLogResult,
  Policy,
  PolicyInput,
  PolicyUpdate,
  AttributeValue,
  AuditLogEntry
} from '@devcraft-ts/abac-admin-react';
```

---

## Best Practices

### 1. Use Context Provider at App Root

```tsx
// ✅ Good
function App() {
  return (
    <ABACProvider config={config}>
      <Router>
        <YourApp />
      </Router>
    </ABACProvider>
  );
}

// ❌ Bad - Provider too deep in tree
function SomeComponent() {
  return (
    <ABACProvider config={config}>
      <PolicyList />
    </ABACProvider>
  );
}
```

### 2. Handle Loading and Error States

```tsx
// ✅ Good
function PolicyList() {
  const { policies, isLoading, error } = usePolicies();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return <div>{/* ... */}</div>;
}

// ❌ Bad - No loading/error handling
function PolicyList() {
  const { policies } = usePolicies();
  return <div>{policies.map(/* ... */)}</div>;
}
```

### 3. Use Filters to Reduce Data

```tsx
// ✅ Good - Filter server-side
const { policies } = usePolicies({
  isActive: true,
  category: 'document'
});

// ❌ Bad - Filter client-side
const { policies } = usePolicies();
const activePolicies = policies.filter(p => p.isActive);
```

---

## Examples

For complete working examples, see:
- [Next.js Headless Example](../../examples/nextjs-headless)
- [Custom UI Example](../../examples/custom-ui)
- [With TanStack Query](../../examples/with-tanstack-query)

---

## Related Packages

- **[@devcraft-ts/abac-admin-core](../core)** - Framework-agnostic core (required)
- **[@devcraft-ts/abac-admin-nextjs](../nextjs)** - Next.js server utilities
- **[@devcraft-ts/abac-admin-react-ui](../react-ui)** - Pre-built UI components (optional)

---

## Contributing

Contributions are welcome! Please read our [Contributing Guide](../../CONTRIBUTING.md).

---

## License

MIT © [astralstriker]

---

## Support

- [Documentation](https://abac-admin.dev)
- [GitHub Issues](https://github.com/astralstriker/abac-admin/issues)
- [Discord Community](https://discord.gg/abac-admin)

---

**Built with ❤️ for developers who want full control over their ABAC admin UI.**

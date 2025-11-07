# @abac-admin/nextjs

> Next.js utilities for ABAC Policy Administration - Server-side API routes and React hooks

[![npm version](https://img.shields.io/npm/v/@abac-admin/nextjs.svg)](https://www.npmjs.com/package/@abac-admin/nextjs)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@abac-admin/nextjs)](https://bundlephobia.com/package/@abac-admin/nextjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

`@abac-admin/nextjs` provides everything you need to build a complete ABAC policy administration interface in Next.js. It combines server-side API route helpers with client-side React hooks for a seamless full-stack experience.

## Features

✅ **Pre-built API Route Handlers** - Drop-in route handlers for policies, attributes, and audit logs
✅ **Authentication Middleware** - Flexible middleware system with RBAC support
✅ **Type-Safe** - Full TypeScript support throughout
✅ **Next.js App Router Ready** - Built for Next.js 13+ App Router
✅ **Automatic Validation** - Built-in Zod validation for all endpoints
✅ **React Hooks Included** - Re-exports all hooks from `@abac-admin/react`
✅ **Zero Config** - Works out of the box with sensible defaults

## Installation

```bash
npm install @abac-admin/nextjs @abac-admin/core @abac-admin/react zod
```

```bash
yarn add @abac-admin/nextjs @abac-admin/core @abac-admin/react zod
```

```bash
pnpm add @abac-admin/nextjs @abac-admin/core @abac-admin/react zod
```

## Quick Start

### 1. Create API Routes

#### Policy Routes

```ts
// app/api/abac/policies/route.ts
import { createPolicyRoutes } from '@abac-admin/nextjs/server';
import { ABACAdminClient } from '@abac-admin/core';

const getClient = () => new ABACAdminClient({
  baseURL: process.env.ABAC_API_URL!,
  headers: {
    'Authorization': `Bearer ${process.env.ABAC_API_TOKEN}`
  }
});

export const { GET, POST } = createPolicyRoutes(getClient);
```

```ts
// app/api/abac/policies/[id]/route.ts
import { createPolicyRoutes } from '@abac-admin/nextjs/server';

export const { PUT, DELETE } = createPolicyRoutes(getClient);
```

#### Attribute Routes

```ts
// app/api/abac/attributes/[resourceType]/[resourceId]/route.ts
import { createAttributeRoutes } from '@abac-admin/nextjs/server';

export const { GET, POST } = createAttributeRoutes(getClient);
```

#### Audit Routes

```ts
// app/api/abac/audit/route.ts
import { createAuditRoutes } from '@abac-admin/nextjs/server';

export const { GET } = createAuditRoutes(getClient);
```

### 2. Use Hooks in Your Components

```tsx
// app/admin/policies/page.tsx
'use client';

import { ABACProvider, usePolicies } from '@abac-admin/nextjs';

function PolicyList() {
  const { policies, isLoading, createPolicy, deletePolicy } = usePolicies();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {policies.map(policy => (
        <div key={policy.id}>
          <h3>{policy.policyId}</h3>
          <button onClick={() => deletePolicy(policy.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default function PoliciesPage() {
  return (
    <ABACProvider config={{ baseURL: '/api/abac' }}>
      <PolicyList />
    </ABACProvider>
  );
}
```

## API Reference

### Server-Side Utilities

All server utilities are imported from `@abac-admin/nextjs/server`:

```ts
import {
  createPolicyRoutes,
  createAttributeRoutes,
  createAuditRoutes,
  createAuthMiddleware
} from '@abac-admin/nextjs/server';
```

#### createPolicyRoutes

Creates Next.js route handlers for policy management.

```ts
const getClient = () => new ABACAdminClient({
  baseURL: process.env.ABAC_API_URL!
});

export const { GET, POST, PUT, DELETE, PATCH } = createPolicyRoutes(getClient);
```

**Endpoints Created:**

- `GET /api/policies` - List all policies with optional filters
- `GET /api/policies?isActive=true&category=document` - Filtered list
- `POST /api/policies` - Create a new policy
- `PUT /api/policies/[id]` - Update a policy
- `DELETE /api/policies/[id]` - Delete a policy
- `PATCH /api/policies/[id]/activate` - Activate a policy
- `PATCH /api/policies/[id]/deactivate` - Deactivate a policy

**Request/Response Examples:**

```ts
// POST /api/policies
{
  "policyId": "doc-read-policy",
  "version": "1.0.0",
  "effect": "PERMIT",
  "description": "Allow document reading",
  "conditions": {
    "type": "equals",
    "left": { "category": "subject", "key": "role" },
    "right": "admin"
  },
  "isActive": true,
  "category": "document",
  "tags": ["document", "read"],
  "createdBy": "user-123"
}
```

#### createAttributeRoutes

Creates Next.js route handlers for attribute management.

```ts
export const { GET, POST, DELETE } = createAttributeRoutes(getClient);
```

**Endpoints Created:**

- `GET /api/attributes/[resourceType]/[resourceId]` - Get all attributes
- `GET /api/attributes/[resourceType]/[resourceId]?key=role` - Get single attribute
- `POST /api/attributes/[resourceType]/[resourceId]` - Set attribute(s)
- `DELETE /api/attributes/[resourceType]/[resourceId]/[key]` - Delete attribute

**Request Examples:**

```ts
// POST /api/attributes/user/user-123
// Single attribute
{ "key": "role", "value": "admin" }

// Bulk attributes
{ "attributes": { "role": "admin", "level": 5, "department": "engineering" } }
```

#### createAuditRoutes

Creates Next.js route handlers for audit log access.

```ts
export const { GET } = createAuditRoutes(getClient);
```

**Endpoints Created:**

- `GET /api/audit` - Get audit logs
- `GET /api/audit?entityType=policy&action=UPDATE&limit=50` - Filtered logs

#### createAuthMiddleware

Creates authentication middleware for protecting routes.

```ts
import { createAuthMiddleware } from '@abac-admin/nextjs/server';
import { cookies } from 'next/headers';

const authMiddleware = createAuthMiddleware({
  getAuthContext: async (request) => {
    const token = cookies().get('session')?.value;
    if (!token) return null;

    const session = await verifyToken(token);
    return {
      userId: session.userId,
      roles: session.roles,
      permissions: session.permissions
    };
  },
  authorize: async (context, request) => {
    // Check if user has admin role
    return context.roles?.includes('admin') ?? false;
  }
});

// Use in route handlers
export const GET = authMiddleware(async (request, context) => {
  // context.userId is available here
  return Response.json({ userId: context.userId });
});
```

**Configuration Options:**

```ts
interface MiddlewareConfig {
  getAuthContext: (request: NextRequest) => Promise<AuthContext | null>;
  authorize?: (context: AuthContext, request: NextRequest) => Promise<boolean>;
  onUnauthorized?: (request: NextRequest) => NextResponse;
  onForbidden?: (context: AuthContext, request: NextRequest) => NextResponse;
  onRequest?: (context: AuthContext | null, request: NextRequest) => void;
}
```

#### Authorization Helpers

```ts
import {
  requireRoles,
  requirePermissions,
  combineAuthAnd,
  combineAuthOr,
  createRequestLogger,
  createRateLimiter
} from '@abac-admin/nextjs/server';

// Require specific roles
const authMiddleware = createAuthMiddleware({
  getAuthContext: async (request) => { /* ... */ },
  authorize: requireRoles(['admin', 'manager'])
});

// Require specific permissions
const authMiddleware = createAuthMiddleware({
  getAuthContext: async (request) => { /* ... */ },
  authorize: requirePermissions(['policies:read', 'policies:write'])
});

// Combine multiple requirements (AND)
const authMiddleware = createAuthMiddleware({
  getAuthContext: async (request) => { /* ... */ },
  authorize: combineAuthAnd([
    requireRoles(['admin']),
    requirePermissions(['policies:write'])
  ])
});

// Combine multiple requirements (OR)
const authMiddleware = createAuthMiddleware({
  getAuthContext: async (request) => { /* ... */ },
  authorize: combineAuthOr([
    requireRoles(['admin']),
    requireRoles(['manager'])
  ])
});

// Add request logging
const authMiddleware = createAuthMiddleware({
  getAuthContext: async (request) => { /* ... */ },
  onRequest: createRequestLogger(false) // true to include body
});

// Add rate limiting (simple in-memory)
const authMiddleware = createAuthMiddleware({
  getAuthContext: async (request) => { /* ... */ },
  authorize: createRateLimiter(100, 60000) // 100 requests per minute
});
```

---

### Client-Side Hooks

All React hooks are re-exported from `@abac-admin/react`. Import them from `@abac-admin/nextjs`:

```ts
import {
  ABACProvider,
  usePolicies,
  usePolicy,
  useAttributes,
  useAuditLog
} from '@abac-admin/nextjs';
```

For complete hook documentation, see [@abac-admin/react README](../react/README.md).

---

## Complete Example

### File Structure

```
app/
├── api/
│   └── abac/
│       ├── policies/
│       │   ├── route.ts              # GET, POST /api/abac/policies
│       │   └── [id]/
│       │       ├── route.ts          # PUT, DELETE /api/abac/policies/[id]
│       │       └── [action]/
│       │           └── route.ts      # PATCH /api/abac/policies/[id]/activate
│       ├── attributes/
│       │   └── [resourceType]/
│       │       └── [resourceId]/
│       │           ├── route.ts      # GET, POST
│       │           └── [key]/
│       │               └── route.ts  # DELETE
│       └── audit/
│           └── route.ts              # GET /api/abac/audit
├── admin/
│   ├── policies/
│   │   ├── page.tsx                  # Policy list page
│   │   └── [id]/
│   │       └── page.tsx              # Policy detail page
│   └── layout.tsx                    # Admin layout with ABACProvider
└── lib/
    ├── abac-client.ts                # ABAC client setup
    └── auth-middleware.ts            # Auth middleware config
```

### lib/abac-client.ts

```ts
import { ABACAdminClient } from '@abac-admin/core';

export function getABACClient() {
  return new ABACAdminClient({
    baseURL: process.env.ABAC_API_URL!,
    headers: {
      'Authorization': `Bearer ${process.env.ABAC_API_TOKEN}`
    }
  });
}
```

### lib/auth-middleware.ts

```ts
import { createAuthMiddleware, requireRoles } from '@abac-admin/nextjs/server';
import { cookies } from 'next/headers';

export const authMiddleware = createAuthMiddleware({
  getAuthContext: async (request) => {
    const session = cookies().get('session')?.value;
    if (!session) return null;

    // Verify session and return user context
    const user = await verifySession(session);
    return {
      userId: user.id,
      roles: user.roles,
      permissions: user.permissions
    };
  },
  authorize: requireRoles(['admin', 'policy-manager'])
});
```

### app/api/abac/policies/route.ts

```ts
import { createPolicyRoutes } from '@abac-admin/nextjs/server';
import { getABACClient } from '@/lib/abac-client';
import { authMiddleware } from '@/lib/auth-middleware';

const { GET, POST } = createPolicyRoutes(getABACClient);

// Protect routes with authentication
export { GET: authMiddleware(GET), POST: authMiddleware(POST) };
```

### app/admin/layout.tsx

```tsx
'use client';

import { ABACProvider } from '@abac-admin/nextjs';

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ABACProvider config={{ baseURL: '/api/abac' }}>
      <div className="admin-layout">
        <nav>{/* Navigation */}</nav>
        <main>{children}</main>
      </div>
    </ABACProvider>
  );
}
```

### app/admin/policies/page.tsx

```tsx
'use client';

import { usePolicies } from '@abac-admin/nextjs';

export default function PoliciesPage() {
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
      <h1>Policies ({policies.length})</h1>
      <div className="policy-list">
        {policies.map(policy => (
          <div key={policy.id} className="policy-card">
            <h3>{policy.policyId}</h3>
            <p>{policy.description}</p>
            <div className="actions">
              <button onClick={() => activatePolicy(policy.id)}>
                Activate
              </button>
              <button onClick={() => deletePolicy(policy.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Advanced Usage

### Dynamic Authentication

```ts
// app/api/abac/policies/route.ts
import { cookies } from 'next/headers';

const getClient = () => {
  const token = cookies().get('auth-token')?.value;

  return new ABACAdminClient({
    baseURL: process.env.ABAC_API_URL!,
    headers: token ? {
      'Authorization': `Bearer ${token}`
    } : {}
  });
};

export const { GET, POST } = createPolicyRoutes(getClient);
```

### Custom Error Responses

```ts
const authMiddleware = createAuthMiddleware({
  getAuthContext: async (request) => { /* ... */ },
  onUnauthorized: (request) => {
    return NextResponse.json(
      { error: 'Please log in to access this resource' },
      { status: 401 }
    );
  },
  onForbidden: (context, request) => {
    return NextResponse.json(
      { error: `User ${context.userId} does not have permission` },
      { status: 403 }
    );
  }
});
```

### Request Logging

```ts
const authMiddleware = createAuthMiddleware({
  getAuthContext: async (request) => { /* ... */ },
  onRequest: (context, request) => {
    console.log({
      timestamp: new Date().toISOString(),
      userId: context?.userId ?? 'anonymous',
      method: request.method,
      url: request.url
    });
  }
});
```

### Multiple Client Configurations

```ts
// Different clients for different routes
const adminClient = () => new ABACAdminClient({
  baseURL: process.env.ADMIN_API_URL!,
  headers: { 'X-Role': 'admin' }
});

const userClient = () => new ABACAdminClient({
  baseURL: process.env.USER_API_URL!,
  headers: { 'X-Role': 'user' }
});

// app/api/admin/policies/route.ts
export const { GET, POST } = createPolicyRoutes(adminClient);

// app/api/user/policies/route.ts
export const { GET } = createPolicyRoutes(userClient);
```

---

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```ts
import type {
  PolicyRouteHandlers,
  AttributeRouteHandlers,
  AuditRouteHandlers,
  AuthContext,
  MiddlewareConfig,
  UsePoliciesResult,
  Policy,
  PolicyInput
} from '@abac-admin/nextjs';
```

---

## Best Practices

### 1. Use Environment Variables

```env
ABAC_API_URL=https://api.example.com/abac
ABAC_API_TOKEN=your-secret-token
```

### 2. Protect All Admin Routes

```ts
// Always wrap route handlers with auth middleware
export const GET = authMiddleware(baseGET);
export const POST = authMiddleware(basePOST);
```

### 3. Use Proper RBAC

```ts
const authMiddleware = createAuthMiddleware({
  getAuthContext: async (request) => { /* ... */ },
  authorize: combineAuthAnd([
    requireRoles(['admin']),
    requirePermissions(['policies:write'])
  ])
});
```

### 4. Handle Errors Gracefully

```tsx
function MyComponent() {
  const { policies, error, refetch } = usePolicies();

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return <div>{/* ... */}</div>;
}
```

---

## Examples

For complete working examples, see:
- [Next.js Headless Example](../../examples/nextjs-headless)
- [Next.js with Authentication](../../examples/nextjs-auth)
- [Next.js Full-Stack Admin](../../examples/nextjs-fullstack)

---

## Related Packages

- **[@abac-admin/core](../core)** - Framework-agnostic core (required)
- **[@abac-admin/react](../react)** - React hooks (included)
- **[@abac-admin/react-ui](../react-ui)** - Pre-built UI components (optional)

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

**Built with ❤️ for Next.js developers who need powerful ABAC policy administration.**

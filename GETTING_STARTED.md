# Getting Started with ABAC Admin UI Packages

This guide will help you get started with the ABAC Admin UI packages in your project.

## Overview

The ABAC Admin UI packages provide a modular, lightweight solution for managing ABAC (Attribute-Based Access Control) policies in your application. Choose the packages that fit your needs:

- **@abac-admin/core** - Framework-agnostic core (~15kb)
- **@abac-admin/react** - Headless React hooks (~30kb)
- **@abac-admin/nextjs** - Next.js utilities (~10kb)
- **@abac-admin/react-ui** - Pre-built UI components (optional, ~130kb)

## Installation

### Option 1: Headless React (Recommended)

Best for: Full control over UI, custom design systems

```bash
npm install @abac-admin/core @abac-admin/react zod
```

### Option 2: Next.js

Best for: Next.js applications

```bash
npm install @abac-admin/core @abac-admin/react @abac-admin/nextjs zod
```

### Option 3: Pre-built UI

Best for: Quick setup, prototyping

```bash
npm install @abac-admin/react-ui @radix-ui/react-dialog zod
```

### Option 4: Core Only

Best for: Non-React apps, custom implementations, server-side

```bash
npm install @abac-admin/core zod
```

## Quick Start: React + Next.js

### Step 1: Create API Routes

Create a file at `app/api/abac/policies/route.ts`:

```typescript
import { createPolicyRoutes } from '@abac-admin/nextjs/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

const handlers = {
  getPolicies: async () => {
    return prisma.abacPolicy.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' }
    });
  },

  getPolicy: async (id: string) => {
    return prisma.abacPolicy.findUnique({ where: { id } });
  },

  createPolicy: async (data: any) => {
    const session = await auth();
    return prisma.abacPolicy.create({
      data: { ...data, createdBy: session.user.id }
    });
  },

  updatePolicy: async (id: string, data: any) => {
    const session = await auth();
    return prisma.abacPolicy.update({
      where: { id },
      data: { ...data, updatedBy: session.user.id }
    });
  },

  deletePolicy: async (id: string) => {
    const session = await auth();
    await prisma.abacPolicy.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy: session.user.id }
    });
  },

  activatePolicy: async (id: string) => {
    return prisma.abacPolicy.update({
      where: { id },
      data: { isActive: true }
    });
  },

  deactivatePolicy: async (id: string) => {
    return prisma.abacPolicy.update({
      where: { id },
      data: { isActive: false }
    });
  },

  // Implement remaining handlers...
  getResourceAttributes: async () => ({}),
  setResourceAttribute: async () => ({}),
  getAuditLog: async () => []
};

export const { GET, POST, PUT, DELETE } = createPolicyRoutes(handlers);
```

### Step 2: Setup Provider

Create `app/providers.tsx`:

```typescript
'use client'

import { ABACProvider } from '@abac-admin/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ABACProvider config={{ baseURL: '/api/abac' }}>
      {children}
    </ABACProvider>
  );
}
```

Update `app/layout.tsx`:

```typescript
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### Step 3: Build Your UI

Create `app/admin/policies/page.tsx`:

```typescript
'use client'

import { usePolicies } from '@abac-admin/react';

export default function PoliciesPage() {
  const { policies, isLoading, createPolicy, deletePolicy } = usePolicies();

  if (isLoading) {
    return <div>Loading policies...</div>;
  }

  return (
    <div>
      <h1>ABAC Policies</h1>
      <button onClick={() => createPolicy({
        policyId: 'new-policy',
        version: '1.0.0',
        effect: 'PERMIT',
        description: 'New policy',
        conditions: { type: 'equals', left: 'test', right: 'value' },
        isActive: true,
        category: 'test',
        tags: [],
        createdBy: 'user-123'
      })}>
        Create Policy
      </button>

      <ul>
        {policies.map(policy => (
          <li key={policy.id}>
            {policy.policyId} - {policy.description}
            <button onClick={() => deletePolicy(policy.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Quick Start: Vanilla JavaScript

```typescript
import { ABACAdminClient, PolicyService } from '@abac-admin/core';

// Initialize client
const client = new ABACAdminClient({
  baseURL: 'https://api.example.com/abac',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});

// Create service
const policyService = new PolicyService(client);

// Fetch policies
const policies = await policyService.list();
console.log('Policies:', policies);

// Create a policy
const newPolicy = await policyService.create({
  policyId: 'my-policy',
  version: '1.0.0',
  effect: 'PERMIT',
  description: 'Allow users to view documents',
  conditions: {
    type: 'equals',
    left: { category: 'action', key: 'type' },
    right: 'view'
  },
  isActive: true,
  category: 'document',
  tags: ['document', 'read'],
  createdBy: 'user-123'
});

console.log('Created:', newPolicy);
```

## Building Conditions

Use the ConditionBuilder utility to create complex policy conditions:

```typescript
import { ConditionBuilder } from '@abac-admin/core';

// Simple condition: subject.role == "admin"
const simpleCondition = ConditionBuilder.equals(
  ConditionBuilder.attr('subject', 'role'),
  'admin'
);

// Complex condition: (role == "admin" OR role == "manager") AND department == "engineering"
const complexCondition = ConditionBuilder.and(
  ConditionBuilder.or(
    ConditionBuilder.equals(
      ConditionBuilder.attr('subject', 'role'),
      'admin'
    ),
    ConditionBuilder.equals(
      ConditionBuilder.attr('subject', 'role'),
      'manager'
    )
  ),
  ConditionBuilder.equals(
    ConditionBuilder.attr('subject', 'department'),
    'engineering'
  )
);

// Use in policy
const policy = await policyService.create({
  policyId: 'complex-policy',
  version: '1.0.0',
  effect: 'PERMIT',
  description: 'Allow admins and managers in engineering',
  conditions: complexCondition,
  isActive: true,
  category: 'access',
  tags: ['admin', 'manager'],
  createdBy: 'system'
});
```

## Integration with TanStack Query

If you want to use TanStack Query for caching:

```typescript
'use client'

import { ABACProvider, useABACClient } from '@abac-admin/react';
import { PolicyService } from '@abac-admin/core';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function PolicyList() {
  const client = useABACClient();
  const policyService = new PolicyService(client);

  // Use TanStack Query for caching
  const { data: policies } = useQuery({
    queryKey: ['policies'],
    queryFn: () => policyService.list()
  });

  const createMutation = useMutation({
    mutationFn: (policy) => policyService.create(policy),
    onSuccess: () => {
      queryClient.invalidateQueries(['policies']);
    }
  });

  return (
    <div>
      {policies?.map(policy => (
        <div key={policy.id}>{policy.policyId}</div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ABACProvider config={{ baseURL: '/api/abac' }}>
        <PolicyList />
      </ABACProvider>
    </QueryClientProvider>
  );
}
```

## Working with Attributes

```typescript
import { useResourceAttributes, useSetAttribute } from '@abac-admin/react';

function UserAttributes({ userId }: { userId: string }) {
  const { attributes, isLoading } = useResourceAttributes('user', userId);
  const { setAttribute } = useSetAttribute();

  const handleUpdate = async () => {
    await setAttribute({
      resourceType: 'user',
      resourceId: userId,
      key: 'department',
      value: 'engineering'
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Attributes</h2>
      <pre>{JSON.stringify(attributes, null, 2)}</pre>
      <button onClick={handleUpdate}>Update Department</button>
    </div>
  );
}
```

## Authentication & Authorization

Add authentication middleware to protect your ABAC API routes:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();

  // Check if user is authenticated
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if user has admin role
  if (session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/abac/:path*'
};
```

## Error Handling

Always wrap API calls in try-catch blocks:

```typescript
function PolicyManager() {
  const { createPolicy } = usePolicies();
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    try {
      setError(null);
      await createPolicy({
        policyId: 'new-policy',
        version: '1.0.0',
        effect: 'PERMIT',
        description: 'New policy',
        conditions: { type: 'equals', left: 'test', right: 'value' },
        isActive: true,
        category: 'test',
        tags: [],
        createdBy: 'user-123'
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create policy');
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <button onClick={handleCreate}>Create Policy</button>
    </div>
  );
}
```

## Validation

Use built-in validators before submitting data:

```typescript
import { validatePolicyInput } from '@abac-admin/core';

const policyInput = {
  policyId: 'test-policy',
  version: '1.0.0',
  effect: 'PERMIT',
  description: 'Test policy',
  conditions: { type: 'equals', left: 'test', right: 'value' },
  isActive: true,
  category: 'test',
  tags: ['tag1'],
  createdBy: 'user-123'
};

const validation = validatePolicyInput(policyInput);
if (!validation.valid) {
  console.error('Validation errors:', validation.errors);
} else {
  await policyService.create(policyInput);
}
```

## Formatting

Use built-in formatters for display:

```typescript
import { formatDate, formatPolicyEffect, formatCondition } from '@abac-admin/core';

function PolicyCard({ policy }) {
  return (
    <div>
      <h3>{policy.policyId}</h3>
      <p>Effect: {formatPolicyEffect(policy.effect)}</p>
      <p>Created: {formatDate(policy.createdAt)}</p>
      <pre>{formatCondition(policy.conditions)}</pre>
    </div>
  );
}
```

## Next Steps

- Explore the [API Reference](./docs/api-reference.md)
- Check out [Examples](./examples)
- Read the [Architecture Guide](./ABAC_ENGINE_UI.md)
- Join our [Discord Community](https://discord.gg/abac-admin)

## Troubleshooting

### "useABACClient must be used within ABACProvider"

Make sure you've wrapped your component tree with `<ABACProvider>`:

```typescript
<ABACProvider config={{ baseURL: '/api/abac' }}>
  <YourComponent />
</ABACProvider>
```

### CORS Errors

If you're calling the API from a different domain, configure CORS on your server:

```typescript
// Next.js API route
export async function GET(request: Request) {
  const response = NextResponse.json(data);
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  return response;
}
```

### TypeScript Errors

Make sure you have the required peer dependencies installed:

```bash
npm install zod react @types/react
```

## Support

- **Documentation**: https://abac-admin.dev
- **GitHub Issues**: https://github.com/astralstriker/abac-admin/issues
- **Discord**: https://discord.gg/abac-admin

---

**Happy coding! 🚀**

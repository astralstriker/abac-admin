# Next.js App Router Example

This example demonstrates how to integrate `@devcraft-ts/abac-admin-react` and `@devcraft-ts/abac-admin-nextjs` packages into a modern Next.js 14+ application using the App Router.

## What This Example Shows

- ✅ Server Components with Server Actions
- ✅ Client Components with React hooks
- ✅ API route handlers with Next.js
- ✅ Real-time policy testing
- ✅ Streaming and Suspense patterns
- ✅ Type-safe policy management UI
- ✅ Audit log visualization
- ✅ Attribute management interface

## Features

### Policy Management Dashboard
- List all policies with filtering and search
- Create new policies with visual condition builder
- Edit existing policies
- Activate/deactivate policies
- Test policies in real-time
- Export/import policy configurations

### Attribute Management
- View and edit resource attributes
- Bulk attribute operations
- Attribute history tracking
- Compare attributes between resources
- Visual attribute editor

### Audit Log Viewer
- Real-time audit log streaming
- Filter by entity type, action, and date range
- User activity tracking
- Policy change history
- Export audit logs

## Tech Stack

- **Next.js 14+** - React framework with App Router
- **@devcraft-ts/abac-admin-react** - Headless React hooks
- **@devcraft-ts/abac-admin-nextjs** - Next.js utilities
- **@devcraft-ts/abac-admin-core** - Core ABAC engine
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Headless UI components
- **Zod** - Schema validation

## Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Basic understanding of Next.js App Router

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env.local` file:

```env
ABAC_API_URL=http://localhost:3000/api/abac
ABAC_API_TOKEN=your-secret-token

# Optional: Database
DATABASE_URL=postgresql://user:pass@localhost:5432/abac

# Optional: Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

## Running the Example

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start

# Run tests
npm test

# Type checking
npm run typecheck

# Linting
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
02-nextjs-app-router/
├── app/
│   ├── api/
│   │   └── abac/           # API route handlers
│   │       ├── policies/
│   │       ├── attributes/
│   │       └── audit/
│   ├── policies/           # Policy management pages
│   │   ├── page.tsx
│   │   ├── [id]/
│   │   └── new/
│   ├── attributes/         # Attribute management pages
│   │   └── page.tsx
│   ├── audit/              # Audit log pages
│   │   └── page.tsx
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Home page
├── components/
│   ├── providers/          # React context providers
│   │   └── abac-provider.tsx
│   ├── policies/           # Policy components
│   │   ├── policy-list.tsx
│   │   ├── policy-form.tsx
│   │   ├── policy-card.tsx
│   │   └── condition-builder.tsx
│   ├── attributes/         # Attribute components
│   │   ├── attribute-list.tsx
│   │   └── attribute-editor.tsx
│   ├── audit/              # Audit components
│   │   ├── audit-log.tsx
│   │   └── audit-filters.tsx
│   └── ui/                 # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ...
├── lib/
│   ├── abac-client.ts      # ABAC client instance
│   ├── server-actions.ts   # Server actions
│   └── utils.ts            # Utility functions
├── hooks/
│   ├── use-policies.ts     # Custom policy hooks
│   ├── use-attributes.ts   # Custom attribute hooks
│   └── use-audit.ts        # Custom audit hooks
└── types/
    └── index.ts            # TypeScript type definitions
```

## Usage Examples

### Server Component (Read-only)

```tsx
// app/policies/page.tsx
import { ABACAdminClient, PolicyService } from '@devcraft-ts/abac-admin-core';

async function getPolicies() {
  const client = new ABACAdminClient({
    baseURL: process.env.ABAC_API_URL!,
    headers: {
      'Authorization': `Bearer ${process.env.ABAC_API_TOKEN}`
    }
  });

  const policyService = new PolicyService(client);
  return policyService.list();
}

export default async function PoliciesPage() {
  const policies = await getPolicies();

  return (
    <div>
      <h1>Policies</h1>
      {policies.map(policy => (
        <div key={policy.id}>{policy.policyId}</div>
      ))}
    </div>
  );
}
```

### Client Component with Hooks

```tsx
'use client';

import { usePolicies } from '@devcraft-ts/abac-admin-react';

export function PolicyList() {
  const { policies, isLoading, createPolicy, deletePolicy } = usePolicies();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {policies.map(policy => (
        <div key={policy.id}>
          <h3>{policy.policyId}</h3>
          <button onClick={() => deletePolicy(policy.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
```

### Server Action

```tsx
'use server';

import { ABACAdminClient, PolicyService } from '@devcraft-ts/abac-admin-core';
import { revalidatePath } from 'next/cache';

export async function createPolicyAction(formData: FormData) {
  const client = new ABACAdminClient({
    baseURL: process.env.ABAC_API_URL!
  });

  const policyService = new PolicyService(client);

  await policyService.create({
    policyId: formData.get('policyId') as string,
    version: '1.0.0',
    effect: 'PERMIT',
    description: formData.get('description') as string,
    conditions: JSON.parse(formData.get('conditions') as string),
    isActive: true,
    category: 'default',
    tags: [],
    createdBy: 'user'
  });

  revalidatePath('/policies');
}
```

### API Route Handler

```tsx
// app/api/abac/policies/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ABACAdminClient, PolicyService } from '@devcraft-ts/abac-admin-core';

const client = new ABACAdminClient({
  baseURL: process.env.ABAC_API_URL!
});

const policyService = new PolicyService(client);

export async function GET(request: NextRequest) {
  try {
    const policies = await policyService.list();
    return NextResponse.json(policies);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch policies' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const policy = await policyService.create(body);
    return NextResponse.json(policy, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create policy' },
      { status: 500 }
    );
  }
}
```

### Provider Setup

```tsx
// components/providers/abac-provider.tsx
'use client';

import { ABACProvider } from '@devcraft-ts/abac-admin-react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ABACProvider
      config={{
        baseURL: '/api/abac',
        headers: {
          'Content-Type': 'application/json'
        }
      }}
    >
      {children}
    </ABACProvider>
  );
}
```

```tsx
// app/layout.tsx
import { Providers } from '@/components/providers/abac-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

## Key Features Demonstrated

### 1. Visual Condition Builder
Build complex policy conditions with a drag-and-drop interface:
- Comparison operators (equals, greater than, etc.)
- Logical operators (AND, OR, NOT)
- Attribute references
- Nested conditions

### 2. Real-time Policy Testing
Test policies immediately without deployment:
- Input subject, resource, and action attributes
- See instant PERMIT/DENY decision
- View matched policies
- Debug condition evaluation

### 3. Audit Log Visualization
Comprehensive audit trail with:
- Timeline view
- Entity-specific history
- User activity tracking
- Change comparisons
- Export capabilities

### 4. Attribute Management
Manage resource attributes with:
- Visual attribute editor
- Type validation
- History tracking
- Bulk operations
- Search and filter

## Performance Optimizations

### Server Components
- Fetch data on the server for better performance
- Reduce client-side JavaScript
- Leverage Next.js caching

### Streaming
- Use Suspense for progressive loading
- Stream audit logs in real-time
- Implement infinite scroll for large lists

### Caching
- Cache policy data with Next.js built-in caching
- Implement SWR for client-side caching
- Use React Query for advanced caching strategies

## Security Considerations

### Authentication
- Integrate with NextAuth.js
- Protect API routes with middleware
- Validate user permissions

### Authorization
- Implement role-based access control
- Use ABAC policies to control UI access
- Validate on both client and server

### Data Validation
- Use Zod schemas for input validation
- Sanitize user inputs
- Implement CSRF protection

## Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

### Type Checking
```bash
npm run typecheck
```

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t abac-nextjs .
docker run -p 3000:3000 abac-nextjs
```

### Environment Variables
Ensure all environment variables are set in your deployment platform.

## Troubleshooting

### "use client" Directive Missing
If you get hydration errors, ensure client components have the `'use client'` directive.

### API Route Not Found
Check that your API routes are in the `app/api` directory with proper route.ts naming.

### Hook Errors
Make sure hooks are only used in client components within the ABACProvider.

## Next Steps

- Add authentication with NextAuth.js
- Implement real-time updates with WebSockets
- Add advanced filtering and search
- Create custom policy templates
- Build analytics dashboard

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [@devcraft-ts/abac-admin-react Docs](../../packages/react/README.md)
- [@devcraft-ts/abac-admin-nextjs Docs](../../packages/nextjs/README.md)

## License

MIT

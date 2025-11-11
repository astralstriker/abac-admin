import { Code2, Database, Lock, Package, Server } from "lucide-react";
import Link from "next/link";

export default function NextjsPackagePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full">
          <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Next.js Utils
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          @devcraft-ts/abac-admin-nextjs
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Server-side utilities and API route helpers for Next.js applications.
          Built on <strong>@devcraft-ts/abac-admin-core</strong> which leverages{" "}
          <strong>abac-engine</strong> for policy evaluation.
        </p>
      </div>

      {/* abac-engine Integration */}
      <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <Package className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Built on abac-engine
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This package provides Next.js-specific utilities for building ABAC
              admin interfaces powered by <strong>abac-engine</strong>. It
              includes pre-built API route handlers, authentication middleware,
              and server utilities.{" "}
              <Link
                href="/docs/abac-engine"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Learn more →
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <Server className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Server-Side
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built for Next.js App Router and API routes
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Auth Middleware
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built-in authentication and authorization
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Type-Safe
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Full TypeScript support with abac-engine types
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <Database className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Zero Config
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Works out of the box with sensible defaults
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Automatic Validation
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built-in Zod validation for all endpoints
            </p>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Installation
          </h2>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
          <pre className="text-gray-300 font-mono text-sm">
            {`npm install @devcraft-ts/abac-admin-nextjs

# Includes dependencies
# - @devcraft-ts/abac-admin-core
# - @devcraft-ts/abac-admin-react

# Peer dependencies
npm install next react react-dom zod`}
          </pre>
        </div>
      </section>

      {/* Quick Start */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Quick Start
          </h2>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              1. Create API Routes
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Set up API routes for policy and attribute management.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`// app/api/abac/policies/route.ts
import { createPolicyRoutes } from '@devcraft-ts/abac-admin-nextjs/server';
import { ABACAdminClient } from '@devcraft-ts/abac-admin-core';

const getClient = () => new ABACAdminClient({
  baseURL: process.env.ABAC_API_URL!,
  headers: {
    'Authorization': \`Bearer \${process.env.ABAC_API_TOKEN}\`
  }
});

export const { GET, POST } = createPolicyRoutes(getClient);
</parameter>

export { GET, POST };

// app/api/abac/policies/[id]/route.ts
import { createPolicyRoutes } from '@devcraft-ts/abac-admin-nextjs';
import { getABACClient } from '@/lib/abac-client';

const { GET, PUT, DELETE } = createPolicyRoutes({
  getClient: () => getABACClient()
});

export { GET, PUT, DELETE };`}
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              2. Use Hooks in Your Components
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`"use client";

import { ABACProvider, usePolicies } from '@devcraft-ts/abac-admin-react';

function PolicyList() {
  const { policies, isLoading } = usePolicies();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {policies.map(policy => (
        <div key={policy.id}>{policy.description}</div>
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
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* API Route Helpers */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            API Route Helpers
          </h2>
        </div>

        <div className="space-y-6">
          {/* createPolicyRoutes */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              createPolicyRoutes
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Creates API route handlers for policy management.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import { createPolicyRoutes } from '@devcraft-ts/abac-admin-nextjs';

const { GET, POST, PUT, DELETE, PATCH } = createPolicyRoutes({
  getClient: () => getABACClient(),
  middleware?: authMiddleware // Optional authentication
});

// Returns handlers for:
// GET    /api/policies       - List policies
// POST   /api/policies       - Create policy
// GET    /api/policies/[id]  - Get policy
// PUT    /api/policies/[id]  - Update policy
// DELETE /api/policies/[id]  - Delete policy
// PATCH  /api/policies/[id]  - Activate/deactivate`}
              </pre>
            </div>
          </div>

          {/* createAttributeRoutes */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              createAttributeRoutes
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Creates API route handlers for attribute management.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`// app/api/abac/attributes/[type]/[id]/route.ts
import { createAttributeRoutes } from '@devcraft-ts/abac-admin-nextjs';

const { GET, POST, DELETE } = createAttributeRoutes({
  getClient: () => getABACClient()
});

export { GET, POST, DELETE };

// Handles:
// GET    /api/attributes/user/user-123     - Get attributes
// POST   /api/attributes/user/user-123     - Set attributes
// DELETE /api/attributes/user/user-123     - Delete attributes`}
              </pre>
            </div>
          </div>

          {/* createAuditRoutes */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              createAuditRoutes
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Creates API route handlers for audit logs.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`// app/api/abac/audit/route.ts
import { createAuditRoutes } from '@devcraft-ts/abac-admin-nextjs';

const { GET } = createAuditRoutes({
  getClient: () => getABACClient()
});

export { GET };

// Handles:
// GET /api/audit?entityType=policy&limit=50`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Middleware */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Authentication Middleware
          </h2>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              createAuthMiddleware
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create authentication middleware for protecting API routes.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import { createAuthMiddleware } from '@devcraft-ts/abac-admin-nextjs';
import { getSession } from '@/lib/auth';

const authMiddleware = createAuthMiddleware({
  getUser: async (request) => {
    const session = await getSession(request);
    return session?.user;
  },
  isAuthorized: (user, context) => {
    // Check if user is authorized
    return user?.role === 'admin';
  },
  onUnauthorized: () => {
    return new Response('Unauthorized', { status: 401 });
  }
});

// Use with route creators
const { GET, POST } = createPolicyRoutes({
  getClient: () => getABACClient(),
  middleware: authMiddleware
});`}
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Built-in Authorization Helpers
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import {
  requireRole,
  requirePermission,
  requireAny,
  requireAll
} from '@devcraft-ts/abac-admin-nextjs';

// Require specific role
const authMiddleware = requireRole('admin');

// Require specific permission
const authMiddleware = requirePermission('policies:write');

// Require any of the roles
const authMiddleware = requireAny(['admin', 'manager']);

// Require all permissions
const authMiddleware = requireAll([
  'policies:read',
  'policies:write'
]);

// Combine with custom logic
const authMiddleware = createAuthMiddleware({
  getUser: async (request) => getSession(request),
  isAuthorized: (user) => {
    return user?.roles?.includes('admin') ||
           user?.permissions?.includes('policies:write');
  }
});`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Example */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Complete Example
          </h2>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Project Structure
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`app/
├── api/
│   └── abac/
│       ├── policies/
│       │   ├── route.ts          # List/Create policies
│       │   └── [id]/
│       │       └── route.ts      # Get/Update/Delete policy
│       ├── attributes/
│       │   └── [type]/
│       │       └── [id]/
│       │           └── route.ts  # Manage attributes
│       └── audit/
│           └── route.ts          # Audit logs
├── admin/
│   ├── layout.tsx               # Admin layout with auth
│   └── policies/
│       └── page.tsx             # Policies management page
└── lib/
    ├── abac-client.ts           # ABAC client setup
    └── auth-middleware.ts       # Auth middleware`}
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              lib/abac-client.ts
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import { ABACAdminClient } from '@devcraft-ts/abac-admin-core';

export function getABACClient() {
  return new ABACAdminClient({
    baseURL: process.env.ABAC_API_URL!,
    headers: {
      'Authorization': \`Bearer \${process.env.ABAC_API_TOKEN}\`,
      'X-API-Key': process.env.ABAC_API_KEY!
    }
  });
}`}
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              lib/auth-middleware.ts
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import { createAuthMiddleware } from '@devcraft-ts/abac-admin-nextjs';
import { getServerSession } from 'next-auth';

export const authMiddleware = createAuthMiddleware({
  getUser: async (request) => {
    const session = await getServerSession();
    return session?.user;
  },
  isAuthorized: (user) => {
    return user?.roles?.includes('admin');
  },
  onUnauthorized: () => {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401 }
    );
  }
});`}
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              app/api/abac/policies/route.ts
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import { createPolicyRoutes } from '@devcraft-ts/abac-admin-nextjs';
import { getABACClient } from '@/lib/abac-client';
import { authMiddleware } from '@/lib/auth-middleware';

const { GET, POST } = createPolicyRoutes({
  getClient: () => getABACClient(),
  middleware: authMiddleware
});

export { GET, POST };`}
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              app/admin/policies/page.tsx
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`"use client";

import { ABACProvider, usePolicies } from '@devcraft-ts/abac-admin-react';
import { PolicyList } from '@devcraft-ts/abac-admin-react-ui';

export default function PoliciesPage() {
  return (
    <ABACProvider config={{ baseURL: '/api/abac' }}>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Policies</h1>
        <PolicyList
          onCreate={() => console.log('Create')}
          onEdit={(id) => console.log('Edit', id)}
          onDelete={(id) => console.log('Delete', id)}
        />
      </div>
    </ABACProvider>
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Usage */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Advanced Usage
          </h2>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Dynamic Authentication
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`const { GET, POST } = createPolicyRoutes({
  getClient: async (request) => {
    // Get user token from request
    const token = request.headers.get('Authorization');

    return new ABACAdminClient({
      baseURL: process.env.ABAC_API_URL!,
      headers: {
        'Authorization': token || ''
      }
    });
  }
});`}
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Custom Error Responses
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`const authMiddleware = createAuthMiddleware({
  getUser: async (request) => getSession(request),
  isAuthorized: (user) => user?.role === 'admin',
  onUnauthorized: (context) => {
    return new Response(
      JSON.stringify({
        error: 'Access Denied',
        message: 'Admin role required',
        path: context.pathname
      }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
});`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-green-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Best Practices
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
              Use Environment Variables
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Store API URLs and tokens in environment variables, never hardcode
              them.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
              Protect All Admin Routes
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Always use authentication middleware on API routes that manage
              policies and attributes.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
              Use Proper RBAC
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Implement role-based access control to restrict who can create,
              update, or delete policies.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
              Handle Errors Gracefully
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Provide meaningful error messages and proper HTTP status codes in
              API responses.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="space-y-6">
        <div className="border-l-4 border-green-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Next Steps
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <Link
            href="/docs/abac-admin/react"
            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              React Hooks
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use React hooks in your Next.js client components
            </p>
          </Link>

          <Link
            href="/docs/abac-admin/react-ui"
            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <Database className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              React UI Components
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pre-built UI components for rapid development
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}

import { Box, Code2, Database, Package, Zap } from "lucide-react";
import Link from "next/link";

export default function CorePackagePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full">
          <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Core Package
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          @devcraft-ts/abac-admin-core
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Lightweight, framework-agnostic core for ABAC Policy Administration.
        </p>
      </div>

      {/* Features */}
      <section className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Ultra-Lightweight
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ~15kb minified+gzipped with zero UI dependencies
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Framework Agnostic
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Works with any JavaScript environment
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <Box className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Type-Safe
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Full TypeScript support with Zod validation
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
{`npm install @devcraft-ts/abac-admin-core zod

# or
yarn add @devcraft-ts/abac-admin-core zod

# or
pnpm add @devcraft-ts/abac-admin-core zod`}
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
              Initialize the Client
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
{`import { ABACAdminClient, PolicyService } from '@devcraft-ts/abac-admin-core';

const client = new ABACAdminClient({
  baseURL: 'https://api.example.com/abac',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});

const policyService = new PolicyService(client);`}
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Working with Policies
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
{`// List all policies
const policies = await policyService.list();

// Get a specific policy
const policy = await policyService.get('policy-id');

// Create a new policy
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

// Update a policy
const updated = await policyService.update('policy-id', {
  description: 'Updated description'
});

// Activate/Deactivate
await policyService.activate('policy-id');
await policyService.deactivate('policy-id');

// Delete a policy
await policyService.delete('policy-id');`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* API Client */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ABACAdminClient
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The base HTTP client for all API operations.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
{`const client = new ABACAdminClient({
  baseURL: string;           // Required: API base URL
  headers?: Record<string, string>;  // Optional: Custom headers
  timeout?: number;          // Optional: Request timeout (default: 30000ms)
  onError?: (error: Error) => void;  // Optional: Error handler
  onSuccess?: (response: Response) => void;  // Optional: Success handler
});`}
            </pre>
          </div>
        </div>
      </section>

      {/* PolicyService */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            PolicyService
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Service for managing policies with full CRUD operations.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Methods
          </h3>
          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <code className="text-sm font-mono text-gray-900 dark:text-white">
                list(filters?: PolicyFilters): Promise&lt;Policy[]&gt;
              </code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                List policies with optional filtering
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <code className="text-sm font-mono text-gray-900 dark:text-white">
                get(id: string): Promise&lt;Policy&gt;
              </code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Get a single policy by ID
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <code className="text-sm font-mono text-gray-900 dark:text-white">
                create(policy: PolicyInput): Promise&lt;Policy&gt;
              </code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Create a new policy
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <code className="text-sm font-mono text-gray-900 dark:text-white">
                update(id: string, policy: PolicyUpdate): Promise&lt;Policy&gt;
              </code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Update an existing policy
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <code className="text-sm font-mono text-gray-900 dark:text-white">
                delete(id: string): Promise&lt;void&gt;
              </code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Delete a policy
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <code className="text-sm font-mono text-gray-900 dark:text-white">
                test(request: PolicyTestRequest): Promise&lt;PolicyTestResult&gt;
              </code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Test a policy against sample data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AttributeService */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AttributeService
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Service for managing resource attributes.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
{`import { AttributeService } from '@devcraft-ts/abac-admin-core';

const attributeService = new AttributeService(client);

// Get all attributes for a resource
const attributes = await attributeService.getResourceAttributes(
  'user',
  'user-123'
);

// Set a single attribute
await attributeService.setResourceAttribute(
  'user',
  'user-123',
  'department',
  'engineering'
);

// Bulk set attributes
await attributeService.bulkSetAttributes('user', 'user-123', {
  department: 'engineering',
  role: 'senior-engineer',
  level: 5
});

// Get attribute history
const history = await attributeService.getHistory(
  'user',
  'user-123',
  'role'
);

// Compare attributes between resources
const comparison = await attributeService.compareAttributes(
  'user',
  'user-123',
  'user-456'
);`}
            </pre>
          </div>
        </div>
      </section>

      {/* AuditService */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AuditService
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Service for retrieving audit logs and statistics.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
{`import { AuditService } from '@devcraft-ts/abac-admin-core';

const auditService = new AuditService(client);

// Get audit log with filters
const auditLog = await auditService.getAuditLog({
  entityType: 'policy',
  action: 'UPDATE',
  startDate: '2024-01-01T00:00:00Z',
  limit: 50
});

// Get entity history
const policyHistory = await auditService.getEntityHistory(
  'policy',
  'policy-id'
);

// Get user activity
const userActivity = await auditService.getUserActivity('user-123', {
  startDate: '2024-01-01T00:00:00Z',
  limit: 100
});

// Get statistics
const stats = await auditService.getStatistics();`}
            </pre>
          </div>
        </div>
      </section>

      {/* ConditionBuilder */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ConditionBuilder
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Utility class for building policy conditions.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
{`import { ConditionBuilder } from '@devcraft-ts/abac-admin-core';

// Simple condition
const condition1 = ConditionBuilder.equals(
  ConditionBuilder.attr('subject', 'role'),
  'admin'
);

// Complex condition with AND/OR
const condition2 = ConditionBuilder.and(
  ConditionBuilder.equals(
    ConditionBuilder.attr('subject', 'department'),
    'engineering'
  ),
  ConditionBuilder.or(
    ConditionBuilder.in(
      ConditionBuilder.attr('subject', 'role'),
      ['admin', 'manager']
    ),
    ConditionBuilder.gte(
      ConditionBuilder.attr('subject', 'level'),
      5
    )
  )
);

// Available operators:
// - equals, notEquals, in, notIn
// - gte, gt, lte, lt
// - contains, startsWith, endsWith, matches
// - and, or, not`}
            </pre>
          </div>
        </div>
      </section>

      {/* Utilities */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Validators & Formatters
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Validators
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-xs">
{`import {
  validatePolicyId,
  validateVersion,
  validatePolicyStructure,
  validateConditionStructure,
  validateAttributeKey
} from '@devcraft-ts/abac-admin-core';

// Validate policy ID format
const isValid = validatePolicyId('my-policy');

// Validate version string
const isValidVersion = validateVersion('1.0.0');

// Validate entire policy
const result = validatePolicyStructure(policy);
if (!result.valid) {
  console.error(result.errors);
}`}
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Formatters
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-xs">
{`import {
  formatDate,
  formatRelativeTime,
  formatPolicyEffect,
  formatCondition
} from '@devcraft-ts/abac-admin-core';

// Format dates
formatDate('2024-01-15T10:30:00Z');
// "Jan 15, 2024, 10:30 AM"

// Relative time
formatRelativeTime('2024-01-15T10:30:00Z');
// "2 hours ago"

// Format policy effect
formatPolicyEffect('PERMIT');
// "Permit"

// Format condition for display
formatCondition(condition);`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Error Handling */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Error Handling
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
{`// Wrap API calls in try-catch
try {
  const policy = await policyService.get('policy-id');
} catch (error) {
  if (error instanceof Error) {
    console.error('API Error:', error.message);
  }
}

// Global error handler
const client = new ABACAdminClient({
  baseURL: 'https://api.example.com',
  onError: (error) => {
    console.error('ABAC API Error:', error);
    // Send to error tracking service
  }
});`}
            </pre>
          </div>
        </div>
      </section>

      {/* TypeScript Support */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            TypeScript Support
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
{`import type {
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
  AuditStatistics
} from '@devcraft-ts/abac-admin-core';`}
            </pre>
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

        <div className="grid sm:grid-cols-3 gap-6">
          <Link
            href="/docs/abac-admin/react"
            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              React Hooks
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use headless React hooks for UI integration
            </p>
          </Link>

          <Link
            href="/docs/abac-admin/nextjs"
            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <Database className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Next.js Utils
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Server-side utilities for Next.js apps
            </p>
          </Link>

          <Link
            href="/docs/abac-admin/react-ui"
            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <Box className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              React UI
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pre-built UI components
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}

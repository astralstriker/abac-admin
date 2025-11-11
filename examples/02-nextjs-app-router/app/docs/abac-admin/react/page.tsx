import { Code2, Layers, Package, Zap } from "lucide-react";
import Link from "next/link";

export default function ReactPackagePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full">
          <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            React Hooks
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          @devcraft-ts/abac-admin-react
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Headless React hooks for building custom ABAC admin interfaces. Built
          on <strong>@devcraft-ts/abac-admin-core</strong> which leverages{" "}
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
              These hooks provide a React-friendly interface to manage ABAC
              policies powered by <strong>abac-engine</strong>. While the hooks
              handle UI state and data fetching, abac-engine provides the
              underlying policy evaluation logic.{" "}
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
            <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Headless
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Bring your own UI - complete design freedom
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <Layers className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Context-Based
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Centralized state management with React Context
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
            <Layers className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Lightweight
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ~30KB minified - minimal overhead
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Optimistic Updates
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built-in optimistic UI updates for smooth UX
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
            {`npm install @devcraft-ts/abac-admin-react

# Peer dependencies
npm install react react-dom`}
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
              1. Wrap Your App with ABACProvider
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import { ABACProvider } from '@devcraft-ts/abac-admin-react';

function App() {
  return (
    <ABACProvider
      config={{
        baseURL: '/api/abac',
        headers: {
          'Authorization': \`Bearer \${token}\`
        }
      }}
    >
      <YourApp />
    </ABACProvider>
  );
}`}
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              2. Use Hooks in Your Components
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import { usePolicies } from '@devcraft-ts/abac-admin-react';

function PolicyList() {
  const { policies, isLoading, error, refetch } = usePolicies();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {policies.map(policy => (
        <div key={policy.id}>
          <h3>{policy.description}</h3>
          <span>{policy.effect}</span>
        </div>
      ))}
    </div>
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Hooks */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Policy Hooks
          </h2>
        </div>

        <div className="space-y-6">
          {/* usePolicies */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              usePolicies
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Hook for managing multiple policies with filtering and CRUD
              operations.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`const {
  policies,        // Policy[]
  isLoading,       // boolean
  error,           // Error | null
  refetch,         // () => Promise<void>
  createPolicy,    // (policy: PolicyInput) => Promise<Policy>
  updatePolicy,    // (id: string, update: PolicyUpdate) => Promise<Policy>
  deletePolicy,    // (id: string) => Promise<void>
  activatePolicy,  // (id: string) => Promise<Policy>
  deactivatePolicy // (id: string) => Promise<Policy>
} = usePolicies({
  filters?: {
    isActive?: boolean;
    category?: string;
    tags?: string[];
  }
});

// Example usage
function PolicyManager() {
  const {
    policies,
    isLoading,
    error,
    createPolicy,
    deletePolicy
  } = usePolicies({ filters: { isActive: true } });

  const handleCreate = async () => {
    await createPolicy({
      policyId: 'new-policy',
      version: '1.0.0',
      effect: 'PERMIT',
      description: 'New policy',
      isActive: true
    });
  };

  const handleDelete = async (id: string) => {
    await deletePolicy(id);
  };

  return (
    <div>
      <button onClick={handleCreate}>Create Policy</button>
      {policies.map(policy => (
        <div key={policy.id}>
          <span>{policy.description}</span>
          <button onClick={() => handleDelete(policy.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}`}
              </pre>
            </div>
          </div>

          {/* usePolicy */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              usePolicy
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Hook for managing a single policy.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`const {
  policy,       // Policy | null
  isLoading,    // boolean
  error,        // Error | null
  refetch,      // () => Promise<void>
  update,       // (update: PolicyUpdate) => Promise<Policy>
  delete: del   // () => Promise<void>
} = usePolicy(policyId);

function PolicyDetails({ policyId }: { policyId: string }) {
  const { policy, isLoading, update } = usePolicy(policyId);

  if (isLoading) return <div>Loading...</div>;
  if (!policy) return <div>Not found</div>;

  const handleUpdate = async () => {
    await update({
      description: 'Updated description'
    });
  };

  return (
    <div>
      <h2>{policy.description}</h2>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}`}
              </pre>
            </div>
          </div>

          {/* usePolicyTest */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              usePolicyTest
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Hook for testing policies with sample data.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`const {
  testPolicy,  // (request: PolicyTestRequest) => Promise<PolicyTestResult>
  result,      // PolicyTestResult | null
  isLoading,   // boolean
  error        // Error | null
} = usePolicyTest();

function PolicyTester({ policyId }: { policyId: string }) {
  const { testPolicy, result, isLoading } = usePolicyTest();

  const handleTest = async () => {
    await testPolicy({
      policyId,
      subject: { id: 'user-123', role: 'admin' },
      resource: { id: 'doc-456' },
      action: { id: 'read' },
      environment: {}
    });
  };

  return (
    <div>
      <button onClick={handleTest}>Test Policy</button>
      {result && (
        <div>
          <p>Decision: {result.decision}</p>
          <p>Matched: {result.matched ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Attribute Hooks */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Attribute Hooks
          </h2>
        </div>

        <div className="space-y-6">
          {/* useAttributes */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              useAttributes
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`const {
  attributes,     // Record<string, any>
  isLoading,      // boolean
  error,          // Error | null
  refetch,        // () => Promise<void>
  setAttribute,   // (key: string, value: any) => Promise<void>
  bulkSet,        // (attrs: Record<string, any>) => Promise<void>
  deleteAttribute // (key: string) => Promise<void>
} = useAttributes(resourceType, resourceId);

function UserAttributeManager({ userId }: { userId: string }) {
  const {
    attributes,
    setAttribute,
    deleteAttribute
  } = useAttributes('user', userId);

  const handleSetDepartment = async () => {
    await setAttribute('department', 'engineering');
  };

  return (
    <div>
      {Object.entries(attributes).map(([key, value]) => (
        <div key={key}>
          <span>{key}: {value}</span>
          <button onClick={() => deleteAttribute(key)}>
            Delete
          </button>
        </div>
      ))}
      <button onClick={handleSetDepartment}>
        Set Department
      </button>
    </div>
  );
}`}
              </pre>
            </div>
          </div>

          {/* useAttributeHistory */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              useAttributeHistory
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`const {
  history,    // AttributeValue[]
  isLoading,  // boolean
  error       // Error | null
} = useAttributeHistory(resourceType, resourceId, attributeKey?);

function AttributeHistory({ userId }: { userId: string }) {
  const { history, isLoading } = useAttributeHistory('user', userId, 'role');

  return (
    <div>
      <h3>Role History</h3>
      {history.map((entry, i) => (
        <div key={i}>
          <span>{entry.value}</span>
          <span>{new Date(entry.timestamp).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Audit Hooks */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Audit Hooks
          </h2>
        </div>

        <div className="space-y-6">
          {/* useAuditLog */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              useAuditLog
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`const {
  entries,    // AuditLogEntry[]
  total,      // number
  hasMore,    // boolean
  isLoading,  // boolean
  error,      // Error | null
  refetch     // () => Promise<void>
} = useAuditLog({
  entityType?: 'policy' | 'attribute';
  entityId?: string;
  action?: AuditAction;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
});

function AuditLog() {
  const { entries, isLoading } = useAuditLog({
    entityType: 'policy',
    limit: 50
  });

  return (
    <div>
      {entries.map(entry => (
        <div key={entry.id}>
          <span>{entry.action}</span>
          <span>{entry.entityId}</span>
          <span>{new Date(entry.timestamp).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}`}
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
              Use Context Provider at App Root
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Place the ABACProvider at the root of your app to ensure all
              components can access the hooks.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
              Handle Loading and Error States
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Always handle loading and error states in your UI for better user
              experience.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
              Use Filters to Reduce Data
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Apply filters to hooks to fetch only the data you need, improving
              performance.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
              Leverage Refetch for Updates
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Use the refetch function to manually refresh data when needed.
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
            href="/docs/abac-admin/react-ui"
            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <Package className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              React UI Components
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use pre-built UI components for faster development
            </p>
          </Link>

          <Link
            href="/docs/abac-admin/core"
            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Core Package
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learn about the underlying API client
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}

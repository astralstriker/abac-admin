import { ArrowRight, CheckCircle2, Code2, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function QuickStartPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full">
          <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium text-green-700 dark:text-green-300">
            Get Started in 5 Minutes
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Quick Start Guide
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Get up and running with ABAC in minutes. Choose your path based on
          your needs.
        </p>
      </div>

      {/* Two Paths */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-3 mb-3">
            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Path 1: Policy Evaluation
            </h3>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Use{" "}
            <code className="bg-blue-200 dark:bg-blue-900 px-1 rounded">
              abac-engine
            </code>{" "}
            to evaluate policies and make authorization decisions in your
            backend.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center space-x-3 mb-3">
            <Code2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Path 2: Policy Administration
            </h3>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Use{" "}
            <code className="bg-purple-200 dark:bg-purple-900 px-1 rounded">
              @devcraft-ts/abac-admin
            </code>{" "}
            to build policy management UIs with React hooks and components.
          </p>
        </div>
      </div>

      {/* Path 1: abac-engine */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Path 1: Using abac-engine
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Evaluate policies in your Node.js backend
            </p>
          </div>
        </div>

        {/* Step 1: Install */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-white">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Install the package
            </h3>
          </div>
          <div className="ml-11">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <pre className="text-gray-300 font-mono text-sm">
                npm install abac-engine
              </pre>
            </div>
          </div>
        </div>

        {/* Step 2: Create Policy */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-white">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create a policy
            </h3>
          </div>
          <div className="ml-11">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import {
  PolicyBuilder,
  ConditionBuilder,
  AttributeRef
} from 'abac-engine'

const policy = PolicyBuilder
  .create('document-access')
  .version('1.0.0')
  .permit()
  .description('Users can access their own documents')
  .condition(
    ConditionBuilder.equals(
      AttributeRef.subject('id'),
      AttributeRef.resource('ownerId')
    )
  )
  .build()`}
              </pre>
            </div>
          </div>
        </div>

        {/* Step 3: Create Engine */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-white">3</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Initialize the engine
            </h3>
          </div>
          <div className="ml-11">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import { ABACEngine, CombiningAlgorithm } from 'abac-engine'

const engine = new ABACEngine({
  policies: [policy],
  combiningAlgorithm: CombiningAlgorithm.DenyOverrides
})`}
              </pre>
            </div>
          </div>
        </div>

        {/* Step 4: Evaluate */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-white">4</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Evaluate a request
            </h3>
          </div>
          <div className="ml-11">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`const decision = await engine.evaluate({
  subject: {
    id: 'user-123',
    attributes: { department: 'Engineering' }
  },
  resource: {
    id: 'doc-456',
    attributes: { ownerId: 'user-123' }
  },
  action: { id: 'read' }
})

if (decision.decision === 'Permit') {
  // Allow access
  console.log('Access granted!')
} else {
  // Deny access
  console.log('Access denied')
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="ml-11 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                You&apos;re all set!
              </p>
              <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                You can now evaluate policies in your application. Check out the{" "}
                <Link
                  href="/docs/abac-engine/examples"
                  className="underline font-medium"
                >
                  examples
                </Link>{" "}
                for more advanced use cases.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-gray-50 dark:bg-gray-950 text-sm text-gray-500 dark:text-gray-400">
            OR
          </span>
        </div>
      </div>

      {/* Path 2: @devcraft-ts/abac-admin */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Path 2: Using @devcraft-ts/abac-admin
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Build policy management UI with React
            </p>
          </div>
        </div>

        {/* Step 1: Install */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-white">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Install the package
            </h3>
          </div>
          <div className="ml-11">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <pre className="text-gray-300 font-mono text-sm">
                {`# For headless hooks
npm install @devcraft-ts/abac-admin-react

# Or for pre-built UI
npm install @devcraft-ts/abac-admin-react-ui`}
              </pre>
            </div>
          </div>
        </div>

        {/* Step 2: Setup Provider */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-white">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Setup the provider
            </h3>
          </div>
          <div className="ml-11">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import { ABACProvider } from '@devcraft-ts/abac-admin-react'

function App() {
  return (
    <ABACProvider
      config={{
        baseURL: '/api/abac'
      }}
    >
      <PolicyManager />
    </ABACProvider>
  )
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Step 3: Use Hooks */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-white">3</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Use the hooks
            </h3>
          </div>
          <div className="ml-11">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import { usePolicies } from '@devcraft-ts/abac-admin-react'

function PolicyManager() {
  const { policies, isLoading, createPolicy } = usePolicies()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h2>Policies ({policies.length})</h2>
      {policies.map(policy => (
        <div key={policy.id}>
          <h3>{policy.policyId}</h3>
          <p>{policy.description}</p>
        </div>
      ))}
    </div>
  )
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Step 4: Create Policies */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-white">4</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create policies programmatically
            </h3>
          </div>
          <div className="ml-11">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`await createPolicy({
  policyId: 'user-access',
  version: '1.0.0',
  effect: 'PERMIT',
  description: 'Allow users to access resources',
  conditions: {
    type: 'equals',
    left: { category: 'subject', key: 'role' },
    right: 'user'
  },
  isActive: true,
  category: 'access',
  tags: ['user', 'read'],
  createdBy: 'admin'
})`}
              </pre>
            </div>
          </div>
        </div>

        <div className="ml-11 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                Ready to build!
              </p>
              <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                You now have a working policy management UI. Explore the{" "}
                <Link
                  href="/docs/abac-admin/react"
                  className="underline font-medium"
                >
                  React hooks documentation
                </Link>{" "}
                for more features.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Combined Usage */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Using Both Together
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          In production, you&apos;ll typically use both packages:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-950 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Backend (Node.js/Next.js API)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Use{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                abac-engine
              </code>{" "}
              to evaluate policies
            </p>
            <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
              → Evaluate requests
              <br />
              → Make authorization decisions
              <br />→ Enforce access control
            </div>
          </div>
          <div className="bg-white dark:bg-gray-950 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
              <Code2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>Frontend (React/Next.js)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Use{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                @devcraft-ts/abac-admin
              </code>{" "}
              for policy management
            </p>
            <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
              → Create/edit policies
              <br />
              → Manage attributes
              <br />→ View audit logs
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Next Steps
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/docs/abac-engine/policy-guide"
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors group"
          >
            <span className="font-medium text-gray-900 dark:text-white">
              Policy Guide
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
          </Link>
          <Link
            href="/docs/abac-engine/examples"
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors group"
          >
            <span className="font-medium text-gray-900 dark:text-white">
              More Examples
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
          </Link>
          <Link
            href="/docs/abac-engine/api-reference"
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors group"
          >
            <span className="font-medium text-gray-900 dark:text-white">
              API Reference
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
          </Link>
          <Link
            href="/docs/abac-admin/core"
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-500 transition-colors group"
          >
            <span className="font-medium text-gray-900 dark:text-white">
              Core Package
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
          </Link>
          <Link
            href="/docs/abac-admin/react"
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-500 transition-colors group"
          >
            <span className="font-medium text-gray-900 dark:text-white">
              React Hooks
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
          </Link>
          <Link
            href="/policies"
            className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white hover:from-blue-700 hover:to-purple-700 transition-colors group"
          >
            <span className="font-medium">Try Live Demo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}

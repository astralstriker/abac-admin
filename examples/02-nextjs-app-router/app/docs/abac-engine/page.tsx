import { ArrowRight, BookOpen, Code2, FileText, Layers, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function AbacEnginePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full">
          <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Core Engine
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          abac-engine
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Zero-dependency ABAC policy evaluation engine. The Policy Decision Point (PDP) for your authorization system.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            Zero
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Dependencies
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            Fast
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Lightning-fast evaluation
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            TypeScript
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Full type safety
          </div>
        </div>
      </div>

      {/* What is ABAC */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          What is ABAC?
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            <strong className="text-gray-900 dark:text-white">Attribute-Based Access Control (ABAC)</strong> is a flexible
            authorization model that makes access decisions based on attributes of:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 dark:text-blue-400 font-bold">S</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Subject</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Who is making the request (user, role, department)
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 dark:text-purple-400 font-bold">R</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Resource</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  What is being accessed (document, database, API)
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 dark:text-green-400 font-bold">A</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Action</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  What operation (read, write, delete, update)
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 dark:text-orange-400 font-bold">E</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Environment</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Context (time, location, IP address)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3 mb-3">
              <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Zero Dependencies
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pure JavaScript/TypeScript with no external dependencies. Small bundle size and easy integration.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3 mb-3">
              <Code2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Fluent API
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Intuitive PolicyBuilder and ConditionBuilder for creating policies programmatically.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3 mb-3">
              <Layers className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Attribute Providers
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fetch attributes dynamically from databases, APIs, LDAP, or custom sources.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3 mb-3">
              <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Audit & Metrics
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built-in audit logging and performance metrics for monitoring and debugging.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Example */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Quick Example
        </h2>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 overflow-x-auto">
          <pre className="text-gray-300 font-mono text-sm">
{`import {
  ABACEngine,
  PolicyBuilder,
  ConditionBuilder,
  AttributeRef,
  CombiningAlgorithm
} from 'abac-engine'

// Create a policy
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
  .build()

// Initialize engine
const engine = new ABACEngine({
  policies: [policy],
  combiningAlgorithm: CombiningAlgorithm.DenyOverrides
})

// Evaluate a request
const decision = await engine.evaluate({
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
}`}
          </pre>
        </div>
      </div>

      {/* Documentation Links */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Documentation
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/docs/abac-engine/api-reference"
            className="group flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  API Reference
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Complete API documentation
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/docs/abac-engine/policy-guide"
            className="group flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-500 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Policy Guide
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Learn to write effective policies
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/docs/abac-engine/examples"
            className="group flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-500 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Examples
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Real-world use cases
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/docs/abac-engine/glossary"
            className="group flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-500 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Glossary
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Terminology and concepts
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Follow our Quick Start guide to build your first ABAC policy in minutes.
        </p>
        <Link
          href="/docs/quick-start"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <span>Quick Start Guide</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

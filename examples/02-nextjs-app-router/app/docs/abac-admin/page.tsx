import { ArrowRight, Code2, Layers, Package, Shield } from "lucide-react";
import Link from "next/link";

export default function AbacAdminPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-full">
          <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
            Admin UI Suite
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          @devcraft-ts/abac-admin
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Lightweight, modular packages for managing ABAC policies across
          multiple platforms. Built on top of <strong>abac-engine</strong>, the
          official ABAC policy evaluation engine.
        </p>
      </div>

      {/* abac-engine Integration Notice */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Built on abac-engine
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              All @devcraft-ts/abac-admin packages are built on top of{" "}
              <strong>abac-engine</strong>, providing standards-compliant ABAC
              policy evaluation with support for complex conditions,
              obligations, and advice.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              These packages provide the UI and management layer, while
              abac-engine handles the policy evaluation logic.{" "}
              <Link
                href="/docs/abac-engine"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Learn more about abac-engine →
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Key Principles */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            Modular
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Install only what you need
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            Headless
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Bring your own UI or use ours
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            TypeSafe
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Full TypeScript + Zod validation
          </div>
        </div>
      </div>

      {/* Architecture */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Package Architecture
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                <Layers className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Layered Architecture
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Each package builds on top of the previous, giving you
                  flexibility to choose your level of abstraction.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold text-purple-600 dark:text-purple-400">
                      4
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900 dark:text-white">
                        @devcraft-ts/abac-admin-react-ui
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Pre-built UI components (~130 KB)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-600 dark:text-blue-400">
                      3
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900 dark:text-white">
                        @devcraft-ts/abac-admin-nextjs
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Next.js utilities (~10 KB)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold text-green-600 dark:text-green-400">
                      2
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900 dark:text-white">
                        @devcraft-ts/abac-admin-react
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Headless React hooks (~30 KB)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-600 dark:text-orange-400">
                      1
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900 dark:text-white">
                        @devcraft-ts/abac-admin-core
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Framework-agnostic core (~15 KB)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Packages
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/docs/abac-admin/core"
            className="group bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-500 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Core Package
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ~15 KB
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Framework-agnostic core with API client, services, types, and
              utilities. Uses abac-engine types and schemas.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                PolicyService
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                AttributeService
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                AuditService
              </span>
            </div>
          </Link>

          <Link
            href="/docs/abac-admin/react"
            className="group bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    React Hooks
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ~30 KB
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Headless React hooks for building custom UIs with full control.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                usePolicies
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                useAttributes
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                useAuditLog
              </span>
            </div>
          </Link>

          <Link
            href="/docs/abac-admin/nextjs"
            className="group bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-500 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Next.js Utilities
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ~10 KB
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Server utilities, API route helpers, and middleware for Next.js.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                API Helpers
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                Middleware
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                Server Utils
              </span>
            </div>
          </Link>

          <Link
            href="/docs/abac-admin/react-ui"
            className="group bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-500 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Layers className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    React UI Components
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ~130 KB
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Pre-built UI components with Radix UI and Tailwind CSS.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                PolicyList
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                PolicyForm
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                Viewer
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Quick Start Example */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Quick Example
        </h2>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 overflow-x-auto">
          <pre className="text-gray-300 font-mono text-sm">
            {`// Install
npm install @devcraft-ts/abac-admin-react

// Use
import { ABACProvider, usePolicies } from '@devcraft-ts/abac-admin-react'

function App() {
  return (
    <ABACProvider config={{ baseURL: '/api/abac' }}>
      <PolicyManager />
    </ABACProvider>
  )
}

function PolicyManager() {
  const { policies, isLoading, createPolicy } = usePolicies()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {policies.map(policy => (
        <div key={policy.id}>{policy.policyId}</div>
      ))}
    </div>
  )
}`}
          </pre>
        </div>
      </div>

      {/* Use Cases */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Policy Administration UI
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Build complete policy management interfaces for administrators to
              create, edit, and manage ABAC policies.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Attribute Management
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage resource attributes and user permissions through intuitive
              interfaces.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Audit & Compliance
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View audit logs and track policy changes for compliance and
              security monitoring.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Policy Testing
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Test policies in sandbox environments before deploying to
              production.
            </p>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Build Policy Management UIs?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Start with our Quick Start guide or dive into individual package
          documentation. All packages leverage <strong>abac-engine</strong> for
          reliable, standards-compliant ABAC policy evaluation.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/docs/quick-start"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            <span>Quick Start Guide</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/docs/abac-engine"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-900 border-2 border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-colors"
          >
            <span>abac-engine Docs</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

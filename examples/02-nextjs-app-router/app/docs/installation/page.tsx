import { ArrowRight, CheckCircle2, Package, Terminal } from "lucide-react";
import Link from "next/link";

export default function InstallationPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Installation
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Learn how to install and configure ABAC packages for your project.
        </p>
      </div>

      {/* Overview */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Package className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Two Separate Packages
            </h3>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              <strong>abac-engine</strong> is for policy evaluation (PDP), while{" "}
              <strong>@devcraft-ts/abac-admin</strong> packages are for policy
              administration (PAP). Install based on your needs.
            </p>
          </div>
        </div>
      </div>

      {/* abac-engine Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Installing abac-engine
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Use this package when you need to evaluate policies and make authorization
          decisions in your application.
        </p>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">npm</span>
            </div>
          </div>
          <pre className="text-gray-300 font-mono text-sm">
            npm install abac-engine
          </pre>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mt-4">
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-gray-700 dark:text-gray-300">Zero dependencies</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-gray-700 dark:text-gray-300">TypeScript support</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-gray-700 dark:text-gray-300">ESM & CJS</span>
          </div>
        </div>
      </div>

      {/* @devcraft-ts Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Installing @devcraft-ts/abac-admin
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Install the appropriate packages based on your stack. These packages help you
          build policy management UIs.
        </p>

        {/* Core Package */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Core Package (Framework Agnostic)
          </h3>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <pre className="text-gray-300 font-mono text-sm">
              npm install @devcraft-ts/abac-admin-core zod
            </pre>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ~15 KB • Use for Node.js, vanilla JS, or any JavaScript environment
          </p>
        </div>

        {/* React Package */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            React Hooks (Headless)
          </h3>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <pre className="text-gray-300 font-mono text-sm">
              npm install @devcraft-ts/abac-admin-react
            </pre>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ~30 KB • Headless React hooks for building custom UIs
          </p>
        </div>

        {/* Next.js Package */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Next.js Utilities
          </h3>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <pre className="text-gray-300 font-mono text-sm">
              npm install @devcraft-ts/abac-admin-nextjs
            </pre>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ~10 KB • Server utilities and API route helpers for Next.js
          </p>
        </div>

        {/* UI Package */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Pre-built UI Components (Optional)
          </h3>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <pre className="text-gray-300 font-mono text-sm">
              npm install @devcraft-ts/abac-admin-react-ui
            </pre>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ~130 KB • Complete UI built with Radix UI and Tailwind CSS
          </p>
        </div>
      </div>

      {/* Common Setups */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Common Setups
        </h2>

        <div className="grid gap-6">
          {/* Setup 1: Full Stack */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Full Stack (Next.js + Evaluation)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Policy management UI + backend evaluation
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <pre className="text-gray-300 font-mono text-sm overflow-x-auto">
{`npm install abac-engine \\
  @devcraft-ts/abac-admin-react \\
  @devcraft-ts/abac-admin-nextjs`}
              </pre>
            </div>
          </div>

          {/* Setup 2: Backend Only */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Backend Only (Policy Evaluation)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Just evaluate policies in your Node.js backend
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <pre className="text-gray-300 font-mono text-sm">
                npm install abac-engine
              </pre>
            </div>
          </div>

          {/* Setup 3: Admin UI Only */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Admin UI Only (React)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Build policy management UI with custom components
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <pre className="text-gray-300 font-mono text-sm">
                npm install @devcraft-ts/abac-admin-react
              </pre>
            </div>
          </div>

          {/* Setup 4: Pre-built UI */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Complete Admin UI (Pre-built)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Ready-to-use policy management interface
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <pre className="text-gray-300 font-mono text-sm">
                npm install @devcraft-ts/abac-admin-react-ui
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Requirements
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-gray-900">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Node.js Version
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Node.js 18.0.0 or higher is required for all packages.
            </p>
            <code className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
              node --version
            </code>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-gray-900">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Peer Dependencies
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Some packages require peer dependencies:
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• React 18+ (for React packages)</li>
              <li>• Zod 3+ (for core package)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Next Steps
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Now that you have the packages installed, follow our Quick Start guide to begin
          using them.
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

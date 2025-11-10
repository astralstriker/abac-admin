import {
  ArrowRight,
  BookOpen,
  Code2,
  FileText,
  Github,
  Package,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full">
          <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Documentation
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          ABAC Documentation
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
          Complete documentation for building Attribute-Based Access Control
          systems with{" "}
          <code className="text-blue-600 dark:text-blue-400">abac-engine</code>{" "}
          and{" "}
          <code className="text-blue-600 dark:text-blue-400">
            @devcraft-ts/abac-admin
          </code>{" "}
          packages.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-2 gap-6">
        <Link
          href="/docs/quick-start"
          className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-200 hover:shadow-xl"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Quick Start
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get up and running in minutes with our step-by-step guide.
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
          </div>
        </Link>

        <Link
          href="/docs/installation"
          className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-500/50 transition-all duration-200 hover:shadow-xl"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Installation
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Learn how to install and configure the packages.
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </div>

      {/* Main Sections */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Core Documentation
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* abac-engine */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    abac-engine
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Core evaluation engine
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Zero-dependency ABAC policy evaluation engine. The PDP (Policy
                Decision Point) for your authorization system.
              </p>
              <div className="space-y-2">
                <Link
                  href="/docs/abac-engine"
                  className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <span>Overview</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/docs/abac-engine/api-reference"
                  className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <span>API Reference</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/docs/abac-engine/policy-guide"
                  className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <span>Policy Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/docs/abac-engine/examples"
                  className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <span>Examples</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="mt-6 pt-6 border-t border-blue-200 dark:border-blue-800">
                <a
                  href="https://github.com/astralstriker/abac-engine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100"
                >
                  <Github className="w-4 h-4" />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>

            {/* @devcraft-ts/abac-admin */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-600 dark:bg-purple-500 rounded-lg flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    @devcraft-ts/abac-admin
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Admin UI packages
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Modular packages for policy administration. From headless hooks
                to complete UI components.
              </p>
              <div className="space-y-2">
                <Link
                  href="/docs/abac-admin"
                  className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                >
                  <span>Overview</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/docs/abac-admin/core"
                  className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                >
                  <span>Core Package</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/docs/abac-admin/react"
                  className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                >
                  <span>React Hooks</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/docs/abac-admin/react-ui"
                  className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                >
                  <span>React UI</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="mt-6 pt-6 border-t border-purple-200 dark:border-purple-800">
                <a
                  href="https://github.com/astralstriker/abac-admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100"
                >
                  <Github className="w-4 h-4" />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Additional Resources
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/docs/abac-engine/glossary"
              className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                Glossary
              </span>
            </Link>
            <Link
              href="/docs/abac-engine/error-handling"
              className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                Error Handling
              </span>
            </Link>
            <Link
              href="/docs/abac-engine/policy-persistence"
              className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                Policy Persistence
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Getting Help */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Need Help?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          If you can&apos;t find what you&apos;re looking for, check out these
          resources:
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/astralstriker/abac-engine/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Report an Issue (abac-engine)</span>
          </a>
          <a
            href="https://github.com/astralstriker/abac-admin/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Report an Issue (abac-admin)</span>
          </a>
          <Link
            href="/policies"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Code2 className="w-4 h-4" />
            <span>Try Live Demo</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Github,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full px-4 py-2 shadow-sm">
              <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                26 % faster than CASL (real benchmark)
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block text-gray-900 dark:text-white">
                  The fastest zero-dep
                </span>
                <span className="block bg-clip-text h-20 text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  ABAC engine
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
                Build powerful, flexible access control policies with modular
                packages. From lightweight core to full admin UI—install only
                what you need.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/policies"
                className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/50 dark:shadow-blue-500/30 transition-all duration-200 hover:shadow-xl hover:scale-105"
              >
                <span>Try Live Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 hover:shadow-lg"
              >
                <span>Documentation</span>
              </Link>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://github.com/astralstriker/abac-engine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-lg"
                >
                  <Github className="w-4 h-4" />
                  <span>abac-engine</span>
                </a>
                <a
                  href="https://github.com/astralstriker/abac-admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-lg"
                >
                  <Github className="w-4 h-4" />
                  <span>abac-admin</span>
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="pt-8 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  9.37 µs
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Warm evaluation (100 policies)
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  4.2 KB
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  abac-engine (gzip)
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  18 KB
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Full admin UI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Everything you need for ABAC
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A complete suite of tools to manage, test, and deploy your access
            control policies
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group relative bg-white dark:bg-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-200 hover:shadow-xl shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative space-y-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Visual Policy Builder
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Build complex policies with an intuitive drag-and-drop
                interface. No JSON required.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Logical operators (AND, OR, NOT)</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Comparison operators</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Nested conditions</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-white dark:bg-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-500/50 transition-all duration-200 hover:shadow-xl shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative space-y-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Real-time Evaluation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Test policies in real-time with our powerful evaluation engine.
                See results instantly.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Lightning-fast evaluation</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Detailed audit logs</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Debug mode</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-white dark:bg-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-500/50 transition-all duration-200 hover:shadow-xl shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 dark:from-green-500/10 dark:to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative space-y-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Framework Agnostic
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Use with React, Next.js, or any JavaScript framework.
                TypeScript-first design.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Core package (framework-free)</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>React hooks & components</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Next.js utilities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Example Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Get started in minutes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose your approach: use the core engine directly or get a full
            admin UI
          </p>
        </div>

        <div className="space-y-8">
          {/* abac-engine approach */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-950 dark:to-gray-900 rounded-3xl p-8 sm:p-12 border border-gray-700 dark:border-gray-800 shadow-2xl">
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    abac-engine
                  </h3>
                  <p className="text-gray-400">
                    Core evaluation engine with zero dependencies
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Step 1: Install */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">1</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      Install
                    </h4>
                  </div>
                  <div className="relative ml-11">
                    <pre className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                      <code className="text-sm text-gray-300 font-mono">
                        npm install abac-engine
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Step 2: Define Policy */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">2</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      Define Policy
                    </h4>
                  </div>
                  <div className="relative ml-11">
                    <pre className="bg-gray-950 rounded-lg p-4 border border-gray-800 overflow-x-auto">
                      <code className="text-sm text-gray-300 font-mono">
                        {`import { PolicyBuilder, ConditionBuilder,
  AttributeRef } from 'abac-engine'

const policy = PolicyBuilder
  .create('doc-access')
  .version('1.0.0')
  .permit()
  .condition(
    ConditionBuilder.equals(
      AttributeRef.subject('role'),
      'user'
    )
  )
  .build()`}
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Step 3: Create Engine */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">3</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      Create Engine
                    </h4>
                  </div>
                  <div className="relative ml-11">
                    <pre className="bg-gray-950 rounded-lg p-4 border border-gray-800 overflow-x-auto">
                      <code className="text-sm text-gray-300 font-mono">
                        {`import { ABACEngine, CombiningAlgorithm }
  from 'abac-engine'

const engine = new ABACEngine({
  policies: [policy],
  combiningAlgorithm:
    CombiningAlgorithm.DenyOverrides
})`}
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Step 4: Evaluate */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">4</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      Evaluate Request
                    </h4>
                  </div>
                  <div className="relative ml-11">
                    <pre className="bg-gray-950 rounded-lg p-4 border border-gray-800 overflow-x-auto">
                      <code className="text-sm text-gray-300 font-mono">
                        {`const decision = await engine.evaluate({
  subject: {
    id: 'user-1',
    attributes: { role: 'user' }
  },
  resource: { id: 'doc-1' },
  action: { id: 'read' }
})
// decision.decision === 'Permit'`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* @devcraft-ts suite approach */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-950 dark:to-gray-900 rounded-3xl p-8 sm:p-12 border border-gray-700 dark:border-gray-800 shadow-2xl">
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    @devcraft-ts packages
                  </h3>
                  <p className="text-gray-400">
                    Modular admin UI - headless hooks or pre-built components
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Step 1: Install */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">1</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      Install Package
                    </h4>
                  </div>
                  <div className="relative ml-11">
                    <pre className="bg-gray-950 rounded-lg p-4 border border-gray-800 overflow-x-auto">
                      <code className="text-sm text-gray-300 font-mono">
                        {`# Headless hooks (~30kb)
npm install @devcraft-ts/abac-admin-react

# Or pre-built UI (~130kb)
npm install @devcraft-ts/abac-admin-react-ui`}
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Step 2: Setup Provider */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">2</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      Setup Provider
                    </h4>
                  </div>
                  <div className="relative ml-11">
                    <pre className="bg-gray-950 rounded-lg p-4 border border-gray-800 overflow-x-auto">
                      <code className="text-sm text-gray-300 font-mono">
                        {`import { ABACProvider }
  from '@devcraft-ts/abac-admin-react'

function App() {
  return (
    <ABACProvider config={{
      baseURL: '/api/abac'
    }}>
      <PolicyManager />
    </ABACProvider>
  )
}`}
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Step 3: Use Hooks */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">3</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      Use Hooks
                    </h4>
                  </div>
                  <div className="relative ml-11">
                    <pre className="bg-gray-950 rounded-lg p-4 border border-gray-800 overflow-x-auto">
                      <code className="text-sm text-gray-300 font-mono">
                        {`import { usePolicies }
  from '@devcraft-ts/abac-admin-react'

function PolicyManager() {
  const { policies, createPolicy }
    = usePolicies()

  // Build your custom UI
  return <div>...</div>
}`}
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Step 4: Create Policies */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">4</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      Create Policies
                    </h4>
                  </div>
                  <div className="relative ml-11">
                    <pre className="bg-gray-950 rounded-lg p-4 border border-gray-800 overflow-x-auto">
                      <code className="text-sm text-gray-300 font-mono">
                        {`await createPolicy({
  policyId: 'doc-policy',
  version: '1.0.0',
  effect: 'PERMIT',
  conditions: {
    type: 'equals',
    left: { category: 'subject', key: 'role' },
    right: 'admin'
  },
  isActive: true,
  category: 'document',
  tags: ['read'],
  createdBy: 'user-123'
})`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="relative space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to get started?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Try our demo and see how easy it is to manage access control
              policies
            </p>
            <Link
              href="/policies"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <span>View Demo Policies</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Box, Code2, Package, Palette, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

export default function ReactUIPackagePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full">
          <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            React UI Components
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          @devcraft-ts/abac-admin-react-ui
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Pre-built UI components for ABAC Policy Administration - batteries
          included.
        </p>
      </div>

      {/* Features */}
      <section className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Ready-Made
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Production-ready components out of the box
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <Palette className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Customizable
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built with Tailwind CSS and Radix UI
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Beautiful
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Modern, accessible, and responsive design
            </p>
          </div>
        </div>
      </section>

      {/* When to Use */}
      <section className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
              ✅ When to Use This Package
            </h3>
            <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
              <li>• You want a ready-made admin UI</li>
              <li>• You need to get up and running quickly</li>
              <li>• You&apos;re okay with an opinionated design</li>
              <li>• You want to prototype or build MVPs fast</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-3">
              ❌ When NOT to Use This Package
            </h3>
            <ul className="space-y-2 text-sm text-red-800 dark:text-red-200">
              <li>• You need full design control</li>
              <li>• You have an existing design system</li>
              <li>• You want to minimize bundle size</li>
              <li>• Use @devcraft-ts/abac-admin-react instead</li>
            </ul>
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
            {`npm install @devcraft-ts/abac-admin-react-ui

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
              Basic Usage
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import { ABACProvider, PolicyList } from '@devcraft-ts/abac-admin-react-ui';
import '@devcraft-ts/abac-admin-react-ui/styles.css';

function App() {
  return (
    <ABACProvider config={{ baseURL: '/api/abac' }}>
      <div className="p-6">
        <PolicyList
          onCreate={() => console.log('Create policy')}
          onEdit={(id) => console.log('Edit policy', id)}
          onDelete={(id) => console.log('Delete policy', id)}
        />
      </div>
    </ABACProvider>
  );
}`}
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              With Next.js App Router
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`"use client";

import { ABACProvider, PolicyList } from '@devcraft-ts/abac-admin-react-ui';
import '@devcraft-ts/abac-admin-react-ui/styles.css';

export default function PoliciesPage() {
  return (
    <ABACProvider config={{ baseURL: '/api/abac' }}>
      <div className="container mx-auto py-8">
        <PolicyList />
      </div>
    </ABACProvider>
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Components
          </h2>
        </div>

        <div className="space-y-6">
          {/* PolicyList */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              PolicyList
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Displays a table of policies with search, filtering, and CRUD
              actions.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import { PolicyList } from '@devcraft-ts/abac-admin-react-ui';

<PolicyList
  onCreate={() => setShowCreateDialog(true)}
  onEdit={(id) => router.push(\`/policies/\${id}/edit\`)}
  onDelete={(id) => handleDelete(id)}
  onView={(id) => router.push(\`/policies/\${id}\`)}
/>

// Props:
interface PolicyListProps {
  onCreate?: () => void;              // Called when create button is clicked
  onEdit?: (policyId: string) => void; // Called when edit button is clicked
  onDelete?: (policyId: string) => void; // Called after successful deletion
  onView?: (policyId: string) => void;  // Called when a row is clicked
}`}
              </pre>
            </div>
          </div>

          {/* UI Primitives */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              UI Primitives
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              All primitive UI components are also exported for building custom
              interfaces.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Button
                </h4>
                <div className="bg-gray-900 rounded p-3 overflow-x-auto">
                  <pre className="text-gray-300 font-mono text-xs">
                    {`<Button variant="primary" size="md">
  Click me
</Button>

// Variants: primary, secondary,
//   destructive, outline, ghost
// Sizes: sm, md, lg`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Input
                </h4>
                <div className="bg-gray-900 rounded p-3 overflow-x-auto">
                  <pre className="text-gray-300 font-mono text-xs">
                    {`<Input
  label="Policy ID"
  placeholder="Enter ID"
  error={errors.policyId}
  helperText="Unique identifier"
  required
/>`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Badge
                </h4>
                <div className="bg-gray-900 rounded p-3 overflow-x-auto">
                  <pre className="text-gray-300 font-mono text-xs">
                    {`<Badge variant="success">Active</Badge>
<Badge variant="error">Inactive</Badge>
<Badge variant="info">v1.0.0</Badge>

// Variants: default, success,
//   error, warning, info`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Card
                </h4>
                <div className="bg-gray-900 rounded p-3 overflow-x-auto">
                  <pre className="text-gray-300 font-mono text-xs">
                    {`<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Dialog */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Dialog
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@devcraft-ts/abac-admin-react-ui';

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create Policy</DialogTitle>
      <DialogDescription>
        Fill in the details to create a new policy.
      </DialogDescription>
    </DialogHeader>
    {/* Form content */}
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleSubmit}>Create</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Styling & Theming */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Styling & Theming
          </h2>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Using the Default Theme
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Import the CSS file in your app to use the default theme.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`// app/layout.tsx or _app.tsx
import '@devcraft-ts/abac-admin-react-ui/styles.css';`}
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Customizing the Theme
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Override CSS variables to customize colors and styling.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`/* custom-theme.css */
:root {
  /* Primary color */
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;

  /* Secondary color */
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;

  /* Destructive (error) color */
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;

  /* Border radius */
  --radius: 0.5rem;
}

/* Dark mode */
.dark {
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;
  /* ... other dark mode variables */
}`}
              </pre>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Using with Your Own Tailwind Config
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@devcraft-ts/abac-admin-react-ui/dist/**/*.js',
  ],
  // ... rest of your config
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Utilities */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Utilities
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Formatting Utilities
          </h3>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
              {`import {
  formatDate,
  truncate,
  getEffectColor,
  getStatusColor,
  cn
} from '@devcraft-ts/abac-admin-react-ui';

// Format dates
formatDate(new Date()); // "Jan 1, 2024, 12:00 PM"

// Truncate strings
truncate("Very long text here...", 20); // "Very long text he..."

// Get badge colors
getEffectColor("PERMIT"); // "abac-badge-success"
getStatusColor(true); // "abac-badge-success"

// className utility
<div className={cn(
  'base-class',
  isActive && 'active-class',
  'another-class'
)} />`}
            </pre>
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

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Full Policy Management Page
          </h3>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
              {`"use client";

import { useState } from 'react';
import {
  ABACProvider,
  PolicyList,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button
} from '@devcraft-ts/abac-admin-react-ui';
import '@devcraft-ts/abac-admin-react-ui/styles.css';

export default function PoliciesPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);

  return (
    <ABACProvider config={{ baseURL: '/api/abac' }}>
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Policies
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your ABAC policies
          </p>
        </div>

        <PolicyList
          onCreate={() => setShowCreate(true)}
          onEdit={(id) => setSelectedPolicy(id)}
          onView={(id) => console.log('View policy', id)}
        />

        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Policy</DialogTitle>
            </DialogHeader>
            {/* Your create form here */}
            <Button onClick={() => setShowCreate(false)}>
              Create Policy
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </ABACProvider>
  );
}`}
            </pre>
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
              Use with ABACProvider
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Always wrap your components in ABACProvider for proper state
              management.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
              Import CSS Once
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Import the CSS file at the root of your app to ensure consistent
              styling.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
              Handle Actions
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Provide callbacks for user actions to integrate with your
              app&apos;s routing and state.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
              Customize Thoughtfully
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Override CSS variables instead of completely replacing styles for
              easier maintenance.
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
              Build custom UIs with headless hooks
            </p>
          </Link>

          <Link
            href="/docs/abac-admin/core"
            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <Box className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
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

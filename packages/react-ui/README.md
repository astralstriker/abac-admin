# @devcraft-ts/abac-admin-react-ui

> Pre-built UI components for ABAC Policy Administration with theme support - batteries included

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/@devcraft-ts%2Fabac-admin-react-ui.svg)](https://www.npmjs.com/package/@devcraft-ts/abac-admin-react-ui)

## 🚀 Live Demo & Documentation

**[View Live Demo →](https://abac-admin-02-nextjs-app-router.vercel.app/)**

Explore a fully functional demo application showcasing all UI components with dark/light theme support, including complete documentation for **abac-engine** integration and best practices.

## 🎯 Overview

`@devcraft-ts/abac-admin-react-ui` provides a complete set of pre-built, customizable UI components for managing ABAC policies. Built on top of Radix UI and styled with Tailwind CSS, these components offer a production-ready admin interface with full dark/light theme support.

**When to use this package:**

- ✅ You want a ready-made ABAC admin UI with theme support
- ✅ You need to get up and running quickly
- ✅ You're okay with an opinionated design
- ✅ You need dark mode support out of the box
- ✅ Built on [abac-engine](https://www.npmjs.com/package/abac-engine) for reliable policy evaluation

**When NOT to use this package:**

- ❌ You need full design control (use `@devcraft-ts/abac-admin-react` instead)
- ❌ You have an existing design system
- ❌ You want to minimize bundle size

## 📦 Installation

```bash
npm install @devcraft-ts/abac-admin-react-ui
```

**Peer dependencies:**

```bash
npm install react react-dom
```

## 🚀 Quick Start

### Basic Usage with Theme Support

```tsx
import {
  ThemeProvider,
  ABACProvider,
  PolicyList,
  ThemeToggle,
} from "@devcraft-ts/abac-admin-react-ui";
import "@devcraft-ts/abac-admin-react-ui/styles.css";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <ABACProvider config={{ baseURL: "/api/abac" }}>
        <div className="min-h-screen bg-background text-foreground">
          <header className="border-b p-4">
            <div className="flex justify-between items-center">
              <h1>ABAC Admin</h1>
              <ThemeToggle />
            </div>
          </header>
          <main className="p-6">
            <PolicyList />
          </main>
        </div>
      </ABACProvider>
    </ThemeProvider>
  );
}
```

### With Next.js App Router

```tsx
// app/layout.tsx
import { ThemeProvider } from "@devcraft-ts/abac-admin-react-ui";
import "@devcraft-ts/abac-admin-react-ui/styles.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system" storageKey="my-app-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// app/admin/policies/page.tsx
("use client");

import {
  ABACProvider,
  PolicyList,
  ThemeToggle,
} from "@devcraft-ts/abac-admin-react-ui";

export default function PoliciesPage() {
  return (
    <ABACProvider config={{ baseURL: "/api/abac" }}>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Policies</h1>
          <ThemeToggle />
        </div>
        <PolicyList />
      </div>
    </ABACProvider>
  );
}
```

## 🎨 Theme System

### ThemeProvider

Wrap your app with `ThemeProvider` to enable theme support:

```tsx
import { ThemeProvider } from "@devcraft-ts/abac-admin-react-ui";

<ThemeProvider
  defaultTheme="system" // "light" | "dark" | "system"
  storageKey="app-theme" // localStorage key (default: "abac-ui-theme")
>
  {children}
</ThemeProvider>;
```

### useTheme Hook

Access and control the theme programmatically:

```tsx
import { useTheme } from "@devcraft-ts/abac-admin-react-ui";

function MyComponent() {
  const { theme, actualTheme, setTheme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Actual theme (resolved): {actualTheme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
    </div>
  );
}
```

### ThemeToggle Component

Pre-built theme toggle button:

```tsx
import { ThemeToggle } from '@devcraft-ts/abac-admin-react-ui';

// Icon button (default)
<ThemeToggle />

// Button with label
<ThemeToggle variant="button" showLabel />

// Different sizes
<ThemeToggle size="sm" />
<ThemeToggle size="md" />
<ThemeToggle size="lg" />
```

## 🎨 ABAC Components

### PolicyList

Displays a table of policies with search, filtering, and CRUD actions:

```tsx
import { PolicyList } from "@devcraft-ts/abac-admin-react-ui";

<PolicyList
  onCreate={() => setShowCreateDialog(true)}
  onEdit={(id) => router.push(`/policies/${id}/edit`)}
  onDelete={(id) => handleDelete(id)}
  onView={(id) => router.push(`/policies/${id}`)}
/>;
```

**Props:**

- `onCreate?: () => void` - Called when create button is clicked
- `onEdit?: (policyId: string) => void` - Called when edit button is clicked
- `onDelete?: (policyId: string) => void` - Called after successful deletion
- `onView?: (policyId: string) => void` - Called when a row is clicked

### AttributeManager

Manage attributes for a specific resource:

```tsx
import { AttributeManager } from "@devcraft-ts/abac-admin-react-ui";

<AttributeManager
  resourceType="user"
  resourceId="user-123"
  onEdit={(key) => handleEdit(key)}
  onDelete={(key) => handleDelete(key)}
  onCreate={() => setShowCreateDialog(true)}
/>;
```

**Props:**

- `resourceType: ResourceType` - Type of resource (required)
- `resourceId: string` - ID of the resource (required)
- `onEdit?: (attributeKey: string) => void` - Called when edit is clicked
- `onDelete?: (attributeKey: string) => void` - Called when delete is clicked
- `onCreate?: () => void` - Called when create button is clicked

### AuditLogViewer

View audit logs for policy and attribute changes:

```tsx
import { AuditLogViewer } from "@devcraft-ts/abac-admin-react-ui";

<AuditLogViewer
  onEntryClick={(id) => showDetails(id)}
  autoRefresh={true}
  refreshInterval={30000}
  entityType="policy"
/>;
```

**Props:**

- `onEntryClick?: (entryId: string) => void` - Called when an entry is clicked
- `autoRefresh?: boolean` - Enable auto-refresh (default: false)
- `refreshInterval?: number` - Refresh interval in ms (default: 30000)
- `entityType?: "policy" | "attribute"` - Filter by entity type

### PolicyForm

Policy creation and editing form:

```tsx
import { PolicyForm } from "@devcraft-ts/abac-admin-react-ui";

<PolicyForm
  initialData={policy}
  onSubmit={handleSubmit}
  onCancel={() => setShowDialog(false)}
/>;
```

### PolicyViewer

Read-only policy display:

```tsx
import { PolicyViewer } from "@devcraft-ts/abac-admin-react-ui";

<PolicyViewer policyId={policyId} />;
```

### ConditionBuilder

Visual condition builder:

```tsx
import { ConditionBuilder } from "@devcraft-ts/abac-admin-react-ui";

<ConditionBuilder
  value={conditions}
  onChange={setConditions}
  availableAttributes={attributes}
/>;
```

## 🎨 UI Components

### Input

```tsx
import { Input } from "@devcraft-ts/abac-admin-react-ui";

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error={errors.email}
  helperText="We'll never share your email"
  required
/>;
```

### Button

```tsx
import { Button } from '@devcraft-ts/abac-admin-react-ui';

<Button variant="primary" size="md">
  Click me
</Button>

<Button variant="secondary" isLoading>
  Loading...
</Button>

<Button variant="destructive" leftIcon={<TrashIcon />}>
  Delete
</Button>
```

**Variants:** `primary`, `secondary`, `destructive`, `outline`, `ghost`
**Sizes:** `sm`, `md`, `lg`

### Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@devcraft-ts/abac-admin-react-ui";

<Card>
  <CardHeader>
    <CardTitle>Policy Details</CardTitle>
    <CardDescription>View and edit policy information</CardDescription>
  </CardHeader>
  <CardContent>{/* Your content */}</CardContent>
  <CardFooter>
    <Button>Save Changes</Button>
  </CardFooter>
</Card>;
```

### Badge

```tsx
import { Badge } from '@devcraft-ts/abac-admin-react-ui';

<Badge variant="success">Active</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="default">Default</Badge>
```

### Dialog

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@devcraft-ts/abac-admin-react-ui";

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
</Dialog>;
```

## 🎨 Styling & Theming

### Using the Default Theme

Import the CSS file in your app:

```tsx
import "@devcraft-ts/abac-admin-react-ui/styles.css";
```

### Customizing the Theme

The package uses CSS variables for theming. Override them in your CSS:

```css
:root {
  /* Primary color */
  --primary: 221 83% 53%;
  --primary-foreground: 0 0% 100%;

  /* Secondary color */
  --secondary: 240 5% 96%;
  --secondary-foreground: 222 47% 11%;

  /* Destructive (error) color */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;

  /* Background */
  --background: 0 0% 98%;
  --foreground: 222 47% 11%;

  /* Card */
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;

  /* Border radius */
  --radius: 0.5rem;
}

/* Dark mode */
.dark {
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 98%;
  --background: 240 10% 4%;
  --foreground: 0 0% 98%;
  --card: 240 10% 7%;
  --card-foreground: 0 0% 98%;
  /* ... other dark mode variables */
}
```

### Using with Tailwind

Extend your Tailwind config:

```js
// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@devcraft-ts/abac-admin-react-ui/dist/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... other colors
      },
    },
  },
};
```

## 🔧 Utilities

### Formatting Utilities

```tsx
import {
  formatDate,
  truncate,
  getEffectColor,
  getStatusColor,
} from "@devcraft-ts/abac-admin-react-ui";

// Format dates
formatDate(new Date()); // "Jan 1, 2024, 12:00 PM"

// Truncate strings
truncate("Very long text here...", 20); // "Very long text he..."

// Get badge colors
getEffectColor("PERMIT"); // "abac-badge-success"
getStatusColor(true); // "abac-badge-success"
```

### className Utility

```tsx
import { cn } from "@devcraft-ts/abac-admin-react-ui";

<div
  className={cn("base-class", isActive && "active-class", "another-class")}
/>;
```

## 📚 Complete Example

```tsx
"use client";

import { useState } from "react";
import {
  ThemeProvider,
  ABACProvider,
  PolicyList,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  ThemeToggle,
  Toaster,
  useToast,
} from "@devcraft-ts/abac-admin-react-ui";
import "@devcraft-ts/abac-admin-react-ui/styles.css";

export default function PoliciesPage() {
  const [showCreate, setShowCreate] = useState(false);
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    toast({
      variant: "success",
      title: "Policy deleted",
      description: `Policy ${id} has been deleted successfully.`,
    });
  };

  return (
    <ThemeProvider defaultTheme="system">
      <ABACProvider config={{ baseURL: "/api/abac" }}>
        <div className="min-h-screen bg-background text-foreground">
          <header className="border-b p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">ABAC Admin</h1>
              <ThemeToggle />
            </div>
          </header>

          <main className="container mx-auto py-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Policies</h2>
              <p className="text-muted-foreground">
                Manage your access control policies
              </p>
            </div>

            <PolicyList
              onCreate={() => setShowCreate(true)}
              onDelete={handleDelete}
            />

            <Dialog open={showCreate} onOpenChange={setShowCreate}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Policy</DialogTitle>
                </DialogHeader>
                {/* Your create form here */}
              </DialogContent>
            </Dialog>
          </main>
        </div>
        <Toaster />
      </ABACProvider>
    </ThemeProvider>
  );
}
```

## 🎯 Best Practices

### 1. Wrap with ThemeProvider

Always wrap your app with `ThemeProvider` at the root:

```tsx
<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>
```

### 2. Use with ABACProvider

Wrap policy components in `ABACProvider`:

```tsx
<ABACProvider config={{ baseURL: "/api/abac" }}>
  <PolicyList />
</ABACProvider>
```

### 3. Import CSS Once

Import the CSS file at the root of your app:

```tsx
// app/layout.tsx or _app.tsx
import "@devcraft-ts/abac-admin-react-ui/styles.css";
```

### 4. Add Toaster for Notifications

Include `Toaster` component at your app root:

```tsx
<App>
  {children}
  <Toaster />
</App>
```

### 5. Use Semantic HTML

Components are built with accessibility in mind. Use proper labels and ARIA attributes:

```tsx
<Label htmlFor="email" required>Email</Label>
<Input id="email" type="email" aria-describedby="email-helper" />
```

## 🆕 What's New in v1.1.0

- ✨ **Full Theme Support**: Dark/light/system theme with `ThemeProvider` and `useTheme` hook
- 🎨 **New ABAC Components**: `AttributeManager` for managing resource attributes, `AuditLogViewer` for tracking changes
- 🎯 **Better Accessibility**: Improved ARIA support and keyboard navigation
- 📱 **Responsive Design**: All components are mobile-friendly
- 🚀 **Performance**: Optimized animations and transitions
- 🎨 **Enhanced Styling**: Better dark mode support and smoother animations

## 🔗 Related Packages

- **[@devcraft-ts/abac-admin-core](../core)** - Framework-agnostic core
- **[@devcraft-ts/abac-admin-react](../react)** - Headless React hooks
- **[@devcraft-ts/abac-admin-nextjs](../nextjs)** - Next.js utilities

## 📖 Documentation

- [Main Documentation](../../README.md)
- [API Reference](../../docs/api-reference.md)
- [Examples](../../examples)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](../../CONTRIBUTING.md) for details.

## 📄 License

MIT © [astralstriker](https://github.com/astralstriker)

## 🔗 Links

- **GitHub**: https://github.com/astralstriker/abac-admin
- **npm**: https://www.npmjs.com/package/@devcraft-ts/abac-admin-react-ui
- **Issues**: https://github.com/astralstriker/abac-admin/issues

---

**Built with ❤️ using Radix UI, Tailwind CSS, Lucide Icons, and TypeScript**

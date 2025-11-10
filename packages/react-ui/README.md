# @devcraft-ts/abac-admin-react-ui

> Pre-built UI components for ABAC Policy Administration - batteries included

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/@devcraft-ts%2Fabac-admin-react-ui.svg)](https://www.npmjs.com/package/@devcraft-ts/abac-admin-react-ui)

## 🎯 Overview

`@devcraft-ts/abac-admin-react-ui` provides a complete set of pre-built, customizable UI components for managing ABAC policies. Built on top of Radix UI and styled with Tailwind CSS, these components offer a production-ready admin interface out of the box.

**When to use this package:**
- ✅ You want a ready-made admin UI
- ✅ You need to get up and running quickly
- ✅ You're okay with an opinionated design
- ✅ You want to prototype or build MVPs fast

**When NOT to use this package:**
- ❌ You need full design control (use `@devcraft-ts/abac-admin-react` instead)
- ❌ You have an existing design system
- ❌ You want to minimize bundle size (this adds ~130kb with dependencies)

## 📦 Installation

```bash
npm install @devcraft-ts/abac-admin-react-ui
```

**Peer dependencies:**
```bash
npm install react react-dom
```

## 🚀 Quick Start

### Basic Usage

```tsx
import { ABACProvider, PolicyList } from '@devcraft-ts/abac-admin-react-ui';
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
}
```

### With Next.js App Router

```tsx
// app/admin/policies/page.tsx
"use client";

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
}
```

## 🎨 Components

### Policy Components

#### PolicyList

Displays a table of policies with search, filtering, and CRUD actions.

```tsx
import { PolicyList } from '@devcraft-ts/abac-admin-react-ui';

<PolicyList
  onCreate={() => setShowCreateDialog(true)}
  onEdit={(id) => router.push(`/policies/${id}/edit`)}
  onDelete={(id) => handleDelete(id)}
  onView={(id) => router.push(`/policies/${id}`)}
/>
```

**Props:**
- `onCreate?: () => void` - Called when create button is clicked
- `onEdit?: (policyId: string) => void` - Called when edit button is clicked
- `onDelete?: (policyId: string) => void` - Called after successful deletion
- `onView?: (policyId: string) => void` - Called when a row is clicked

### UI Components

All primitive UI components are also exported for building custom interfaces:

```tsx
import {
  Button,
  Input,
  Card,
  Badge,
  Dialog,
  // ... and more
} from '@devcraft-ts/abac-admin-react-ui';
```

#### Button

```tsx
<Button variant="primary" size="md" isLoading={false}>
  Click me
</Button>
```

**Variants:** `primary`, `secondary`, `destructive`, `outline`, `ghost`
**Sizes:** `sm`, `md`, `lg`

#### Input

```tsx
<Input
  label="Policy ID"
  placeholder="Enter policy ID"
  error={errors.policyId}
  helperText="Unique identifier for the policy"
  required
/>
```

#### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@devcraft-ts/abac-admin-react-ui';

<Card>
  <CardHeader>
    <CardTitle>Policy Details</CardTitle>
    <CardDescription>View and edit policy information</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Your content */}
  </CardContent>
  <CardFooter>
    <Button>Save Changes</Button>
  </CardFooter>
</Card>
```

#### Badge

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="error">Inactive</Badge>
<Badge variant="info">v1.0.0</Badge>
```

**Variants:** `default`, `success`, `error`, `warning`, `info`

#### Dialog

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@devcraft-ts/abac-admin-react-ui';

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
</Dialog>
```

## 🎨 Styling & Theming

### Using the Default Theme

Import the CSS file in your app:

```tsx
import '@devcraft-ts/abac-admin-react-ui/styles.css';
```

### Customizing the Theme

The package uses CSS variables for theming. You can override them in your own CSS:

```css
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
}
```

### Using with Your Own Tailwind Config

If your app already uses Tailwind, extend your config:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@devcraft-ts/abac-admin-react-ui/dist/**/*.js',
  ],
  // ... rest of your config
}
```

## 🔧 Utilities

### Formatting Utilities

```tsx
import { formatDate, truncate, getEffectColor, getStatusColor } from '@devcraft-ts/abac-admin-react-ui';

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
import { cn } from '@devcraft-ts/abac-admin-react-ui';

<div className={cn(
  'base-class',
  isActive && 'active-class',
  'another-class'
)} />
```

## 📚 Examples

### Complete Policy Management Page

```tsx
"use client";

import { useState } from 'react';
import { ABACProvider, PolicyList, Dialog, DialogContent, DialogHeader, DialogTitle } from '@devcraft-ts/abac-admin-react-ui';
import '@devcraft-ts/abac-admin-react-ui/styles.css';

export default function PoliciesPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);

  return (
    <ABACProvider config={{ baseURL: '/api/abac' }}>
      <div className="container mx-auto py-8">
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
          </DialogContent>
        </Dialog>
      </div>
    </ABACProvider>
  );
}
```

### Custom Theme Example

```tsx
// app/layout.tsx
import '@devcraft-ts/abac-admin-react-ui/styles.css';
import './custom-theme.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```css
/* custom-theme.css */
:root {
  /* Brand colors */
  --primary: 262 83% 58%;
  --primary-foreground: 0 0% 100%;

  /* Larger border radius */
  --radius: 1rem;
}
```

## 🎯 Best Practices

### 1. Use with ABACProvider

Always wrap your components in `ABACProvider`:

```tsx
<ABACProvider config={{ baseURL: '/api/abac' }}>
  <PolicyList />
</ABACProvider>
```

### 2. Import CSS Once

Import the CSS file at the root of your app:

```tsx
// app/layout.tsx or _app.tsx
import '@devcraft-ts/abac-admin-react-ui/styles.css';
```

### 3. Handle Actions

Provide callbacks for user actions:

```tsx
<PolicyList
  onCreate={() => router.push('/policies/new')}
  onEdit={(id) => router.push(`/policies/${id}/edit`)}
  onDelete={(id) => showToast('Policy deleted')}
/>
```

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

**Built with ❤️ using Radix UI, Tailwind CSS, and TypeScript**

# ABAC Admin UI Packages

> Lightweight, modular packages for managing ABAC (Attribute-Based Access Control) policies across multiple platforms

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Live Demo & Documentation

**[View Live Demo →](https://abac-admin-02-nextjs-app-router.vercel.app/)**

Experience the ABAC Admin UI in action with a fully functional demo application. The demo includes:

- Complete policy management interface
- Interactive policy editor with real-time validation
- Attribute management and resource configuration
- Audit log viewer with filtering
- Policy testing and evaluation tools
- Best practices examples and documentation for **abac-engine** integration

## 🎯 Overview

The ABAC Admin UI packages provide a complete solution for managing ABAC policies in your application. Built with a **minimal footprint architecture**, you install only what you need:

- **[@devcraft-ts/abac-admin-core](#abac-admincore)** - Framework-agnostic core (~15kb)
- **[@devcraft-ts/abac-admin-react](#abac-adminreact)** - Headless React hooks (~30kb)
- **[@devcraft-ts/abac-admin-nextjs](#abac-adminnextjs)** - Next.js utilities (~10kb)
- **[@devcraft-ts/abac-admin-react-ui](#abac-adminreact-ui)** - Pre-built UI components (optional, ~130kb)

### Key Features

✅ **Ultra-Lightweight** - Core is only ~15kb, add features as needed
✅ **Framework Agnostic** - Core works everywhere, adapters for React, Vue, Angular (coming soon)
✅ **Headless by Default** - Full UI control, bring your own design system
✅ **Type-Safe** - Full TypeScript support with Zod validation
✅ **Tree-Shakeable** - Import only what you use
✅ **Zero Lock-in** - Use our UI or build your own
✅ **Modern** - ES2020+, ESM and CJS support
✅ **Built on abac-engine** - Leverages the official [abac-engine](https://www.npmjs.com/package/abac-engine) for policy evaluation

## 🚀 Quick Start

### For React/Next.js Users

```bash
npm install @devcraft-ts/abac-admin-react @devcraft-ts/abac-admin-nextjs zod
```

> **Note**: This project uses npm workspaces (npm v7+). No additional package manager needed!

```tsx
"use client";

import { ABACProvider, usePolicies } from "@devcraft-ts/abac-admin-react";

function PolicyList() {
  const { policies, isLoading, createPolicy } = usePolicies();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {policies.map((policy) => (
        <div key={policy.id}>{policy.policyId}</div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <ABACProvider config={{ baseURL: "/api/abac" }}>
      <PolicyList />
    </ABACProvider>
  );
}
```

### For Vanilla JS/Node.js

```bash
npm install @devcraft-ts/abac-admin-core zod
```

```typescript
import { ABACAdminClient, PolicyService } from "@devcraft-ts/abac-admin-core";

const client = new ABACAdminClient({
  baseURL: "https://api.example.com/abac",
});

const policyService = new PolicyService(client);

// List policies
const policies = await policyService.list();

// Create a policy
const newPolicy = await policyService.create({
  policyId: "my-policy",
  version: "1.0.0",
  effect: "PERMIT",
  description: "Allow users to view documents",
  conditions: { type: "equals", left: "action", right: "view" },
  isActive: true,
  category: "document",
  tags: ["read"],
  createdBy: "user-123",
});
```

## 📦 Packages

### @devcraft-ts/abac-admin-core

**Framework-agnostic core library**

- Pure TypeScript/JavaScript
- API client (fetch-based)
- Type definitions & Zod schemas
- Policy, Attribute, and Audit services
- Utilities (validators, formatters, condition builders)

**[Documentation](./packages/core/README.md)** | **[npm](https://www.npmjs.com/package/@devcraft-ts/abac-admin-core)**

```bash
npm install @devcraft-ts/abac-admin-core zod
```

### @devcraft-ts/abac-admin-react

**Headless React hooks - bring your own UI**

- Simple hooks using native fetch + useState
- No required data fetching library
- Optional TanStack Query/SWR support via query factories
- Full UI control

**[Documentation](./packages/react/README.md)** | **[npm](https://www.npmjs.com/package/@devcraft-ts/abac-admin-react)**

```bash
npm install @devcraft-ts/abac-admin-react
```

**Hooks:**

- `usePolicies()` - Manage policies
- `usePolicy(id)` - Single policy
- `useResourceAttributes()` - Manage attributes
- `useAuditLog()` - View audit logs
- `usePolicyTest()` - Test policy evaluation

### @devcraft-ts/abac-admin-nextjs

**Next.js server utilities**

- API route helpers
- Authentication middleware
- Server-side utilities
- Type-safe handlers

**[Documentation](./packages/nextjs/README.md)** | **[npm](https://www.npmjs.com/package/@devcraft-ts/abac-admin-nextjs)**

```bash
npm install @devcraft-ts/abac-admin-nextjs
```

### @devcraft-ts/abac-admin-react-ui

**Pre-built UI components (Optional)**

- Complete admin interface
- Built with Radix UI
- Customizable theming
- Best for prototyping & quick setup

**[Documentation](./packages/react-ui/README.md)** | **[npm](https://www.npmjs.com/package/@devcraft-ts/abac-admin-react-ui)**

```bash
npm install @devcraft-ts/abac-admin-react-ui
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│            Platform Packages (Thin Wrappers)                 │
│  @devcraft-ts/abac-admin-nextjs  │  @devcraft-ts/abac-admin-react-native  │  ...    │
│  Size: ~5-10kb      │  Size: ~5-10kb             │         │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│  @devcraft-ts/abac-admin-react-ui (Optional - Pre-built Components)      │
│  Size: ~100kb (with deps)                                   │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│         @devcraft-ts/abac-admin-react (Headless React Hooks)             │
│  Size: ~20-30kb                                             │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│      @devcraft-ts/abac-admin-core (Framework Agnostic - TINY)            │
│  Size: ~10-15kb                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📚 Documentation

- **[Live Demo & Documentation](https://abac-admin-02-nextjs-app-router.vercel.app/)** - Interactive demo with complete documentation
- **[Getting Started](./GETTING_STARTED.md)** - Quick start guide
- **[Architecture Guide](./ABAC_ENGINE_UI.md)** - Detailed architecture
- **[API Reference](./docs/api-reference.md)** - Complete API docs
- **[Examples](./examples)** - Working examples
- **[Integration Guides](./docs/integration-guides/)** - Platform-specific guides
- **[abac-engine Documentation](https://abac-admin-02-nextjs-app-router.vercel.app/)** - Official abac-engine docs and best practices

## 🎨 Usage Patterns

### Pattern 1: Simple Hooks (Default)

```tsx
import { usePolicies } from "@devcraft-ts/abac-admin-react";

function MyComponent() {
  const { policies, createPolicy } = usePolicies();
  // Use your own UI components
}
```

### Pattern 2: With TanStack Query

```tsx
import { useABACClient } from "@devcraft-ts/abac-admin-react";
import { PolicyService } from "@devcraft-ts/abac-admin-core";
import { useQuery } from "@tanstack/react-query";

function MyComponent() {
  const client = useABACClient();
  const policyService = new PolicyService(client);

  const { data: policies } = useQuery({
    queryKey: ["policies"],
    queryFn: () => policyService.list(),
  });
}
```

### Pattern 3: Pre-built UI

```tsx
import { PolicyAdminApp } from "@devcraft-ts/abac-admin-react-ui";
import "@devcraft-ts/abac-admin-react-ui/styles.css";

export default function AdminPage() {
  return <PolicyAdminApp config={{ baseURL: "/api/abac" }} />;
}
```

## 🔌 Integration with Data Fetching Libraries

Works seamlessly with:

- ✅ Native fetch (built-in)
- ✅ TanStack Query (via query factories)
- ✅ SWR (wrap service classes)
- ✅ Apollo Client (wrap service classes)
- ✅ Any other library (use core services directly)

## 🛠️ Development

### Setup

```bash
# Clone the repository
git clone https://github.com/astralstriker/abac-admin.git
cd abac-admin

# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm test

# Start dev mode
npm run dev
```

### Project Structure

```
abac-admin/
├── packages/
│   ├── core/           # @devcraft-ts/abac-admin-core
│   ├── react/          # @devcraft-ts/abac-admin-react
│   ├── nextjs/         # @devcraft-ts/abac-admin-nextjs
│   └── react-ui/       # @devcraft-ts/abac-admin-react-ui (optional)
├── examples/
│   ├── nextjs-headless/
│   ├── nextjs-ui/
│   └── vanilla-js/
├── docs/
├── package.json        # Root with workspaces config
└── README.md
```

## 🧪 Examples

Explore working examples:

- **[Next.js with Headless Hooks](./examples/nextjs-headless)** - Custom UI
- **[Next.js with Pre-built UI](./examples/nextjs-ui)** - Quick setup
- **[Vanilla JavaScript](./examples/vanilla-js)** - Core package only

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

### Areas for Contribution

- 🎨 Pre-built UI components
- 🌐 Platform adapters (Vue, Angular, Svelte)
- 📖 Documentation improvements
- 🐛 Bug fixes
- ✨ Feature requests

## 📈 Roadmap

### Phase 1: React Ecosystem (Months 1-2)

- ✅ Core package
- ✅ React hooks package (headless)
- ✅ Next.js utilities
- ⏳ React UI components (optional)

### Phase 2: Additional Platforms (Months 3-6)

- [ ] Vue.js package with composables
- [ ] Angular package with services
- [ ] Svelte package with stores
- [ ] React Native adapters

## 📄 License

MIT © [astralstriker](https://github.com/astralstriker)

## 🙏 Built With

- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/) - Schema validation
- [Turborepo](https://turbo.build/) - Monorepo build system
- [npm workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces) - Package management

## 🔗 Links

- **Live Demo**: https://abac-admin-02-nextjs-app-router.vercel.app/
- **GitHub**: https://github.com/astralstriker/abac-admin
- **npm**: https://www.npmjs.com/~astralstriker
- **Issues**: https://github.com/astralstriker/abac-admin/issues
- **abac-engine**: https://www.npmjs.com/package/abac-engine

---

**Lightweight, modular ABAC policy management for modern applications.**
**Built on [abac-engine](https://www.npmjs.com/package/abac-engine) - the official ABAC evaluation engine.**

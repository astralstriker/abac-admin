# Release v1.0.0 🎉

## Initial Release

We're excited to announce the first release of ABAC Admin UI packages - a lightweight, modular solution for managing ABAC (Attribute-Based Access Control) policies across multiple platforms.

## 📦 Published Packages

All packages are now available on npm:

- **[@devcraft-ts/abac-admin--core](https://www.npmjs.com/package/@devcraft-ts/abac-admin--core)** v1.0.0 (~23.6 KB)
  - Framework-agnostic core library
  - Pure TypeScript/JavaScript
  - API client with Policy, Attribute, and Audit services
  - Type definitions & Zod schemas

- **[@devcraft-ts/abac-admin--react](https://www.npmjs.com/package/@devcraft-ts/abac-admin--react)** v1.0.0 (~11.1 KB)
  - Headless React hooks for custom UI
  - No required data fetching library
  - Optional TanStack Query/SWR support
  - Full UI control

- **[@devcraft-ts/abac-admin--nextjs](https://www.npmjs.com/package/@devcraft-ts/abac-admin--nextjs)** v1.0.0 (~10.1 KB)
  - Next.js server utilities
  - API route helpers
  - Authentication middleware
  - Type-safe handlers

## ✨ Key Features

- ✅ **Ultra-Lightweight** - Core is only ~15kb, add features as needed
- ✅ **Framework Agnostic** - Core works everywhere, adapters for React, Next.js
- ✅ **Headless by Default** - Full UI control, bring your own design system
- ✅ **Type-Safe** - Full TypeScript support with Zod validation
- ✅ **Tree-Shakeable** - Import only what you use
- ✅ **Zero Lock-in** - Use your own UI or build custom solutions
- ✅ **Modern** - ES2020+, ESM and CJS support
- ✅ **Well-Tested** - Comprehensive unit test coverage
- ✅ **Documented** - Complete docs, examples, and integration guides

## 🚀 Quick Start

### For React/Next.js Users

```bash
npm install @devcraft-ts/abac-admin--react @devcraft-ts/abac-admin--nextjs zod
```

```tsx
"use client";

import { ABACProvider, usePolicies } from "@devcraft-ts/abac-admin--react";

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
npm install @devcraft-ts/abac-admin--core zod
```

```typescript
import { ABACAdminClient, PolicyService } from "@devcraft-ts/abac-admin--core";

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

## 📚 What's Included

- ✅ Complete API documentation
- ✅ Working examples (vanilla Node.js, Next.js app router)
- ✅ Comprehensive unit tests with Vitest
- ✅ Integration guides for different frameworks
- ✅ TypeScript declarations and type safety
- ✅ Condition builder utilities
- ✅ Validation and formatting helpers

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│            Platform Packages (Thin Wrappers)                 │
│  @devcraft-ts/abac-admin--nextjs (~10kb)                   │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│  @devcraft-ts/abac-admin--react (Headless React Hooks)     │
│  Size: ~11kb                                                │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│  @devcraft-ts/abac-admin--core (Framework Agnostic - TINY)  │
│  Size: ~24kb                                                │
└─────────────────────────────────────────────────────────────┘
```

## 📖 Documentation

- [Main README](./README.md) - Overview and quick start
- [Getting Started Guide](./examples/GETTING_STARTED.md) - Detailed setup instructions
- [Core Package Docs](./packages/core/README.md) - Framework-agnostic core
- [React Package Docs](./packages/react/README.md) - React hooks API
- [Next.js Package Docs](./packages/nextjs/README.md) - Next.js utilities
- [Examples](./examples/) - Working code examples

## 🎯 Use Cases

This release supports:

- ✅ Policy Management (CRUD operations)
- ✅ Attribute Management (resource and subject attributes)
- ✅ Audit Log Queries (track policy changes and access)
- ✅ Policy Testing and Evaluation
- ✅ Batch Operations
- ✅ Advanced Condition Building
- ✅ Custom UI Integration

## 🔗 Links

- **GitHub Repository**: https://github.com/astralstriker/abac-admin
- **npm Packages**:
  - https://www.npmjs.com/package/@devcraft-ts/abac-admin--core
  - https://www.npmjs.com/package/@devcraft-ts/abac-admin--react
  - https://www.npmjs.com/package/@devcraft-ts/abac-admin--nextjs
- **Issues**: https://github.com/astralstriker/abac-admin/issues
- **License**: MIT

## 🛠️ Technical Details

- **Node.js**: >=18.0.0
- **npm**: >=9.0.0
- **TypeScript**: ^5.3.3
- **Build System**: Turborepo with npm workspaces
- **Module Formats**: ESM and CJS
- **Peer Dependencies**:
  - `zod: ^3.0.0` (all packages)
  - `react: >=18.0.0` (react package)
  - `next: >=13.0.0` (nextjs package)

## 🙏 Acknowledgments

Built with:
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/) - Schema validation
- [Turborepo](https://turbo.build/) - Monorepo build system
- [Vitest](https://vitest.dev/) - Unit testing framework
- [tsup](https://tsup.egoist.dev/) - TypeScript bundler

## 📈 What's Next

Future releases will include:

- Pre-built UI components package (optional)
- Vue.js package with composables
- Angular package with services
- Svelte package with stores
- React Native adapters
- Additional examples and integrations

## 🤝 Contributing

We welcome contributions! Please check out our [Contributing Guide](./CONTRIBUTING.md) and feel free to:

- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation
- Share examples

---

**Thank you for using ABAC Admin UI packages! We're excited to see what you build with it.** 🚀

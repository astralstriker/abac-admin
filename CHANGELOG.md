# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-XX

### 🎉 Initial Release

This is the first stable release of the ABAC Admin UI monorepo, providing framework-agnostic and React/Next.js packages for ABAC policy administration.

### Added

#### @abac-admin/core (v1.0.0)
- ✅ **ABACAdminClient** - Lightweight HTTP client for ABAC API communication
- ✅ **PolicyService** - Complete CRUD operations for policy management (15+ methods)
- ✅ **AttributeService** - Resource attribute management (11+ methods)
- ✅ **AuditService** - Audit log retrieval and analysis (7+ methods)
- ✅ **Zod Schemas** - Full validation for Policy, Attribute, and Audit types
- ✅ **ConditionBuilder** - Fluent API for building policy conditions (12+ operators)
- ✅ **Validators** - 15+ validation utility functions
- ✅ **Formatters** - 25+ formatting utility functions
- ✅ **TypeScript Support** - Comprehensive type definitions
- ✅ **Tree-shakeable** - Import only what you need (~15kb minified)
- ✅ **Framework-agnostic** - Works with any JavaScript environment

#### @abac-admin/react (v1.0.0)
- ✅ **ABACProvider** - Context provider for ABAC client
- ✅ **Policy Hooks**
  - `usePolicies` - List and manage policies with CRUD operations
  - `usePolicy` - Fetch single policy by ID
  - `usePolicyTest` - Test policy evaluation
  - `usePolicyVersions` - Fetch policy version history
- ✅ **Attribute Hooks**
  - `useAttributes` - Manage resource attributes with CRUD operations
  - `useAttribute` - Fetch single attribute value
  - `useAttributeHistory` - View attribute change history
  - `useAttributeComparison` - Compare attributes between resources
- ✅ **Audit Hooks**
  - `useAuditLog` - Fetch audit logs with filters
  - `useEntityHistory` - Fetch entity-specific history
  - `useUserActivity` - Fetch user-specific activity
  - `useAuditStatistics` - Fetch audit statistics
  - `useRecentActivity` - Fetch recent activity feed
- ✅ **Headless by Design** - No UI components, full control over interface
- ✅ **Native React State** - Built with useState and useEffect
- ✅ **Optimistic Updates** - Immediate UI feedback with error handling
- ✅ **TypeScript Support** - Full type safety

#### @abac-admin/nextjs (v1.0.0)
- ✅ **Server-Side API Route Handlers**
  - `createPolicyRoutes` - Pre-built policy CRUD endpoints
  - `createAttributeRoutes` - Pre-built attribute CRUD endpoints
  - `createAuditRoutes` - Pre-built audit log endpoints
- ✅ **Authentication Middleware**
  - `createAuthMiddleware` - Flexible auth middleware with RBAC
  - `requireRoles` - Role-based authorization helper
  - `requirePermissions` - Permission-based authorization helper
  - `combineAuthAnd` / `combineAuthOr` - Combine authorization rules
  - `createRequestLogger` - Request logging utility
  - `createRateLimiter` - Simple rate limiting (in-memory)
- ✅ **Built-in Validation** - Zod schema validation for all endpoints
- ✅ **Next.js App Router Ready** - Built for Next.js 13+
- ✅ **Dynamic Authentication** - Support for per-request auth tokens
- ✅ **Re-exports React Hooks** - All React hooks available from single import
- ✅ **TypeScript Support** - Full type safety

### Documentation
- ✅ Comprehensive README for each package
- ✅ Root project README with architecture overview
- ✅ CONTRIBUTING.md with commit conventions
- ✅ GETTING_STARTED.md for end users
- ✅ SETUP.md for contributors
- ✅ Inline code examples in all documentation
- ✅ JSDoc comments on all public APIs

### Developer Experience
- ✅ Monorepo setup with npm workspaces
- ✅ Turborepo for fast, cached builds
- ✅ Commitlint + Husky for commit conventions
- ✅ TypeScript strict mode enabled
- ✅ ESM + CJS dual package support
- ✅ Source maps for debugging

### Package Sizes
- **@abac-admin/core**: ~15kb minified + gzipped
- **@abac-admin/react**: ~8kb minified + gzipped
- **@abac-admin/nextjs**: ~6kb minified + gzipped

### Browser Support
- Modern browsers (ES2020+)
- Node.js 18+
- React 18+
- Next.js 13+

---

## [Unreleased]

### Planned for v1.1.0
- [ ] Example projects (nextjs-headless, nextjs-auth)
- [ ] Test coverage (Jest + React Testing Library)
- [ ] ESLint and Prettier configuration
- [ ] GitHub Actions CI/CD workflows
- [ ] Changesets for automated versioning

### Planned for v2.0.0
- [ ] @abac-admin/react-ui - Pre-built UI components
- [ ] @abac-admin/vue - Vue.js composables
- [ ] @abac-admin/angular - Angular services
- [ ] @abac-admin/svelte - Svelte stores
- [ ] TanStack Query adapter package
- [ ] Storybook documentation
- [ ] Interactive playground

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute.

## License

MIT © ABAC Admin Team

[1.0.0]: https://github.com/astralstriker/abac-admin/releases/tag/v1.0.0

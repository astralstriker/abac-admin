# Development Setup

This guide is for **contributors and maintainers** who want to work on the ABAC Admin UI packages.

> **For end users**: See [GETTING_STARTED.md](./GETTING_STARTED.md) for using the packages in your projects.

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: Latest version

### Verify Versions

```bash
node --version   # Should be v18+
npm --version    # Should be v9+
git --version
```

### Update npm (if needed)

```bash
npm install -g npm@latest
```

## 🚀 Quick Setup (5 Minutes)

### 1. Fork & Clone

```bash
# Fork the repository on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/abac-admin.git
cd abac-admin

# Add upstream remote
git remote add upstream https://github.com/astralstriker/abac-admin.git
```

### 2. Install Dependencies

```bash
npm install
```

This will:

- Install all dependencies across all packages
- Set up npm workspaces
- Link local packages together automatically
- Set up git hooks (husky + commitlint)

### 3. Build All Packages

```bash
npm run build
```

Builds packages in dependency order: `core` → `react` → `nextjs`

### 4. Verify Setup

```bash
# Run tests
npm test

# Type check
npm run typecheck

# Lint
npm run lint
```

✅ If all pass, you're ready to develop!

## 🏗️ Project Structure

```
abac-admin/
├── packages/
│   ├── core/              # @abac-admin/core
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── react/             # @abac-admin/react
│   ├── nextjs/            # @abac-admin/nextjs
│   └── react-ui/          # @abac-admin/react-ui (planned)
├── examples/              # Example implementations
├── docs/                  # Documentation
│   └── dev/              # Dev-only docs (gitignored)
├── .husky/               # Git hooks
├── commitlint.config.js  # Commit message rules
├── turbo.json           # Monorepo build config
└── package.json         # Root package (workspaces config)
```

## 🛠️ Development Workflow

### Working on Packages

```bash
# Start dev mode (watches for changes)
npm run dev

# Build specific package
npm run build --workspace=@abac-admin/core

# Test specific package
npm test --workspace=@abac-admin/react

# Type check specific package
npm run typecheck --workspace=@abac-admin/core
```

### Making Changes

1. **Create a feature branch**

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes**
   - Edit code in `packages/*/src/`
   - Add tests in `packages/*/src/__tests__/`
   - Update docs as needed

3. **Test your changes**

   ```bash
   npm test
   npm run typecheck
   npm run lint
   ```

4. **Commit with proper format**

   ```bash
   git commit -m "feat(scope): add your feature"
   ```

   Commitlint enforces this format. See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

5. **Create a changeset** (for package changes)

   ```bash
   npx changeset
   ```

6. **Push and create PR**
   ```bash
   git push origin feat/your-feature-name
   ```

### Testing Locally

#### Link to Another Project

```bash
# In abac-admin repo
cd packages/react
npm link

# In your test project
npm link @abac-admin/react
```

#### Using Examples

```bash
# Run Next.js example
cd examples/nextjs-headless
npm install
npm run dev
```

## 📝 Commit Convention

We use **commitlint** to enforce consistent commit messages.

### Format

```
<type>(<scope>): <subject>
```

- Max 100 characters per line
- Type and scope are REQUIRED
- Subject must be lowercase

### Valid Types

`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`, `revert`

### Valid Scopes

`core`, `react`, `react-ui`, `nextjs`, `vue`, `angular`, `svelte`, `docs`, `ci`, `deps`, `release`

### Examples

```bash
✅ feat(react): add usePolicies hook
✅ fix(core): resolve API timeout issue
✅ docs(readme): update installation steps
✅ chore(deps): bump zod to v3.23

❌ feat: add hook           # Missing scope
❌ add new feature          # Missing type
❌ feat(react): Add hook.   # Not lowercase, has period
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full details.

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Watch Mode

```bash
npm test -- --watch
```

### Coverage Report

```bash
npm run test:coverage
```

### Writing Tests

Place tests in `src/__tests__/` or alongside code as `*.test.ts`:

```typescript
// packages/core/src/__tests__/PolicyService.test.ts
import { describe, it, expect } from "vitest";
import { PolicyService } from "../api/PolicyService";

describe("PolicyService", () => {
  it("should list policies", async () => {
    // Test implementation
  });
});
```

## 📦 Building & Publishing

### Local Build

```bash
# Build all packages
npm run build

# Clean and rebuild
npm run clean
npm run build
```

### Publishing (Maintainers Only)

Publishing is automated via GitHub Actions:

1. Merge PR to `main`
2. Changesets bot creates "Version Packages" PR
3. Merge that PR
4. Packages auto-publish to npm

Manual publish (if needed):

```bash
npm run release
```

## 🔧 Troubleshooting

### "Module not found" errors

```bash
npm run clean
npm install
npm run build
```

### Type errors after pulling changes

```bash
npm run build
npm run typecheck
```

### Git hook not running

```bash
npm run prepare
chmod +x .husky/commit-msg
```

### Workspace linking issues

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Additional Resources

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines
- **[GETTING_STARTED.md](./GETTING_STARTED.md)** - End-user guide
- **[README.md](./README.md)** - Project overview
- **[Turbo Docs](https://turbo.build/repo/docs)** - Monorepo build system
- **[Changesets](https://github.com/changesets/changesets)** - Version management

## 🆘 Need Help?

- 📖 Check the documentation first
- 💬 Open a [GitHub Discussion](https://github.com/astralstriker/abac-admin/discussions)
- 🐛 Found a bug? [Open an issue](https://github.com/astralstriker/abac-admin/issues)

---

**Ready to contribute?** See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

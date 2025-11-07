# Contributing to ABAC Admin UI

Thank you for considering contributing to ABAC Admin UI! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS)
- npm 9+
- Git

### Development Setup

1. **Fork the repository**

   Go to https://github.com/astralstriker/abac-admin and click "Fork"

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/abac-admin.git
   cd abac-admin
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Build all packages**

   ```bash
   npm run build
   ```

5. **Run tests**

   ```bash
   npm test
   ```

6. **Start development mode**

   ```bash
   npm run dev
   ```

## ✍️ Commit Convention

We use [commitlint](https://commitlint.js.org/) to enforce consistent commit messages. All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body> (optional)

<footer> (optional)
```

### Rules

- **Header** (first line): Max 100 characters
- **Body** lines: Max 100 characters each
- **Footer** lines: Max 100 characters each
- **Type** and **scope** are REQUIRED
- **Subject** must be lowercase
- **Subject** must NOT end with a period

### Valid Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only changes
- `style` - Code style changes (formatting, semicolons, etc)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Maintenance tasks (deps, config, etc)
- `ci` - CI/CD changes
- `build` - Build system changes
- `revert` - Revert previous commit

### Valid Scopes

- `core` - @abac-admin/core package
- `react` - @abac-admin/react package
- `react-ui` - @abac-admin/react-ui package
- `react-query` - @abac-admin/react-query package
- `nextjs` - @abac-admin/nextjs package
- `vue` - @abac-admin/vue package
- `angular` - @abac-admin/angular package
- `svelte` - @abac-admin/svelte package
- `docs` - Documentation
- `ci` - CI/CD configuration
- `deps` - Dependencies
- `release` - Release related

### Examples

✅ **Valid commits:**

```bash
feat(react): add usePolicies hook
fix(core): resolve API timeout issue
docs(readme): update installation instructions
chore(deps): bump zod to v3.23
test(react): add tests for usePolicies hook
```

❌ **Invalid commits:**

```bash
feat: add new hook              # Missing scope
feat(react): Add New Hook       # Subject not lowercase
feat(react): add new hook.      # Period at end
add new hook                    # Missing type
feat(unknown): add feature      # Invalid scope
```

### Commit Hook

Commitlint is automatically enforced via husky git hooks. Invalid commits will be rejected.

To bypass (not recommended):

```bash
git commit -m "message" --no-verify
```

## 🔄 Pull Request Process

1. **Create a feature branch**

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes**

   - Write clean, readable code
   - Follow existing code style
   - Add tests for new features
   - Update documentation as needed

3. **Commit your changes**

   ```bash
   git commit -m "feat(scope): add your feature"
   ```

4. **Create a changeset** (for package changes)

   ```bash
   npx changeset
   ```

   Select:
   - Which packages changed
   - Version bump type (major, minor, patch)
   - Description of changes

5. **Push to your fork**

   ```bash
   git push origin feat/your-feature-name
   ```

6. **Create a Pull Request**

   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Link related issues

7. **Wait for review**

   - Address any feedback
   - Make requested changes
   - Keep PR up to date with main branch

## 📁 Project Structure

```
abac-admin/
├── packages/
│   ├── core/           # Framework-agnostic core
│   ├── react/          # React hooks
│   ├── react-ui/       # Pre-built UI components
│   ├── nextjs/         # Next.js utilities
│   └── ...             # Other platform packages
├── examples/
│   ├── nextjs-headless/
│   ├── nextjs-ui/
│   └── vanilla-js/
├── docs/               # Documentation
├── .husky/             # Git hooks
├── commitlint.config.js
├── turbo.json
└── package.json
```

## 🧪 Testing Guidelines

### Running Tests

```bash
# Run all tests
npm test

# Run tests for specific package
npm test --workspace=@abac-admin/core

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for all new features
- Maintain or improve code coverage
- Use descriptive test names
- Test edge cases and error conditions

### Test Structure

```typescript
describe('FeatureName', () => {
  describe('when condition', () => {
    it('should do expected behavior', () => {
      // Arrange
      const input = setupTestData()

      // Act
      const result = functionUnderTest(input)

      // Assert
      expect(result).toBe(expectedValue)
    })
  })
})
```

## 📖 Documentation

### Code Documentation

- Add JSDoc comments for public APIs
- Include examples in comments
- Document parameters and return types
- Explain complex logic

Example:

```typescript
/**
 * Fetches policies from the API with optional filters
 *
 * @param filters - Optional filters to apply
 * @returns Promise resolving to array of policies
 *
 * @example
 * ```ts
 * const policies = await policyService.list({
 *   category: 'company',
 *   isActive: true
 * })
 * ```
 */
async list(filters?: PolicyFilters): Promise<Policy[]>
```

### README Updates

- Update package READMEs for API changes
- Add examples for new features
- Update architecture diagrams if needed
- Keep installation instructions current

### Changelog

Changesets automatically generate changelogs. Ensure your changeset includes:
- Clear description of changes
- Breaking changes (if any)
- Migration instructions (if needed)

## 🎯 Areas for Contribution

### High Priority

- 🎨 **UI Components** - Pre-built components for `@abac-admin/react-ui`
- 🧪 **Tests** - Increase test coverage
- 📖 **Documentation** - Examples, guides, API docs

### Future Work

- 🌐 **Platform Adapters** - Vue, Angular, Svelte packages
- 🔌 **Integrations** - TanStack Query, SWR adapters
- 🚀 **Performance** - Optimizations and benchmarks
- ♿ **Accessibility** - A11y improvements

## 💡 Tips for Contributors

1. **Start small** - Begin with documentation, tests, or small bug fixes
2. **Ask questions** - Open an issue or discussion if unsure
3. **One feature per PR** - Keep PRs focused and manageable
4. **Write good commit messages** - Follow the conventions
5. **Test your changes** - Ensure tests pass and add new ones
6. **Update docs** - Keep documentation in sync with code

## 🐛 Reporting Bugs

### Before Submitting

- Check existing issues
- Verify it's not already fixed in main branch
- Collect relevant information

### Bug Report Template

```markdown
**Description**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen

**Environment**
- OS: [e.g., macOS 13.0]
- Node: [e.g., 18.17.0]
- Package version: [e.g., 1.2.0]
- Browser: [e.g., Chrome 120] (if applicable)

**Additional Context**
Any other context about the problem
```

## ✨ Feature Requests

Feature requests are welcome! Please:

1. Check existing feature requests
2. Clearly describe the feature
3. Explain the use case
4. Provide examples if possible
5. Consider implementation approach

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions make this project better. Thank you for taking the time to contribute!

---

**Questions?** Open an issue or discussion on GitHub.

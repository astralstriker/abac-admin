"use client";

import {
    AlertCircle,
    CheckCircle2,
    Code2,
    FileText,
    GitBranch,
    GitPullRequest,
    Heart,
    MessageSquare,
    Settings,
    TestTube,
    Users,
} from "lucide-react";

export default function ContributingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Heart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Contributing Guide
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Help us make ABAC better for everyone
            </p>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Welcome Contributors! 🎉
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          We welcome contributions from everyone! Whether you&apos;re fixing bugs,
          adding features, improving documentation, or reporting issues, your
          help is appreciated. This guide will help you get started.
        </p>
      </div>

      {/* Ways to Contribute */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <span>Ways to Contribute</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-5 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
            <div className="flex items-start space-x-3">
              <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Code Contributions
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Fix bugs, add features, optimize performance, or improve code
                  quality
                </p>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-5 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Documentation
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Improve guides, fix typos, add examples, or clarify
                  explanations
                </p>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-5 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Bug Reports
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Report issues with clear reproduction steps and expected
                  behavior
                </p>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-5 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
            <div className="flex items-start space-x-3">
              <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Feature Requests
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Suggest new features or improvements to existing functionality
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Setup */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <span>Development Setup</span>
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              1. Fork and Clone
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Fork the repository on GitHub and clone your fork:
            </p>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-100 font-mono">
                # For abac-engine
                <br />
                git clone https://github.com/YOUR_USERNAME/abac-engine.git
                <br />
                cd abac-engine
                <br />
                <br />
                # For abac-admin
                <br />
                git clone https://github.com/YOUR_USERNAME/abac-admin.git
                <br />
                cd abac-admin
              </code>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              2. Install Dependencies
            </h3>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-100 font-mono">
                # For abac-engine
                <br />
                npm install
                <br />
                <br />
                # For abac-admin (monorepo)
                <br />
                npm install
                <br />
                npm run build
              </code>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              3. Create a Branch
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Create a new branch for your changes:
            </p>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-100 font-mono">
                git checkout -b feature/your-feature-name
                <br />
                # or
                <br />
                git checkout -b fix/bug-description
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Code Standards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <span>Code Standards</span>
        </h2>

        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">
                  TypeScript:
                </strong>{" "}
                Use strict TypeScript. Avoid <code>any</code> types. Define
                proper interfaces and types.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">
                  Code Style:
                </strong>{" "}
                Follow existing code patterns. Use Prettier for formatting and
                ESLint for linting.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">
                  Naming:
                </strong>{" "}
                Use camelCase for variables/functions, PascalCase for
                components/classes, kebab-case for files.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">
                  Comments:
                </strong>{" "}
                Write clear, concise comments for complex logic. Use JSDoc for
                public APIs.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">
                  Imports:
                </strong>{" "}
                Organize imports: built-ins, external packages, internal
                modules, relative imports.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">
                  Performance:
                </strong>{" "}
                Write efficient code. Avoid unnecessary re-renders in React.
                Consider memory usage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testing */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <TestTube className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <span>Testing Guidelines</span>
        </h2>

        <div className="space-y-3">
          <p className="text-gray-700 dark:text-gray-300">
            All contributions should include appropriate tests:
          </p>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Running Tests
              </h4>
              <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-3 overflow-x-auto">
                <code className="text-sm text-gray-100 font-mono">
                  npm test
                  <br />
                  npm run test:watch
                  <br />
                  npm run test:coverage
                </code>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Test Coverage
              </h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Unit tests for utility functions and core logic</li>
                <li>Integration tests for policy evaluation</li>
                <li>Component tests for React hooks and UI</li>
                <li>Aim for at least 80% code coverage</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pull Request Process */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <GitPullRequest className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <span>Pull Request Process</span>
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              1. Prepare Your Changes
            </h3>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-100 font-mono">
                # Run tests
                <br />
                npm test
                <br />
                <br />
                # Run linting
                <br />
                npm run lint
                <br />
                <br />
                # Build to check for errors
                <br />
                npm run build
                <br />
                <br />
                # Commit your changes
                <br />
                git add .
                <br />
                git commit -m &quot;feat: add your feature description&quot;
              </code>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              2. Commit Message Format
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Use conventional commits format:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-2">
              <code className="text-sm text-gray-900 dark:text-gray-100 font-mono block">
                feat: add new feature
              </code>
              <code className="text-sm text-gray-900 dark:text-gray-100 font-mono block">
                fix: resolve bug in evaluation
              </code>
              <code className="text-sm text-gray-900 dark:text-gray-100 font-mono block">
                docs: update contributing guide
              </code>
              <code className="text-sm text-gray-900 dark:text-gray-100 font-mono block">
                refactor: improve code structure
              </code>
              <code className="text-sm text-gray-900 dark:text-gray-100 font-mono block">
                test: add test coverage
              </code>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              3. Push and Create PR
            </h3>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-100 font-mono">
                git push origin feature/your-feature-name
              </code>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              Then create a Pull Request on GitHub with:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 mt-2">
              <li>Clear description of changes</li>
              <li>Link to related issues</li>
              <li>Screenshots for UI changes</li>
              <li>Testing instructions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Project Structure */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <GitBranch className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <span>Project Structure</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              abac-engine
            </h3>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-3 overflow-x-auto">
              <code className="text-xs text-gray-100 font-mono">
                src/
                <br />
                ├── core/ # Core engine
                <br />
                ├── types/ # TypeScript types
                <br />
                ├── utils/ # Utilities
                <br />
                └── index.ts # Main export
                <br />
                <br />
                tests/ # Test files
                <br />
                examples/ # Example usage
              </code>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              abac-admin (Monorepo)
            </h3>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-3 overflow-x-auto">
              <code className="text-xs text-gray-100 font-mono">
                packages/
                <br />
                ├── core/ # Core logic
                <br />
                ├── react/ # React hooks
                <br />
                ├── nextjs/ # Next.js utils
                <br />
                └── react-ui/ # UI components
                <br />
                <br />
                examples/
                <br />
                └── nextjs/ # Demo app
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Best Practices
        </h2>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5 space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300">
              Keep pull requests focused on a single feature or fix
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300">
              Update documentation when adding or changing features
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300">
              Write tests for new features and bug fixes
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300">
              Be responsive to feedback during code review
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300">
              Keep commits clean and meaningful
            </p>
          </div>
        </div>
      </section>

      {/* Getting Help */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Getting Help
        </h2>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-5 space-y-3">
          <p className="text-gray-700 dark:text-gray-300">
            If you need help or have questions:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start space-x-3">
              <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">
                Open a discussion on GitHub for general questions
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">
                Create an issue for bug reports or feature requests
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <GitPullRequest className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">
                Comment on existing PRs for code review questions
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Thank You */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 text-center">
        <Heart className="w-12 h-12 text-pink-600 dark:text-pink-400 mx-auto mb-3" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Thank You! ❤️
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Your contributions help make ABAC better for everyone. We appreciate
          your time and effort in improving this project!
        </p>
      </div>
    </div>
  );
}

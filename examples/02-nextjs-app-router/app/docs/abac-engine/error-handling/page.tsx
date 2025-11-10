import { AlertTriangle, CheckCircle, Code2, XCircle } from "lucide-react";
import Link from "next/link";

export default function ErrorHandlingPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full">
          <AlertTriangle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Error Handling
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Error Handling
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Handle errors gracefully in your ABAC implementation.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          href="#overview"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            Overview
          </span>
        </a>
        <a
          href="#error-types"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <XCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            Error Types
          </span>
        </a>
        <a
          href="#best-practices"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            Best Practices
          </span>
        </a>
      </div>

      {/* Overview */}
      <section id="overview" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Understanding error handling in abac-engine.
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            The ABAC engine uses a fail-safe approach to error handling. When
            errors occur during policy evaluation, the engine defaults to
            denying access to ensure security is maintained.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-r-lg">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
            Key Principles
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li>
              <strong>Fail-Safe:</strong> Errors default to Deny to maintain
              security
            </li>
            <li>
              <strong>Graceful Degradation:</strong> Continue evaluation when
              possible
            </li>
            <li>
              <strong>Detailed Logging:</strong> Capture error context for
              debugging
            </li>
            <li>
              <strong>Type Safety:</strong> TypeScript helps prevent common
              errors
            </li>
          </ul>
        </div>
      </section>

      {/* Error Types */}
      <section id="error-types" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Error Types
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Common error types you may encounter.
          </p>
        </div>

        <div className="space-y-6">
          {/* Validation Errors */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Validation Errors
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Occur when policy structure or request data is invalid.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import { ABACEngine } from 'abac-engine';

try {
  const policy = {
    id: 'invalid-policy',
    version: '1.0.0',
    effect: 'InvalidEffect', // Invalid effect
    condition: null
  };

  const engine = new ABACEngine({ policies: [policy] });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Policy validation failed:', error.message);
    console.error('Validation errors:', error.errors);
  }
}

// Common validation errors:
// - Invalid effect (must be 'Permit' or 'Deny')
// - Missing required fields (id, version, effect)
// - Invalid condition structure
// - Invalid operator in condition
// - Malformed attribute references`}
              </pre>
            </div>
          </div>

          {/* Attribute Resolution Errors */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Attribute Resolution Errors
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Occur when attributes cannot be found or retrieved.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`// Missing Attributes
const decision = await engine.evaluate({
  subject: { id: 'user-123' }, // Missing 'department' attribute
  resource: { id: 'doc-456' },
  action: { id: 'read' },
  environment: {}
});

// The engine will:
// 1. Log a warning about the missing attribute
// 2. Treat the missing attribute as undefined
// 3. Continue evaluation (may result in Deny if condition requires the attribute)

// Attribute Provider Errors
const provider = {
  name: 'user-provider',
  async provide(category, id, attributes) {
    throw new Error('Database connection failed');
  }
};

const engine = new ABACEngine({
  policies,
  attributeProviders: [provider]
});

try {
  const decision = await engine.evaluate(request);
} catch (error) {
  console.error('Attribute provider error:', error);
  // Engine defaults to Deny for safety
}`}
              </pre>
            </div>
          </div>

          {/* Condition Evaluation Errors */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Condition Evaluation Errors
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Occur during condition evaluation, such as type mismatches or
              invalid operations.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`// Type Mismatch
const condition = ConditionBuilder.greaterThan(
  AttributeRef.subject('name'), // String value
  100 // Numeric comparison
);

// Custom Function Errors
const policy = PolicyBuilder
  .create('custom-function-policy')
  .permit()
  .condition({
    type: 'function',
    function: (context) => {
      throw new Error('Unexpected error in custom function');
    }
  })
  .build();

// Handling condition errors
const engine = new ABACEngine({
  policies,
  onConditionError: (error, policy, context) => {
    console.error(\`Error evaluating policy \${policy.id}:\`, error);
    // Return false to deny access, or throw to halt evaluation
    return false;
  }
});`}
              </pre>
            </div>
          </div>

          {/* Timeout Errors */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Timeout Errors
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Occur when evaluation takes too long.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`const engine = new ABACEngine({
  policies,
  maxEvaluationTime: 5000 // 5 seconds
});

try {
  const decision = await engine.evaluate(request);
} catch (error) {
  if (error instanceof TimeoutError) {
    console.error('Policy evaluation timed out');
    // Handle timeout - typically deny access
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Error Handling Patterns */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Error Handling Patterns
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Recommended patterns for handling errors in your application.
          </p>
        </div>

        <div className="space-y-6">
          {/* Try-Catch Pattern */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Try-Catch Pattern
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`async function checkAccess(request) {
  try {
    const decision = await engine.evaluate(request);

    if (decision.decision === 'Permit') {
      return { allowed: true };
    } else {
      return {
        allowed: false,
        reason: decision.reason || 'Access denied by policy'
      };
    }
  } catch (error) {
    // Log the error for debugging
    console.error('ABAC evaluation error:', error);

    // Return a safe default (deny access)
    return {
      allowed: false,
      reason: 'Access denied due to evaluation error',
      error: error.message
    };
  }
}`}
              </pre>
            </div>
          </div>

          {/* Middleware Pattern */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Middleware Error Handling
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`function createABACMiddleware(engine) {
  return async (req, res, next) => {
    try {
      const decision = await engine.evaluate({
        subject: req.user,
        resource: {
          type: req.baseUrl,
          id: req.params.id
        },
        action: { id: req.method.toLowerCase() },
        environment: {
          ip: req.ip,
          timestamp: new Date().toISOString()
        }
      });

      if (decision.decision === 'Permit') {
        // Attach decision to request for logging
        req.abacDecision = decision;
        next();
      } else {
        res.status(403).json({
          error: 'Access Denied',
          reason: decision.reason
        });
      }
    } catch (error) {
      // Log error with full context
      console.error('ABAC middleware error:', {
        error: error.message,
        stack: error.stack,
        user: req.user?.id,
        resource: req.params.id,
        action: req.method
      });

      // Return 403 (not 500) to avoid leaking system details
      res.status(403).json({
        error: 'Access Denied',
        message: 'Unable to evaluate access'
      });
    }
  };
}`}
              </pre>
            </div>
          </div>

          {/* Logging Pattern */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Comprehensive Logging
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import { ILogger } from 'abac-engine';

class CustomLogger implements ILogger {
  info(message: string, meta?: any): void {
    console.log(\`[INFO] \${message}\`, meta);
  }

  warn(message: string, meta?: any): void {
    console.warn(\`[WARN] \${message}\`, meta);
  }

  error(message: string, meta?: any): void {
    console.error(\`[ERROR] \${message}\`, meta);
    // Send to error tracking service
    sendToSentry({ message, meta });
  }

  debug(message: string, meta?: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(\`[DEBUG] \${message}\`, meta);
    }
  }
}

const engine = new ABACEngine({
  policies,
  logger: new CustomLogger()
});

// The engine will log:
// - Policy evaluation start/end
// - Attribute resolution issues
// - Condition evaluation errors
// - Performance metrics
// - Final decisions`}
              </pre>
            </div>
          </div>

          {/* Fallback Pattern */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Fallback Strategies
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`class ResilientABACEngine {
  constructor(
    private primaryEngine: ABACEngine,
    private fallbackEngine?: ABACEngine
  ) {}

  async evaluate(request: any) {
    try {
      return await this.primaryEngine.evaluate(request);
    } catch (error) {
      console.error('Primary engine failed:', error);

      if (this.fallbackEngine) {
        try {
          console.log('Attempting fallback engine...');
          return await this.fallbackEngine.evaluate(request);
        } catch (fallbackError) {
          console.error('Fallback engine also failed:', fallbackError);
        }
      }

      // Ultimate fallback: deny access
      return {
        decision: 'Deny',
        reason: 'System error occurred during evaluation',
        policies: [],
        obligations: []
      };
    }
  }
}

// Usage
const resilientEngine = new ResilientABACEngine(
  primaryEngine,
  fallbackEngine
);`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section id="best-practices" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-green-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Best Practices
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Always Use Try-Catch
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Wrap all policy evaluation calls in try-catch blocks to handle
              unexpected errors gracefully.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Default to Deny
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              When errors occur, always default to denying access. Security
              should be the priority.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Log with Context
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Include user ID, resource ID, action, and other context in error
              logs for easier debugging.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Validate Policies
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Validate policy structure before loading them into the engine. Use
              schema validation.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Monitor Error Rates
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Track error rates and set up alerts. Sudden spikes may indicate
              policy misconfigurations.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Test Error Scenarios
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Write tests that simulate errors: missing attributes, provider
              failures, invalid data.
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-3 flex items-center">
              <XCircle className="w-5 h-5 mr-2" />
              Don&apos;t Expose Internal Errors
            </h3>
            <p className="text-sm text-red-800 dark:text-red-200">
              Don&apos;t return internal error details to end users. Use generic
              messages like &ldquo;Access Denied&rdquo;.
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-3 flex items-center">
              <XCircle className="w-5 h-5 mr-2" />
              Don&apos;t Ignore Warnings
            </h3>
            <p className="text-sm text-red-800 dark:text-red-200">
              Pay attention to warning logs. They often indicate configuration
              issues that need addressing.
            </p>
          </div>
        </div>
      </section>

      {/* Testing Error Handling */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Testing Error Handling
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
              {`import { describe, test, expect } from 'vitest';
import { ABACEngine } from 'abac-engine';

describe('Error Handling', () => {
  test('handles missing attributes gracefully', async () => {
    const policy = PolicyBuilder
      .create('test-policy')
      .permit()
      .condition(
        ConditionBuilder.equals(
          AttributeRef.subject('department'),
          AttributeRef.resource('department')
        )
      )
      .build();

    const engine = new ABACEngine({ policies: [policy] });

    // Request missing department attributes
    const decision = await engine.evaluate({
      subject: { id: 'user-123' }, // Missing department
      resource: { id: 'doc-456' }, // Missing department
      action: { id: 'read' },
      environment: {}
    });

    expect(decision.decision).toBe('Deny');
  });

  test('handles attribute provider errors', async () => {
    const failingProvider = {
      name: 'failing-provider',
      async provide() {
        throw new Error('Provider error');
      }
    };

    const engine = new ABACEngine({
      policies: [policy],
      attributeProviders: [failingProvider]
    });

    await expect(async () => {
      await engine.evaluate(request);
    }).rejects.toThrow();
  });

  test('handles invalid condition operators', () => {
    const invalidPolicy = {
      id: 'invalid',
      version: '1.0.0',
      effect: 'Permit',
      condition: {
        operator: 'nonexistent',
        left: { category: 'subject', attributeId: 'id' },
        right: 'value'
      }
    };

    expect(() => {
      new ABACEngine({ policies: [invalidPolicy] });
    }).toThrow();
  });

  test('handles timeout errors', async () => {
    const slowPolicy = PolicyBuilder
      .create('slow-policy')
      .permit()
      .condition({
        type: 'function',
        function: async () => {
          await new Promise(resolve => setTimeout(resolve, 10000));
          return true;
        }
      })
      .build();

    const engine = new ABACEngine({
      policies: [slowPolicy],
      maxEvaluationTime: 100 // 100ms timeout
    });

    await expect(async () => {
      await engine.evaluate(request);
    }).rejects.toThrow('timeout');
  });
});`}
            </pre>
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
            href="/docs/abac-engine/policy-guide"
            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Policy Guide
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learn how to create robust policies
            </p>
          </Link>

          <Link
            href="/docs/abac-engine/examples"
            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              View Examples
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore real-world implementations
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}

import { BookOpen, Code2, FileText, Package } from "lucide-react";
import Link from "next/link";

export default function APIReferencePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full">
          <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            API Reference
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          abac-engine API Reference
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Complete API documentation for the ABAC Engine core classes, methods, and utilities.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <a
          href="#abacengine"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">ABACEngine</span>
        </a>
        <a
          href="#policybuilder"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">PolicyBuilder</span>
        </a>
        <a
          href="#conditionbuilder"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">ConditionBuilder</span>
        </a>
        <a
          href="#attributeref"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">AttributeRef</span>
        </a>
      </div>

      {/* ABACEngine */}
      <section id="abacengine" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ABACEngine
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The main Policy Decision Point (PDP) that evaluates authorization requests.
          </p>
        </div>

        {/* Constructor */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Constructor
          </h3>

          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
              {`constructor(config: ABACEngineConfig)`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-white">Configuration Options:</h4>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
{`interface ABACEngineConfig {
  policies: ABACPolicy[];
  attributeProviders?: AttributeProvider[];
  enableAuditLog?: boolean;           // Default: true
  enablePerformanceMetrics?: boolean; // Default: true
  cacheResults?: boolean;             // Default: false
  cacheTTL?: number;                  // Default: 300 (seconds)
  maxEvaluationTime?: number;         // Default: 5000 (ms)
  logger?: ILogger;                   // Default: SilentLogger
}`}
              </pre>
            </div>

            <h4 className="font-semibold text-gray-900 dark:text-white mt-4">Example:</h4>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
{`import { ABACEngine, CombiningAlgorithm } from 'abac-engine'

const engine = new ABACEngine({
  policies: myPolicies,
  enableAuditLog: true,
  combiningAlgorithm: CombiningAlgorithm.DenyOverrides,
  logger: new ConsoleLogger()
})`}
              </pre>
            </div>
          </div>
        </div>

        {/* evaluate() method */}
        <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            evaluate()
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Evaluate an authorization request against policies.
          </p>

          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
{`async evaluate(
  request: ABACRequest,
  policies?: ABACPolicy[]
): Promise<ABACDecision>`}
            </pre>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 dark:text-white">Parameters:</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">request</code> - The authorization request
              </li>
              <li>
                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">policies</code> - Optional policies to use (overrides config policies)
              </li>
            </ul>

            <h4 className="font-semibold text-gray-900 dark:text-white mt-4">Returns:</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Promise&lt;ABACDecision&gt;</code>
            </p>

            <h4 className="font-semibold text-gray-900 dark:text-white mt-4">Example:</h4>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
{`const decision = await engine.evaluate({
  subject: {
    id: 'user-123',
    attributes: { department: 'Engineering' }
  },
  resource: {
    id: 'doc-456',
    attributes: { owner: 'user-123' }
  },
  action: { id: 'read' }
})

if (decision.decision === 'Permit') {
  // Allow access
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Other methods */}
        <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              addAttributeProvider()
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Add an attribute provider to the engine.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
{`addAttributeProvider(provider: AttributeProvider): void

// Example
const provider = new DatabaseAttributeProvider('subject', 'users', config)
engine.addAttributeProvider(provider)`}
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              registerFunction()
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Register a custom function for use in conditions.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
{`registerFunction(name: string, func: ConditionFunction): void

// Example
engine.registerFunction('isBusinessHours', (time: Date) => {
  const hour = time.getHours()
  return hour >= 9 && hour < 17
})`}
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              getMetrics()
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get evaluation metrics.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
{`getMetrics(): EvaluationMetrics

// Returns
interface EvaluationMetrics {
  totalEvaluations: number
  permitCount: number
  denyCount: number
  indeterminateCount: number
  notApplicableCount: number
  averageEvaluationTime: number
  policyEvaluations: number
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* PolicyBuilder */}
      <section id="policybuilder" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-purple-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            PolicyBuilder
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Fluent API for building ABAC policies.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            create()
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Create a new policy builder instance.
          </p>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
{`static create(id: string): PolicyBuilder

// Example
const policy = PolicyBuilder
  .create('document-access-policy')
  .version('1.0.0')
  .permit()
  .description('Users can access their documents')
  .condition(/* ... */)
  .build()`}
            </pre>
          </div>
        </div>

        <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Builder Methods
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                permit()
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Set the policy effect to Permit
              </p>
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                permit(): PolicyBuilder
              </code>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                deny()
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Set the policy effect to Deny
              </p>
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                deny(): PolicyBuilder
              </code>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                version()
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Set the policy version
              </p>
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                version(v: string): PolicyBuilder
              </code>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                description()
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Set the policy description
              </p>
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                description(d: string): PolicyBuilder
              </code>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                condition()
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Set the policy condition
              </p>
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                condition(c: Condition): PolicyBuilder
              </code>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                build()
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Build and return the policy
              </p>
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                build(): ABACPolicy
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* ConditionBuilder */}
      <section id="conditionbuilder" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-green-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ConditionBuilder
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Utility class for building policy conditions with comparison and logical operators.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Comparison Operators
          </h3>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
{`// Equality
ConditionBuilder.equals(left, right)
ConditionBuilder.notEquals(left, right)

// Comparison
ConditionBuilder.greaterThan(left, right)
ConditionBuilder.greaterThanOrEqual(left, right)
ConditionBuilder.lessThan(left, right)
ConditionBuilder.lessThanOrEqual(left, right)

// Membership
ConditionBuilder.in(left, array)
ConditionBuilder.notIn(left, array)

// String operations
ConditionBuilder.contains(left, right)
ConditionBuilder.startsWith(left, right)
ConditionBuilder.endsWith(left, right)
ConditionBuilder.matches(left, pattern)

// Existence
ConditionBuilder.exists(attribute)
ConditionBuilder.notExists(attribute)`}
            </pre>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Logical Operators
          </h3>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
{`// AND - All conditions must be true
ConditionBuilder.and(...conditions)

// OR - At least one condition must be true
ConditionBuilder.or(...conditions)

// NOT - Negate a condition
ConditionBuilder.not(condition)`}
            </pre>
          </div>

          <h4 className="font-semibold text-gray-900 dark:text-white mt-4">Example:</h4>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
{`// Complex condition: (role === 'admin' OR level > 5) AND department === 'Engineering'
const condition = ConditionBuilder.and(
  ConditionBuilder.or(
    ConditionBuilder.equals(
      AttributeRef.subject('role'),
      'admin'
    ),
    ConditionBuilder.greaterThan(
      AttributeRef.subject('level'),
      5
    )
  ),
  ConditionBuilder.equals(
    AttributeRef.subject('department'),
    'Engineering'
  )
)`}
            </pre>
          </div>
        </div>
      </section>

      {/* AttributeRef */}
      <section id="attributeref" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-orange-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AttributeRef
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Helper class for creating attribute references in conditions.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
{`// Subject attributes
AttributeRef.subject('attributeName')

// Resource attributes
AttributeRef.resource('attributeName')

// Action attributes
AttributeRef.action('attributeName')

// Environment attributes
AttributeRef.environment('attributeName')`}
            </pre>
          </div>

          <h4 className="font-semibold text-gray-900 dark:text-white">Example Usage:</h4>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
{`import { ConditionBuilder, AttributeRef } from 'abac-engine'

// Check if subject's ID matches resource's owner
ConditionBuilder.equals(
  AttributeRef.subject('id'),
  AttributeRef.resource('ownerId')
)

// Check if subject's clearance level is sufficient
ConditionBuilder.greaterThanOrEqual(
  AttributeRef.subject('clearanceLevel'),
  AttributeRef.resource('classification')
)`}
            </pre>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Related Documentation
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/docs/abac-engine/policy-guide"
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <span className="font-medium text-gray-900 dark:text-white">Policy Guide</span>
            <span className="text-gray-400">→</span>
          </Link>
          <Link
            href="/docs/abac-engine/examples"
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <span className="font-medium text-gray-900 dark:text-white">Examples</span>
            <span className="text-gray-400">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

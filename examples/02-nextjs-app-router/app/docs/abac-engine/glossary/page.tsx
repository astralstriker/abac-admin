import { BookOpen, Code2, FileText, Shield } from "lucide-react";
import Link from "next/link";

export default function GlossaryPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full">
          <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Glossary
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          ABAC Engine Glossary
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Comprehensive reference of ABAC terminology, concepts, and components.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <a
          href="#core-concepts"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            Core Concepts
          </span>
        </a>
        <a
          href="#architecture"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            Architecture
          </span>
        </a>
        <a
          href="#policy-components"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            Policy Components
          </span>
        </a>
        <a
          href="#evaluation"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            Evaluation
          </span>
        </a>
      </div>

      {/* Core ABAC Concepts */}
      <section id="core-concepts" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Core ABAC Concepts
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Fundamental concepts and terminology in Attribute-Based Access
            Control.
          </p>
        </div>

        <div className="space-y-6">
          {/* ABAC */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              ABAC (Attribute-Based Access Control)
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              An access control model where authorization decisions are based on
              evaluating attributes of the subject, resource, action, and
              environment. Unlike RBAC (Role-Based Access Control), ABAC
              provides fine-grained, dynamic access control by evaluating
              multiple attributes in combination.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 rounded-r-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Example:</strong> &ldquo;Allow users from the
                &lsquo;engineering&rsquo; department to read documents
                classified as &lsquo;internal&rsquo; or &lsquo;public&rsquo;
                during business hours.&rdquo;
              </p>
            </div>
          </div>

          {/* Attribute */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Attribute
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              A characteristic or property of a subject, resource, action, or
              environment. Attributes are the building blocks of ABAC policies
              and can be of various types (string, number, boolean, array,
              etc.).
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Subject Attributes
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• id, username, email</li>
                  <li>• role, department, clearanceLevel</li>
                  <li>• groups, permissions</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Resource Attributes
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• id, type, classification</li>
                  <li>• ownerId, department</li>
                  <li>• status, visibility, tags</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Action Attributes
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• id (read, write, delete)</li>
                  <li>• type, category</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Environment Attributes
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• timestamp, hour, dayOfWeek</li>
                  <li>• ipAddress, location</li>
                  <li>• emergencyMode, maintenanceMode</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Policy */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Policy
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              A rule that defines access control logic. Each policy evaluates to
              either Permit or Deny based on conditions that check attribute
              values. Policies can have priorities, targets, obligations, and
              advice.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`interface ABACPolicy {
  id: string;
  version: string;
  effect: 'Permit' | 'Deny';
  condition?: Condition;
  target?: PolicyTarget;
  priority?: number;
  obligations?: Obligation[];
  advice?: Advice[];
  metadata?: PolicyMetadata;
}`}
              </pre>
            </div>
          </div>

          {/* Request */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Request
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              A request for authorization containing the subject (who), resource
              (what), action (how), and environment (when/where) attributes. The
              ABAC engine evaluates policies against the request to make an
              access decision.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`const request = {
  subject: {
    id: 'user-123',
    role: 'engineer',
    department: 'engineering',
    clearanceLevel: 3
  },
  resource: {
    id: 'doc-456',
    type: 'document',
    classification: 'internal',
    ownerId: 'user-789'
  },
  action: {
    id: 'read'
  },
  environment: {
    timestamp: '2024-01-15T14:30:00Z',
    ipAddress: '192.168.1.100'
  }
};`}
              </pre>
            </div>
          </div>

          {/* Decision */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Decision
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              The result of policy evaluation. Can be Permit, Deny, or
              NotApplicable. The decision includes the matched policies,
              obligations to fulfill, and any advice provided.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-4 rounded-r-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                  Permit
                </h4>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Access is granted based on at least one Permit policy
                  matching.
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-4 rounded-r-lg">
                <h4 className="font-semibold text-red-900 dark:text-red-300 mb-2">
                  Deny
                </h4>
                <p className="text-sm text-red-800 dark:text-red-200">
                  Access is denied, either explicitly or by default when no
                  Permit policy matches.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 border-l-4 border-gray-600 p-4 rounded-r-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-300 mb-2">
                  NotApplicable
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  No policies matched the request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Components */}
      <section id="architecture" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Architecture Components
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Key components of the ABAC architecture based on the XACML reference
            model.
          </p>
        </div>

        <div className="space-y-6">
          {/* PDP */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              PDP (Policy Decision Point)
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              The core component that evaluates authorization requests against
              policies. The PDP retrieves necessary attributes from PIPs,
              applies the policies, and returns a decision. In abac-engine, this
              is the{" "}
              <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                ABACEngine
              </code>{" "}
              class.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`const engine = new ABACEngine({ policies });
const decision = await engine.evaluate(request);`}
              </pre>
            </div>
          </div>

          {/* PIP */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              PIP (Policy Information Point)
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Provides attribute values to the PDP. PIPs can fetch attributes
              from databases, APIs, or other sources. They enable dynamic
              attribute resolution during policy evaluation.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`const provider: AttributeProvider = {
  name: 'user-attributes',
  async provide(category, id, attributes) {
    if (category === 'subject') {
      const user = await fetchUser(id);
      return user;
    }
  }
};

const engine = new ABACEngine({
  policies,
  attributeProviders: [provider]
});`}
              </pre>
            </div>
          </div>

          {/* PAP */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              PAP (Policy Administration Point)
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              The interface for creating, updating, and managing policies. In
              the abac-admin packages, this is provided through the
              PolicyService and UI components.
            </p>
          </div>

          {/* PEP */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              PEP (Policy Enforcement Point)
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              The component that enforces the PDP&apos;s decision. Typically
              implemented as middleware or guards in your application that
              intercept requests and call the PDP.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`async function abacMiddleware(req, res, next) {
  const decision = await engine.evaluate({
    subject: req.user,
    resource: { type: req.path, id: req.params.id },
    action: { id: req.method.toLowerCase() },
    environment: { ip: req.ip }
  });

  if (decision.decision === 'Permit') {
    next();
  } else {
    res.status(403).json({ error: 'Access Denied' });
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Components */}
      <section id="policy-components" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Policy Components
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Components that make up ABAC policies.
          </p>
        </div>

        <div className="space-y-6">
          {/* Effect */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Effect
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              The outcome when a policy&apos;s condition evaluates to true. Can
              be either{" "}
              <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                Permit
              </code>{" "}
              or{" "}
              <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                Deny
              </code>
              .
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <strong>Permit:</strong> Grant access when condition is true
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-200">
                  <strong>Deny:</strong> Explicitly deny access when condition
                  is true
                </p>
              </div>
            </div>
          </div>

          {/* Condition */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Condition
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              The logic that determines whether a policy matches. Conditions can
              be comparison operations, logical combinations (AND, OR, NOT), or
              custom functions.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Comparison
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Compare attribute values
                </p>
                <code className="text-xs bg-gray-900 text-gray-300 px-2 py-1 rounded block">
                  equals, notEquals, greaterThan, lessThan, in, contains
                </code>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Logical
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Combine conditions
                </p>
                <code className="text-xs bg-gray-900 text-gray-300 px-2 py-1 rounded block">
                  and, or, not
                </code>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Function
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Custom evaluation logic
                </p>
                <code className="text-xs bg-gray-900 text-gray-300 px-2 py-1 rounded block">
                  function(context) returns boolean
                </code>
              </div>
            </div>
          </div>

          {/* Target */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Target
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              An optional pre-filter that quickly determines if a policy should
              be evaluated. Targets improve performance by skipping policies
              that clearly don&apos;t apply to a request.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 rounded-r-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Example:</strong> Only evaluate this policy for requests
                with{" "}
                <code className="px-2 py-1 bg-blue-100 dark:bg-blue-950 rounded text-xs">
                  action.id === &lsquo;read&rsquo;
                </code>
              </p>
            </div>
          </div>

          {/* Obligation */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Obligation
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              A required action that must be performed when a policy matches.
              Obligations are typically used for auditing, logging,
              notifications, or enforcing additional requirements.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`{
  id: 'audit-access',
  type: 'log',
  parameters: {
    action: 'document_access',
    level: 'info',
    message: 'User accessed confidential document'
  }
}`}
              </pre>
            </div>
          </div>

          {/* Advice */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Advice
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              An optional recommendation that can be provided when a policy
              matches. Unlike obligations, advice does not have to be followed,
              but can provide useful information to the application.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 rounded-r-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Example:</strong> &ldquo;Consider requiring MFA for this
                action&rdquo; or &ldquo;This resource will be archived in 30
                days&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Evaluation Concepts */}
      <section id="evaluation" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Evaluation Concepts
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Concepts related to policy evaluation and decision-making.
          </p>
        </div>

        <div className="space-y-6">
          {/* Combining Algorithm */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Combining Algorithm
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Determines how multiple policy results are combined into a final
              decision. Different algorithms prioritize Permit vs Deny
              differently.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Deny Overrides
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Any Deny decision overrides all Permit decisions. Most
                  restrictive.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Permit Overrides
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Any Permit decision overrides all Deny decisions. Most
                  permissive.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  First Applicable
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Returns the decision of the first matching policy (by
                  priority).
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Deny Unless Permit
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Returns Deny unless at least one policy returns Permit.
                </p>
              </div>
            </div>
          </div>

          {/* Attribute Reference */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Attribute Reference
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              A pointer to an attribute value in a request. Consists of a
              category (subject, resource, action, environment) and an attribute
              key.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`// Referencing attributes
AttributeRef.subject('department')
AttributeRef.resource('ownerId')
AttributeRef.action('id')
AttributeRef.environment('timestamp')`}
              </pre>
            </div>
          </div>

          {/* Policy Set */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Policy Set
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              A collection of related policies evaluated together. The engine
              can be configured with multiple policies that are evaluated
              according to the combining algorithm.
            </p>
          </div>

          {/* Tenant */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Tenant / Multi-Tenant
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              A logical grouping of users and resources in a SaaS application.
              Multi-tenant ABAC ensures that users can only access resources
              within their tenant by including tenant identifiers in policies.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`// Tenant isolation policy
const policy = PolicyBuilder
  .create('tenant-isolation')
  .deny()
  .priority(1000)
  .condition(
    ConditionBuilder.notEquals(
      AttributeRef.subject('tenantId'),
      AttributeRef.resource('tenantId')
    )
  )
  .build();`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="space-y-6">
        <div className="border-l-4 border-green-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Quick Reference
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Term
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    ABAC
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    Attribute-Based Access Control
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    PDP
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    Policy Decision Point - Evaluates policies
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    PEP
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    Policy Enforcement Point - Enforces decisions
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    PIP
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    Policy Information Point - Provides attributes
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    PAP
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    Policy Administration Point - Manages policies
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    XACML
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    eXtensible Access Control Markup Language
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    RBAC
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    Role-Based Access Control (predecessor to ABAC)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="space-y-6">
        <div className="border-l-4 border-green-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Related Resources
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <Link
            href="/docs/abac-engine/policy-guide"
            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Policy Guide
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learn how to create and structure policies
            </p>
          </Link>

          <Link
            href="/docs/abac-engine/examples"
            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Examples
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore real-world policy examples
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}

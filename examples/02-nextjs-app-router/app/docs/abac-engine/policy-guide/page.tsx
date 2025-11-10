import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  Code2,
  FileText,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

export default function PolicyGuidePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full">
          <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Policy Guide
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          ABAC Policy Creation Guide
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          A comprehensive reference for creating, testing, and managing ABAC
          policies.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          href="#anatomy"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            Policy Anatomy
          </span>
        </a>
        <a
          href="#creating"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            Creating Policies
          </span>
        </a>
        <a
          href="#conditions"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            Conditions & Operators
          </span>
        </a>
        <a
          href="#patterns"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            Policy Patterns
          </span>
        </a>
        <a
          href="#testing"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            Testing Policies
          </span>
        </a>
        <a
          href="#best-practices"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            Best Practices
          </span>
        </a>
      </div>

      {/* Introduction */}
      <section className="space-y-6">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            In ABAC, policies are the rules that determine whether access should
            be granted or denied. Unlike RBAC where you assign roles and
            permissions, ABAC policies evaluate attributes dynamically.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-r-lg">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
            Key Concepts
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li>
              <strong>Policy:</strong> A rule that evaluates to Permit or Deny
            </li>
            <li>
              <strong>Condition:</strong> The logic that checks attribute values
            </li>
            <li>
              <strong>Target:</strong> Optional pre-filter for when a policy
              applies
            </li>
            <li>
              <strong>Obligation:</strong> Required action when policy matches
            </li>
            <li>
              <strong>Advice:</strong> Optional recommendation when policy
              matches
            </li>
          </ul>
        </div>
      </section>

      {/* Policy Anatomy */}
      <section id="anatomy" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Policy Anatomy
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Understanding the structure and components of an ABAC policy.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Basic Structure
          </h3>

          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
              {`interface ABACPolicy {
  id: string;              // Unique identifier
  version: string;         // Policy version (e.g., "1.0.0")
  description?: string;    // Human-readable description
  effect: 'Permit' | 'Deny'; // What happens when condition matches
  target?: PolicyTarget;   // Optional pre-filter
  condition?: Condition;   // Main evaluation logic
  priority?: number;       // Higher = evaluated first
  obligations?: Obligation[]; // Required actions
  advice?: Advice[];       // Optional recommendations
  metadata?: PolicyMetadata; // Creation info, tags, etc.
}`}
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Example Policy (JSON)
          </h3>

          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
              {`{
  "id": "department-document-access",
  "version": "1.0.0",
  "description": "Allow users to access documents from their department",
  "effect": "Permit",
  "condition": {
    "operator": "and",
    "conditions": [
      {
        "operator": "equals",
        "left": {
          "category": "subject",
          "attributeId": "department"
        },
        "right": {
          "category": "resource",
          "attributeId": "department"
        }
      },
      {
        "operator": "in",
        "left": {
          "category": "action",
          "attributeId": "id"
        },
        "right": ["read", "view"]
      }
    ]
  },
  "obligations": [
    {
      "id": "log-access",
      "type": "log",
      "parameters": {
        "reason": "department_access",
        "level": "info"
      }
    }
  ]
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Creating Policies */}
      <section id="creating" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Creating Policies
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Three different approaches to creating policies in abac-engine.
          </p>
        </div>

        {/* Method 1: Policy Builder */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Method 1: Policy Builder (Recommended)
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            The fluent PolicyBuilder API provides type safety and better IDE
            support:
          </p>

          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
              {`import { PolicyBuilder, ConditionBuilder, AttributeRef } from 'abac-engine';

const policy = PolicyBuilder.create('my-policy')
  .version('1.0.0')
  .description('My access control policy')
  .permit() // or .deny()
  .condition(
    ConditionBuilder.equals(
      AttributeRef.subject('department'),
      AttributeRef.resource('department')
    )
  )
  .build();`}
            </pre>
          </div>
        </div>

        {/* Method 2: Direct Object */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Method 2: Direct Object Creation
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            For programmatic generation or JSON-based policies:
          </p>

          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
              {`import { ABACPolicy } from 'abac-engine';

const policy: ABACPolicy = {
  id: 'my-policy',
  version: '1.0.0',
  effect: 'Permit',
  condition: {
    operator: 'equals',
    left: { category: 'subject', attributeId: 'department' },
    right: { category: 'resource', attributeId: 'department' }
  }
};`}
            </pre>
          </div>
        </div>

        {/* Method 3: Pre-built Patterns */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Method 3: Pre-built Patterns
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            For common scenarios:
          </p>

          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
              {`import { PolicyPatterns } from 'abac-engine';

const ownershipPolicy = PolicyPatterns.ownership(['read', 'update', 'delete']);
const deptPolicy = PolicyPatterns.departmentAccess(
  ['read'],
  ['public', 'internal']
);
const timePolicy = PolicyPatterns.businessHoursOnly(['create', 'update']);`}
            </pre>
          </div>
        </div>
      </section>

      {/* Conditions & Operators */}
      <section id="conditions" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Conditions & Operators
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Building complex conditions using comparison and logical operators.
          </p>
        </div>

        {/* Comparison Operators */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Comparison Operators
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Equality
              </h4>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
                <pre className="text-gray-300 font-mono text-xs">
                  {`// Exact match
ConditionBuilder.equals(
  AttributeRef.subject('status'),
  'active'
);

// Not equal
ConditionBuilder.notEquals(
  AttributeRef.resource('type'),
  'archived'
);`}
                </pre>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Numeric Comparison
              </h4>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
                <pre className="text-gray-300 font-mono text-xs">
                  {`// Greater than
ConditionBuilder.greaterThan(
  AttributeRef.subject('clearanceLevel'),
  3
);

// Greater than or equal
ConditionBuilder.greaterThanOrEqual(
  AttributeRef.subject('age'),
  18
);`}
                </pre>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Set Operations
              </h4>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
                <pre className="text-gray-300 font-mono text-xs">
                  {`// In array
ConditionBuilder.in(
  AttributeRef.action('id'),
  ['read', 'view', 'list']
);

// Not in array
ConditionBuilder.notIn(
  AttributeRef.resource('status'),
  ['deleted', 'archived']
);`}
                </pre>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                String Operations
              </h4>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
                <pre className="text-gray-300 font-mono text-xs">
                  {`// Contains
ConditionBuilder.contains(
  AttributeRef.resource('title'),
  'confidential'
);

// Starts with
ConditionBuilder.startsWith(
  AttributeRef.resource('path'),
  '/secure/'
);`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Logical Operators */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Logical Operators
          </h3>

          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`// AND - All conditions must be true
ConditionBuilder.and(
  ConditionBuilder.equals(AttributeRef.subject('department'), 'engineering'),
  ConditionBuilder.in(AttributeRef.action('id'), ['read', 'write'])
);

// OR - Any condition can be true
ConditionBuilder.or(
  ConditionBuilder.equals(AttributeRef.subject('role'), 'admin'),
  ConditionBuilder.equals(AttributeRef.subject('role'), 'manager')
);

// NOT - Negation
ConditionBuilder.not(
  ConditionBuilder.equals(AttributeRef.resource('status'), 'archived')
);

// Complex Combinations
const condition = ConditionBuilder.and(
  ConditionBuilder.equals(AttributeRef.subject('department'), 'engineering'),
  ConditionBuilder.or(
    ConditionBuilder.in(AttributeRef.subject('role'), ['admin', 'manager']),
    ConditionBuilder.greaterThanOrEqual(AttributeRef.subject('level'), 5)
  )
);`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Patterns */}
      <section id="patterns" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Common Policy Patterns
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Ready-to-use patterns for common access control scenarios.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Ownership Pattern */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              1. Ownership-Based Access
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Grant access to resources owned by the user
            </p>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-xs">
                {`const policy = PolicyBuilder
  .create('owner-access')
  .permit()
  .condition(
    ConditionBuilder.equals(
      AttributeRef.subject('id'),
      AttributeRef.resource('ownerId')
    )
  )
  .build();`}
              </pre>
            </div>
          </div>

          {/* Department Pattern */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              2. Department-Based Access
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Access resources within the same department
            </p>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-xs">
                {`const policy = PolicyBuilder
  .create('dept-access')
  .permit()
  .condition(
    ConditionBuilder.equals(
      AttributeRef.subject('department'),
      AttributeRef.resource('department')
    )
  )
  .build();`}
              </pre>
            </div>
          </div>

          {/* Time-Based Pattern */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              3. Time-Based Access
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Restrict access to business hours
            </p>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-xs">
                {`const policy = PolicyBuilder
  .create('business-hours')
  .permit()
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.gte(
        AttributeRef.environment('hour'),
        9
      ),
      ConditionBuilder.lte(
        AttributeRef.environment('hour'),
        17
      )
    )
  )
  .build();`}
              </pre>
            </div>
          </div>

          {/* Role Hierarchy Pattern */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              4. Hierarchical Access
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Managers can access subordinate resources
            </p>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-xs">
                {`const policy = PolicyBuilder
  .create('manager-access')
  .permit()
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.equals(
        AttributeRef.subject('role'),
        'manager'
      ),
      ConditionBuilder.equals(
        AttributeRef.subject('department'),
        AttributeRef.resource('department')
      )
    )
  )
  .build();`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Policies */}
      <section id="testing" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Testing Policies
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Ensure your policies work correctly with comprehensive testing.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Unit Testing Policies
          </h3>

          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
              {`import { ABACEngine, PolicyBuilder, ConditionBuilder, AttributeRef } from 'abac-engine';
import { describe, test, expect } from 'vitest';

describe('Policy Tests', () => {
  test('ownership policy allows owner', async () => {
    const policy = PolicyBuilder
      .create('owner-policy')
      .permit()
      .condition(
        ConditionBuilder.equals(
          AttributeRef.subject('id'),
          AttributeRef.resource('ownerId')
        )
      )
      .build();

    const engine = new ABACEngine({ policies: [policy] });

    const decision = await engine.evaluate({
      subject: { id: 'user-123' },
      resource: { ownerId: 'user-123' },
      action: { id: 'read' },
      environment: {}
    });

    expect(decision.decision).toBe('Permit');
  });

  test('ownership policy denies non-owner', async () => {
    const policy = PolicyBuilder
      .create('owner-policy')
      .permit()
      .condition(
        ConditionBuilder.equals(
          AttributeRef.subject('id'),
          AttributeRef.resource('ownerId')
        )
      )
      .build();

    const engine = new ABACEngine({ policies: [policy] });

    const decision = await engine.evaluate({
      subject: { id: 'user-123' },
      resource: { ownerId: 'user-456' },
      action: { id: 'read' },
      environment: {}
    });

    expect(decision.decision).toBe('Deny');
  });
});`}
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Integration Testing
          </h3>

          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
              {`describe('ABAC Integration Tests', () => {
  test('complex scenario: department manager accessing team document', async () => {
    const policies = [
      PolicyBuilder.create('manager-dept-access')
        .permit()
        .condition(
          ConditionBuilder.and(
            ConditionBuilder.equals(
              AttributeRef.subject('role'),
              'manager'
            ),
            ConditionBuilder.equals(
              AttributeRef.subject('department'),
              AttributeRef.resource('department')
            ),
            ConditionBuilder.in(
              AttributeRef.action('id'),
              ['read', 'update']
            )
          )
        )
        .build()
    ];

    const engine = new ABACEngine({ policies });

    const decision = await engine.evaluate({
      subject: {
        id: 'manager-1',
        role: 'manager',
        department: 'engineering'
      },
      resource: {
        id: 'doc-1',
        department: 'engineering'
      },
      action: { id: 'read' },
      environment: {}
    });

    expect(decision.decision).toBe('Permit');
  });
});`}
            </pre>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section id="best-practices" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Best Practices
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Guidelines for creating maintainable and effective policies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              DO: Use Meaningful IDs
            </h3>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-xs">
                {`// Good
PolicyBuilder.create('dept-read-access')

// Bad
PolicyBuilder.create('policy-1')`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              DO: Add Descriptions
            </h3>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-xs">
                {`PolicyBuilder.create('access')
  .description(
    'Allow dept users to read documents'
  )
  .permit()`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              DO: Use Priority for Exceptions
            </h3>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-xs">
                {`// Exception policy (high priority)
PolicyBuilder.create('admin-override')
  .priority(100)
  .permit()

// Base policy (normal priority)
PolicyBuilder.create('base-access')
  .priority(1)
  .permit()`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              DO: Add Obligations for Audit
            </h3>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-xs">
                {`.obligation({
  id: 'audit-access',
  type: 'log',
  parameters: {
    action: 'document_access',
    level: 'info'
  }
})`}
              </pre>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-3 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              DON&apos;T: Create Overly Complex Conditions
            </h3>
            <p className="text-sm text-red-800 dark:text-red-200">
              Split complex policies into multiple simpler policies instead of
              nesting many conditions.
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-3 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              DON&apos;T: Forget to Version Policies
            </h3>
            <p className="text-sm text-red-800 dark:text-red-200">
              Always include version information for policy tracking and
              rollback capabilities.
            </p>
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
            href="/docs/abac-engine/examples"
            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              View Examples
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore real-world policy examples for various use cases
            </p>
          </Link>

          <Link
            href="/docs/abac-engine/glossary"
            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              View Glossary
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Understand ABAC terminology and concepts
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}

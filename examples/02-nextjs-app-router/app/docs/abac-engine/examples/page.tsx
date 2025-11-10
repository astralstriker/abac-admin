import { Building2, Code2, CreditCard, FileText, Hospital, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function ExamplesPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full">
          <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Examples
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          ABAC Engine Examples
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Real-world examples and use cases for implementing ABAC policies in various domains.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          href="#basic"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">Basic Examples</span>
        </a>
        <a
          href="#document-management"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">Document Management</span>
        </a>
        <a
          href="#healthcare"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <Hospital className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">Healthcare System</span>
        </a>
        <a
          href="#financial"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">Financial Services</span>
        </a>
        <a
          href="#ecommerce"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <ShoppingCart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">E-Commerce</span>
        </a>
        <a
          href="#multitenant"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">Multi-Tenant SaaS</span>
        </a>
      </div>

      {/* Basic Examples */}
      <section id="basic" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Basic Examples
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Simple examples to get started with ABAC policies.
          </p>
        </div>

        <div className="space-y-6">
          {/* Department-Based Access */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Department-Based Access
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Allow users to access resources within their department.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
{`import { PolicyBuilder, ConditionBuilder, AttributeRef, ABACEngine } from 'abac-engine';

// Create the policy
const policy = PolicyBuilder
  .create('department-access')
  .version('1.0.0')
  .description('Allow users to access resources in their department')
  .permit()
  .condition(
    ConditionBuilder.equals(
      AttributeRef.subject('department'),
      AttributeRef.resource('department')
    )
  )
  .build();

// Create engine and evaluate
const engine = new ABACEngine({ policies: [policy] });

const decision = await engine.evaluate({
  subject: {
    id: 'user-123',
    department: 'engineering'
  },
  resource: {
    id: 'doc-456',
    department: 'engineering'
  },
  action: { id: 'read' },
  environment: {}
});

console.log(decision.decision); // 'Permit'`}
              </pre>
            </div>
          </div>

          {/* Owner-Based Access */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Owner-Based Access
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Grant resource owners full access to their resources.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
{`const ownerPolicy = PolicyBuilder
  .create('owner-access')
  .version('1.0.0')
  .description('Resource owners can perform any action')
  .permit()
  .condition(
    ConditionBuilder.equals(
      AttributeRef.subject('id'),
      AttributeRef.resource('ownerId')
    )
  )
  .build();

// Usage
const decision = await engine.evaluate({
  subject: { id: 'user-123' },
  resource: { id: 'file-1', ownerId: 'user-123' },
  action: { id: 'delete' },
  environment: {}
});`}
              </pre>
            </div>
          </div>

          {/* Clearance Level */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Clearance Level Access
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Access based on security clearance levels.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
{`const clearancePolicy = PolicyBuilder
  .create('clearance-level')
  .version('1.0.0')
  .description('User clearance must meet or exceed resource classification')
  .permit()
  .condition(
    ConditionBuilder.greaterThanOrEqual(
      AttributeRef.subject('clearanceLevel'),
      AttributeRef.resource('classificationLevel')
    )
  )
  .build();`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Document Management System */}
      <section id="document-management" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Document Management System
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Complete example of a document management system with multiple policies.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Policy Set
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
{`import { ABACEngine, PolicyBuilder, ConditionBuilder, AttributeRef } from 'abac-engine';

// 1. Owner Policy - Owners can do anything
const ownerPolicy = PolicyBuilder
  .create('document-owner-access')
  .version('1.0.0')
  .description('Document owners have full access')
  .permit()
  .priority(100)
  .condition(
    ConditionBuilder.equals(
      AttributeRef.subject('id'),
      AttributeRef.resource('ownerId')
    )
  )
  .build();

// 2. Department Read Policy
const departmentReadPolicy = PolicyBuilder
  .create('department-read-access')
  .version('1.0.0')
  .description('Department members can read documents')
  .permit()
  .priority(50)
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.equals(
        AttributeRef.subject('department'),
        AttributeRef.resource('department')
      ),
      ConditionBuilder.in(
        AttributeRef.action('id'),
        ['read', 'view']
      )
    )
  )
  .build();

// 3. Editor Policy
const editorPolicy = PolicyBuilder
  .create('editor-access')
  .version('1.0.0')
  .description('Users with editor role can modify')
  .permit()
  .priority(75)
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.in(
        AttributeRef.subject('id'),
        AttributeRef.resource('editors')
      ),
      ConditionBuilder.in(
        AttributeRef.action('id'),
        ['read', 'update']
      )
    )
  )
  .build();

// 4. Archived Policy - Deny all modifications
const archivedPolicy = PolicyBuilder
  .create('archived-deny')
  .version('1.0.0')
  .description('Archived documents cannot be modified')
  .deny()
  .priority(200) // Highest priority
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.equals(
        AttributeRef.resource('status'),
        'archived'
      ),
      ConditionBuilder.in(
        AttributeRef.action('id'),
        ['update', 'delete']
      )
    )
  )
  .build();

// 5. Confidential Policy
const confidentialPolicy = PolicyBuilder
  .create('confidential-access')
  .version('1.0.0')
  .description('Only clearance level 3+ can access confidential')
  .permit()
  .priority(90)
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.equals(
        AttributeRef.resource('classification'),
        'confidential'
      ),
      ConditionBuilder.greaterThanOrEqual(
        AttributeRef.subject('clearanceLevel'),
        3
      )
    )
  )
  .obligation({
    id: 'log-confidential-access',
    type: 'log',
    parameters: {
      level: 'warn',
      message: 'Confidential document accessed'
    }
  })
  .build();

// Create engine with all policies
const engine = new ABACEngine({
  policies: [
    ownerPolicy,
    departmentReadPolicy,
    editorPolicy,
    archivedPolicy,
    confidentialPolicy
  ]
});`}
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Usage Examples
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
{`// Example 1: Owner accessing their document
const decision1 = await engine.evaluate({
  subject: {
    id: 'user-123',
    department: 'engineering',
    clearanceLevel: 2
  },
  resource: {
    id: 'doc-1',
    ownerId: 'user-123',
    department: 'engineering',
    status: 'active',
    classification: 'internal'
  },
  action: { id: 'delete' },
  environment: {}
});
// Result: Permit (owner policy)

// Example 2: Department member reading
const decision2 = await engine.evaluate({
  subject: {
    id: 'user-456',
    department: 'engineering',
    clearanceLevel: 2
  },
  resource: {
    id: 'doc-1',
    ownerId: 'user-123',
    department: 'engineering',
    status: 'active',
    classification: 'internal'
  },
  action: { id: 'read' },
  environment: {}
});
// Result: Permit (department read policy)

// Example 3: Trying to modify archived document
const decision3 = await engine.evaluate({
  subject: {
    id: 'user-123',
    department: 'engineering',
    clearanceLevel: 2
  },
  resource: {
    id: 'doc-1',
    ownerId: 'user-123',
    department: 'engineering',
    status: 'archived',
    classification: 'internal'
  },
  action: { id: 'update' },
  environment: {}
});
// Result: Deny (archived policy overrides owner policy)`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare System */}
      <section id="healthcare" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Healthcare System
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            HIPAA-compliant access control for patient records.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
{`// Doctor-Patient Relationship Policy
const doctorPatientPolicy = PolicyBuilder
  .create('doctor-patient-access')
  .version('1.0.0')
  .description('Doctors can access their patients records')
  .permit()
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.equals(
        AttributeRef.subject('role'),
        'doctor'
      ),
      ConditionBuilder.in(
        AttributeRef.subject('id'),
        AttributeRef.resource('assignedDoctors')
      )
    )
  )
  .obligation({
    id: 'audit-patient-access',
    type: 'log',
    parameters: {
      level: 'info',
      action: 'patient_record_access'
    }
  })
  .build();

// Patient Self-Access Policy
const patientSelfAccessPolicy = PolicyBuilder
  .create('patient-self-access')
  .version('1.0.0')
  .description('Patients can view their own records')
  .permit()
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.equals(
        AttributeRef.subject('role'),
        'patient'
      ),
      ConditionBuilder.equals(
        AttributeRef.subject('id'),
        AttributeRef.resource('patientId')
      ),
      ConditionBuilder.in(
        AttributeRef.action('id'),
        ['read', 'view']
      )
    )
  )
  .build();

// Emergency Access Policy
const emergencyAccessPolicy = PolicyBuilder
  .create('emergency-access')
  .version('1.0.0')
  .description('Emergency staff can access any patient during emergencies')
  .permit()
  .priority(100)
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.equals(
        AttributeRef.subject('role'),
        'emergency_staff'
      ),
      ConditionBuilder.equals(
        AttributeRef.environment('emergencyMode'),
        true
      )
    )
  )
  .obligation({
    id: 'emergency-access-alert',
    type: 'notify',
    parameters: {
      level: 'critical',
      message: 'Emergency access granted'
    }
  })
  .build();

// Nurse Read-Only Policy
const nurseReadPolicy = PolicyBuilder
  .create('nurse-read-access')
  .version('1.0.0')
  .description('Nurses can read patient records in their ward')
  .permit()
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.equals(
        AttributeRef.subject('role'),
        'nurse'
      ),
      ConditionBuilder.equals(
        AttributeRef.subject('ward'),
        AttributeRef.resource('ward')
      ),
      ConditionBuilder.in(
        AttributeRef.action('id'),
        ['read', 'view']
      )
    )
  )
  .build();`}
            </pre>
          </div>
        </div>
      </section>

      {/* Financial Services */}
      <section id="financial" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Financial Services
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Secure access control for banking and financial applications.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
{`// Account Owner Access
const accountOwnerPolicy = PolicyBuilder
  .create('account-owner-access')
  .version('1.0.0')
  .description('Account owners can access their accounts')
  .permit()
  .condition(
    ConditionBuilder.equals(
      AttributeRef.subject('id'),
      AttributeRef.resource('accountHolderId')
    )
  )
  .build();

// Joint Account Access
const jointAccountPolicy = PolicyBuilder
  .create('joint-account-access')
  .version('1.0.0')
  .description('Joint account holders can access the account')
  .permit()
  .condition(
    ConditionBuilder.in(
      AttributeRef.subject('id'),
      AttributeRef.resource('accountHolders')
    )
  )
  .build();

// Large Transaction Policy
const largeTransactionPolicy = PolicyBuilder
  .create('large-transaction-approval')
  .version('1.0.0')
  .description('Large transactions require manager approval')
  .deny()
  .priority(100)
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.equals(
        AttributeRef.action('id'),
        'transfer'
      ),
      ConditionBuilder.greaterThan(
        AttributeRef.resource('amount'),
        10000
      ),
      ConditionBuilder.notEquals(
        AttributeRef.subject('role'),
        'manager'
      )
    )
  )
  .build();

// Business Hours Policy
const businessHoursPolicy = PolicyBuilder
  .create('business-hours-only')
  .version('1.0.0')
  .description('Certain operations only during business hours')
  .permit()
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.in(
        AttributeRef.action('id'),
        ['wire_transfer', 'large_withdrawal']
      ),
      ConditionBuilder.greaterThanOrEqual(
        AttributeRef.environment('hourOfDay'),
        9
      ),
      ConditionBuilder.lessThanOrEqual(
        AttributeRef.environment('hourOfDay'),
        17
      )
    )
  )
  .build();`}
            </pre>
          </div>
        </div>
      </section>

      {/* E-Commerce */}
      <section id="ecommerce" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            E-Commerce Platform
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Access control for products, orders, and vendor management.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
{`// Public Product Access
const publicProductPolicy = PolicyBuilder
  .create('public-product-access')
  .version('1.0.0')
  .description('Anyone can view public products')
  .permit()
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.equals(
        AttributeRef.resource('visibility'),
        'public'
      ),
      ConditionBuilder.equals(
        AttributeRef.action('id'),
        'view'
      )
    )
  )
  .build();

// Vendor Product Management
const vendorProductPolicy = PolicyBuilder
  .create('vendor-product-management')
  .version('1.0.0')
  .description('Vendors can manage their own products')
  .permit()
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.equals(
        AttributeRef.subject('role'),
        'vendor'
      ),
      ConditionBuilder.equals(
        AttributeRef.subject('id'),
        AttributeRef.resource('vendorId')
      ),
      ConditionBuilder.in(
        AttributeRef.action('id'),
        ['update', 'delete']
      )
    )
  )
  .build();

// Order Access Policy
const orderAccessPolicy = PolicyBuilder
  .create('order-access')
  .version('1.0.0')
  .description('Customers can access their orders')
  .permit()
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.equals(
        AttributeRef.subject('id'),
        AttributeRef.resource('customerId')
      ),
      ConditionBuilder.equals(
        AttributeRef.resource('type'),
        'order'
      )
    )
  )
  .build();

// Refund Policy
const refundPolicy = PolicyBuilder
  .create('refund-policy')
  .version('1.0.0')
  .description('Refunds within 30 days for non-final-sale items')
  .permit()
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.equals(
        AttributeRef.action('id'),
        'refund'
      ),
      ConditionBuilder.lessThanOrEqual(
        AttributeRef.resource('daysSincePurchase'),
        30
      ),
      ConditionBuilder.notEquals(
        AttributeRef.resource('finalSale'),
        true
      )
    )
  )
  .build();`}
            </pre>
          </div>
        </div>
      </section>

      {/* Multi-Tenant SaaS */}
      <section id="multitenant" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Multi-Tenant SaaS Application
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Tenant isolation and role-based access within tenants.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
{`// Tenant Isolation Policy
const tenantIsolationPolicy = PolicyBuilder
  .create('tenant-isolation')
  .version('1.0.0')
  .description('Users can only access resources in their tenant')
  .deny()
  .priority(1000) // Highest priority
  .condition(
    ConditionBuilder.notEquals(
      AttributeRef.subject('tenantId'),
      AttributeRef.resource('tenantId')
    )
  )
  .build();

// Tenant Admin Policy
const tenantAdminPolicy = PolicyBuilder
  .create('tenant-admin-access')
  .version('1.0.0')
  .description('Tenant admins have full access within their tenant')
  .permit()
  .priority(100)
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.equals(
        AttributeRef.subject('role'),
        'admin'
      ),
      ConditionBuilder.equals(
        AttributeRef.subject('tenantId'),
        AttributeRef.resource('tenantId')
      )
    )
  )
  .build();

// User Profile Access
const profileAccessPolicy = PolicyBuilder
  .create('profile-access')
  .version('1.0.0')
  .description('Users can manage their own profile')
  .permit()
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.equals(
        AttributeRef.resource('type'),
        'user_profile'
      ),
      ConditionBuilder.equals(
        AttributeRef.subject('id'),
        AttributeRef.resource('userId')
      )
    )
  )
  .build();

// Billing Access Policy
const billingPolicy = PolicyBuilder
  .create('billing-access')
  .version('1.0.0')
  .description('Only billing admins can access billing info')
  .permit()
  .condition(
    ConditionBuilder.and(
      ConditionBuilder.equals(
        AttributeRef.resource('type'),
        'billing'
      ),
      ConditionBuilder.in(
        AttributeRef.subject('role'),
        ['admin', 'billing_admin']
      ),
      ConditionBuilder.equals(
        AttributeRef.subject('tenantId'),
        AttributeRef.resource('tenantId')
      )
    )
  )
  .build();

// Usage
const policies = [
  tenantIsolationPolicy,
  tenantAdminPolicy,
  profileAccessPolicy,
  billingPolicy
];

const engine = new ABACEngine({ policies });

// Example: User trying to access another tenant's resource
const decision = await engine.evaluate({
  subject: {
    id: 'user-123',
    tenantId: 'tenant-A',
    role: 'user'
  },
  resource: {
    id: 'resource-456',
    tenantId: 'tenant-B',
    type: 'document'
  },
  action: { id: 'read' },
  environment: {}
});
// Result: Deny (tenant isolation policy)`}
            </pre>
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-green-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Framework Integration
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Examples of integrating ABAC with popular frameworks.
          </p>
        </div>

        <div className="space-y-6">
          {/* Express.js */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Express.js Middleware
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
{`import express from 'express';
import { ABACEngine } from 'abac-engine';

function createABACMiddleware(engine: ABACEngine) {
  return async (req, res, next) => {
    const decision = await engine.evaluate({
      subject: req.user,
      resource: {
        type: req.baseUrl,
        id: req.params.id,
        ...req.resourceAttributes
      },
      action: { id: req.method.toLowerCase() },
      environment: {
        ip: req.ip,
        timestamp: new Date().toISOString()
      }
    });

    if (decision.decision === 'Permit') {
      next();
    } else {
      res.status(403).json({
        error: 'Access Denied',
        reason: decision.reason
      });
    }
  };
}

// Usage
const app = express();
const abacMiddleware = createABACMiddleware(engine);

app.get('/documents/:id', abacMiddleware, (req, res) => {
  // Handle request
});`}
              </pre>
            </div>
          </div>

          {/* Next.js */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Next.js API Routes
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
{`import { NextRequest, NextResponse } from 'next/server';
import { ABACEngine } from 'abac-engine';
import { getSession } from '@/lib/auth';

const engine = new ABACEngine({ policies });

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();

  const decision = await engine.evaluate({
    subject: session.user,
    resource: { id: params.id, type: 'document' },
    action: { id: 'read' },
    environment: {}
  });

  if (decision.decision !== 'Permit') {
    return NextResponse.json(
      { error: 'Access Denied' },
      { status: 403 }
    );
  }

  // Handle the request
  const document = await getDocument(params.id);
  return NextResponse.json(document);
}`}
              </pre>
            </div>
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
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Policy Guide
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learn how to create and structure policies
            </p>
          </Link>

          <Link
            href="/docs/abac-engine/api-reference"
            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              API Reference
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore the complete API documentation
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}

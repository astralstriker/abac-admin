/**
 * Complete Workflow Example
 *
 * This example demonstrates an end-to-end workflow that combines
 * policies, attributes, and audit logging in a realistic scenario.
 *
 * Scenario: Setting up access control for a document management system
 */

import {
  ABACAdminClient,
  PolicyService,
  AttributeService,
  AuditService,
  ConditionBuilder
} from '@abac-admin/core';

// Initialize the client
const client = new ABACAdminClient({
  baseURL: process.env.ABAC_API_URL || 'http://localhost:3000/api/abac',
  headers: {
    'Authorization': `Bearer ${process.env.ABAC_API_TOKEN || 'demo-token'}`,
    'Content-Type': 'application/json'
  },
  timeout: 30000,
  onError: (error) => {
    console.error('🔴 API Error:', error.message);
  }
});

const policyService = new PolicyService(client);
const attributeService = new AttributeService(client);
const auditService = new AuditService(client);

/**
 * Step 1: Set up resource attributes for users
 */
async function setupUserAttributes() {
  console.log('\n📋 Step 1: Setting up user attributes...');
  console.log('=========================================');

  try {
    // Set attributes for Alice (Admin)
    await attributeService.bulkSetAttributes('user', 'user-alice', {
      role: 'admin',
      department: 'engineering',
      level: 10,
      email: 'alice@company.com',
      status: 'active'
    });
    console.log('✅ Alice (admin) attributes set');

    // Set attributes for Bob (Manager)
    await attributeService.bulkSetAttributes('user', 'user-bob', {
      role: 'manager',
      department: 'engineering',
      level: 7,
      email: 'bob@company.com',
      status: 'active'
    });
    console.log('✅ Bob (manager) attributes set');

    // Set attributes for Charlie (Developer)
    await attributeService.bulkSetAttributes('user', 'user-charlie', {
      role: 'developer',
      department: 'engineering',
      level: 4,
      email: 'charlie@company.com',
      status: 'active'
    });
    console.log('✅ Charlie (developer) attributes set');

    // Set attributes for Diana (Designer)
    await attributeService.bulkSetAttributes('user', 'user-diana', {
      role: 'designer',
      department: 'design',
      level: 5,
      email: 'diana@company.com',
      status: 'active'
    });
    console.log('✅ Diana (designer) attributes set');

    console.log('\n📊 User Summary:');
    console.log('   • Alice: Admin (Level 10, Engineering)');
    console.log('   • Bob: Manager (Level 7, Engineering)');
    console.log('   • Charlie: Developer (Level 4, Engineering)');
    console.log('   • Diana: Designer (Level 5, Design)');

  } catch (error) {
    console.error('❌ Failed to set up user attributes:', error.message);
    throw error;
  }
}

/**
 * Step 2: Set up resource attributes for documents
 */
async function setupDocumentAttributes() {
  console.log('\n📄 Step 2: Setting up document attributes...');
  console.log('============================================');

  try {
    // Public documentation
    await attributeService.bulkSetAttributes('document', 'doc-readme', {
      title: 'Project README',
      ownerId: 'user-alice',
      department: 'engineering',
      visibility: 'public',
      classification: 'public',
      tags: ['documentation', 'public']
    });
    console.log('✅ Public README document created');

    // Engineering specification
    await attributeService.bulkSetAttributes('document', 'doc-spec-001', {
      title: 'Technical Specification v2.0',
      ownerId: 'user-bob',
      department: 'engineering',
      visibility: 'internal',
      classification: 'confidential',
      tags: ['specification', 'engineering']
    });
    console.log('✅ Engineering specification created');

    // Design mockup
    await attributeService.bulkSetAttributes('document', 'doc-mockup-001', {
      title: 'UI Mockup Q1 2024',
      ownerId: 'user-diana',
      department: 'design',
      visibility: 'internal',
      classification: 'internal',
      tags: ['design', 'mockup']
    });
    console.log('✅ Design mockup created');

    // Sensitive HR document
    await attributeService.bulkSetAttributes('document', 'doc-hr-salary', {
      title: 'Salary Information 2024',
      ownerId: 'user-alice',
      department: 'hr',
      visibility: 'restricted',
      classification: 'highly-confidential',
      tags: ['hr', 'salary', 'confidential']
    });
    console.log('✅ HR document created');

    console.log('\n📊 Document Summary:');
    console.log('   • README: Public, Engineering');
    console.log('   • Tech Spec: Confidential, Engineering');
    console.log('   • UI Mockup: Internal, Design');
    console.log('   • Salary Info: Highly Confidential, HR');

  } catch (error) {
    console.error('❌ Failed to set up document attributes:', error.message);
    throw error;
  }
}

/**
 * Step 3: Create comprehensive access policies
 */
async function createAccessPolicies() {
  console.log('\n🔐 Step 3: Creating access control policies...');
  console.log('===============================================');

  const policies = [];

  try {
    // Policy 1: Public document access for everyone
    const publicPolicy = await policyService.create({
      policyId: 'allow-public-documents',
      version: '1.0.0',
      effect: 'PERMIT',
      description: 'Allow anyone to read public documents',
      conditions: ConditionBuilder.and(
        ConditionBuilder.equals(
          ConditionBuilder.attr('resource', 'visibility'),
          'public'
        ),
        ConditionBuilder.equals(
          ConditionBuilder.attr('action', 'type'),
          'read'
        )
      ),
      isActive: true,
      category: 'document-access',
      tags: ['public', 'read'],
      createdBy: 'system'
    });
    policies.push(publicPolicy);
    console.log('✅ Policy 1: Public document access');

    // Policy 2: Document owner full access
    const ownerPolicy = await policyService.create({
      policyId: 'allow-owner-full-access',
      version: '1.0.0',
      effect: 'PERMIT',
      description: 'Document owners have full access to their documents',
      conditions: ConditionBuilder.and(
        ConditionBuilder.equals(
          ConditionBuilder.attr('subject', 'userId'),
          ConditionBuilder.attr('resource', 'ownerId')
        ),
        ConditionBuilder.in(
          ConditionBuilder.attr('action', 'type'),
          ['read', 'update', 'delete']
        )
      ),
      isActive: true,
      category: 'document-access',
      tags: ['owner', 'full-access'],
      createdBy: 'system'
    });
    policies.push(ownerPolicy);
    console.log('✅ Policy 2: Owner full access');

    // Policy 3: Same department read access for internal documents
    const departmentPolicy = await policyService.create({
      policyId: 'allow-department-read',
      version: '1.0.0',
      effect: 'PERMIT',
      description: 'Users can read internal documents from their department',
      conditions: ConditionBuilder.and(
        ConditionBuilder.equals(
          ConditionBuilder.attr('subject', 'department'),
          ConditionBuilder.attr('resource', 'department')
        ),
        ConditionBuilder.equals(
          ConditionBuilder.attr('resource', 'visibility'),
          'internal'
        ),
        ConditionBuilder.equals(
          ConditionBuilder.attr('action', 'type'),
          'read'
        )
      ),
      isActive: true,
      category: 'document-access',
      tags: ['department', 'read', 'internal'],
      createdBy: 'system'
    });
    policies.push(departmentPolicy);
    console.log('✅ Policy 3: Department read access');

    // Policy 4: Admin full access
    const adminPolicy = await policyService.create({
      policyId: 'allow-admin-full-access',
      version: '1.0.0',
      effect: 'PERMIT',
      description: 'Admins have full access to all documents',
      conditions: ConditionBuilder.and(
        ConditionBuilder.equals(
          ConditionBuilder.attr('subject', 'role'),
          'admin'
        ),
        ConditionBuilder.in(
          ConditionBuilder.attr('action', 'type'),
          ['read', 'update', 'delete', 'share']
        )
      ),
      isActive: true,
      category: 'document-access',
      tags: ['admin', 'full-access'],
      createdBy: 'system'
    });
    policies.push(adminPolicy);
    console.log('✅ Policy 4: Admin full access');

    // Policy 5: Manager can read subordinate documents
    const managerPolicy = await policyService.create({
      policyId: 'allow-manager-subordinate-read',
      version: '1.0.0',
      effect: 'PERMIT',
      description: 'Managers can read documents from their department',
      conditions: ConditionBuilder.and(
        ConditionBuilder.equals(
          ConditionBuilder.attr('subject', 'role'),
          'manager'
        ),
        ConditionBuilder.equals(
          ConditionBuilder.attr('subject', 'department'),
          ConditionBuilder.attr('resource', 'department')
        ),
        ConditionBuilder.in(
          ConditionBuilder.attr('action', 'type'),
          ['read', 'approve']
        )
      ),
      isActive: true,
      category: 'document-access',
      tags: ['manager', 'read', 'approve'],
      createdBy: 'system'
    });
    policies.push(managerPolicy);
    console.log('✅ Policy 5: Manager subordinate access');

    // Policy 6: Deny access to highly confidential unless admin
    const denyConfidentialPolicy = await policyService.create({
      policyId: 'deny-highly-confidential',
      version: '1.0.0',
      effect: 'DENY',
      description: 'Deny access to highly confidential documents for non-admins',
      conditions: ConditionBuilder.and(
        ConditionBuilder.equals(
          ConditionBuilder.attr('resource', 'classification'),
          'highly-confidential'
        ),
        ConditionBuilder.notEquals(
          ConditionBuilder.attr('subject', 'role'),
          'admin'
        )
      ),
      isActive: true,
      category: 'document-access',
      tags: ['deny', 'confidential', 'security'],
      createdBy: 'system'
    });
    policies.push(denyConfidentialPolicy);
    console.log('✅ Policy 6: Deny highly confidential access');

    console.log(`\n📊 Created ${policies.length} policies successfully`);
    return policies;

  } catch (error) {
    console.error('❌ Failed to create policies:', error.message);
    throw error;
  }
}

/**
 * Step 4: Test access scenarios
 */
async function testAccessScenarios(policies) {
  console.log('\n🧪 Step 4: Testing access scenarios...');
  console.log('======================================');

  const scenarios = [
    {
      name: 'Alice (Admin) reads HR salary document',
      request: {
        subject: { userId: 'user-alice', role: 'admin', department: 'engineering' },
        resource: {
          id: 'doc-hr-salary',
          classification: 'highly-confidential',
          ownerId: 'user-alice',
          department: 'hr'
        },
        action: { type: 'read' }
      },
      expected: 'PERMIT'
    },
    {
      name: 'Bob (Manager) reads engineering spec',
      request: {
        subject: { userId: 'user-bob', role: 'manager', department: 'engineering' },
        resource: {
          id: 'doc-spec-001',
          visibility: 'internal',
          department: 'engineering',
          ownerId: 'user-bob'
        },
        action: { type: 'read' }
      },
      expected: 'PERMIT'
    },
    {
      name: 'Charlie (Developer) reads public README',
      request: {
        subject: { userId: 'user-charlie', role: 'developer', department: 'engineering' },
        resource: {
          id: 'doc-readme',
          visibility: 'public',
          department: 'engineering'
        },
        action: { type: 'read' }
      },
      expected: 'PERMIT'
    },
    {
      name: 'Diana (Designer) reads engineering spec',
      request: {
        subject: { userId: 'user-diana', role: 'designer', department: 'design' },
        resource: {
          id: 'doc-spec-001',
          visibility: 'internal',
          department: 'engineering'
        },
        action: { type: 'read' }
      },
      expected: 'DENY'
    },
    {
      name: 'Charlie (Developer) tries to read HR salary',
      request: {
        subject: { userId: 'user-charlie', role: 'developer', department: 'engineering' },
        resource: {
          id: 'doc-hr-salary',
          classification: 'highly-confidential',
          department: 'hr'
        },
        action: { type: 'read' }
      },
      expected: 'DENY'
    }
  ];

  for (const scenario of scenarios) {
    try {
      const result = await policyService.test(scenario.request);
      const status = result.decision === scenario.expected ? '✅' : '❌';
      console.log(`\n${status} ${scenario.name}`);
      console.log(`   Expected: ${scenario.expected}, Got: ${result.decision}`);
      if (result.matchedPolicies?.length > 0) {
        console.log(`   Matched policies: ${result.matchedPolicies.map(p => p.policyId).join(', ')}`);
      }
    } catch (error) {
      console.log(`⚠️  ${scenario.name}: Test skipped (${error.message})`);
    }
  }
}

/**
 * Step 5: View audit trail
 */
async function viewAuditTrail() {
  console.log('\n📊 Step 5: Viewing audit trail...');
  console.log('==================================');

  try {
    // Get recent activity
    const recentActivity = await auditService.getRecentActivity(10);
    console.log(`\n✅ Recent Activity (${recentActivity.length} entries):`);

    recentActivity.slice(0, 5).forEach((entry, index) => {
      const date = new Date(entry.timestamp).toLocaleString();
      console.log(`   ${index + 1}. ${entry.action} on ${entry.entityType} by ${entry.userId || 'system'}`);
      console.log(`      Time: ${date}`);
    });

    // Get statistics
    const stats = await auditService.getStatistics();
    console.log('\n📈 Audit Statistics:');
    console.log(`   Total Entries: ${stats.totalEntries || 'N/A'}`);
    console.log(`   Policies Created: ${stats.policiesCreated || 'N/A'}`);
    console.log(`   Attributes Modified: ${stats.attributesModified || 'N/A'}`);
    console.log(`   Access Decisions: ${stats.accessDecisions || 'N/A'}`);

    // Get policy-specific history
    const policyHistory = await auditService.getEntityHistory('policy', 'allow-admin-full-access', 5);
    console.log(`\n📜 Policy History (${policyHistory.length} entries):`);
    policyHistory.forEach((entry, index) => {
      console.log(`   ${index + 1}. ${entry.action} - ${entry.details?.description || 'No details'}`);
    });

  } catch (error) {
    console.error('❌ Failed to view audit trail:', error.message);
  }
}

/**
 * Step 6: Compare user attributes
 */
async function compareUsers() {
  console.log('\n🔍 Step 6: Comparing user attributes...');
  console.log('========================================');

  try {
    const comparison = await attributeService.compareAttributes(
      'user',
      'user-alice',
      'user-bob'
    );

    console.log('\n✅ Comparison: Alice vs Bob');
    console.log('   Shared attributes:');
    for (const [key, value] of Object.entries(comparison.shared || {})) {
      console.log(`      ${key}: ${value}`);
    }

    console.log('\n   Alice only:');
    for (const [key, value] of Object.entries(comparison.onlyInFirst || {})) {
      console.log(`      ${key}: ${value}`);
    }

    console.log('\n   Bob only:');
    for (const [key, value] of Object.entries(comparison.onlyInSecond || {})) {
      console.log(`      ${key}: ${value}`);
    }

    console.log('\n   Different values:');
    for (const [key, values] of Object.entries(comparison.different || {})) {
      console.log(`      ${key}: Alice=${values.first}, Bob=${values.second}`);
    }

  } catch (error) {
    console.error('❌ Failed to compare users:', error.message);
  }
}

/**
 * Step 7: Export and cleanup demo
 */
async function exportAndCleanup(policies) {
  console.log('\n💾 Step 7: Export policies (demo)...');
  console.log('====================================');

  try {
    const policyIds = policies.map(p => p.id);
    const exportResult = await policyService.export(policyIds);

    console.log(`✅ Exported ${exportResult.count || policies.length} policies`);
    console.log(`   Export size: ${JSON.stringify(exportResult).length} bytes`);
    console.log('   (In production, you would save this to a file)');

    // Show policy summary
    console.log('\n📋 Policy Summary:');
    policies.forEach((policy, index) => {
      console.log(`   ${index + 1}. ${policy.policyId}`);
      console.log(`      Effect: ${policy.effect}`);
      console.log(`      Status: ${policy.isActive ? 'Active' : 'Inactive'}`);
      console.log(`      Tags: ${policy.tags.join(', ')}`);
    });

  } catch (error) {
    console.error('❌ Failed to export policies:', error.message);
  }
}

/**
 * Main workflow orchestrator
 */
async function main() {
  console.log('🚀 ABAC Admin Core - Complete Workflow Example');
  console.log('==============================================');
  console.log('\nScenario: Document Management System Access Control');
  console.log('This workflow demonstrates a realistic end-to-end setup\n');

  try {
    // Execute workflow steps
    await setupUserAttributes();
    await setupDocumentAttributes();
    const policies = await createAccessPolicies();
    await testAccessScenarios(policies);
    await viewAuditTrail();
    await compareUsers();
    await exportAndCleanup(policies);

    console.log('\n✅ Complete workflow executed successfully!');
    console.log('\n📚 What we accomplished:');
    console.log('   ✓ Set up user attributes (4 users with roles and departments)');
    console.log('   ✓ Created document attributes (4 documents with classifications)');
    console.log('   ✓ Built 6 comprehensive access policies');
    console.log('   ✓ Tested 5 different access scenarios');
    console.log('   ✓ Reviewed audit trails and statistics');
    console.log('   ✓ Compared user attributes');
    console.log('   ✓ Exported policy configurations');

    console.log('\n💡 Next Steps:');
    console.log('   • Integrate with your authentication system');
    console.log('   • Add more complex conditions based on your needs');
    console.log('   • Set up monitoring and alerting for policy violations');
    console.log('   • Create backup and restore procedures');
    console.log('   • Implement policy version management');

  } catch (error) {
    console.error('\n❌ Workflow execution failed:', error);
    console.error('\nStack trace:', error.stack);
    process.exit(1);
  }
}

// Run the complete workflow
main();

/**
 * Basic Policy Operations Example
 *
 * This example demonstrates fundamental CRUD operations for ABAC policies
 * using the @abac-admin/core package in a vanilla Node.js environment.
 */

import { ABACAdminClient, PolicyService } from '@abac-admin/core';

// Initialize the client
const client = new ABACAdminClient({
  baseURL: process.env.ABAC_API_URL || 'http://localhost:3000/api/abac',
  headers: {
    'Authorization': `Bearer ${process.env.ABAC_API_TOKEN || 'demo-token'}`,
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

const policyService = new PolicyService(client);

/**
 * Example 1: Create a simple policy
 */
async function createSimplePolicy() {
  console.log('\n📝 Creating a simple policy...');

  try {
    const policy = await policyService.create({
      policyId: 'allow-document-view',
      version: '1.0.0',
      effect: 'PERMIT',
      description: 'Allow users to view documents',
      conditions: {
        type: 'equals',
        left: { category: 'action', key: 'type' },
        right: 'view'
      },
      isActive: true,
      category: 'document',
      tags: ['document', 'read'],
      createdBy: 'admin-user'
    });

    console.log('✅ Policy created successfully:');
    console.log(`   ID: ${policy.id}`);
    console.log(`   Policy ID: ${policy.policyId}`);
    console.log(`   Status: ${policy.isActive ? 'Active' : 'Inactive'}`);

    return policy;
  } catch (error) {
    console.error('❌ Failed to create policy:', error.message);
    throw error;
  }
}

/**
 * Example 2: List all policies
 */
async function listPolicies() {
  console.log('\n📋 Listing all policies...');

  try {
    const policies = await policyService.list();

    console.log(`✅ Found ${policies.length} policies:`);
    policies.forEach((policy, index) => {
      console.log(`   ${index + 1}. ${policy.policyId} (${policy.version})`);
      console.log(`      Description: ${policy.description}`);
      console.log(`      Status: ${policy.isActive ? 'Active' : 'Inactive'}`);
      console.log(`      Created: ${new Date(policy.createdAt).toLocaleDateString()}`);
    });

    return policies;
  } catch (error) {
    console.error('❌ Failed to list policies:', error.message);
    throw error;
  }
}

/**
 * Example 3: Get a specific policy
 */
async function getPolicy(policyId) {
  console.log(`\n🔍 Fetching policy: ${policyId}...`);

  try {
    const policy = await policyService.get(policyId);

    console.log('✅ Policy details:');
    console.log(`   Policy ID: ${policy.policyId}`);
    console.log(`   Version: ${policy.version}`);
    console.log(`   Effect: ${policy.effect}`);
    console.log(`   Description: ${policy.description}`);
    console.log(`   Active: ${policy.isActive}`);
    console.log(`   Category: ${policy.category}`);
    console.log(`   Tags: ${policy.tags.join(', ')}`);
    console.log(`   Created By: ${policy.createdBy}`);
    console.log(`   Conditions:`, JSON.stringify(policy.conditions, null, 2));

    return policy;
  } catch (error) {
    console.error('❌ Failed to fetch policy:', error.message);
    throw error;
  }
}

/**
 * Example 4: Update a policy
 */
async function updatePolicy(policyId) {
  console.log(`\n✏️  Updating policy: ${policyId}...`);

  try {
    const updated = await policyService.update(policyId, {
      description: 'Updated: Allow users to view documents (modified)',
      tags: ['document', 'read', 'updated']
    });

    console.log('✅ Policy updated successfully:');
    console.log(`   New Description: ${updated.description}`);
    console.log(`   New Tags: ${updated.tags.join(', ')}`);
    console.log(`   Updated At: ${new Date(updated.updatedAt).toLocaleString()}`);

    return updated;
  } catch (error) {
    console.error('❌ Failed to update policy:', error.message);
    throw error;
  }
}

/**
 * Example 5: Activate/Deactivate a policy
 */
async function togglePolicyStatus(policyId, activate = true) {
  console.log(`\n🔄 ${activate ? 'Activating' : 'Deactivating'} policy: ${policyId}...`);

  try {
    const policy = activate
      ? await policyService.activate(policyId)
      : await policyService.deactivate(policyId);

    console.log(`✅ Policy ${activate ? 'activated' : 'deactivated'} successfully`);
    console.log(`   Status: ${policy.isActive ? 'Active' : 'Inactive'}`);

    return policy;
  } catch (error) {
    console.error(`❌ Failed to ${activate ? 'activate' : 'deactivate'} policy:`, error.message);
    throw error;
  }
}

/**
 * Example 6: List policies with filters
 */
async function listPoliciesWithFilters() {
  console.log('\n🔍 Listing policies with filters...');

  try {
    const filters = {
      isActive: true,
      category: 'document',
      tags: ['read']
    };

    const policies = await policyService.list(filters);

    console.log(`✅ Found ${policies.length} policies matching filters:`);
    console.log(`   Filters: ${JSON.stringify(filters)}`);
    policies.forEach((policy, index) => {
      console.log(`   ${index + 1}. ${policy.policyId} - ${policy.description}`);
    });

    return policies;
  } catch (error) {
    console.error('❌ Failed to list filtered policies:', error.message);
    throw error;
  }
}

/**
 * Example 7: Duplicate a policy
 */
async function duplicatePolicy(policyId, newPolicyId) {
  console.log(`\n📋 Duplicating policy: ${policyId} -> ${newPolicyId}...`);

  try {
    const duplicated = await policyService.duplicate(policyId, newPolicyId);

    console.log('✅ Policy duplicated successfully:');
    console.log(`   Original: ${policyId}`);
    console.log(`   New: ${duplicated.policyId}`);
    console.log(`   Description: ${duplicated.description}`);

    return duplicated;
  } catch (error) {
    console.error('❌ Failed to duplicate policy:', error.message);
    throw error;
  }
}

/**
 * Example 8: Delete a policy
 */
async function deletePolicy(policyId) {
  console.log(`\n🗑️  Deleting policy: ${policyId}...`);

  try {
    await policyService.delete(policyId);
    console.log('✅ Policy deleted successfully');
  } catch (error) {
    console.error('❌ Failed to delete policy:', error.message);
    throw error;
  }
}

/**
 * Example 9: Search policies
 */
async function searchPolicies(query) {
  console.log(`\n🔎 Searching policies for: "${query}"...`);

  try {
    const results = await policyService.search(query);

    console.log(`✅ Found ${results.length} matching policies:`);
    results.forEach((policy, index) => {
      console.log(`   ${index + 1}. ${policy.policyId} - ${policy.description}`);
    });

    return results;
  } catch (error) {
    console.error('❌ Failed to search policies:', error.message);
    throw error;
  }
}

/**
 * Main function - Run all examples
 */
async function main() {
  console.log('🚀 ABAC Admin Core - Basic Policy Operations Example');
  console.log('================================================\n');

  try {
    // Create a policy
    const newPolicy = await createSimplePolicy();

    // List all policies
    await listPolicies();

    // Get the specific policy
    await getPolicy(newPolicy.id);

    // Update the policy
    await updatePolicy(newPolicy.id);

    // Deactivate the policy
    await togglePolicyStatus(newPolicy.id, false);

    // Reactivate the policy
    await togglePolicyStatus(newPolicy.id, true);

    // List with filters
    await listPoliciesWithFilters();

    // Search policies
    await searchPolicies('document');

    // Duplicate the policy
    const duplicated = await duplicatePolicy(newPolicy.id, 'allow-document-view-copy');

    // Clean up - delete the duplicated policy
    await deletePolicy(duplicated.id);

    console.log('\n✅ All examples completed successfully!');
    console.log('\n💡 Tip: Check out other example files for more advanced features.');

  } catch (error) {
    console.error('\n❌ Example execution failed:', error);
    process.exit(1);
  }
}

// Run the examples
main();

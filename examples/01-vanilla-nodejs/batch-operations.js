/**
 * Batch Operations Example
 *
 * This example demonstrates how to efficiently perform bulk operations
 * on policies and attributes using the @abac-admin/core package.
 */

import { ABACAdminClient, PolicyService, AttributeService } from '@abac-admin/core';

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
const attributeService = new AttributeService(client);

/**
 * Example 1: Bulk create policies
 */
async function bulkCreatePolicies() {
  console.log('\n📦 Example 1: Bulk Creating Policies');
  console.log('====================================\n');

  const policiesToCreate = [
    {
      policyId: 'batch-policy-1',
      version: '1.0.0',
      effect: 'PERMIT',
      description: 'Batch created policy - Allow read access',
      conditions: {
        type: 'equals',
        left: { category: 'action', key: 'type' },
        right: 'read'
      },
      isActive: true,
      category: 'batch-test',
      tags: ['batch', 'read'],
      createdBy: 'batch-script'
    },
    {
      policyId: 'batch-policy-2',
      version: '1.0.0',
      effect: 'PERMIT',
      description: 'Batch created policy - Allow write access',
      conditions: {
        type: 'equals',
        left: { category: 'action', key: 'type' },
        right: 'write'
      },
      isActive: true,
      category: 'batch-test',
      tags: ['batch', 'write'],
      createdBy: 'batch-script'
    },
    {
      policyId: 'batch-policy-3',
      version: '1.0.0',
      effect: 'DENY',
      description: 'Batch created policy - Deny delete access',
      conditions: {
        type: 'equals',
        left: { category: 'action', key: 'type' },
        right: 'delete'
      },
      isActive: true,
      category: 'batch-test',
      tags: ['batch', 'delete', 'deny'],
      createdBy: 'batch-script'
    },
    {
      policyId: 'batch-policy-4',
      version: '1.0.0',
      effect: 'PERMIT',
      description: 'Batch created policy - Admin access',
      conditions: {
        type: 'equals',
        left: { category: 'subject', key: 'role' },
        right: 'admin'
      },
      isActive: true,
      category: 'batch-test',
      tags: ['batch', 'admin'],
      createdBy: 'batch-script'
    },
    {
      policyId: 'batch-policy-5',
      version: '1.0.0',
      effect: 'PERMIT',
      description: 'Batch created policy - Manager access',
      conditions: {
        type: 'in',
        left: { category: 'subject', key: 'role' },
        right: ['manager', 'supervisor']
      },
      isActive: true,
      category: 'batch-test',
      tags: ['batch', 'manager'],
      createdBy: 'batch-script'
    }
  ];

  console.log(`Creating ${policiesToCreate.length} policies...`);

  const results = {
    successful: [],
    failed: []
  };

  try {
    // Create policies sequentially with error handling for each
    for (const policyData of policiesToCreate) {
      try {
        const policy = await policyService.create(policyData);
        results.successful.push(policy);
        console.log(`✅ Created: ${policyData.policyId}`);
      } catch (error) {
        results.failed.push({ policyId: policyData.policyId, error: error.message });
        console.log(`❌ Failed: ${policyData.policyId} - ${error.message}`);
      }
    }

    console.log(`\n📊 Results:`);
    console.log(`   Success: ${results.successful.length}`);
    console.log(`   Failed: ${results.failed.length}`);

    return results;
  } catch (error) {
    console.error('❌ Bulk create failed:', error.message);
    throw error;
  }
}

/**
 * Example 2: Bulk activate policies
 */
async function bulkActivatePolicies(policyIds) {
  console.log('\n🔄 Example 2: Bulk Activating Policies');
  console.log('======================================\n');

  try {
    console.log(`Activating ${policyIds.length} policies...`);

    const result = await policyService.bulkActivate(policyIds);

    console.log(`✅ Bulk activation completed:`);
    console.log(`   Success: ${result.success}`);
    console.log(`   Failed: ${result.failed}`);

    return result;
  } catch (error) {
    console.error('❌ Bulk activation failed:', error.message);
    throw error;
  }
}

/**
 * Example 3: Bulk deactivate policies
 */
async function bulkDeactivatePolicies(policyIds) {
  console.log('\n⏸️  Example 3: Bulk Deactivating Policies');
  console.log('========================================\n');

  try {
    console.log(`Deactivating ${policyIds.length} policies...`);

    const result = await policyService.bulkDeactivate(policyIds);

    console.log(`✅ Bulk deactivation completed:`);
    console.log(`   Success: ${result.success}`);
    console.log(`   Failed: ${result.failed}`);

    return result;
  } catch (error) {
    console.error('❌ Bulk deactivation failed:', error.message);
    throw error;
  }
}

/**
 * Example 4: Bulk delete policies
 */
async function bulkDeletePolicies(policyIds) {
  console.log('\n🗑️  Example 4: Bulk Deleting Policies');
  console.log('====================================\n');

  try {
    console.log(`Deleting ${policyIds.length} policies...`);

    const result = await policyService.bulkDelete(policyIds);

    console.log(`✅ Bulk deletion completed:`);
    console.log(`   Success: ${result.success}`);
    console.log(`   Failed: ${result.failed}`);

    return result;
  } catch (error) {
    console.error('❌ Bulk deletion failed:', error.message);
    throw error;
  }
}

/**
 * Example 5: Bulk set attributes for multiple users
 */
async function bulkSetUserAttributes() {
  console.log('\n👥 Example 5: Bulk Setting User Attributes');
  console.log('==========================================\n');

  const users = [
    {
      id: 'user-batch-1',
      attributes: {
        name: 'John Doe',
        role: 'developer',
        department: 'engineering',
        level: 3,
        email: 'john@company.com',
        status: 'active'
      }
    },
    {
      id: 'user-batch-2',
      attributes: {
        name: 'Jane Smith',
        role: 'manager',
        department: 'engineering',
        level: 6,
        email: 'jane@company.com',
        status: 'active'
      }
    },
    {
      id: 'user-batch-3',
      attributes: {
        name: 'Bob Wilson',
        role: 'designer',
        department: 'design',
        level: 4,
        email: 'bob@company.com',
        status: 'active'
      }
    },
    {
      id: 'user-batch-4',
      attributes: {
        name: 'Alice Johnson',
        role: 'developer',
        department: 'engineering',
        level: 5,
        email: 'alice@company.com',
        status: 'active'
      }
    },
    {
      id: 'user-batch-5',
      attributes: {
        name: 'Charlie Brown',
        role: 'admin',
        department: 'engineering',
        level: 10,
        email: 'charlie@company.com',
        status: 'active'
      }
    }
  ];

  const results = {
    successful: [],
    failed: []
  };

  try {
    console.log(`Setting attributes for ${users.length} users...`);

    for (const user of users) {
      try {
        await attributeService.bulkSetAttributes('user', user.id, user.attributes);
        results.successful.push(user.id);
        console.log(`✅ Set attributes for: ${user.id} (${user.attributes.name})`);
      } catch (error) {
        results.failed.push({ userId: user.id, error: error.message });
        console.log(`❌ Failed for: ${user.id} - ${error.message}`);
      }
    }

    console.log(`\n📊 Results:`);
    console.log(`   Success: ${results.successful.length}`);
    console.log(`   Failed: ${results.failed.length}`);

    return results;
  } catch (error) {
    console.error('❌ Bulk attribute setting failed:', error.message);
    throw error;
  }
}

/**
 * Example 6: Bulk delete attributes
 */
async function bulkDeleteAttributes() {
  console.log('\n🗑️  Example 6: Bulk Deleting Attributes');
  console.log('======================================\n');

  try {
    const userId = 'user-batch-1';
    const attributesToDelete = ['temporaryAccess', 'onboardingStatus', 'trainingRequired'];

    console.log(`Deleting ${attributesToDelete.length} attributes from ${userId}...`);

    const result = await attributeService.bulkDeleteAttributes(
      'user',
      userId,
      attributesToDelete
    );

    console.log(`✅ Bulk attribute deletion completed:`);
    console.log(`   Success: ${result.successCount || 0}`);
    console.log(`   Failed: ${result.failedCount || 0}`);

    return result;
  } catch (error) {
    console.error('❌ Bulk attribute deletion failed:', error.message);
    throw error;
  }
}

/**
 * Example 7: Copy attributes across multiple users
 */
async function copyAttributesAcrossUsers() {
  console.log('\n📋 Example 7: Copying Attributes Across Users');
  console.log('=============================================\n');

  try {
    const sourceUserId = 'user-batch-2'; // Jane (Manager)
    const targetUserIds = ['user-batch-1', 'user-batch-4']; // John and Alice
    const attributesToCopy = ['department', 'status'];

    console.log(`Copying attributes from ${sourceUserId} to ${targetUserIds.length} users...`);

    const results = {
      successful: [],
      failed: []
    };

    for (const targetUserId of targetUserIds) {
      try {
        const result = await attributeService.copyAttributes(
          'user',
          sourceUserId,
          'user',
          targetUserId,
          attributesToCopy
        );

        results.successful.push(targetUserId);
        console.log(`✅ Copied to ${targetUserId}: ${result.successCount || attributesToCopy.length} attributes`);
      } catch (error) {
        results.failed.push({ userId: targetUserId, error: error.message });
        console.log(`❌ Failed for ${targetUserId}: ${error.message}`);
      }
    }

    console.log(`\n📊 Results:`);
    console.log(`   Success: ${results.successful.length}`);
    console.log(`   Failed: ${results.failed.length}`);

    return results;
  } catch (error) {
    console.error('❌ Attribute copying failed:', error.message);
    throw error;
  }
}

/**
 * Example 8: Batch update policy tags
 */
async function batchUpdatePolicyTags() {
  console.log('\n🏷️  Example 8: Batch Updating Policy Tags');
  console.log('=========================================\n');

  try {
    // Get all policies with 'batch' tag
    const policies = await policyService.list({ tags: ['batch'] });

    console.log(`Found ${policies.length} policies with 'batch' tag`);
    console.log('Adding "production-ready" tag to all...');

    const results = {
      successful: [],
      failed: []
    };

    for (const policy of policies) {
      try {
        const updatedTags = [...new Set([...policy.tags, 'production-ready'])];
        await policyService.update(policy.id, { tags: updatedTags });
        results.successful.push(policy.id);
        console.log(`✅ Updated tags for: ${policy.policyId}`);
      } catch (error) {
        results.failed.push({ policyId: policy.policyId, error: error.message });
        console.log(`❌ Failed for: ${policy.policyId} - ${error.message}`);
      }
    }

    console.log(`\n📊 Results:`);
    console.log(`   Success: ${results.successful.length}`);
    console.log(`   Failed: ${results.failed.length}`);

    return results;
  } catch (error) {
    console.error('❌ Batch tag update failed:', error.message);
    throw error;
  }
}

/**
 * Example 9: Batch policy export and import
 */
async function batchExportImport() {
  console.log('\n💾 Example 9: Batch Export and Import');
  console.log('=====================================\n');

  try {
    // Export policies
    console.log('Exporting policies with "batch" tag...');
    const policies = await policyService.list({ tags: ['batch'] });
    const policyIds = policies.map(p => p.id);

    const exportResult = await policyService.export(policyIds);

    console.log(`✅ Exported ${exportResult.count || policyIds.length} policies`);
    console.log(`   Export size: ${JSON.stringify(exportResult).length} bytes`);

    // In a real scenario, you would save this to a file and import it elsewhere
    console.log('\n💡 In production, you would:');
    console.log('   1. Save export to file: fs.writeFileSync("policies.json", JSON.stringify(exportResult))');
    console.log('   2. Import in another environment: policyService.import(file)');

    return exportResult;
  } catch (error) {
    console.error('❌ Export/Import failed:', error.message);
    throw error;
  }
}

/**
 * Example 10: Search and bulk update
 */
async function searchAndBulkUpdate() {
  console.log('\n🔍 Example 10: Search and Bulk Update');
  console.log('=====================================\n');

  try {
    // Search for all policies in 'batch-test' category
    const searchResults = await policyService.search('batch-test', {
      category: 'batch-test'
    });

    console.log(`Found ${searchResults.length} policies in 'batch-test' category`);
    console.log('Updating descriptions to include timestamp...');

    const timestamp = new Date().toISOString();
    const results = {
      successful: [],
      failed: []
    };

    for (const policy of searchResults) {
      try {
        await policyService.update(policy.id, {
          description: `${policy.description} [Updated: ${timestamp}]`
        });
        results.successful.push(policy.id);
        console.log(`✅ Updated: ${policy.policyId}`);
      } catch (error) {
        results.failed.push({ policyId: policy.policyId, error: error.message });
        console.log(`❌ Failed: ${policy.policyId} - ${error.message}`);
      }
    }

    console.log(`\n📊 Results:`);
    console.log(`   Success: ${results.successful.length}`);
    console.log(`   Failed: ${results.failed.length}`);

    return results;
  } catch (error) {
    console.error('❌ Search and bulk update failed:', error.message);
    throw error;
  }
}

/**
 * Main function - Run all batch operation examples
 */
async function main() {
  console.log('🚀 ABAC Admin Core - Batch Operations Examples');
  console.log('==============================================\n');

  try {
    // Create policies in bulk
    const createResults = await bulkCreatePolicies();
    const policyIds = createResults.successful.map(p => p.id);

    // Wait a bit to ensure policies are ready
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Bulk deactivate
    await bulkDeactivatePolicies(policyIds.slice(0, 3));

    // Bulk activate
    await bulkActivatePolicies(policyIds.slice(0, 3));

    // Set user attributes in bulk
    await bulkSetUserAttributes();

    // Delete attributes in bulk
    await bulkDeleteAttributes();

    // Copy attributes across users
    await copyAttributesAcrossUsers();

    // Update policy tags in batch
    await batchUpdatePolicyTags();

    // Export policies
    await batchExportImport();

    // Search and bulk update
    await searchAndBulkUpdate();

    // Cleanup - delete all test policies
    console.log('\n🧹 Cleaning up test policies...');
    await bulkDeletePolicies(policyIds);

    console.log('\n✅ All batch operations completed successfully!');
    console.log('\n💡 Key Takeaways:');
    console.log('   • Use bulk operations for efficiency when working with multiple resources');
    console.log('   • Always handle errors for each item in batch operations');
    console.log('   • Track success/failure counts for monitoring');
    console.log('   • Consider rate limiting for very large batches');
    console.log('   • Use transactions where supported for atomic operations');
    console.log('   • Log detailed results for audit and debugging');

  } catch (error) {
    console.error('\n❌ Batch operations failed:', error);
    console.error('\nStack trace:', error.stack);
    process.exit(1);
  }
}

// Run the batch operations
main();

/**
 * Attribute Management Example
 *
 * This example demonstrates comprehensive attribute management operations
 * including setting, getting, bulk operations, history tracking, and validation.
 */

import { ABACAdminClient, AttributeService } from '@abac-admin/core';

// Initialize the client
const client = new ABACAdminClient({
  baseURL: process.env.ABAC_API_URL || 'http://localhost:3000/api/abac',
  headers: {
    'Authorization': `Bearer ${process.env.ABAC_API_TOKEN || 'demo-token'}`,
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

const attributeService = new AttributeService(client);

/**
 * Example 1: Set individual attributes
 */
async function setIndividualAttributes() {
  console.log('\n📝 Example 1: Setting Individual Attributes');
  console.log('==========================================\n');

  try {
    // Set user role
    const roleAttr = await attributeService.setResourceAttribute(
      'user',
      'user-john',
      'role',
      'developer'
    );
    console.log('✅ Set role:', roleAttr);

    // Set user department
    const deptAttr = await attributeService.setResourceAttribute(
      'user',
      'user-john',
      'department',
      'engineering'
    );
    console.log('✅ Set department:', deptAttr);

    // Set user level
    const levelAttr = await attributeService.setResourceAttribute(
      'user',
      'user-john',
      'level',
      5
    );
    console.log('✅ Set level:', levelAttr);

    // Set user email
    const emailAttr = await attributeService.setResourceAttribute(
      'user',
      'user-john',
      'email',
      'john@company.com'
    );
    console.log('✅ Set email:', emailAttr);

    console.log('\n✓ Successfully set 4 individual attributes for user-john');
  } catch (error) {
    console.error('❌ Failed to set individual attributes:', error.message);
    throw error;
  }
}

/**
 * Example 2: Bulk set attributes
 */
async function bulkSetAttributes() {
  console.log('\n📦 Example 2: Bulk Setting Attributes');
  console.log('=====================================\n');

  try {
    // Set multiple attributes at once for a user
    const userAttributes = await attributeService.bulkSetAttributes(
      'user',
      'user-sarah',
      {
        role: 'manager',
        department: 'engineering',
        level: 8,
        email: 'sarah@company.com',
        status: 'active',
        joinDate: '2024-01-15',
        permissions: ['read', 'write', 'approve'],
        manager: 'user-ceo'
      }
    );

    console.log(`✅ Set ${userAttributes.length} attributes for user-sarah:`);
    userAttributes.forEach(attr => {
      console.log(`   • ${attr.key}: ${JSON.stringify(attr.value)}`);
    });

    // Set attributes for a document
    const docAttributes = await attributeService.bulkSetAttributes(
      'document',
      'doc-project-plan',
      {
        title: 'Q1 2024 Project Plan',
        ownerId: 'user-sarah',
        department: 'engineering',
        classification: 'confidential',
        version: '2.0',
        lastModified: new Date().toISOString(),
        tags: ['planning', 'q1', 'roadmap'],
        approvers: ['user-ceo', 'user-cto']
      }
    );

    console.log(`\n✅ Set ${docAttributes.length} attributes for doc-project-plan`);
    console.log('   Document is now fully configured');

  } catch (error) {
    console.error('❌ Failed to bulk set attributes:', error.message);
    throw error;
  }
}

/**
 * Example 3: Get resource attributes
 */
async function getResourceAttributes() {
  console.log('\n🔍 Example 3: Getting Resource Attributes');
  console.log('=========================================\n');

  try {
    // Get all attributes for a user
    const userAttrs = await attributeService.getResourceAttributes('user', 'user-sarah');
    console.log('✅ All attributes for user-sarah:');
    for (const [key, value] of Object.entries(userAttrs)) {
      console.log(`   ${key}: ${JSON.stringify(value)}`);
    }

    // Get a specific attribute
    const role = await attributeService.getResourceAttribute('user', 'user-sarah', 'role');
    console.log(`\n✅ Specific attribute - role: ${role}`);

    const permissions = await attributeService.getResourceAttribute('user', 'user-sarah', 'permissions');
    console.log(`✅ Specific attribute - permissions: ${JSON.stringify(permissions)}`);

  } catch (error) {
    console.error('❌ Failed to get attributes:', error.message);
    throw error;
  }
}

/**
 * Example 4: Update attributes
 */
async function updateAttributes() {
  console.log('\n✏️  Example 4: Updating Attributes');
  console.log('==================================\n');

  try {
    // Promote user
    const updatedLevel = await attributeService.setResourceAttribute(
      'user',
      'user-john',
      'level',
      6
    );
    console.log(`✅ Updated level: ${updatedLevel.value} (was 5)`);

    // Change role
    const updatedRole = await attributeService.setResourceAttribute(
      'user',
      'user-john',
      'role',
      'senior-developer'
    );
    console.log(`✅ Updated role: ${updatedRole.value} (was developer)`);

    // Add new permissions
    await attributeService.setResourceAttribute(
      'user',
      'user-john',
      'permissions',
      ['read', 'write', 'code-review']
    );
    console.log('✅ Updated permissions with new array');

    console.log('\n✓ User john has been promoted!');

  } catch (error) {
    console.error('❌ Failed to update attributes:', error.message);
    throw error;
  }
}

/**
 * Example 5: Delete attributes
 */
async function deleteAttributes() {
  console.log('\n🗑️  Example 5: Deleting Attributes');
  console.log('==================================\n');

  try {
    // Delete a single attribute
    await attributeService.deleteResourceAttribute('user', 'user-john', 'joinDate');
    console.log('✅ Deleted attribute: joinDate');

    // Bulk delete attributes
    const deleteResult = await attributeService.bulkDeleteAttributes(
      'user',
      'user-john',
      ['temporaryAccess', 'onboarding', 'trainingRequired']
    );
    console.log(`\n✅ Bulk delete completed:`);
    console.log(`   Success: ${deleteResult.successCount || 0}`);
    console.log(`   Failed: ${deleteResult.failedCount || 0}`);

  } catch (error) {
    console.error('❌ Failed to delete attributes:', error.message);
    throw error;
  }
}

/**
 * Example 6: Attribute history
 */
async function attributeHistory() {
  console.log('\n📜 Example 6: Attribute History');
  console.log('===============================\n');

  try {
    // Get history for a specific attribute
    const roleHistory = await attributeService.getHistory(
      'user',
      'user-john',
      'role',
      { limit: 10 }
    );

    console.log(`✅ Role history for user-john (${roleHistory.length} changes):`);
    roleHistory.forEach((entry, index) => {
      const date = new Date(entry.timestamp).toLocaleString();
      console.log(`   ${index + 1}. ${date}: ${entry.oldValue || 'null'} → ${entry.value}`);
      console.log(`      Changed by: ${entry.changedBy || 'system'}`);
    });

    // Get all attribute changes for a resource
    const allHistory = await attributeService.getHistory(
      'user',
      'user-john',
      undefined,
      { limit: 20 }
    );

    console.log(`\n✅ All attribute changes for user-john: ${allHistory.length} total changes`);
    const recentChanges = allHistory.slice(0, 5);
    recentChanges.forEach((entry, index) => {
      const date = new Date(entry.timestamp).toLocaleString();
      console.log(`   ${index + 1}. ${entry.key}: ${entry.oldValue} → ${entry.value} (${date})`);
    });

  } catch (error) {
    console.error('❌ Failed to get attribute history:', error.message);
    throw error;
  }
}

/**
 * Example 7: Compare attributes between resources
 */
async function compareAttributes() {
  console.log('\n🔍 Example 7: Comparing Attributes');
  console.log('==================================\n');

  try {
    const comparison = await attributeService.compareAttributes(
      'user',
      'user-john',
      'user-sarah'
    );

    console.log('✅ Comparison: user-john vs user-sarah\n');

    if (comparison.shared && Object.keys(comparison.shared).length > 0) {
      console.log('   Shared attributes (same value):');
      for (const [key, value] of Object.entries(comparison.shared)) {
        console.log(`      • ${key}: ${JSON.stringify(value)}`);
      }
    }

    if (comparison.different && Object.keys(comparison.different).length > 0) {
      console.log('\n   Different values:');
      for (const [key, values] of Object.entries(comparison.different)) {
        console.log(`      • ${key}:`);
        console.log(`         John: ${JSON.stringify(values.first)}`);
        console.log(`         Sarah: ${JSON.stringify(values.second)}`);
      }
    }

    if (comparison.onlyInFirst && Object.keys(comparison.onlyInFirst).length > 0) {
      console.log('\n   Only in user-john:');
      for (const [key, value] of Object.entries(comparison.onlyInFirst)) {
        console.log(`      • ${key}: ${JSON.stringify(value)}`);
      }
    }

    if (comparison.onlyInSecond && Object.keys(comparison.onlyInSecond).length > 0) {
      console.log('\n   Only in user-sarah:');
      for (const [key, value] of Object.entries(comparison.onlyInSecond)) {
        console.log(`      • ${key}: ${JSON.stringify(value)}`);
      }
    }

  } catch (error) {
    console.error('❌ Failed to compare attributes:', error.message);
    throw error;
  }
}

/**
 * Example 8: Copy attributes between resources
 */
async function copyAttributes() {
  console.log('\n📋 Example 8: Copying Attributes');
  console.log('================================\n');

  try {
    // Copy specific attributes from one user to another
    const copyResult = await attributeService.copyAttributes(
      'user',
      'user-sarah',
      'user',
      'user-mike',
      ['department', 'manager', 'permissions']
    );

    console.log(`✅ Copied attributes from user-sarah to user-mike:`);
    console.log(`   Success: ${copyResult.successCount || 0} attributes`);
    console.log(`   Failed: ${copyResult.failedCount || 0} attributes`);

    if (copyResult.details) {
      console.log('\n   Details:');
      copyResult.details.forEach(detail => {
        const status = detail.success ? '✓' : '✗';
        console.log(`      ${status} ${detail.key}`);
      });
    }

  } catch (error) {
    console.error('❌ Failed to copy attributes:', error.message);
    throw error;
  }
}

/**
 * Example 9: Validate attributes
 */
async function validateAttributes() {
  console.log('\n✓ Example 9: Validating Attributes');
  console.log('==================================\n');

  try {
    // Validate an email attribute
    const emailValidation = await attributeService.validateAttribute(
      'user',
      'user-john',
      'email',
      'john@company.com',
      'email'
    );

    console.log(`✅ Email validation: ${emailValidation.valid ? 'VALID' : 'INVALID'}`);
    if (!emailValidation.valid && emailValidation.errors) {
      console.log('   Errors:', emailValidation.errors);
    }

    // Validate a numeric attribute
    const levelValidation = await attributeService.validateAttribute(
      'user',
      'user-john',
      'level',
      6,
      'number'
    );

    console.log(`✅ Level validation: ${levelValidation.valid ? 'VALID' : 'INVALID'}`);

    // Try to validate an invalid value
    const invalidValidation = await attributeService.validateAttribute(
      'user',
      'user-john',
      'email',
      'not-an-email',
      'email'
    );

    console.log(`✅ Invalid email validation: ${invalidValidation.valid ? 'VALID' : 'INVALID'}`);
    if (!invalidValidation.valid && invalidValidation.errors) {
      console.log('   Errors:', invalidValidation.errors.join(', '));
    }

  } catch (error) {
    console.error('❌ Failed to validate attributes:', error.message);
    throw error;
  }
}

/**
 * Example 10: Search resources by attribute
 */
async function searchByAttribute() {
  console.log('\n🔎 Example 10: Searching Resources by Attribute');
  console.log('===============================================\n');

  try {
    // Find all users in engineering department
    const engineeringUsers = await attributeService.searchResources(
      'user',
      'department',
      'engineering'
    );

    console.log(`✅ Found ${engineeringUsers.length} users in engineering:`);
    engineeringUsers.forEach(userId => {
      console.log(`   • ${userId}`);
    });

    // Find all managers
    const managers = await attributeService.searchResources(
      'user',
      'role',
      'manager'
    );

    console.log(`\n✅ Found ${managers.length} managers:`);
    managers.forEach(userId => {
      console.log(`   • ${userId}`);
    });

    // Find all active users
    const activeUsers = await attributeService.searchResources(
      'user',
      'status',
      'active'
    );

    console.log(`\n✅ Found ${activeUsers.length} active users`);

  } catch (error) {
    console.error('❌ Failed to search by attribute:', error.message);
    throw error;
  }
}

/**
 * Example 11: Working with complex attribute types
 */
async function complexAttributeTypes() {
  console.log('\n🔧 Example 11: Complex Attribute Types');
  console.log('======================================\n');

  try {
    // Array attributes
    await attributeService.setResourceAttribute(
      'user',
      'user-jane',
      'teams',
      ['backend', 'devops', 'security']
    );
    console.log('✅ Set array attribute: teams');

    // Object attributes
    await attributeService.setResourceAttribute(
      'user',
      'user-jane',
      'contactInfo',
      {
        email: 'jane@company.com',
        phone: '+1-555-0123',
        slack: '@jane'
      }
    );
    console.log('✅ Set object attribute: contactInfo');

    // Nested object attributes
    await attributeService.setResourceAttribute(
      'user',
      'user-jane',
      'preferences',
      {
        notifications: {
          email: true,
          slack: true,
          sms: false
        },
        theme: 'dark',
        language: 'en-US'
      }
    );
    console.log('✅ Set nested object attribute: preferences');

    // Boolean attributes
    await attributeService.setResourceAttribute(
      'user',
      'user-jane',
      'isVerified',
      true
    );
    console.log('✅ Set boolean attribute: isVerified');

    // Date attributes
    await attributeService.setResourceAttribute(
      'user',
      'user-jane',
      'lastLoginAt',
      new Date().toISOString()
    );
    console.log('✅ Set date attribute: lastLoginAt');

    // Retrieve all complex attributes
    const janeAttrs = await attributeService.getResourceAttributes('user', 'user-jane');
    console.log('\n✅ All attributes for user-jane:');
    console.log(JSON.stringify(janeAttrs, null, 2));

  } catch (error) {
    console.error('❌ Failed to work with complex attributes:', error.message);
    throw error;
  }
}

/**
 * Main function - Run all examples
 */
async function main() {
  console.log('🚀 ABAC Admin Core - Attribute Management Examples');
  console.log('==================================================\n');

  try {
    await setIndividualAttributes();
    await bulkSetAttributes();
    await getResourceAttributes();
    await updateAttributes();
    await deleteAttributes();
    await attributeHistory();
    await compareAttributes();
    await copyAttributes();
    await validateAttributes();
    await searchByAttribute();
    await complexAttributeTypes();

    console.log('\n✅ All examples completed successfully!');
    console.log('\n💡 Key Takeaways:');
    console.log('   • Use bulkSetAttributes() for efficiency when setting multiple attributes');
    console.log('   • Track attribute changes with getHistory()');
    console.log('   • Compare and copy attributes across resources');
    console.log('   • Validate attributes before setting them');
    console.log('   • Search for resources by specific attribute values');
    console.log('   • Support complex types: arrays, objects, dates, booleans');

  } catch (error) {
    console.error('\n❌ Example execution failed:', error);
    process.exit(1);
  }
}

// Run the examples
main();

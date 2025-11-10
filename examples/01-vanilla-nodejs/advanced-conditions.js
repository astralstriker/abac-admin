/**
 * Advanced Condition Building Example
 *
 * This example demonstrates how to build complex policy conditions
 * using the ConditionBuilder utility from @abac-admin/core.
 */

import { ABACAdminClient, PolicyService, ConditionBuilder } from '@abac-admin/core';

// Initialize the client
const client = new ABACAdminClient({
  baseURL: process.env.ABAC_API_URL || 'http://localhost:3000/api/abac',
  headers: {
    'Authorization': `Bearer ${process.env.ABAC_API_TOKEN || 'demo-token'}`,
    'Content-Type': 'application/json'
  }
});

const policyService = new PolicyService(client);

/**
 * Example 1: Simple comparison conditions
 */
async function simpleComparisons() {
  console.log('\n📝 Example 1: Simple Comparison Conditions');
  console.log('==========================================\n');

  // Equals condition
  const equalsCondition = ConditionBuilder.equals(
    ConditionBuilder.attr('subject', 'role'),
    'admin'
  );
  console.log('✅ Equals Condition (role == admin):');
  console.log(JSON.stringify(equalsCondition, null, 2));

  // Not equals condition
  const notEqualsCondition = ConditionBuilder.notEquals(
    ConditionBuilder.attr('subject', 'status'),
    'suspended'
  );
  console.log('\n✅ Not Equals Condition (status != suspended):');
  console.log(JSON.stringify(notEqualsCondition, null, 2));

  // Greater than or equal condition
  const gteCondition = ConditionBuilder.gte(
    ConditionBuilder.attr('subject', 'level'),
    5
  );
  console.log('\n✅ Greater Than or Equal Condition (level >= 5):');
  console.log(JSON.stringify(gteCondition, null, 2));

  // Less than condition
  const ltCondition = ConditionBuilder.lt(
    ConditionBuilder.attr('resource', 'size'),
    1000000
  );
  console.log('\n✅ Less Than Condition (size < 1000000):');
  console.log(JSON.stringify(ltCondition, null, 2));
}

/**
 * Example 2: Array and string conditions
 */
async function arrayAndStringConditions() {
  console.log('\n📝 Example 2: Array and String Conditions');
  console.log('=========================================\n');

  // In array condition
  const inCondition = ConditionBuilder.in(
    ConditionBuilder.attr('subject', 'role'),
    ['admin', 'manager', 'supervisor']
  );
  console.log('✅ In Array Condition (role in [admin, manager, supervisor]):');
  console.log(JSON.stringify(inCondition, null, 2));

  // Not in array condition
  const notInCondition = ConditionBuilder.notIn(
    ConditionBuilder.attr('subject', 'department'),
    ['restricted', 'classified']
  );
  console.log('\n✅ Not In Array Condition (department not in [restricted, classified]):');
  console.log(JSON.stringify(notInCondition, null, 2));

  // Contains condition
  const containsCondition = ConditionBuilder.contains(
    ConditionBuilder.attr('resource', 'tags'),
    'public'
  );
  console.log('\n✅ Contains Condition (tags contains "public"):');
  console.log(JSON.stringify(containsCondition, null, 2));

  // Starts with condition
  const startsWithCondition = ConditionBuilder.startsWith(
    ConditionBuilder.attr('resource', 'path'),
    '/public/'
  );
  console.log('\n✅ Starts With Condition (path starts with "/public/"):');
  console.log(JSON.stringify(startsWithCondition, null, 2));

  // Ends with condition
  const endsWithCondition = ConditionBuilder.endsWith(
    ConditionBuilder.attr('resource', 'filename'),
    '.pdf'
  );
  console.log('\n✅ Ends With Condition (filename ends with ".pdf"):');
  console.log(JSON.stringify(endsWithCondition, null, 2));

  // Matches (regex) condition
  const matchesCondition = ConditionBuilder.matches(
    ConditionBuilder.attr('resource', 'email'),
    '^[a-zA-Z0-9._%+-]+@company\\.com$'
  );
  console.log('\n✅ Matches Condition (email matches company domain):');
  console.log(JSON.stringify(matchesCondition, null, 2));
}

/**
 * Example 3: Logical operators (AND, OR, NOT)
 */
async function logicalOperators() {
  console.log('\n📝 Example 3: Logical Operators');
  console.log('================================\n');

  // AND condition - User must be admin AND from engineering department
  const andCondition = ConditionBuilder.and(
    ConditionBuilder.equals(
      ConditionBuilder.attr('subject', 'role'),
      'admin'
    ),
    ConditionBuilder.equals(
      ConditionBuilder.attr('subject', 'department'),
      'engineering'
    )
  );
  console.log('✅ AND Condition (role == admin AND department == engineering):');
  console.log(JSON.stringify(andCondition, null, 2));

  // OR condition - User can be admin OR manager
  const orCondition = ConditionBuilder.or(
    ConditionBuilder.equals(
      ConditionBuilder.attr('subject', 'role'),
      'admin'
    ),
    ConditionBuilder.equals(
      ConditionBuilder.attr('subject', 'role'),
      'manager'
    )
  );
  console.log('\n✅ OR Condition (role == admin OR role == manager):');
  console.log(JSON.stringify(orCondition, null, 2));

  // NOT condition - User is NOT suspended
  const notCondition = ConditionBuilder.not(
    ConditionBuilder.equals(
      ConditionBuilder.attr('subject', 'status'),
      'suspended'
    )
  );
  console.log('\n✅ NOT Condition (NOT status == suspended):');
  console.log(JSON.stringify(notCondition, null, 2));
}

/**
 * Example 4: Complex nested conditions
 */
async function complexNestedConditions() {
  console.log('\n📝 Example 4: Complex Nested Conditions');
  console.log('=======================================\n');

  // Complex condition: (Admin OR Manager) AND (Level >= 3) AND NOT suspended
  const complexCondition = ConditionBuilder.and(
    ConditionBuilder.or(
      ConditionBuilder.equals(
        ConditionBuilder.attr('subject', 'role'),
        'admin'
      ),
      ConditionBuilder.equals(
        ConditionBuilder.attr('subject', 'role'),
        'manager'
      )
    ),
    ConditionBuilder.gte(
      ConditionBuilder.attr('subject', 'level'),
      3
    ),
    ConditionBuilder.not(
      ConditionBuilder.equals(
        ConditionBuilder.attr('subject', 'status'),
        'suspended'
      )
    )
  );

  console.log('✅ Complex Condition:');
  console.log('   (role == admin OR role == manager)');
  console.log('   AND level >= 3');
  console.log('   AND NOT status == suspended');
  console.log('\n' + JSON.stringify(complexCondition, null, 2));
}

/**
 * Example 5: Real-world policy - Document access control
 */
async function documentAccessPolicy() {
  console.log('\n📝 Example 5: Real-World Policy - Document Access Control');
  console.log('=========================================================\n');

  const condition = ConditionBuilder.and(
    // User must be authenticated
    ConditionBuilder.notEquals(
      ConditionBuilder.attr('subject', 'userId'),
      null
    ),
    // AND either:
    ConditionBuilder.or(
      // Owner of the document
      ConditionBuilder.equals(
        ConditionBuilder.attr('subject', 'userId'),
        ConditionBuilder.attr('resource', 'ownerId')
      ),
      // OR has appropriate role and department
      ConditionBuilder.and(
        ConditionBuilder.in(
          ConditionBuilder.attr('subject', 'role'),
          ['admin', 'manager', 'editor']
        ),
        ConditionBuilder.equals(
          ConditionBuilder.attr('subject', 'department'),
          ConditionBuilder.attr('resource', 'department')
        )
      ),
      // OR document is public
      ConditionBuilder.equals(
        ConditionBuilder.attr('resource', 'visibility'),
        'public'
      )
    ),
    // AND action is read or update
    ConditionBuilder.in(
      ConditionBuilder.attr('action', 'type'),
      ['read', 'update']
    )
  );

  console.log('✅ Document Access Policy Condition:');
  console.log('   User is authenticated');
  console.log('   AND (User is owner OR User has role+dept OR Document is public)');
  console.log('   AND Action is read or update');
  console.log('\n' + JSON.stringify(condition, null, 2));

  try {
    const policy = await policyService.create({
      policyId: 'document-access-control',
      version: '1.0.0',
      effect: 'PERMIT',
      description: 'Advanced document access control with multiple conditions',
      conditions: condition,
      isActive: true,
      category: 'document',
      tags: ['document', 'access-control', 'advanced'],
      createdBy: 'system'
    });

    console.log('\n✅ Policy created successfully:');
    console.log(`   Policy ID: ${policy.policyId}`);
    console.log(`   ID: ${policy.id}`);
  } catch (error) {
    console.error('\n❌ Failed to create policy:', error.message);
  }
}

/**
 * Example 6: Time-based access control
 */
async function timeBasedAccessPolicy() {
  console.log('\n📝 Example 6: Time-Based Access Control');
  console.log('=======================================\n');

  const condition = ConditionBuilder.and(
    // Regular employee
    ConditionBuilder.equals(
      ConditionBuilder.attr('subject', 'role'),
      'employee'
    ),
    // During business hours (9 AM - 5 PM)
    ConditionBuilder.gte(
      ConditionBuilder.attr('environment', 'currentHour'),
      9
    ),
    ConditionBuilder.lte(
      ConditionBuilder.attr('environment', 'currentHour'),
      17
    ),
    // Weekdays only (Monday = 1, Friday = 5)
    ConditionBuilder.gte(
      ConditionBuilder.attr('environment', 'dayOfWeek'),
      1
    ),
    ConditionBuilder.lte(
      ConditionBuilder.attr('environment', 'dayOfWeek'),
      5
    )
  );

  console.log('✅ Time-Based Access Policy Condition:');
  console.log('   Role is employee');
  console.log('   AND Hour >= 9 AND Hour <= 17');
  console.log('   AND DayOfWeek >= 1 AND DayOfWeek <= 5');
  console.log('\n' + JSON.stringify(condition, null, 2));

  try {
    const policy = await policyService.create({
      policyId: 'business-hours-access',
      version: '1.0.0',
      effect: 'PERMIT',
      description: 'Allow employee access only during business hours',
      conditions: condition,
      isActive: true,
      category: 'time-based',
      tags: ['time-based', 'business-hours', 'employee'],
      createdBy: 'system'
    });

    console.log('\n✅ Policy created successfully:');
    console.log(`   Policy ID: ${policy.policyId}`);
    console.log(`   ID: ${policy.id}`);
  } catch (error) {
    console.error('\n❌ Failed to create policy:', error.message);
  }
}

/**
 * Example 7: Multi-tenant access policy
 */
async function multiTenantAccessPolicy() {
  console.log('\n📝 Example 7: Multi-Tenant Access Policy');
  console.log('========================================\n');

  const condition = ConditionBuilder.and(
    // Same tenant
    ConditionBuilder.equals(
      ConditionBuilder.attr('subject', 'tenantId'),
      ConditionBuilder.attr('resource', 'tenantId')
    ),
    // User is not suspended
    ConditionBuilder.notEquals(
      ConditionBuilder.attr('subject', 'status'),
      'suspended'
    ),
    // Either admin or has permission
    ConditionBuilder.or(
      ConditionBuilder.equals(
        ConditionBuilder.attr('subject', 'role'),
        'tenant-admin'
      ),
      ConditionBuilder.contains(
        ConditionBuilder.attr('subject', 'permissions'),
        ConditionBuilder.attr('action', 'required')
      )
    )
  );

  console.log('✅ Multi-Tenant Access Policy Condition:');
  console.log('   Subject tenant == Resource tenant');
  console.log('   AND Subject status != suspended');
  console.log('   AND (Subject is tenant-admin OR has required permission)');
  console.log('\n' + JSON.stringify(condition, null, 2));

  try {
    const policy = await policyService.create({
      policyId: 'multi-tenant-access',
      version: '1.0.0',
      effect: 'PERMIT',
      description: 'Multi-tenant access control with permission checking',
      conditions: condition,
      isActive: true,
      category: 'multi-tenant',
      tags: ['multi-tenant', 'isolation', 'permissions'],
      createdBy: 'system'
    });

    console.log('\n✅ Policy created successfully:');
    console.log(`   Policy ID: ${policy.policyId}`);
    console.log(`   ID: ${policy.id}`);
  } catch (error) {
    console.error('\n❌ Failed to create policy:', error.message);
  }
}

/**
 * Example 8: Hierarchical access (manager can access subordinate data)
 */
async function hierarchicalAccessPolicy() {
  console.log('\n📝 Example 8: Hierarchical Access Policy');
  console.log('========================================\n');

  const condition = ConditionBuilder.and(
    // User is a manager
    ConditionBuilder.equals(
      ConditionBuilder.attr('subject', 'role'),
      'manager'
    ),
    // Same department
    ConditionBuilder.equals(
      ConditionBuilder.attr('subject', 'department'),
      ConditionBuilder.attr('resource', 'department')
    ),
    // Resource owner's level is lower than manager's level
    ConditionBuilder.lt(
      ConditionBuilder.attr('resource', 'ownerLevel'),
      ConditionBuilder.attr('subject', 'level')
    ),
    // Read or approve actions only
    ConditionBuilder.in(
      ConditionBuilder.attr('action', 'type'),
      ['read', 'approve']
    )
  );

  console.log('✅ Hierarchical Access Policy Condition:');
  console.log('   Subject is manager');
  console.log('   AND Subject department == Resource department');
  console.log('   AND Resource ownerLevel < Subject level');
  console.log('   AND Action in [read, approve]');
  console.log('\n' + JSON.stringify(condition, null, 2));

  try {
    const policy = await policyService.create({
      policyId: 'manager-subordinate-access',
      version: '1.0.0',
      effect: 'PERMIT',
      description: 'Allow managers to access subordinate data in their department',
      conditions: condition,
      isActive: true,
      category: 'hierarchical',
      tags: ['hierarchical', 'manager', 'department'],
      createdBy: 'system'
    });

    console.log('\n✅ Policy created successfully:');
    console.log(`   Policy ID: ${policy.policyId}`);
    console.log(`   ID: ${policy.id}`);
  } catch (error) {
    console.error('\n❌ Failed to create policy:', error.message);
  }
}

/**
 * Main function - Run all examples
 */
async function main() {
  console.log('🚀 ABAC Admin Core - Advanced Condition Building Examples');
  console.log('=======================================================\n');

  try {
    await simpleComparisons();
    await arrayAndStringConditions();
    await logicalOperators();
    await complexNestedConditions();
    await documentAccessPolicy();
    await timeBasedAccessPolicy();
    await multiTenantAccessPolicy();
    await hierarchicalAccessPolicy();

    console.log('\n✅ All examples completed successfully!');
    console.log('\n💡 Key Takeaways:');
    console.log('   • Use ConditionBuilder for type-safe condition creation');
    console.log('   • Combine conditions with and(), or(), not()');
    console.log('   • Build complex policies incrementally');
    console.log('   • Test conditions thoroughly before deploying');

  } catch (error) {
    console.error('\n❌ Example execution failed:', error);
    process.exit(1);
  }
}

// Run the examples
main();

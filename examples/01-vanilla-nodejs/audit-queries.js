/**
 * Audit Queries Example
 *
 * This example demonstrates how to query and analyze audit logs
 * using the @abac-admin/core package for compliance and monitoring.
 */

import { ABACAdminClient, AuditService } from '@abac-admin/core';

// Initialize the client
const client = new ABACAdminClient({
  baseURL: process.env.ABAC_API_URL || 'http://localhost:3000/api/abac',
  headers: {
    'Authorization': `Bearer ${process.env.ABAC_API_TOKEN || 'demo-token'}`,
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

const auditService = new AuditService(client);

/**
 * Example 1: Get recent audit activity
 */
async function getRecentActivity() {
  console.log('\n📊 Example 1: Recent Audit Activity');
  console.log('===================================\n');

  try {
    const recentEntries = await auditService.getRecentActivity(20);

    console.log(`✅ Retrieved ${recentEntries.length} recent audit entries:\n`);

    recentEntries.slice(0, 10).forEach((entry, index) => {
      const date = new Date(entry.timestamp).toLocaleString();
      console.log(`${index + 1}. [${date}] ${entry.action} on ${entry.entityType}`);
      console.log(`   Entity ID: ${entry.entityId}`);
      console.log(`   User: ${entry.userId || 'system'}`);
      if (entry.details?.description) {
        console.log(`   Details: ${entry.details.description}`);
      }
      console.log('');
    });

    return recentEntries;
  } catch (error) {
    console.error('❌ Failed to get recent activity:', error.message);
    throw error;
  }
}

/**
 * Example 2: Get audit log with filters
 */
async function getFilteredAuditLog() {
  console.log('\n🔍 Example 2: Filtered Audit Log Queries');
  console.log('========================================\n');

  try {
    // Filter by entity type
    console.log('Query 1: All policy-related actions');
    const policyLogs = await auditService.getAuditLog({
      entityType: 'policy',
      limit: 10
    });

    console.log(`✅ Found ${policyLogs.total || policyLogs.entries.length} policy audit entries`);
    console.log(`   Showing: ${policyLogs.entries.length} entries\n`);

    // Filter by action
    console.log('Query 2: All CREATE actions');
    const createLogs = await auditService.getAuditLog({
      action: 'CREATE',
      limit: 10
    });

    console.log(`✅ Found ${createLogs.total || createLogs.entries.length} CREATE actions`);
    console.log(`   Showing: ${createLogs.entries.length} entries\n`);

    // Filter by date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // Last 7 days

    console.log('Query 3: Last 7 days of activity');
    const recentLogs = await auditService.getAuditLog({
      startDate: startDate.toISOString(),
      limit: 20
    });

    console.log(`✅ Found ${recentLogs.total || recentLogs.entries.length} entries in last 7 days`);
    console.log(`   Showing: ${recentLogs.entries.length} entries\n`);

    // Combined filters
    console.log('Query 4: Policy updates in last 7 days');
    const policyUpdates = await auditService.getAuditLog({
      entityType: 'policy',
      action: 'UPDATE',
      startDate: startDate.toISOString(),
      limit: 10
    });

    console.log(`✅ Found ${policyUpdates.total || policyUpdates.entries.length} policy updates`);
    console.log(`   Showing: ${policyUpdates.entries.length} entries\n`);

    return { policyLogs, createLogs, recentLogs, policyUpdates };
  } catch (error) {
    console.error('❌ Failed to get filtered audit log:', error.message);
    throw error;
  }
}

/**
 * Example 3: Get entity history
 */
async function getEntityHistory() {
  console.log('\n📜 Example 3: Entity History Tracking');
  console.log('=====================================\n');

  try {
    // Get history for a specific policy
    console.log('Getting history for a policy...');
    const policyHistory = await auditService.getEntityHistory(
      'policy',
      'allow-document-view',
      20
    );

    console.log(`✅ Policy history (${policyHistory.length} entries):\n`);

    policyHistory.forEach((entry, index) => {
      const date = new Date(entry.timestamp).toLocaleString();
      console.log(`${index + 1}. [${date}] ${entry.action}`);
      console.log(`   By: ${entry.userId || 'system'}`);

      if (entry.details?.changes) {
        console.log(`   Changes: ${JSON.stringify(entry.details.changes)}`);
      }

      if (entry.details?.oldValue && entry.details?.newValue) {
        console.log(`   Old: ${JSON.stringify(entry.details.oldValue)}`);
        console.log(`   New: ${JSON.stringify(entry.details.newValue)}`);
      }
      console.log('');
    });

    // Get history for an attribute
    console.log('Getting attribute history...');
    const attributeHistory = await auditService.getEntityHistory(
      'attribute',
      'user:user-123:role',
      10
    );

    console.log(`✅ Attribute history (${attributeHistory.length} entries):\n`);

    attributeHistory.forEach((entry, index) => {
      const date = new Date(entry.timestamp).toLocaleString();
      console.log(`${index + 1}. [${date}] ${entry.action}`);
      console.log(`   Value: ${JSON.stringify(entry.details?.value)}`);
      console.log('');
    });

    return { policyHistory, attributeHistory };
  } catch (error) {
    console.error('❌ Failed to get entity history:', error.message);
    throw error;
  }
}

/**
 * Example 4: Get user activity
 */
async function getUserActivity() {
  console.log('\n👤 Example 4: User Activity Tracking');
  console.log('====================================\n');

  try {
    const userId = 'admin-user';

    // Get all activity for a specific user
    const userActivity = await auditService.getUserActivity(userId, {
      limit: 20
    });

    console.log(`✅ Activity for user ${userId}:\n`);
    console.log(`   Total entries: ${userActivity.total || userActivity.entries.length}`);
    console.log(`   Showing: ${userActivity.entries.length} entries\n`);

    // Group by action type
    const actionCounts = {};
    userActivity.entries.forEach(entry => {
      actionCounts[entry.action] = (actionCounts[entry.action] || 0) + 1;
    });

    console.log('   Actions breakdown:');
    Object.entries(actionCounts).forEach(([action, count]) => {
      console.log(`      ${action}: ${count}`);
    });

    console.log('\n   Recent actions:');
    userActivity.entries.slice(0, 5).forEach((entry, index) => {
      const date = new Date(entry.timestamp).toLocaleString();
      console.log(`      ${index + 1}. [${date}] ${entry.action} on ${entry.entityType}:${entry.entityId}`);
    });

    // Get activity for specific date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30); // Last 30 days

    const monthActivity = await auditService.getUserActivity(userId, {
      startDate: startDate.toISOString(),
      limit: 100
    });

    console.log(`\n✅ User activity in last 30 days:`);
    console.log(`   Total actions: ${monthActivity.total || monthActivity.entries.length}`);

    return { userActivity, monthActivity };
  } catch (error) {
    console.error('❌ Failed to get user activity:', error.message);
    throw error;
  }
}

/**
 * Example 5: Get audit statistics
 */
async function getAuditStatistics() {
  console.log('\n📈 Example 5: Audit Statistics');
  console.log('==============================\n');

  try {
    // Get overall statistics
    const stats = await auditService.getStatistics();

    console.log('✅ Audit Statistics:\n');
    console.log(`   Total Entries: ${stats.totalEntries || 'N/A'}`);
    console.log(`   Policies Created: ${stats.policiesCreated || 'N/A'}`);
    console.log(`   Policies Updated: ${stats.policiesUpdated || 'N/A'}`);
    console.log(`   Policies Deleted: ${stats.policiesDeleted || 'N/A'}`);
    console.log(`   Attributes Modified: ${stats.attributesModified || 'N/A'}`);
    console.log(`   Access Decisions: ${stats.accessDecisions || 'N/A'}`);

    if (stats.topUsers) {
      console.log('\n   Most Active Users:');
      stats.topUsers.slice(0, 5).forEach((user, index) => {
        console.log(`      ${index + 1}. ${user.userId}: ${user.actionCount} actions`);
      });
    }

    if (stats.actionBreakdown) {
      console.log('\n   Action Breakdown:');
      Object.entries(stats.actionBreakdown).forEach(([action, count]) => {
        console.log(`      ${action}: ${count}`);
      });
    }

    // Get statistics for specific date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const weekStats = await auditService.getStatistics(
      startDate.toISOString(),
      new Date().toISOString()
    );

    console.log('\n✅ Last 7 Days Statistics:\n');
    console.log(`   Total Entries: ${weekStats.totalEntries || 'N/A'}`);
    console.log(`   Daily Average: ${Math.round((weekStats.totalEntries || 0) / 7)}`);

    return { stats, weekStats };
  } catch (error) {
    console.error('❌ Failed to get statistics:', error.message);
    throw error;
  }
}

/**
 * Example 6: Compare policy versions
 */
async function comparePolicyVersions() {
  console.log('\n🔄 Example 6: Policy Version Comparison');
  console.log('=======================================\n');

  try {
    const policyId = 'allow-document-view';

    // Get comparison between versions
    const comparison = await auditService.compareVersions(
      'policy',
      policyId,
      'v1.0.0',
      'v2.0.0'
    );

    console.log(`✅ Version Comparison for ${policyId}:\n`);

    if (comparison.differences) {
      console.log('   Differences:');
      comparison.differences.forEach(diff => {
        console.log(`      • ${diff.field}: ${diff.oldValue} → ${diff.newValue}`);
      });
    }

    if (comparison.added) {
      console.log('\n   Added fields:');
      comparison.added.forEach(field => {
        console.log(`      + ${field}`);
      });
    }

    if (comparison.removed) {
      console.log('\n   Removed fields:');
      comparison.removed.forEach(field => {
        console.log(`      - ${field}`);
      });
    }

    return comparison;
  } catch (error) {
    console.error('❌ Failed to compare versions:', error.message);
    throw error;
  }
}

/**
 * Example 7: Export audit logs
 */
async function exportAuditLogs() {
  console.log('\n💾 Example 7: Export Audit Logs');
  console.log('===============================\n');

  try {
    // Export as JSON
    console.log('Exporting audit logs as JSON...');
    const jsonExport = await auditService.exportAuditLog(
      {
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        limit: 1000
      },
      'json'
    );

    console.log(`✅ JSON export completed`);
    console.log(`   Size: ${jsonExport.size || 'N/A'} bytes`);

    // Export as CSV
    console.log('\nExporting audit logs as CSV...');
    const csvExport = await auditService.exportAuditLog(
      {
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        limit: 1000
      },
      'csv'
    );

    console.log(`✅ CSV export completed`);
    console.log(`   Size: ${csvExport.size || 'N/A'} bytes`);

    console.log('\n💡 In production, you would save these to files:');
    console.log('   fs.writeFileSync("audit-log.json", jsonExport)');
    console.log('   fs.writeFileSync("audit-log.csv", csvExport)');

    return { jsonExport, csvExport };
  } catch (error) {
    console.error('❌ Failed to export audit logs:', error.message);
    throw error;
  }
}

/**
 * Example 8: Analyze access patterns
 */
async function analyzeAccessPatterns() {
  console.log('\n🔍 Example 8: Access Pattern Analysis');
  console.log('=====================================\n');

  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    const accessLogs = await auditService.getAuditLog({
      action: 'ACCESS_CHECK',
      startDate: startDate.toISOString(),
      limit: 1000
    });

    console.log(`✅ Analyzing ${accessLogs.entries.length} access checks:\n`);

    // Count PERMIT vs DENY
    const decisions = { PERMIT: 0, DENY: 0 };
    const resourceAccess = {};
    const userAccess = {};

    accessLogs.entries.forEach(entry => {
      const decision = entry.details?.decision;
      if (decision) {
        decisions[decision] = (decisions[decision] || 0) + 1;
      }

      const resource = entry.details?.resourceId;
      if (resource) {
        resourceAccess[resource] = (resourceAccess[resource] || 0) + 1;
      }

      if (entry.userId) {
        userAccess[entry.userId] = (userAccess[entry.userId] || 0) + 1;
      }
    });

    console.log('   Access Decisions:');
    console.log(`      PERMIT: ${decisions.PERMIT} (${((decisions.PERMIT / (decisions.PERMIT + decisions.DENY)) * 100).toFixed(1)}%)`);
    console.log(`      DENY: ${decisions.DENY} (${((decisions.DENY / (decisions.PERMIT + decisions.DENY)) * 100).toFixed(1)}%)`);

    console.log('\n   Most Accessed Resources:');
    Object.entries(resourceAccess)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .forEach(([resource, count], index) => {
        console.log(`      ${index + 1}. ${resource}: ${count} accesses`);
      });

    console.log('\n   Most Active Users:');
    Object.entries(userAccess)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .forEach(([user, count], index) => {
        console.log(`      ${index + 1}. ${user}: ${count} accesses`);
      });

    return { decisions, resourceAccess, userAccess };
  } catch (error) {
    console.error('❌ Failed to analyze access patterns:', error.message);
    throw error;
  }
}

/**
 * Main function - Run all audit query examples
 */
async function main() {
  console.log('🚀 ABAC Admin Core - Audit Queries Examples');
  console.log('==========================================\n');

  try {
    await getRecentActivity();
    await getFilteredAuditLog();
    await getEntityHistory();
    await getUserActivity();
    await getAuditStatistics();
    await comparePolicyVersions();
    await exportAuditLogs();
    await analyzeAccessPatterns();

    console.log('\n✅ All audit query examples completed successfully!');
    console.log('\n💡 Key Takeaways:');
    console.log('   • Use audit logs for compliance and monitoring');
    console.log('   • Filter logs by entity type, action, user, and date range');
    console.log('   • Track entity history for change management');
    console.log('   • Analyze user activity for security insights');
    console.log('   • Export logs for external analysis and archival');
    console.log('   • Monitor access patterns to optimize policies');
    console.log('   • Use statistics for reporting and dashboards');

    console.log('\n📊 Best Practices:');
    console.log('   • Regularly review audit logs for anomalies');
    console.log('   • Set up alerts for suspicious activities');
    console.log('   • Archive old logs to maintain performance');
    console.log('   • Use filters to reduce data transfer');
    console.log('   • Implement log retention policies');
    console.log('   • Monitor access decision ratios (PERMIT/DENY)');

  } catch (error) {
    console.error('\n❌ Example execution failed:', error);
    console.error('\nStack trace:', error.stack);
    process.exit(1);
  }
}

// Run the audit query examples
main();

"use client";

import { ABACProvider, AuditLogViewer } from "@devcraft-ts/abac-admin-react-ui";
import { Clock } from "lucide-react";
import { useState } from "react";

export default function AuditPage() {
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [entityFilter, setEntityFilter] = useState<"policy" | "attribute" | "all">("all");

  return (
    <ABACProvider config={{ baseURL: "/api/abac" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/30">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Audit Log
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Track all changes to policies and attributes
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-4 p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 rounded-xl">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Entity Type
              </label>
              <select
                value={entityFilter}
                onChange={(e) => setEntityFilter(e.target.value as any)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Entities</option>
                <option value="policy">Policies Only</option>
                <option value="attribute">Attributes Only</option>
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Auto Refresh
              </label>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {autoRefresh ? "Enabled (30s)" : "Disabled"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Log Viewer Component */}
        <AuditLogViewer
          onEntryClick={(id) => console.log("View details:", id)}
          autoRefresh={autoRefresh}
          refreshInterval={30000}
          entityType={entityFilter === "all" ? undefined : entityFilter}
        />

        {/* Info Section */}
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            About Audit Logs
          </h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>
              The audit log tracks all changes made to policies and attributes in your ABAC system, providing complete visibility and accountability.
            </p>
            <p>
              Each entry includes information about what was changed, who made the change, and when it occurred.
            </p>
            <ul className="list-disc list-inside space-y-1 mt-3">
              <li><strong>CREATE:</strong> New policies or attributes added to the system</li>
              <li><strong>UPDATE:</strong> Modifications to existing policies or attributes (shows old and new values)</li>
              <li><strong>DELETE:</strong> Removal of policies or attributes from the system</li>
              <li><strong>ACTIVATE/DEACTIVATE:</strong> Status changes for policies</li>
              <li><strong>TEST:</strong> Policy evaluation tests performed</li>
            </ul>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                💡 Tip: Enable auto-refresh to monitor changes in real-time, or use the filters to focus on specific types of changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ABACProvider>
  );
}

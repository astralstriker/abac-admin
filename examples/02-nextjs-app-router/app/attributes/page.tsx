"use client";

import type { ResourceType } from "@devcraft-ts/abac-admin-core";
import {
  ABACProvider,
  AttributeManager,
} from "@devcraft-ts/abac-admin-react-ui";
import { Tag } from "lucide-react";
import { useState } from "react";

export default function AttributesPage() {
  const [selectedResource, setSelectedResource] = useState<{
    type: ResourceType;
    id: string;
  }>({
    type: "subject",
    id: "user-123",
  });

  return (
    <ABACProvider config={{ baseURL: "/api/abac" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Attribute Manager
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Manage resource attributes for ABAC policies
              </p>
            </div>
          </div>

          {/* Resource Selector */}
          <div className="flex flex-wrap gap-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Attribute Context
              </label>
              <select
                value={selectedResource.type}
                onChange={(e) => {
                  const type = e.target.value as ResourceType;
                  let defaultId = "";

                  // Set contextual default IDs
                  switch(type) {
                    case "subject":
                      defaultId = "user-123";
                      break;
                    case "resource":
                      defaultId = "document-456";
                      break;
                    case "action":
                      defaultId = "read-operation";
                      break;
                    case "environment":
                      defaultId = "production";
                      break;
                    default:
                      defaultId = `${type}-123`;
                  }

                  setSelectedResource({
                    type,
                    id: defaultId,
                  });
                }}
                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <optgroup label="ABAC Context Types">
                  <option value="subject">Subject (Who)</option>
                  <option value="resource">Resource (What)</option>
                  <option value="action">Action (How)</option>
                  <option value="environment">Environment (When/Where)</option>
                </optgroup>
                <optgroup label="Domain-Specific Types">
                  <option value="user">User</option>
                  <option value="document">Document</option>
                  <option value="company">Company</option>
                  <option value="bond">Bond</option>
                  <option value="claim">Claim</option>
                  <option value="approval">Approval</option>
                  <option value="tender">Tender</option>
                </optgroup>
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {selectedResource.type === "subject" && "Subject ID"}
                {selectedResource.type === "resource" && "Resource ID"}
                {selectedResource.type === "action" && "Action ID"}
                {selectedResource.type === "environment" && "Environment ID"}
                {!["subject", "resource", "action", "environment"].includes(selectedResource.type) && "Resource ID"}
              </label>
              <input
                type="text"
                value={selectedResource.id}
                onChange={(e) =>
                  setSelectedResource({
                    ...selectedResource,
                    id: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter resource ID"
              />
            </div>
          </div>
        </div>

        {/* Attribute Manager Component */}
        <AttributeManager
          resourceType={selectedResource.type}
          resourceId={selectedResource.id}
          onEdit={(key) => console.log("Edit attribute:", key)}
          onDelete={(key) => console.log("Delete attribute:", key)}
          onCreate={() => console.log("Create new attribute")}
        />

        {/* Info Section */}
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            About Attributes
          </h3>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>
              Attributes are key-value pairs that define characteristics in your ABAC system across different contexts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">🧑 Subject Attributes</h4>
                <p className="text-xs">Who is making the request? (e.g., user role, department, clearance level)</p>
              </div>

              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">📄 Resource Attributes</h4>
                <p className="text-xs">What is being accessed? (e.g., document type, classification, owner)</p>
              </div>

              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">⚡ Action Attributes</h4>
                <p className="text-xs">What operation is performed? (e.g., read, write, delete, approve)</p>
              </div>

              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">🌍 Environment Attributes</h4>
                <p className="text-xs">Context of the request (e.g., time of day, location, IP address, device type)</p>
              </div>
            </div>

            <ul className="list-disc list-inside space-y-1 mt-3">
              <li>Create new attributes to extend metadata across all contexts</li>
              <li>Edit existing attributes to update values</li>
              <li>Delete unused attributes to keep your system clean</li>
              <li>Search and filter to quickly find specific attributes</li>
            </ul>
          </div>
        </div>
      </div>
    </ABACProvider>
  );
}

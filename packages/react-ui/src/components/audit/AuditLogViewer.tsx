import { useAuditLog } from "@devcraft-ts/abac-admin-react";
import { AlertCircle, Clock, Filter, RefreshCw, Search } from "lucide-react";
import React from "react";
import { cn, formatDate } from "../../lib/utils";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Input } from "../ui/Input";

export interface AuditLogViewerProps {
  onEntryClick?: (entryId: string) => void;
  className?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
  entityType?: "policy" | "attribute";
}

export const AuditLogViewer: React.FC<AuditLogViewerProps> = ({
  onEntryClick,
  className,
  autoRefresh = false,
  refreshInterval = 30000,
  entityType,
}) => {
  const { entries, isLoading, error, refetch } = useAuditLog(
    entityType ? { entityType } : undefined,
  );
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedAction, setSelectedAction] = React.useState<string | null>(
    null,
  );
  const [isMounted, setIsMounted] = React.useState(false);

  // Client-side only mounting to prevent hydration issues with date formatting
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-refresh functionality
  React.useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refetch();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refetch]);

  const filteredEntries = React.useMemo(() => {
    if (!entries) return [];

    let filtered = entries;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (entry) =>
          entry.entityId.toLowerCase().includes(term) ||
          entry.userId.toLowerCase().includes(term) ||
          (entry.userName?.toLowerCase() || "").includes(term) ||
          entry.action.toLowerCase().includes(term),
      );
    }

    if (selectedAction) {
      filtered = filtered.filter((entry) => entry.action === selectedAction);
    }

    return filtered;
  }, [entries, searchTerm, selectedAction]);

  const getActionBadge = (
    action: "CREATE" | "UPDATE" | "DELETE" | "ACTIVATE" | "DEACTIVATE" | "TEST",
  ) => {
    const variants: Record<string, "success" | "info" | "error" | "warning"> = {
      CREATE: "success",
      UPDATE: "info",
      DELETE: "error",
      ACTIVATE: "success",
      DEACTIVATE: "warning",
      TEST: "info",
    };
    return <Badge variant={variants[action] || "default"}>{action}</Badge>;
  };

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 mx-auto text-red-500 dark:text-red-400 mb-4" />
            <p className="text-red-600 dark:text-red-400">
              Error loading audit logs: {error.message}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={handleRefresh}
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Audit Log
            </CardTitle>
            <CardDescription>
              Track changes to policies and attributes
            </CardDescription>
          </div>
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            leftIcon={<RefreshCw className="h-4 w-4" />}
            disabled={isLoading}
          >
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <Input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedAction === null ? "primary" : "outline"}
              size="sm"
              leftIcon={<Filter className="h-4 w-4" />}
              onClick={() => setSelectedAction(null)}
            >
              All
            </Button>
            {["CREATE", "UPDATE", "DELETE", "ACTIVATE", "DEACTIVATE"].map(
              (action) => (
                <Button
                  key={action}
                  variant={selectedAction === action ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedAction(action)}
                >
                  {action}
                </Button>
              ),
            )}
          </div>
        </div>

        {/* Audit Log Entries */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-24 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              {searchTerm || selectedAction
                ? "No audit logs found"
                : "No audit logs yet"}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {searchTerm || selectedAction
                ? "Try adjusting your search or filters"
                : "Changes to policies and attributes will appear here"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className={cn(
                  "p-4 rounded-lg border transition-all duration-200",
                  "bg-white dark:bg-gray-900/50",
                  "border-gray-200 dark:border-gray-800",
                  "hover:border-gray-300 dark:hover:border-gray-700",
                  onEntryClick && "cursor-pointer hover:shadow-sm",
                )}
                onClick={() => onEntryClick?.(entry.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {getActionBadge(entry.action)}
                      <Badge variant="default">{entry.entityType}</Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {isMounted
                          ? formatDate(new Date(entry.timestamp))
                          : new Date(entry.timestamp)
                              .toISOString()
                              .split("T")[0]}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Entity:
                        </span>
                        <code className="text-xs px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400">
                          {entry.entityId}
                        </code>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          User:
                        </span>
                        <code className="text-xs px-2 py-1 rounded bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400">
                          {entry.userName || entry.userId}
                        </code>
                      </div>
                      {entry.action === "UPDATE" && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {entry.oldValue && (
                              <div>
                                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                                  Old Value
                                </span>
                                <pre className="text-xs p-2 rounded bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 overflow-auto max-h-32">
                                  {JSON.stringify(entry.oldValue, null, 2)}
                                </pre>
                              </div>
                            )}
                            {entry.newValue && (
                              <div>
                                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                                  New Value
                                </span>
                                <pre className="text-xs p-2 rounded bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 overflow-auto max-h-32">
                                  {JSON.stringify(entry.newValue, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {entry.metadata &&
                        Object.keys(entry.metadata).length > 0 && (
                          <details className="mt-2">
                            <summary className="text-xs text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
                              Metadata
                            </summary>
                            <pre className="text-xs p-2 mt-2 rounded bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 overflow-auto max-h-32">
                              {JSON.stringify(entry.metadata, null, 2)}
                            </pre>
                          </details>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {!isLoading && filteredEntries.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <p>
                Showing {filteredEntries.length} of {entries?.length || 0} log
                entries
              </p>
              {autoRefresh && (
                <p className="flex items-center gap-2">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  Auto-refresh enabled
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

import {
    AuditService,
    type AuditLogEntry,
    type AuditLogFilter,
    type AuditLogResponse,
} from "@devcraft-ts/abac-admin-core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useABACClient } from "../context/ABACContext";

export interface UseAuditLogResult {
  entries: AuditLogEntry[];
  total: number;
  hasMore: boolean;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching audit logs with filters
 * Provides paginated access to audit log entries
 *
 * @param filters - Optional filters to apply to audit log query
 * @returns Object containing audit entries, pagination info, loading state, and error
 *
 * @example
 * ```tsx
 * function AuditLog() {
 *   const {
 *     entries,
 *     total,
 *     isLoading,
 *     hasMore
 *   } = useAuditLog({
 *     entityType: 'policy',
 *     action: 'UPDATE',
 *     limit: 50
 *   });
 *
 *   if (isLoading) return <div>Loading...</div>;
 *
 *   return (
 *     <div>
 *       <div>Total: {total}</div>
 *       {entries.map(entry => (
 *         <div key={entry.id}>
 *           {entry.action} by {entry.userId} at {entry.timestamp}
 *         </div>
 *       ))}
 *       {hasMore && <button>Load More</button>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useAuditLog(filters?: AuditLogFilter): UseAuditLogResult {
  const client = useABACClient();
  const auditService = useMemo(() => new AuditService(client), [client]);

  const [entries, setEntries] = useState<AuditLogEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAuditLog = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: AuditLogResponse = await auditService.getAuditLog(
        filters
      );
      setEntries(response.entries);
      setTotal(response.total);
      setHasMore(response.hasMore);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch audit log");
      setError(error);
      console.error("Failed to fetch audit log:", error);
    } finally {
      setIsLoading(false);
    }
  }, [auditService, filters]);

  useEffect(() => {
    fetchAuditLog();
  }, [fetchAuditLog]);

  return {
    entries,
    total,
    hasMore,
    isLoading,
    error,
    refetch: fetchAuditLog,
  };
}

/**
 * Hook for fetching entity history (all audit entries for a specific entity)
 *
 * @param entityType - Type of entity ('policy' or 'attribute')
 * @param entityId - ID of the entity
 * @param limit - Optional limit on number of entries
 * @returns Object containing audit entries, loading state, and error
 *
 * @example
 * ```tsx
 * function PolicyHistory({ policyId }: { policyId: string }) {
 *   const { entries, isLoading } = useEntityHistory('policy', policyId);
 *
 *   return (
 *     <div>
 *       <h3>Policy History</h3>
 *       {entries.map(entry => (
 *         <div key={entry.id}>
 *           {entry.action} - {entry.timestamp}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useEntityHistory(
  entityType: "policy" | "attribute",
  entityId: string,
  limit?: number
) {
  const client = useABACClient();
  const auditService = useMemo(() => new AuditService(client), [client]);

  const [entries, setEntries] = useState<AuditLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!entityType || !entityId) {
      setEntries([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await auditService.getEntityHistory(
        entityType,
        entityId,
        limit
      );
      setEntries(data);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch entity history");
      setError(error);
      console.error("Failed to fetch entity history:", error);
    } finally {
      setIsLoading(false);
    }
  }, [auditService, entityType, entityId, limit]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    entries,
    isLoading,
    error,
    refetch: fetchHistory,
  };
}

/**
 * Hook for fetching user activity (all audit entries for a specific user)
 *
 * @param userId - ID of the user
 * @param options - Optional filters for user activity
 * @returns Object containing audit entries, pagination info, loading state, and error
 *
 * @example
 * ```tsx
 * function UserActivity({ userId }: { userId: string }) {
 *   const {
 *     entries,
 *     total,
 *     isLoading
 *   } = useUserActivity(userId, {
 *     startDate: '2024-01-01T00:00:00Z',
 *     limit: 100
 *   });
 *
 *   return (
 *     <div>
 *       <h3>User Activity ({total} actions)</h3>
 *       {entries.map(entry => (
 *         <div key={entry.id}>
 *           {entry.action} on {entry.entityType} - {entry.timestamp}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useUserActivity(
  userId: string,
  options?: {
    startDate?: string;
    endDate?: string;
    entityType?: "policy" | "attribute";
    limit?: number;
    offset?: number;
  }
) {
  const client = useABACClient();
  const auditService = useMemo(() => new AuditService(client), [client]);

  const [entries, setEntries] = useState<AuditLogEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserActivity = useCallback(async () => {
    if (!userId) {
      setEntries([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response: AuditLogResponse = await auditService.getUserActivity(
        userId,
        options
      );
      setEntries(response.entries);
      setTotal(response.total);
      setHasMore(response.hasMore);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch user activity");
      setError(error);
      console.error("Failed to fetch user activity:", error);
    } finally {
      setIsLoading(false);
    }
  }, [auditService, userId, options]);

  useEffect(() => {
    fetchUserActivity();
  }, [fetchUserActivity]);

  return {
    entries,
    total,
    hasMore,
    isLoading,
    error,
    refetch: fetchUserActivity,
  };
}

/**
 * Hook for fetching audit statistics
 *
 * @param startDate - Optional start date for statistics
 * @param endDate - Optional end date for statistics
 * @returns Object containing statistics, loading state, and error
 *
 * @example
 * ```tsx
 * function AuditStatistics() {
 *   const { statistics, isLoading } = useAuditStatistics(
 *     '2024-01-01T00:00:00Z',
 *     '2024-12-31T23:59:59Z'
 *   );
 *
 *   if (isLoading) return <div>Loading...</div>;
 *
 *   return (
 *     <div>
 *       <div>Total Actions: {statistics?.totalActions}</div>
 *       <div>Total Users: {statistics?.uniqueUsers}</div>
 *       <div>Most Active User: {statistics?.mostActiveUser}</div>
 *     </div>
 *   );
 * }
 * ```
 */
export function useAuditStatistics(startDate?: string, endDate?: string) {
  const client = useABACClient();
  const auditService = useMemo(() => new AuditService(client), [client]);

  const [statistics, setStatistics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchStatistics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await auditService.getStatistics(startDate, endDate);
      setStatistics(data);
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Failed to fetch audit statistics");
      setError(error);
      console.error("Failed to fetch audit statistics:", error);
    } finally {
      setIsLoading(false);
    }
  }, [auditService, startDate, endDate]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return {
    statistics,
    isLoading,
    error,
    refetch: fetchStatistics,
  };
}

/**
 * Hook for fetching recent audit activity
 *
 * @param limit - Maximum number of recent entries to fetch (default: 10)
 * @returns Object containing recent entries, loading state, and error
 *
 * @example
 * ```tsx
 * function RecentActivity() {
 *   const { entries, isLoading } = useRecentActivity(20);
 *
 *   return (
 *     <div>
 *       <h3>Recent Activity</h3>
 *       {entries.map(entry => (
 *         <div key={entry.id}>
 *           {entry.action} by {entry.userId} - {entry.timestamp}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useRecentActivity(limit: number = 10) {
  const client = useABACClient();
  const auditService = useMemo(() => new AuditService(client), [client]);

  const [entries, setEntries] = useState<AuditLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchRecentActivity = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await auditService.getRecentActivity(limit);
      setEntries(data);
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Failed to fetch recent activity");
      setError(error);
      console.error("Failed to fetch recent activity:", error);
    } finally {
      setIsLoading(false);
    }
  }, [auditService, limit]);

  useEffect(() => {
    fetchRecentActivity();
  }, [fetchRecentActivity]);

  return {
    entries,
    isLoading,
    error,
    refetch: fetchRecentActivity,
  };
}

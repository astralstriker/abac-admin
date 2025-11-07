import {
    AttributeService,
    type AttributeValue,
    type ResourceType,
} from "@abac-admin/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useABACClient } from "../context/ABACContext";

export interface UseAttributesResult {
  attributes: Record<string, any>;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  setAttribute: (key: string, value: any) => Promise<AttributeValue>;
  deleteAttribute: (key: string) => Promise<void>;
  bulkSetAttributes: (
    attributes: Record<string, any>
  ) => Promise<AttributeValue[]>;
  bulkDeleteAttributes: (keys: string[]) => Promise<void>;
}

/**
 * Hook for managing resource attributes
 * Provides CRUD operations for attributes with native React state
 *
 * @param resourceType - Type of resource (e.g., 'user', 'document')
 * @param resourceId - ID of the resource
 * @returns Object containing attributes, loading state, and mutation functions
 *
 * @example
 * ```tsx
 * function UserAttributes({ userId }: { userId: string }) {
 *   const {
 *     attributes,
 *     isLoading,
 *     setAttribute,
 *     deleteAttribute
 *   } = useAttributes('user', userId);
 *
 *   if (isLoading) return <div>Loading...</div>;
 *
 *   return (
 *     <div>
 *       <div>Role: {attributes.role}</div>
 *       <button onClick={() => setAttribute('role', 'admin')}>
 *         Make Admin
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useAttributes(
  resourceType: ResourceType,
  resourceId: string
): UseAttributesResult {
  const client = useABACClient();
  const attributeService = useMemo(
    () => new AttributeService(client),
    [client]
  );

  const [attributes, setAttributes] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAttributes = useCallback(async () => {
    if (!resourceType || !resourceId) {
      setAttributes({});
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await attributeService.getResourceAttributes(
        resourceType,
        resourceId
      );
      setAttributes(data);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch attributes");
      setError(error);
      console.error("Failed to fetch attributes:", error);
    } finally {
      setIsLoading(false);
    }
  }, [attributeService, resourceType, resourceId]);

  useEffect(() => {
    fetchAttributes();
  }, [fetchAttributes]);

  const setAttribute = useCallback(
    async (key: string, value: any): Promise<AttributeValue> => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await attributeService.setResourceAttribute(
          resourceType,
          resourceId,
          key,
          value
        );
        setAttributes((prev) => ({ ...prev, [key]: value }));
        return result;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to set attribute");
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [attributeService, resourceType, resourceId]
  );

  const deleteAttribute = useCallback(
    async (key: string): Promise<void> => {
      setIsLoading(true);
      setError(null);
      try {
        await attributeService.deleteResourceAttribute(
          resourceType,
          resourceId,
          key
        );
        setAttributes((prev) => {
          const { [key]: _, ...rest } = prev;
          return rest;
        });
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to delete attribute");
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [attributeService, resourceType, resourceId]
  );

  const bulkSetAttributes = useCallback(
    async (attrs: Record<string, any>): Promise<AttributeValue[]> => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await attributeService.bulkSetAttributes(
          resourceType,
          resourceId,
          attrs
        );
        setAttributes((prev) => ({ ...prev, ...attrs }));
        return result;
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to bulk set attributes");
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [attributeService, resourceType, resourceId]
  );

  const bulkDeleteAttributes = useCallback(
    async (keys: string[]): Promise<void> => {
      setIsLoading(true);
      setError(null);
      try {
        await attributeService.bulkDeleteAttributes(
          resourceType,
          resourceId,
          keys
        );
        setAttributes((prev) => {
          const newAttrs = { ...prev };
          keys.forEach((key) => delete newAttrs[key]);
          return newAttrs;
        });
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to bulk delete attributes");
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [attributeService, resourceType, resourceId]
  );

  return {
    attributes,
    isLoading,
    error,
    refetch: fetchAttributes,
    setAttribute,
    deleteAttribute,
    bulkSetAttributes,
    bulkDeleteAttributes,
  };
}

/**
 * Hook for fetching a single attribute value
 *
 * @param resourceType - Type of resource
 * @param resourceId - ID of the resource
 * @param key - Attribute key to fetch
 * @returns Object containing attribute value, loading state, and error
 *
 * @example
 * ```tsx
 * function UserRole({ userId }: { userId: string }) {
 *   const { value, isLoading } = useAttribute('user', userId, 'role');
 *
 *   if (isLoading) return <div>Loading...</div>;
 *
 *   return <div>Role: {value}</div>;
 * }
 * ```
 */
export function useAttribute(
  resourceType: ResourceType,
  resourceId: string,
  key: string
) {
  const client = useABACClient();
  const attributeService = useMemo(
    () => new AttributeService(client),
    [client]
  );

  const [value, setValue] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAttribute = useCallback(async () => {
    if (!resourceType || !resourceId || !key) {
      setValue(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await attributeService.getResourceAttribute(
        resourceType,
        resourceId,
        key
      );
      setValue(data);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch attribute");
      setError(error);
      console.error("Failed to fetch attribute:", error);
    } finally {
      setIsLoading(false);
    }
  }, [attributeService, resourceType, resourceId, key]);

  useEffect(() => {
    fetchAttribute();
  }, [fetchAttribute]);

  return {
    value,
    isLoading,
    error,
    refetch: fetchAttribute,
  };
}

/**
 * Hook for fetching attribute history
 *
 * @param resourceType - Type of resource
 * @param resourceId - ID of the resource
 * @param key - Optional attribute key to filter history
 * @returns Object containing attribute history, loading state, and error
 *
 * @example
 * ```tsx
 * function AttributeHistory({ userId }: { userId: string }) {
 *   const { history, isLoading } = useAttributeHistory('user', userId, 'role');
 *
 *   return (
 *     <div>
 *       {history.map(entry => (
 *         <div key={entry.id}>
 *           {entry.key}: {entry.value} at {entry.timestamp}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useAttributeHistory(
  resourceType: ResourceType,
  resourceId: string,
  key?: string
) {
  const client = useABACClient();
  const attributeService = useMemo(
    () => new AttributeService(client),
    [client]
  );

  const [history, setHistory] = useState<AttributeValue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!resourceType || !resourceId) {
      setHistory([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await attributeService.getHistory(
        resourceType,
        resourceId,
        key
      );
      setHistory(data);
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Failed to fetch attribute history");
      setError(error);
      console.error("Failed to fetch attribute history:", error);
    } finally {
      setIsLoading(false);
    }
  }, [attributeService, resourceType, resourceId, key]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    history,
    isLoading,
    error,
    refetch: fetchHistory,
  };
}

/**
 * Hook for comparing attributes between two resources
 *
 * @param resourceType - Type of resource
 * @param resourceId1 - ID of first resource
 * @param resourceId2 - ID of second resource
 * @returns Object containing comparison result, loading state, and error
 *
 * @example
 * ```tsx
 * function CompareUsers({ userId1, userId2 }: { userId1: string; userId2: string }) {
 *   const { comparison, isLoading } = useAttributeComparison('user', userId1, userId2);
 *
 *   if (isLoading) return <div>Loading...</div>;
 *
 *   return (
 *     <div>
 *       <div>Matching: {comparison?.matching?.join(', ')}</div>
 *       <div>Different: {comparison?.different?.join(', ')}</div>
 *     </div>
 *   );
 * }
 * ```
 */
export function useAttributeComparison(
  resourceType: ResourceType,
  resourceId1: string,
  resourceId2: string
) {
  const client = useABACClient();
  const attributeService = useMemo(
    () => new AttributeService(client),
    [client]
  );

  const [comparison, setComparison] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchComparison = useCallback(async () => {
    if (!resourceType || !resourceId1 || !resourceId2) {
      setComparison(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await attributeService.compareAttributes(
        resourceType,
        resourceId1,
        resourceId2
      );
      setComparison(data);
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Failed to compare attributes");
      setError(error);
      console.error("Failed to compare attributes:", error);
    } finally {
      setIsLoading(false);
    }
  }, [attributeService, resourceType, resourceId1, resourceId2]);

  useEffect(() => {
    fetchComparison();
  }, [fetchComparison]);

  return {
    comparison,
    isLoading,
    error,
    refetch: fetchComparison,
  };
}

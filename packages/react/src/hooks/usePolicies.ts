import { PolicyService, type Policy, type PolicyFilters, type PolicyInput, type PolicyUpdate } from '@devcraft-ts/abac-admin-core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useABACClient } from '../context/ABACContext';

export interface UsePoliciesResult {
  policies: Policy[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  createPolicy: (policy: PolicyInput) => Promise<Policy>;
  updatePolicy: (id: string, policy: PolicyUpdate) => Promise<Policy>;
  deletePolicy: (id: string) => Promise<void>;
  activatePolicy: (id: string) => Promise<Policy>;
  deactivatePolicy: (id: string) => Promise<Policy>;
}

/**
 * Simple hook for managing policies using native fetch + useState
 * No TanStack Query, no complex dependencies - just straightforward React patterns
 *
 * @param filters - Optional filters to apply to policy list
 * @returns Object containing policies, loading state, and mutation functions
 *
 * @example
 * ```tsx
 * function PolicyList() {
 *   const { policies, isLoading, createPolicy, deletePolicy } = usePolicies();
 *
 *   if (isLoading) return <div>Loading...</div>;
 *
 *   return (
 *     <div>
 *       {policies.map(policy => (
 *         <div key={policy.id}>
 *           {policy.policyId}
 *           <button onClick={() => deletePolicy(policy.id)}>Delete</button>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function usePolicies(filters?: PolicyFilters): UsePoliciesResult {
  const client = useABACClient();
  const policyService = useMemo(() => new PolicyService(client), [client]);

  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPolicies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await policyService.list(filters);
      setPolicies(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch policies');
      setError(error);
      console.error('Failed to fetch policies:', error);
    } finally {
      setIsLoading(false);
    }
  }, [policyService, filters]);

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  const createPolicy = useCallback(
    async (policy: PolicyInput): Promise<Policy> => {
      setIsLoading(true);
      setError(null);
      try {
        const created = await policyService.create(policy);
        setPolicies((prev: Policy[]) => [...prev, created]);
        return created;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to create policy');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [policyService]
  );

  const updatePolicy = useCallback(
    async (id: string, policy: PolicyUpdate): Promise<Policy> => {
      setIsLoading(true);
      setError(null);
      try {
        const updated = await policyService.update(id, policy);
        setPolicies((prev: Policy[]) => prev.map((p: Policy) => (p.id === id ? updated : p)));
        return updated;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to update policy');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [policyService]
  );

  const deletePolicy = useCallback(
    async (id: string): Promise<void> => {
      setIsLoading(true);
      setError(null);
      try {
        await policyService.delete(id);
        setPolicies((prev: Policy[]) => prev.filter((p: Policy) => p.id !== id));
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to delete policy');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [policyService]
  );

  const activatePolicy = useCallback(
    async (id: string): Promise<Policy> => {
      setIsLoading(true);
      setError(null);
      try {
        const activated = await policyService.activate(id);
        setPolicies((prev: Policy[]) => prev.map((p: Policy) => (p.id === id ? activated : p)));
        return activated;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to activate policy');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [policyService]
  );

  const deactivatePolicy = useCallback(
    async (id: string): Promise<Policy> => {
      setIsLoading(true);
      setError(null);
      try {
        const deactivated = await policyService.deactivate(id);
        setPolicies((prev: Policy[]) => prev.map((p: Policy) => (p.id === id ? deactivated : p)));
        return deactivated;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to deactivate policy');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [policyService]
  );

  return {
    policies,
    isLoading,
    error,
    refetch: fetchPolicies,
    createPolicy,
    updatePolicy,
    deletePolicy,
    activatePolicy,
    deactivatePolicy
  };
}

/**
 * Hook for fetching a single policy by ID
 *
 * @param id - Policy ID to fetch
 * @returns Object containing policy, loading state, and error
 *
 * @example
 * ```tsx
 * function PolicyDetails({ policyId }: { policyId: string }) {
 *   const { policy, isLoading, error, refetch } = usePolicy(policyId);
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!policy) return <div>Policy not found</div>;
 *
 *   return <div>{policy.description}</div>;
 * }
 * ```
 */
export function usePolicy(id: string) {
  const client = useABACClient();
  const policyService = useMemo(() => new PolicyService(client), [client]);

  const [policy, setPolicy] = useState<Policy | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPolicy = useCallback(async () => {
    if (!id) {
      setPolicy(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await policyService.get(id);
      setPolicy(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch policy');
      setError(error);
      console.error('Failed to fetch policy:', error);
    } finally {
      setIsLoading(false);
    }
  }, [id, policyService]);

  useEffect(() => {
    fetchPolicy();
  }, [fetchPolicy]);

  return {
    policy,
    isLoading,
    error,
    refetch: fetchPolicy
  };
}

/**
 * Hook for testing policy evaluation
 *
 * @returns Object containing testPolicy function, loading state, and result
 *
 * @example
 * ```tsx
 * function PolicyTester() {
 *   const { testPolicy, isLoading, result } = usePolicyTest();
 *
 *   const handleTest = async () => {
 *     const result = await testPolicy({
 *       policy: myPolicy,
 *       request: {
 *         subject: { role: 'admin' },
 *         action: { type: 'read' },
 *         resource: { type: 'document' }
 *       }
 *     });
 *     console.log('Decision:', result.decision);
 *   };
 *
 *   return <button onClick={handleTest}>Test Policy</button>;
 * }
 * ```
 */
export function usePolicyTest() {
  const client = useABACClient();
  const policyService = useMemo(() => new PolicyService(client), [client]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<any>(null);

  const testPolicy = useCallback(
    async (request: any) => {
      setIsLoading(true);
      setError(null);
      try {
        const testResult = await policyService.test(request);
        setResult(testResult);
        return testResult;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to test policy');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [policyService]
  );

  return {
    testPolicy,
    isLoading,
    error,
    result
  };
}

/**
 * Hook for managing policy versions
 *
 * @param policyId - Policy ID to fetch versions for
 * @returns Object containing versions, loading state, and error
 *
 * @example
 * ```tsx
 * function PolicyVersions({ policyId }: { policyId: string }) {
 *   const { versions, isLoading } = usePolicyVersions(policyId);
 *
 *   return (
 *     <div>
 *       {versions.map(version => (
 *         <div key={version.id}>{version.version}</div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function usePolicyVersions(policyId: string) {
  const client = useABACClient();
  const policyService = useMemo(() => new PolicyService(client), [client]);

  const [versions, setVersions] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchVersions = useCallback(async () => {
    if (!policyId) {
      setVersions([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await policyService.getVersions(policyId);
      setVersions(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch policy versions');
      setError(error);
      console.error('Failed to fetch policy versions:', error);
    } finally {
      setIsLoading(false);
    }
  }, [policyId, policyService]);

  useEffect(() => {
    fetchVersions();
  }, [fetchVersions]);

  return {
    versions,
    isLoading,
    error,
    refetch: fetchVersions
  };
}

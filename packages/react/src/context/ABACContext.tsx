import { ABACAdminClient, type ABACAdminConfig } from '@abac-admin/core';
import React, { createContext, useContext, useMemo } from 'react';

export interface ABACProviderProps {
  config: ABACAdminConfig;
  children: React.ReactNode;
}

const ABACClientContext = createContext<ABACAdminClient | null>(null);

/**
 * Minimal context provider - no QueryClient, no Jotai, no extra dependencies
 * Just provides the ABAC client instance to child components
 *
 * Users provide their own QueryClientProvider or state management at app level
 *
 * @example
 * ```tsx
 * import { ABACProvider } from '@abac-admin/react';
 *
 * function App() {
 *   return (
 *     <ABACProvider config={{ baseURL: '/api/abac' }}>
 *       <YourApp />
 *     </ABACProvider>
 *   );
 * }
 * ```
 */
export function ABACProvider({ config, children }: ABACProviderProps) {
  const client = useMemo(() => new ABACAdminClient(config), [
    config.baseURL,
    // Only recreate client if critical config changes
    // Headers are intentionally omitted to allow dynamic auth tokens
  ]);

  return (
    <ABACClientContext.Provider value={client}>
      {children}
    </ABACClientContext.Provider>
  );
}

/**
 * Hook to access the ABAC client instance
 * Must be used within an ABACProvider
 *
 * @throws {Error} If used outside of ABACProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const client = useABACClient();
 *   // Use client directly or create service instances
 * }
 * ```
 */
export function useABACClient(): ABACAdminClient {
  const client = useContext(ABACClientContext);

  if (!client) {
    throw new Error(
      'useABACClient must be used within ABACProvider. ' +
      'Wrap your component tree with <ABACProvider config={{...}}>...</ABACProvider>'
    );
  }

  return client;
}

/**
 * Hook to check if component is within ABACProvider
 * Useful for optional ABAC functionality
 *
 * @returns {boolean} True if within ABACProvider, false otherwise
 */
export function useIsABACAvailable(): boolean {
  const client = useContext(ABACClientContext);
  return client !== null;
}

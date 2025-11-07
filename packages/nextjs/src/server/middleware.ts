import { NextRequest, NextResponse } from "next/server";

/**
 * Authentication context extracted from request
 */
export interface AuthContext {
  userId: string;
  roles?: string[];
  permissions?: string[];
  sessionId?: string;
  [key: string]: any;
}

/**
 * Middleware configuration options
 */
export interface MiddlewareConfig {
  /**
   * Function to extract authentication context from request
   * Should return null if user is not authenticated
   */
  getAuthContext: (request: NextRequest) => Promise<AuthContext | null>;

  /**
   * Optional function to check if user is authorized
   * Return true to allow, false to deny
   */
  authorize?: (context: AuthContext, request: NextRequest) => Promise<boolean>;

  /**
   * Optional custom unauthorized response
   */
  onUnauthorized?: (request: NextRequest) => NextResponse;

  /**
   * Optional custom forbidden response
   */
  onForbidden?: (context: AuthContext, request: NextRequest) => NextResponse;

  /**
   * Optional request logger
   */
  onRequest?: (context: AuthContext | null, request: NextRequest) => void;
}

/**
 * Creates an authentication middleware for Next.js API routes
 *
 * @param config - Middleware configuration
 * @returns Middleware function that can wrap route handlers
 *
 * @example
 * ```ts
 * // lib/middleware.ts
 * import { createAuthMiddleware } from '@abac-admin/nextjs/server';
 * import { cookies } from 'next/headers';
 *
 * export const authMiddleware = createAuthMiddleware({
 *   getAuthContext: async (request) => {
 *     const token = cookies().get('session')?.value;
 *     if (!token) return null;
 *
 *     const session = await verifyToken(token);
 *     return {
 *       userId: session.userId,
 *       roles: session.roles
 *     };
 *   },
 *   authorize: async (context, request) => {
 *     // Check if user has required role
 *     return context.roles?.includes('admin') ?? false;
 *   }
 * });
 *
 * // app/api/policies/route.ts
 * import { authMiddleware } from '@/lib/middleware';
 *
 * export const GET = authMiddleware(async (request, context) => {
 *   // context.userId is available here
 *   return Response.json({ userId: context.userId });
 * });
 * ```
 */
export function createAuthMiddleware(config: MiddlewareConfig) {
  return function withAuth<T extends any[]>(
    handler: (
      request: NextRequest,
      context: AuthContext,
      ...args: T
    ) => Promise<NextResponse>
  ) {
    return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
      try {
        // Extract auth context
        const authContext = await config.getAuthContext(request);

        // Log request if logger is provided
        if (config.onRequest) {
          config.onRequest(authContext, request);
        }

        // Check authentication
        if (!authContext) {
          if (config.onUnauthorized) {
            return config.onUnauthorized(request);
          }
          return NextResponse.json(
            { error: "Unauthorized - Authentication required" },
            { status: 401 }
          );
        }

        // Check authorization if authorize function is provided
        if (config.authorize) {
          const isAuthorized = await config.authorize(authContext, request);
          if (!isAuthorized) {
            if (config.onForbidden) {
              return config.onForbidden(authContext, request);
            }
            return NextResponse.json(
              { error: "Forbidden - Insufficient permissions" },
              { status: 403 }
            );
          }
        }

        // Call the actual handler with auth context
        return await handler(request, authContext, ...args);
      } catch (error) {
        console.error("Middleware error:", error);
        return NextResponse.json(
          {
            error:
              error instanceof Error
                ? error.message
                : "Internal server error",
          },
          { status: 500 }
        );
      }
    };
  };
}

/**
 * Role-based authorization helper
 *
 * @param allowedRoles - Array of roles that are allowed
 * @returns Authorization function
 *
 * @example
 * ```ts
 * const authMiddleware = createAuthMiddleware({
 *   getAuthContext: async (request) => { ... },
 *   authorize: requireRoles(['admin', 'manager'])
 * });
 * ```
 */
export function requireRoles(allowedRoles: string[]) {
  return async (context: AuthContext): Promise<boolean> => {
    if (!context.roles || context.roles.length === 0) {
      return false;
    }
    return context.roles.some((role) => allowedRoles.includes(role));
  };
}

/**
 * Permission-based authorization helper
 *
 * @param requiredPermissions - Array of permissions that are required (all must be present)
 * @returns Authorization function
 *
 * @example
 * ```ts
 * const authMiddleware = createAuthMiddleware({
 *   getAuthContext: async (request) => { ... },
 *   authorize: requirePermissions(['policies:read', 'policies:write'])
 * });
 * ```
 */
export function requirePermissions(requiredPermissions: string[]) {
  return async (context: AuthContext): Promise<boolean> => {
    if (!context.permissions || context.permissions.length === 0) {
      return false;
    }
    return requiredPermissions.every((perm) =>
      context.permissions!.includes(perm)
    );
  };
}

/**
 * Combine multiple authorization functions with AND logic
 *
 * @param authFunctions - Array of authorization functions
 * @returns Combined authorization function
 *
 * @example
 * ```ts
 * const authMiddleware = createAuthMiddleware({
 *   getAuthContext: async (request) => { ... },
 *   authorize: combineAuthAnd([
 *     requireRoles(['admin']),
 *     requirePermissions(['policies:write'])
 *   ])
 * });
 * ```
 */
export function combineAuthAnd(
  authFunctions: Array<
    (context: AuthContext, request: NextRequest) => Promise<boolean>
  >
) {
  return async (
    context: AuthContext,
    request: NextRequest
  ): Promise<boolean> => {
    for (const fn of authFunctions) {
      const result = await fn(context, request);
      if (!result) return false;
    }
    return true;
  };
}

/**
 * Combine multiple authorization functions with OR logic
 *
 * @param authFunctions - Array of authorization functions
 * @returns Combined authorization function
 *
 * @example
 * ```ts
 * const authMiddleware = createAuthMiddleware({
 *   getAuthContext: async (request) => { ... },
 *   authorize: combineAuthOr([
 *     requireRoles(['admin']),
 *     requireRoles(['manager'])
 *   ])
 * });
 * ```
 */
export function combineAuthOr(
  authFunctions: Array<
    (context: AuthContext, request: NextRequest) => Promise<boolean>
  >
) {
  return async (
    context: AuthContext,
    request: NextRequest
  ): Promise<boolean> => {
    for (const fn of authFunctions) {
      const result = await fn(context, request);
      if (result) return true;
    }
    return false;
  };
}

/**
 * Simple request logger middleware
 *
 * @param includeBody - Whether to log request body
 * @returns Logger function
 *
 * @example
 * ```ts
 * const authMiddleware = createAuthMiddleware({
 *   getAuthContext: async (request) => { ... },
 *   onRequest: createRequestLogger(false)
 * });
 * ```
 */
export function createRequestLogger(includeBody: boolean = false) {
  return (context: AuthContext | null, request: NextRequest) => {
    const timestamp = new Date().toISOString();
    const userId = context?.userId ?? "anonymous";
    const method = request.method;
    const url = request.url;

    console.log(`[${timestamp}] ${method} ${url} - User: ${userId}`);

    if (includeBody && (method === "POST" || method === "PUT")) {
      request
        .clone()
        .json()
        .then((body) => {
          console.log(`[${timestamp}] Body:`, JSON.stringify(body));
        })
        .catch(() => {
          // Ignore body parsing errors
        });
    }
  };
}

/**
 * Rate limiting helper (simple in-memory implementation)
 * For production, use a proper rate limiting solution like Redis
 *
 * @param maxRequests - Maximum requests per window
 * @param windowMs - Time window in milliseconds
 * @returns Authorization function
 *
 * @example
 * ```ts
 * const authMiddleware = createAuthMiddleware({
 *   getAuthContext: async (request) => { ... },
 *   authorize: createRateLimiter(100, 60000) // 100 requests per minute
 * });
 * ```
 */
export function createRateLimiter(maxRequests: number, windowMs: number) {
  const requests = new Map<
    string,
    { count: number; resetTime: number }
  >();

  return async (context: AuthContext): Promise<boolean> => {
    const userId = context.userId;
    const now = Date.now();

    // Clean up old entries
    for (const [key, value] of requests.entries()) {
      if (value.resetTime < now) {
        requests.delete(key);
      }
    }

    const userLimit = requests.get(userId);

    if (!userLimit || userLimit.resetTime < now) {
      // Start new window
      requests.set(userId, {
        count: 1,
        resetTime: now + windowMs,
      });
      return true;
    }

    if (userLimit.count >= maxRequests) {
      return false;
    }

    userLimit.count++;
    return true;
  };
}

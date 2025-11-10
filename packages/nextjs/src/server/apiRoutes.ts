import {
  AttributeService,
  AuditService,
  PolicyService,
  type ABACAdminClient,
  type AuditLogFilter,
  type PolicyFilters,
  type PolicyInput,
  type PolicyUpdate,
  type ResourceType,
} from "@devcraft-ts/abac-admin-core";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/**
 * Error response helper
 */
function errorResponse(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Success response helper
 */
function successResponse(data: any, status: number = 200) {
  return NextResponse.json(data, { status });
}

/**
 * Parse and validate request body with Zod schema
 */
async function parseBody<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>,
): Promise<{ data: T; error: null } | { data: null; error: NextResponse }> {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    return { data, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        data: null,
        error: errorResponse(
          `Validation error: ${error.errors.map((e) => e.message).join(", ")}`,
          400,
        ),
      };
    }
    return {
      data: null,
      error: errorResponse("Invalid request body", 400),
    };
  }
}

/**
 * Get search params from URL
 */
function getSearchParams(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  return Object.fromEntries(searchParams.entries());
}

// ============================================================================
// POLICY ROUTES
// ============================================================================

export interface PolicyRouteHandlers {
  GET: (request: NextRequest) => Promise<NextResponse>;
  POST: (request: NextRequest) => Promise<NextResponse>;
  PUT: (
    request: NextRequest,
    context: { params: { id: string } },
  ) => Promise<NextResponse>;
  DELETE: (
    request: NextRequest,
    context: { params: { id: string } },
  ) => Promise<NextResponse>;
  PATCH: (
    request: NextRequest,
    context: { params: { id: string; action: string } },
  ) => Promise<NextResponse>;
}

/**
 * Creates Next.js route handlers for policy management
 *
 * @param getClient - Function that returns an ABACAdminClient instance (supports dynamic auth)
 * @returns Object with GET, POST, PUT, DELETE, PATCH route handlers
 *
 * @example
 * ```ts
 * // app/api/abac/policies/route.ts
 * import { createPolicyRoutes } from '@abac-admin/nextjs/server';
 * import { ABACAdminClient } from '@devcraft-ts/abac-admin-core';
 *
 * const getClient = () => new ABACAdminClient({
 *   baseURL: process.env.ABAC_API_URL!,
 *   headers: {
 *     'Authorization': `Bearer ${getServerToken()}`
 *   }
 * });
 *
 * export const { GET, POST } = createPolicyRoutes(getClient);
 * ```
 */
export function createPolicyRoutes(
  getClient: () => ABACAdminClient,
): PolicyRouteHandlers {
  const PolicyInputSchema = z.object({
    policyId: z.string().min(1),
    version: z.string().min(1),
    effect: z.enum(["PERMIT", "DENY"]),
    description: z.string().optional(),
    conditions: z.any(),
    isActive: z.boolean().default(true),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    createdBy: z.string().min(1),
  });

  const PolicyUpdateSchema = z.object({
    version: z.string().optional(),
    effect: z.enum(["PERMIT", "DENY"]).optional(),
    description: z.string().optional(),
    conditions: z.any().optional(),
    isActive: z.boolean().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
  });

  return {
    /**
     * GET /api/policies - List all policies with optional filters
     * GET /api/policies?isActive=true&category=document
     */
    async GET(request: NextRequest) {
      try {
        const client = getClient();
        const policyService = new PolicyService(client);
        const params = getSearchParams(request);

        const filters: PolicyFilters = {
          isActive: params.isActive === "true" ? true : undefined,
          category: params.category,
          tags: params.tags?.split(","),
        };

        const policies = await policyService.list(filters);
        return successResponse(policies);
      } catch (error) {
        console.error("Failed to fetch policies:", error);
        return errorResponse(
          error instanceof Error ? error.message : "Failed to fetch policies",
          500,
        );
      }
    },

    /**
     * POST /api/policies - Create a new policy
     */
    async POST(request: NextRequest) {
      try {
        const { data, error } = await parseBody(request, PolicyInputSchema);
        if (error) return error;

        const client = getClient();
        const policyService = new PolicyService(client);
        const policy = await policyService.create(data as PolicyInput);

        return successResponse(policy, 201);
      } catch (error) {
        console.error("Failed to create policy:", error);
        return errorResponse(
          error instanceof Error ? error.message : "Failed to create policy",
          500,
        );
      }
    },

    /**
     * PUT /api/policies/[id] - Update a policy
     */
    async PUT(request: NextRequest, { params }: { params: { id: string } }) {
      try {
        const { id } = params;
        if (!id) {
          return errorResponse("Policy ID is required", 400);
        }

        const { data, error } = await parseBody(request, PolicyUpdateSchema);
        if (error) return error;

        const client = getClient();
        const policyService = new PolicyService(client);
        const policy = await policyService.update(id, data as PolicyUpdate);

        return successResponse(policy);
      } catch (error) {
        console.error("Failed to update policy:", error);
        return errorResponse(
          error instanceof Error ? error.message : "Failed to update policy",
          500,
        );
      }
    },

    /**
     * DELETE /api/policies/[id] - Delete a policy
     */
    async DELETE(
      _request: NextRequest,
      { params }: { params: { id: string } },
    ) {
      try {
        const { id } = params;
        if (!id) {
          return errorResponse("Policy ID is required", 400);
        }

        const client = getClient();
        const policyService = new PolicyService(client);
        await policyService.delete(id);

        return successResponse({ message: "Policy deleted successfully" });
      } catch (error) {
        console.error("Failed to delete policy:", error);
        return errorResponse(
          error instanceof Error ? error.message : "Failed to delete policy",
          500,
        );
      }
    },

    /**
     * PATCH /api/policies/[id]/[action] - Perform actions (activate, deactivate)
     */
    async PATCH(
      _request: NextRequest,
      { params }: { params: { id: string; action: string } },
    ) {
      try {
        const { id, action } = params;
        if (!id || !action) {
          return errorResponse("Policy ID and action are required", 400);
        }

        const client = getClient();
        const policyService = new PolicyService(client);

        let policy;
        switch (action) {
          case "activate":
            policy = await policyService.activate(id);
            break;
          case "deactivate":
            policy = await policyService.deactivate(id);
            break;
          default:
            return errorResponse(`Unknown action: ${action}`, 400);
        }

        return successResponse(policy);
      } catch (error) {
        console.error("Failed to perform policy action:", error);
        return errorResponse(
          error instanceof Error ? error.message : "Failed to perform action",
          500,
        );
      }
    },
  };
}

// ============================================================================
// ATTRIBUTE ROUTES
// ============================================================================

export interface AttributeRouteHandlers {
  GET: (
    request: NextRequest,
    context: { params: { resourceType: ResourceType; resourceId: string } },
  ) => Promise<NextResponse>;
  POST: (
    request: NextRequest,
    context: { params: { resourceType: ResourceType; resourceId: string } },
  ) => Promise<NextResponse>;
  DELETE: (
    request: NextRequest,
    context: {
      params: { resourceType: ResourceType; resourceId: string; key: string };
    },
  ) => Promise<NextResponse>;
}

/**
 * Creates Next.js route handlers for attribute management
 *
 * @param getClient - Function that returns an ABACAdminClient instance
 * @returns Object with GET, POST, DELETE route handlers
 *
 * @example
 * ```ts
 * // app/api/abac/attributes/[resourceType]/[resourceId]/route.ts
 * import { createAttributeRoutes } from '@abac-admin/nextjs/server';
 *
 * export const { GET, POST } = createAttributeRoutes(getClient);
 * ```
 */
export function createAttributeRoutes(
  getClient: () => ABACAdminClient,
): AttributeRouteHandlers {
  const AttributeSetSchema = z.object({
    key: z.string().min(1).optional(),
    value: z.any().optional(),
    attributes: z.record(z.any()).optional(),
  });

  return {
    /**
     * GET /api/attributes/[resourceType]/[resourceId] - Get all attributes
     * GET /api/attributes/[resourceType]/[resourceId]?key=role - Get single attribute
     */
    async GET(
      request: NextRequest,
      {
        params,
      }: { params: { resourceType: ResourceType; resourceId: string } },
    ) {
      try {
        const { resourceType, resourceId } = params;
        const searchParams = getSearchParams(request);
        const key = searchParams.key;

        const client = getClient();
        const attributeService = new AttributeService(client);

        if (key) {
          const value = await attributeService.getResourceAttribute(
            resourceType,
            resourceId,
            key,
          );
          return successResponse({ key, value });
        } else {
          const attributes = await attributeService.getResourceAttributes(
            resourceType,
            resourceId,
          );
          return successResponse(attributes);
        }
      } catch (error) {
        console.error("Failed to fetch attributes:", error);
        return errorResponse(
          error instanceof Error ? error.message : "Failed to fetch attributes",
          500,
        );
      }
    },

    /**
     * POST /api/attributes/[resourceType]/[resourceId] - Set attribute(s)
     * Body: { key: "role", value: "admin" } OR { attributes: { role: "admin", level: 5 } }
     */
    async POST(
      request: NextRequest,
      {
        params,
      }: { params: { resourceType: ResourceType; resourceId: string } },
    ) {
      try {
        const { resourceType, resourceId } = params;
        const { data, error } = await parseBody(request, AttributeSetSchema);
        if (error) return error;

        const client = getClient();
        const attributeService = new AttributeService(client);

        if (data.key && data.value !== undefined) {
          // Set single attribute
          const result = await attributeService.setResourceAttribute(
            resourceType,
            resourceId,
            data.key,
            data.value,
          );
          return successResponse(result, 201);
        } else if (data.attributes) {
          // Bulk set attributes
          const results = await attributeService.bulkSetAttributes(
            resourceType,
            resourceId,
            data.attributes,
          );
          return successResponse(results, 201);
        } else {
          return errorResponse(
            "Either 'key' and 'value' or 'attributes' must be provided",
            400,
          );
        }
      } catch (error) {
        console.error("Failed to set attributes:", error);
        return errorResponse(
          error instanceof Error ? error.message : "Failed to set attributes",
          500,
        );
      }
    },

    /**
     * DELETE /api/attributes/[resourceType]/[resourceId]/[key] - Delete attribute
     */
    async DELETE(
      _request: NextRequest,
      {
        params,
      }: {
        params: { resourceType: ResourceType; resourceId: string; key: string };
      },
    ) {
      try {
        const { resourceType, resourceId, key } = params;

        const client = getClient();
        const attributeService = new AttributeService(client);
        await attributeService.deleteResourceAttribute(
          resourceType,
          resourceId,
          key,
        );

        return successResponse({ message: "Attribute deleted successfully" });
      } catch (error) {
        console.error("Failed to delete attribute:", error);
        return errorResponse(
          error instanceof Error ? error.message : "Failed to delete attribute",
          500,
        );
      }
    },
  };
}

// ============================================================================
// AUDIT ROUTES
// ============================================================================

export interface AuditRouteHandlers {
  GET: (request: NextRequest) => Promise<NextResponse>;
}

/**
 * Creates Next.js route handlers for audit log access
 *
 * @param getClient - Function that returns an ABACAdminClient instance
 * @returns Object with GET route handler
 *
 * @example
 * ```ts
 * // app/api/abac/audit/route.ts
 * import { createAuditRoutes } from '@abac-admin/nextjs/server';
 *
 * export const { GET } = createAuditRoutes(getClient);
 * ```
 */
export function createAuditRoutes(
  getClient: () => ABACAdminClient,
): AuditRouteHandlers {
  return {
    /**
     * GET /api/audit - Get audit logs with filters
     * GET /api/audit?entityType=policy&action=UPDATE&limit=50
     */
    async GET(request: NextRequest) {
      try {
        const client = getClient();
        const auditService = new AuditService(client);
        const params = getSearchParams(request);

        const filters: AuditLogFilter = {
          entityType: params.entityType as any,
          entityId: params.entityId,
          action: params.action as any,
          userId: params.userId,
          startDate: params.startDate,
          endDate: params.endDate,
          limit: params.limit ? parseInt(params.limit) : undefined,
          offset: params.offset ? parseInt(params.offset) : undefined,
        };

        const auditLog = await auditService.getAuditLog(filters);
        return successResponse(auditLog);
      } catch (error) {
        console.error("Failed to fetch audit log:", error);
        return errorResponse(
          error instanceof Error ? error.message : "Failed to fetch audit log",
          500,
        );
      }
    },
  };
}

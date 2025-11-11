import type { ABACPolicy as Policy } from "abac-engine";
import type { ABACAdminClient } from "./client";

// Admin UI extensions for policy management
export interface PolicyInput {
  version: string;
  description?: string;
  target?: Policy["target"];
  condition?: Policy["condition"];
  effect: Policy["effect"];
  priority?: number;
  obligations?: Policy["obligations"];
  advice?: Policy["advice"];
  metadata?: Policy["metadata"];
}

export interface PolicyUpdate extends Partial<PolicyInput> {}

export interface PolicyFilters {
  category?: string;
  isActive?: boolean;
  tags?: string[];
  search?: string;
}

export interface PolicyTestRequest {
  policy: Policy;
  request: {
    subject: Record<string, any>;
    action: Record<string, any>;
    resource: Record<string, any>;
    environment?: Record<string, any>;
  };
}

export interface PolicyTestResult {
  decision: "Permit" | "Deny";
  matchedPolicies: string[];
  evaluationTime: number;
  details?: Record<string, any>;
}

export interface PolicyExportResult {
  policies: Policy[];
  exportedAt: string;
  count: number;
}

export interface PolicyImportResult {
  imported: number;
  failed: number;
  errors?: Array<{
    policyId: string;
    error: string;
  }>;
}

export class PolicyService {
  constructor(private client: ABACAdminClient) {}

  async list(filters?: PolicyFilters): Promise<Policy[]> {
    const params: Record<string, string> = {};
    if (filters?.category) params.category = filters.category;
    if (filters?.isActive !== undefined)
      params.isActive = String(filters.isActive);
    if (filters?.search) params.search = filters.search;
    if (filters?.tags) params.tags = filters.tags.join(",");

    const data = await this.client.get<Policy[]>("/policies", params);
    return data;
  }

  async get(id: string): Promise<Policy> {
    return this.client.get<Policy>(`/policies/${id}`);
  }

  async create(policy: PolicyInput): Promise<Policy> {
    return this.client.post<Policy>("/policies", policy);
  }

  async update(id: string, policy: PolicyUpdate): Promise<Policy> {
    return this.client.put<Policy>(`/policies/${id}`, policy);
  }

  async delete(id: string): Promise<void> {
    await this.client.delete(`/policies/${id}`);
  }

  async activate(id: string): Promise<Policy> {
    return this.client.patch<Policy>(`/policies/${id}/activate`, {});
  }

  async deactivate(id: string): Promise<Policy> {
    return this.client.patch<Policy>(`/policies/${id}/deactivate`, {});
  }

  async test(request: PolicyTestRequest): Promise<PolicyTestResult> {
    return this.client.post<PolicyTestResult>("/policies/test", request);
  }

  async getVersions(policyId: string): Promise<Policy[]> {
    return this.client.get<Policy[]>(`/policies/${policyId}/versions`);
  }

  async export(ids?: string[]): Promise<PolicyExportResult> {
    const params: Record<string, string> = ids ? { ids: ids.join(",") } : {};
    return this.client.get<PolicyExportResult>("/policies/export", params);
  }

  async import(file: File | Blob): Promise<PolicyImportResult> {
    const formData = new FormData();
    formData.append("file", file);
    return this.client.post<PolicyImportResult>("/policies/import", formData);
  }

  async duplicate(id: string, newPolicyId?: string): Promise<Policy> {
    return this.client.post<Policy>(`/policies/${id}/duplicate`, {
      newPolicyId,
    });
  }

  async bulkActivate(
    ids: string[],
  ): Promise<{ success: number; failed: number }> {
    return this.client.post<{ success: number; failed: number }>(
      "/policies/bulk/activate",
      { ids },
    );
  }

  async bulkDeactivate(
    ids: string[],
  ): Promise<{ success: number; failed: number }> {
    return this.client.post<{ success: number; failed: number }>(
      "/policies/bulk/deactivate",
      { ids },
    );
  }

  async bulkDelete(
    ids: string[],
  ): Promise<{ success: number; failed: number }> {
    return this.client.post<{ success: number; failed: number }>(
      "/policies/bulk/delete",
      { ids },
    );
  }

  async search(query: string, filters?: PolicyFilters): Promise<Policy[]> {
    const params: Record<string, string> = { q: query };
    if (filters?.category) params.category = filters.category;
    if (filters?.isActive !== undefined)
      params.isActive = String(filters.isActive);
    if (filters?.tags) params.tags = filters.tags.join(",");

    return this.client.get<Policy[]>("/policies/search", params);
  }
}

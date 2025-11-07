import type { Policy, PolicyInput, PolicyUpdate } from '../schemas/policy';
import { PolicySchema } from '../schemas/policy';
import type { ABACAdminClient } from './client';

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
  decision: 'Permit' | 'Deny';
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
    if (filters?.tags) params.tags = filters.tags.join(',');

    const data = await this.client.get<unknown[]>('/policies', params);
    return data.map(item => PolicySchema.parse(item));
  }

  async get(id: string): Promise<Policy> {
    const data = await this.client.get<unknown>(`/policies/${id}`);
    return PolicySchema.parse(data);
  }

  async create(policy: PolicyInput): Promise<Policy> {
    const data = await this.client.post<unknown>('/policies', policy);
    return PolicySchema.parse(data);
  }

  async update(id: string, policy: PolicyUpdate): Promise<Policy> {
    const data = await this.client.put<unknown>(`/policies/${id}`, policy);
    return PolicySchema.parse(data);
  }

  async delete(id: string): Promise<void> {
    await this.client.delete(`/policies/${id}`);
  }

  async activate(id: string): Promise<Policy> {
    const data = await this.client.patch<unknown>(
      `/policies/${id}/activate`,
      {}
    );
    return PolicySchema.parse(data);
  }

  async deactivate(id: string): Promise<Policy> {
    const data = await this.client.patch<unknown>(
      `/policies/${id}/deactivate`,
      {}
    );
    return PolicySchema.parse(data);
  }

  async test(request: PolicyTestRequest): Promise<PolicyTestResult> {
    return this.client.post<PolicyTestResult>('/policies/test', request);
  }

  async getVersions(policyId: string): Promise<Policy[]> {
    const data = await this.client.get<unknown[]>(
      `/policies/${policyId}/versions`
    );
    return data.map(item => PolicySchema.parse(item));
  }

  async export(ids?: string[]): Promise<PolicyExportResult> {
    const params: Record<string, string> = ids ? { ids: ids.join(',') } : {};
    return this.client.get<PolicyExportResult>('/policies/export', params);
  }

  async import(file: File | Blob): Promise<PolicyImportResult> {
    const formData = new FormData();
    formData.append('file', file);
    return this.client.post<PolicyImportResult>('/policies/import', formData);
  }

  async duplicate(id: string, newPolicyId?: string): Promise<Policy> {
    const data = await this.client.post<unknown>(`/policies/${id}/duplicate`, {
      newPolicyId
    });
    return PolicySchema.parse(data);
  }

  async bulkActivate(ids: string[]): Promise<{ success: number; failed: number }> {
    return this.client.post<{ success: number; failed: number }>(
      '/policies/bulk/activate',
      { ids }
    );
  }

  async bulkDeactivate(ids: string[]): Promise<{ success: number; failed: number }> {
    return this.client.post<{ success: number; failed: number }>(
      '/policies/bulk/deactivate',
      { ids }
    );
  }

  async bulkDelete(ids: string[]): Promise<{ success: number; failed: number }> {
    return this.client.post<{ success: number; failed: number }>(
      '/policies/bulk/delete',
      { ids }
    );
  }

  async search(query: string, filters?: PolicyFilters): Promise<Policy[]> {
    const params: Record<string, string> = { q: query };
    if (filters?.category) params.category = filters.category;
    if (filters?.isActive !== undefined)
      params.isActive = String(filters.isActive);
    if (filters?.tags) params.tags = filters.tags.join(',');

    const data = await this.client.get<unknown[]>('/policies/search', params);
    return data.map(item => PolicySchema.parse(item));
  }
}

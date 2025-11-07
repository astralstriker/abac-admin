import type { AuditLogEntry, AuditLogFilter } from '../schemas/audit';
import { AuditLogEntrySchema } from '../schemas/audit';
import type { ABACAdminClient } from './client';

export interface AuditLogResponse {
  entries: AuditLogEntry[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface AuditStatistics {
  totalEntries: number;
  byAction: Record<string, number>;
  byEntityType: Record<string, number>;
  byUser: Record<string, number>;
  recentActivity: Array<{
    date: string;
    count: number;
  }>;
}

export class AuditService {
  constructor(private client: ABACAdminClient) {}

  async getAuditLog(filters?: AuditLogFilter): Promise<AuditLogResponse> {
    const params: Record<string, string> = {};
    if (filters?.entityType) params.entityType = filters.entityType;
    if (filters?.entityId) params.entityId = filters.entityId;
    if (filters?.userId) params.userId = filters.userId;
    if (filters?.action) params.action = filters.action;
    if (filters?.startDate) params.startDate = filters.startDate;
    if (filters?.endDate) params.endDate = filters.endDate;
    if (filters?.limit) params.limit = String(filters.limit);
    if (filters?.offset) params.offset = String(filters.offset);

    const response = await this.client.get<{
      entries: unknown[];
      total: number;
      limit: number;
      offset: number;
      hasMore: boolean;
    }>('/audit', params);

    return {
      ...response,
      entries: response.entries.map(item => AuditLogEntrySchema.parse(item))
    };
  }

  async getEntityHistory(
    entityType: 'policy' | 'attribute',
    entityId: string,
    limit?: number
  ): Promise<AuditLogEntry[]> {
    const params: Record<string, string> = {};
    if (limit) params.limit = String(limit);

    const data = await this.client.get<unknown[]>(
      `/audit/${entityType}/${entityId}`,
      params
    );
    return data.map(item => AuditLogEntrySchema.parse(item));
  }

  async getUserActivity(
    userId: string,
    options?: {
      startDate?: string;
      endDate?: string;
      limit?: number;
      offset?: number;
    }
  ): Promise<AuditLogResponse> {
    const params: Record<string, string> = { userId };
    if (options?.startDate) params.startDate = options.startDate;
    if (options?.endDate) params.endDate = options.endDate;
    if (options?.limit) params.limit = String(options.limit);
    if (options?.offset) params.offset = String(options.offset);

    const response = await this.client.get<{
      entries: unknown[];
      total: number;
      limit: number;
      offset: number;
      hasMore: boolean;
    }>('/audit/user', params);

    return {
      ...response,
      entries: response.entries.map(item => AuditLogEntrySchema.parse(item))
    };
  }

  async getStatistics(
    startDate?: string,
    endDate?: string
  ): Promise<AuditStatistics> {
    const params: Record<string, string> = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    return this.client.get<AuditStatistics>('/audit/statistics', params);
  }

  async exportAuditLog(
    filters?: AuditLogFilter,
    format: 'json' | 'csv' = 'json'
  ): Promise<Blob> {
    const params: Record<string, string> = { format };
    if (filters?.entityType) params.entityType = filters.entityType;
    if (filters?.entityId) params.entityId = filters.entityId;
    if (filters?.userId) params.userId = filters.userId;
    if (filters?.action) params.action = filters.action;
    if (filters?.startDate) params.startDate = filters.startDate;
    if (filters?.endDate) params.endDate = filters.endDate;

    return this.client.get<Blob>('/audit/export', params);
  }

  async compareVersions(
    entityType: 'policy' | 'attribute',
    entityId: string,
    version1: string,
    version2: string
  ): Promise<{
    oldValue: any;
    newValue: any;
    differences: Array<{
      path: string;
      oldValue: any;
      newValue: any;
    }>;
  }> {
    return this.client.get<{
      oldValue: any;
      newValue: any;
      differences: Array<{
        path: string;
        oldValue: any;
        newValue: any;
      }>;
    }>(`/audit/${entityType}/${entityId}/compare`, {
      v1: version1,
      v2: version2
    });
  }

  async getRecentActivity(limit: number = 10): Promise<AuditLogEntry[]> {
    const data = await this.client.get<unknown[]>('/audit/recent', {
      limit: String(limit)
    });
    return data.map(item => AuditLogEntrySchema.parse(item));
  }
}

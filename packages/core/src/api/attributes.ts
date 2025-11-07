import type {
    AttributeValue,
    BulkAttributeInput,
    ResourceType
} from '../schemas/attribute';
import { AttributeValueSchema } from '../schemas/attribute';
import type { ABACAdminClient } from './client';

export interface AttributeHistoryOptions {
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}

export interface BulkAttributeResult {
  success: number;
  failed: number;
  errors?: Array<{
    key: string;
    error: string;
  }>;
}

export class AttributeService {
  constructor(private client: ABACAdminClient) {}

  async getResourceAttributes(
    resourceType: ResourceType,
    resourceId: string
  ): Promise<Record<string, any>> {
    return this.client.get<Record<string, any>>(
      `/attributes/${resourceType}/${resourceId}`
    );
  }

  async getResourceAttribute(
    resourceType: ResourceType,
    resourceId: string,
    key: string
  ): Promise<any> {
    const data = await this.client.get<{ value: any }>(
      `/attributes/${resourceType}/${resourceId}/${key}`
    );
    return data.value;
  }

  async setResourceAttribute(
    resourceType: ResourceType,
    resourceId: string,
    key: string,
    value: any
  ): Promise<AttributeValue> {
    const data = await this.client.put<unknown>(
      `/attributes/${resourceType}/${resourceId}/${key}`,
      { value }
    );
    return AttributeValueSchema.parse(data);
  }

  async bulkSetAttributes(
    resourceType: ResourceType,
    resourceId: string,
    attributes: BulkAttributeInput
  ): Promise<AttributeValue[]> {
    const data = await this.client.put<unknown[]>(
      `/attributes/${resourceType}/${resourceId}`,
      attributes
    );
    return data.map(item => AttributeValueSchema.parse(item));
  }

  async deleteResourceAttribute(
    resourceType: ResourceType,
    resourceId: string,
    key: string
  ): Promise<void> {
    await this.client.delete(
      `/attributes/${resourceType}/${resourceId}/${key}`
    );
  }

  async bulkDeleteAttributes(
    resourceType: ResourceType,
    resourceId: string,
    keys: string[]
  ): Promise<BulkAttributeResult> {
    return this.client.post<BulkAttributeResult>(
      `/attributes/${resourceType}/${resourceId}/bulk-delete`,
      { keys }
    );
  }

  async getHistory(
    resourceType: ResourceType,
    resourceId: string,
    key?: string,
    options?: AttributeHistoryOptions
  ): Promise<AttributeValue[]> {
    const params: Record<string, string> = {};
    if (options?.limit) params.limit = String(options.limit);
    if (options?.offset) params.offset = String(options.offset);
    if (options?.startDate) params.startDate = options.startDate;
    if (options?.endDate) params.endDate = options.endDate;

    const endpoint = key
      ? `/attributes/${resourceType}/${resourceId}/${key}/history`
      : `/attributes/${resourceType}/${resourceId}/history`;

    const data = await this.client.get<unknown[]>(endpoint, params);
    return data.map(item => AttributeValueSchema.parse(item));
  }

  async compareAttributes(
    resourceType: ResourceType,
    resourceId1: string,
    resourceId2: string
  ): Promise<{
    common: Record<string, any>;
    onlyInFirst: Record<string, any>;
    onlyInSecond: Record<string, any>;
    different: Record<string, { first: any; second: any }>;
  }> {
    return this.client.get<{
      common: Record<string, any>;
      onlyInFirst: Record<string, any>;
      onlyInSecond: Record<string, any>;
      different: Record<string, { first: any; second: any }>;
    }>(`/attributes/${resourceType}/compare`, {
      id1: resourceId1,
      id2: resourceId2
    });
  }

  async copyAttributes(
    sourceResourceType: ResourceType,
    sourceResourceId: string,
    targetResourceType: ResourceType,
    targetResourceId: string,
    keys?: string[]
  ): Promise<BulkAttributeResult> {
    return this.client.post<BulkAttributeResult>('/attributes/copy', {
      source: {
        resourceType: sourceResourceType,
        resourceId: sourceResourceId
      },
      target: {
        resourceType: targetResourceType,
        resourceId: targetResourceId
      },
      keys
    });
  }

  async validateAttribute(
    resourceType: ResourceType,
    key: string,
    value: any
  ): Promise<{ valid: boolean; errors?: string[] }> {
    return this.client.post<{ valid: boolean; errors?: string[] }>(
      `/attributes/validate`,
      {
        resourceType,
        key,
        value
      }
    );
  }

  async searchResources(
    resourceType: ResourceType,
    attributeKey: string,
    attributeValue: any
  ): Promise<string[]> {
    return this.client.get<string[]>(`/attributes/${resourceType}/search`, {
      key: attributeKey,
      value: String(attributeValue)
    });
  }
}

import { z } from "zod";

export const ResourceTypeSchema = z.enum([
  // ABAC context types
  "subject",
  "resource",
  "action",
  "environment",
  // Domain-specific resource types
  "user",
  "company",
  "bond",
  "claim",
  "approval",
  "document",
  "tender",
]);

export const AttributeValueTypeSchema = z.enum([
  "string",
  "number",
  "boolean",
  "array",
  "object",
]);

export const AttributeValueSchema = z.object({
  id: z.string(),
  resourceType: ResourceTypeSchema,
  resourceId: z.string(),
  attributeKey: z.string(),
  attributeValue: z.any(),
  valueType: AttributeValueTypeSchema,
  updatedBy: z.string(),
  updatedAt: z.string().datetime(),
});

export const AttributeDefinitionSchema = z.object({
  key: z.string(),
  label: z.string(),
  description: z.string(),
  valueType: AttributeValueTypeSchema,
  resourceTypes: z.array(ResourceTypeSchema),
  isComputed: z.boolean(),
  computeFunction: z.string().optional(),
  validationRules: z.record(z.any()).optional(),
});

export const AttributeInputSchema = AttributeValueSchema.omit({
  id: true,
  updatedAt: true,
});

export const BulkAttributeInputSchema = z.record(z.any());

export type ResourceType = z.infer<typeof ResourceTypeSchema>;
export type AttributeValueType = z.infer<typeof AttributeValueTypeSchema>;
export type AttributeValue = z.infer<typeof AttributeValueSchema>;
export type AttributeDefinition = z.infer<typeof AttributeDefinitionSchema>;
export type AttributeInput = z.infer<typeof AttributeInputSchema>;
export type BulkAttributeInput = z.infer<typeof BulkAttributeInputSchema>;

import { z } from 'zod';

export const PolicyEffectSchema = z.enum(['PERMIT', 'DENY']);

export const AttributeRefSchema = z.object({
  category: z.enum(['subject', 'resource', 'action', 'environment']),
  key: z.string()
});

export const ConditionTypeSchema = z.enum([
  'equals',
  'notEquals',
  'in',
  'notIn',
  'gte',
  'gt',
  'lte',
  'lt',
  'contains',
  'startsWith',
  'endsWith',
  'matches',
  'and',
  'or',
  'not'
]);

export const ConditionSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: ConditionTypeSchema,
    left: z
      .union([AttributeRefSchema, z.string(), z.number(), z.boolean()])
      .optional(),
    right: z
      .union([z.string(), z.number(), z.boolean(), z.array(z.any())])
      .optional(),
    nested: z.array(ConditionSchema).optional()
  })
);

export const PolicySchema = z.object({
  id: z.string(),
  policyId: z.string(),
  version: z.string(),
  effect: PolicyEffectSchema,
  description: z.string(),
  conditions: ConditionSchema,
  isActive: z.boolean(),
  category: z.string(),
  tags: z.array(z.string()),
  createdBy: z.string(),
  createdAt: z.string().datetime(),
  updatedBy: z.string().nullable(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
  deletedBy: z.string().nullable()
});

export const PolicyInputSchema = PolicySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  deletedBy: true
});

export const PolicyUpdateSchema = PolicyInputSchema.partial();

export type PolicyEffect = z.infer<typeof PolicyEffectSchema>;
export type Condition = z.infer<typeof ConditionSchema>;
export type ConditionType = z.infer<typeof ConditionTypeSchema>;
export type AttributeRef = z.infer<typeof AttributeRefSchema>;
export type Policy = z.infer<typeof PolicySchema>;
export type PolicyInput = z.infer<typeof PolicyInputSchema>;
export type PolicyUpdate = z.infer<typeof PolicyUpdateSchema>;

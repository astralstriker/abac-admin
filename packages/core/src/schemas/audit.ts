import { z } from 'zod';

export const AuditActionSchema = z.enum([
  'CREATE',
  'UPDATE',
  'DELETE',
  'ACTIVATE',
  'DEACTIVATE',
  'TEST'
]);

export const AuditLogEntrySchema = z.object({
  id: z.string(),
  entityType: z.enum(['policy', 'attribute']),
  entityId: z.string(),
  action: AuditActionSchema,
  oldValue: z.any().nullable(),
  newValue: z.any().nullable(),
  userId: z.string(),
  userName: z.string().optional(),
  timestamp: z.string().datetime(),
  metadata: z.record(z.any()).optional()
});

export const AuditLogFilterSchema = z.object({
  entityType: z.enum(['policy', 'attribute']).optional(),
  entityId: z.string().optional(),
  userId: z.string().optional(),
  action: AuditActionSchema.optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional()
});

export type AuditAction = z.infer<typeof AuditActionSchema>;
export type AuditLogEntry = z.infer<typeof AuditLogEntrySchema>;
export type AuditLogFilter = z.infer<typeof AuditLogFilterSchema>;

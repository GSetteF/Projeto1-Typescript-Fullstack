import { z } from 'zod';

export const metricParams = z.object({
  id: z.string().uuid('Invalid metric ID'),
});

export const experimentContextParams = z.object({
  experimentId: z
  .string()
  .min(1, 'experimentId é obrigatório')
  .refine((val) => val.trim().length > 0, {
    message: 'experimentId não pode ser vazio',
  }),
});

export const createMetricSchema = z.object({
  name: z.string().min(1, { message: 'Name is required and cannot be empty' }),
  value: z.number(),
});

export const updateMetricSchema = z.object({
  params: metricParams.shape,
  body: z.object({
    name: z.string().min(1).optional(),
    value: z.number().optional(),
  }),
});

export type MetricParams = z.infer<typeof metricParams>;
export type ExperimentContextParams = z.infer<typeof experimentContextParams>;
export type CreateMetricInput = z.infer<typeof createMetricSchema>;
export type UpdateMetricInput = z.infer<typeof updateMetricSchema>;
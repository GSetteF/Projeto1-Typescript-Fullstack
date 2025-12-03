import { z } from 'zod';

export const metricParams = z.object({
  id: z.string().uuid('Invalid metric ID'),
});

export const experimentContextParams = z.object({
  experimentId: z.string().uuid('Invalid experiment ID'),
});

export const createMetricSchema = z.object({
  params: experimentContextParams, 
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    value: z.number(),
  }),
});

export const updateMetricSchema = z.object({
  params: metricParams, 
  body: z.object({
    name: z.string().min(1).optional(),
    value: z.number().optional(),
  }),
});

export const getMetricSchema = z.object({
  params: metricParams,
});

export const getMetricsByExperimentSchema = z.object({
  params: experimentContextParams,
});

export const deleteMetricSchema = z.object({
  params: metricParams,
});

export type MetricParams = z.infer<typeof metricParams>;
export type ExperimentContextParams = z.infer<typeof experimentContextParams>;
export type CreateMetricInput = z.infer<typeof createMetricSchema>;
export type UpdateMetricInput = z.infer<typeof updateMetricSchema>;
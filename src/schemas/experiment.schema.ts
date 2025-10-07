import { z } from 'zod';

export const experimentParams = z.object({
  id: z.string().uuid('Invalid experiment ID'),
});

export const createExperimentSchema = z.object({
  params: z.object({
    projectId: z.string().uuid('Invalid project ID'),
  }),
  body: z.object({
    name: z.string().min(1, { message: 'Name is required and cannot be empty' }),
    parameters: z.any().optional(),
  }),
});

export const updateExperimentSchema = z.object({
  params: experimentParams.shape,
  body: z.object({
    name: z.string().min(1).optional(),
    parameters: z.any().optional(),
  }),
});

export type ExperimentParams = z.infer<typeof experimentParams>;
export type CreateExperimentInput = z.infer<typeof createExperimentSchema>;
export type UpdateExperimentInput = z.infer<typeof updateExperimentSchema>;
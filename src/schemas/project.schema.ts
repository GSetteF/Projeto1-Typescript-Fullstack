import { z } from 'zod';

export const createProjectSchema = z.object({

  body: z.object({
    
    name: z.string().min(1, { message: "Name is required and cannot be empty" }),

    description: z.string().optional(),
  }),
});

export const updateProjectSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
  }),
});
import { prisma } from '../lib/prisma';
import type { Metric } from '@prisma/client';

type CreateMetricData = {
  name: string;
  value: number;
};

type UpdateMetricData = {
  name?: string;
  value?: number;
};

export const createMetric = async (
  data: CreateMetricData,
  experimentId: string
): Promise<Metric> => {
  const metric = await prisma.metric.create({
    data: {
      name: data.name,
      value: data.value,
      experimentId: experimentId,
    },
  });
  return metric;
};

export const findAllMetricsByExperiment = async (
  experimentId: string
): Promise<Metric[]> => {
  const metrics = await prisma.metric.findMany({
    where: {
      experimentId: experimentId,
    },
  });
  return metrics;
};

export const findMetricById = async (
  id: string
): Promise<(Metric & { experiment: {} }) | null> => {
  const metric = await prisma.metric.findUnique({
    where: { id },
    include: {
      experiment: true,
    },
  });
  return metric;
};

export const updateMetric = async (
  id: string,
  data: UpdateMetricData
): Promise<Metric> => {
  const updatedMetric = await prisma.metric.update({
    where: { id },
    data: data,
  });
  return updatedMetric;
};

export const deleteMetric = async (id: string): Promise<void> => {
  await prisma.metric.delete({
    where: { id },
  });
};

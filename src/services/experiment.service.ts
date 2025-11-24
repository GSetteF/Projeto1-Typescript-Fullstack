import { prisma } from '../lib/prisma';
import { Experiment, Prisma } from '@prisma/client';

type CreateExperimentData = {
  name: string;
  parameters?: Prisma.JsonValue;
};

type UpdateExperimentData = {
  name?: string;
  parameters?: Prisma.JsonValue | null;
};

export const createExperiment = async (
  data: CreateExperimentData,
  projectId: string
): Promise<Experiment> => {
  const createData: Prisma.ExperimentCreateInput = {
    name: data.name,
    project: {
      connect: { id: projectId },
    },
  };

  if (data.parameters !== undefined) {
    createData.parameters =
      data.parameters === null ? Prisma.JsonNull : data.parameters;
  }

  const experiment = await prisma.experiment.create({
    data: createData,
  });

  return experiment;
};

export const findAllExperimentsByProject = async (
  projectId: string
): Promise<Experiment[]> => {
  const experiments = await prisma.experiment.findMany({
    where: { projectId },
  });
  return experiments;
};

export const findExperimentById = async (
  id: string
): Promise<(Experiment & { project: {} }) | null> => {
  const experiment = await prisma.experiment.findUnique({
    where: { id },
    include: {
      project: true,
    },
  });
  return experiment;
};

export const updateExperiment = async (
  id: string,
  data: UpdateExperimentData
): Promise<Experiment> => {
  const updateData: Prisma.ExperimentUpdateInput = {};

  if (data.name !== undefined) {
    updateData.name = data.name;
  }

  if (data.parameters !== undefined) {
    updateData.parameters =
      data.parameters === null ? Prisma.JsonNull : data.parameters;
  }

  const updatedExperiment = await prisma.experiment.update({
    where: { id },
    data: updateData,
  });

  return updatedExperiment;
};

export const deleteExperiment = async (id: string): Promise<void> => {
  await prisma.experiment.delete({
    where: { id },
  });
};

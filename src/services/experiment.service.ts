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

/**
 * Cria um novo experimento associado a um projeto.
 * @param data - Os dados do novo experimento (nome, parâmetros).
 * @param projectId - O ID do projeto pai.
 * @returns O experimento recém-criado.
 */
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


/**
 * Retorna todos os experimentos de um projeto específico.
 * @param projectId - O ID do projeto cujos experimentos serão listados.
 * @returns Uma lista de experimentos.
 */
export const findAllExperimentsByProject = async (
  projectId: string
): Promise<Experiment[]> => {
  const experiments = await prisma.experiment.findMany({
    where: {
      projectId: projectId,
    },
  });
  return experiments;
};

/**
 * Encontra um experimento específico pelo seu ID e inclui os dados do projeto pai.
 * @param id - O ID do experimento a ser encontrado.
 * @returns O experimento encontrado (com seu projeto) ou null.
 */
export const findExperimentById = async (
  id: string
): Promise<(Experiment & { project: {} }) | null> => {
  const experiment = await prisma.experiment.findUnique({
    where: { id },
    // NOVIDADE: O 'include' busca os dados da tabela relacionada (Project)
    // Isso cumpre um dos requisitos do seu trabalho!
    include: {
      project: true,
    },
  });
  return experiment;
};

/**
 * Atualiza os dados de um experimento existente.
 * @param id - O ID do experimento a ser atualizado.
 * @param data - Os novos dados para o experimento.
 * @returns O experimento atualizado.
 */
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


/**
 * Deleta um experimento do banco de dados.
 * @param id - O ID do experimento a ser deletado.
 */
export const deleteExperiment = async (id: string): Promise<void> => {
  await prisma.experiment.delete({
    where: { id },
  });
};
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

/**
 * Cria uma nova métrica associada a um experimento.
 * @param data - Os dados da nova métrica (nome, valor).
 * @param experimentId - O ID do experimento pai.
 * @returns A métrica recém-criada.
 */
export const createMetric = async (
  data: CreateMetricData,
  experimentId: string
): Promise<Metric> => {
  const metric = await prisma.metric.create({
    data: {
      name: data.name,
      value: data.value,
      experimentId: experimentId, // Conectando a métrica ao experimento
    },
  });
  return metric;
};

/**
 * Retorna todas as métricas de um experimento específico.
 * @param experimentId - O ID do experimento.
 * @returns Uma lista de métricas.
 */
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

/**
 * Encontra uma métrica pelo seu ID e inclui os dados do experimento pai.
 * @param id - O ID da métrica a ser encontrada.
 * @returns A métrica encontrada (com seu experimento) ou null.
 */
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

/**
 * Atualiza os dados de uma métrica existente.
 * @param id - O ID da métrica a ser atualizada.
 * @param data - Os novos dados para a métrica.
 * @returns A métrica atualizada.
 */
export const updateMetric = async (
  id: string,
  data: UpdateMetricData
): Promise<Metric> => {
  const updatedMetric = await prisma.metric.update({
    where: { id },
    // Aplicando a lição aprendida: passamos o objeto 'data' diretamente
    // para que o Prisma atualize apenas os campos fornecidos.
    data: data,
  });
  return updatedMetric;
};

/**
 * Deleta uma métrica do banco de dados.
 * @param id - O ID da métrica a ser deletada.
 */
export const deleteMetric = async (id: string): Promise<void> => {
  await prisma.metric.delete({
    where: { id },
  });
};
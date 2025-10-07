import { prisma } from '../lib/prisma';
import type { Project } from '@prisma/client';

type CreateProjectData = {
  name: string;
  description?: string;
};

type UpdateProjectData = {
  name?: string;
  description?: string;
};

/**
 * Cria um novo projeto no banco de dados.
 * @param data - Os dados para o novo projeto (nome e descrição opcional).
 * @returns O projeto recém-criado.
 */
export const createProject = async (data: CreateProjectData): Promise<Project> => {
  const project = await prisma.project.create({
    data: {
      name: data.name,
      description: data.description || null,
    },
  });
  return project;
};

/**
 * Retorna todos os projetos do banco de dados.
 * @returns Uma lista de todos os projetos.
 */
export const findAllProjects = async (): Promise<Project[]> => {
  const projects = await prisma.project.findMany();
  return projects;
};

/**
 * Encontra um projeto específico pelo seu ID.
 * @param id - O ID do projeto a ser encontrado.
 * @returns O projeto encontrado, ou null se não existir.
 */
export const findProjectById = async (id: string): Promise<Project | null> => {
  const project = await prisma.project.findUnique({
    where: { id },
  });
  return project;
};

/**
 * Atualiza os dados de um projeto existente.
 * @param id - O ID do projeto a ser atualizado.
 * @param data - Os novos dados para o projeto.
 * @returns O projeto atualizado.
 */
export const updateProject = async (
  id: string,
  data: UpdateProjectData
): Promise<Project> => {
  const updatedProject = await prisma.project.update({
    where: { id },
    // Passamos o objeto 'data' diretamente. O Prisma é inteligente
    // o suficiente para atualizar apenas os campos que existem em 'data'.
    data: data,
  });
  return updatedProject;
};

/**
 * Deleta um projeto do banco de dados.
 * @param id - O ID do projeto a ser deletado.
 */
export const deleteProject = async (id: string): Promise<void> => {
  await prisma.project.delete({
    where: { id },
  });
  // Note que a deleção de um Projeto vai apagar em cascata
  // todos os Experiments e Metrics associados, por causa do
  // `onDelete: Cascade` que definimos no schema.prisma.
};
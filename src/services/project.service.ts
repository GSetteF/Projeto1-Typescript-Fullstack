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

export const createProject = async (data: CreateProjectData): Promise<Project> => {
  const project = await prisma.project.create({
    data: {
      name: data.name,
      description: data.description || null,
    },
  });
  return project;
};

export const findAllProjects = async (): Promise<Project[]> => {
  const projects = await prisma.project.findMany();
  return projects;
};

export const findProjectById = async (id: string): Promise<Project | null> => {
  const project = await prisma.project.findUnique({
    where: { id },
  });
  return project;
};

export const updateProject = async (
  id: string,
  data: UpdateProjectData
): Promise<Project> => {
  const updatedProject = await prisma.project.update({
    where: { id },
    data: data,
  });
  return updatedProject;
};

export const deleteProject = async (id: string): Promise<void> => {
  await prisma.project.delete({
    where: { id },
  });
};

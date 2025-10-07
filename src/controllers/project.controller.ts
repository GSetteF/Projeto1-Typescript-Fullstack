import { Request, Response } from 'express';
import * as projectService from '../services/project.service';

export const create = async (req: Request, res: Response) => {
  try {
    const projectData = req.body;
    const newProject = await projectService.createProject(projectData);
    res.status(201).json(newProject);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const allProjects = await projectService.findAllProjects();
    res.status(200).json(allProjects);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const findOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Project ID is required' });
    }
    const project = await projectService.findProjectById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Project ID is required' });
    }
    const projectData = req.body;
    const updatedProject = await projectService.updateProject(id, projectData);
    res.status(200).json(updatedProject);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Project ID is required' });
    }
    await projectService.deleteProject(id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
import { Request, Response } from 'express';
import * as experimentService from '../services/experiment.service';

export const create = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      return res.status(400).json({ message: 'Project ID is required' });
    }

    const experimentData = req.body;
    const newExperiment = await experimentService.createExperiment(
      experimentData,
      projectId
    );
    res.status(201).json(newExperiment);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const findAllByProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      return res.status(400).json({ message: 'Project ID is required' });
    }

    const allExperiments = await experimentService.findAllExperimentsByProject(
      projectId
    );
    res.status(200).json(allExperiments);
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
      return res.status(400).json({ message: 'Experiment ID is required' });
    }

    const experiment = await experimentService.findExperimentById(id);
    if (!experiment) {
      return res.status(404).json({ message: 'Experiment not found' });
    }
    res.status(200).json(experiment);
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
      return res.status(400).json({ message: 'Experiment ID is required' });
    }

    const experimentData = req.body;
    const updatedExperiment = await experimentService.updateExperiment(
      id,
      experimentData
    );
    res.status(200).json(updatedExperiment);
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
      return res.status(400).json({ message: 'Experiment ID is required' });
    }

    await experimentService.deleteExperiment(id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
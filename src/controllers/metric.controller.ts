import { Request, Response } from 'express';
import * as metricService from '../services/metric.service';

export const create = async (req: Request, res: Response) => {
  try {
    const { experimentId } = req.params;
    if (!experimentId) {
      return res.status(400).json({ message: 'Experiment ID is required' });
    }

    const metricData = req.body;
    const newMetric = await metricService.createMetric(
      metricData,
      experimentId
    );

    console.log('Objeto retornado pelo service:', newMetric);

    res.status(201).json(newMetric);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const findAllByExperiment = async (req: Request, res: Response) => {
  try {
    const { experimentId } = req.params;
    if (!experimentId) {
      return res.status(400).json({ message: 'Experiment ID is required' });
    }

    const allMetrics = await metricService.findAllMetricsByExperiment(
      experimentId
    );
    res.status(200).json(allMetrics);
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
      return res.status(400).json({ message: 'Metric ID is required' });
    }

    const metric = await metricService.findMetricById(id);
    if (!metric) {
      return res.status(404).json({ message: 'Metric not found' });
    }
    res.status(200).json(metric);
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
      return res.status(400).json({ message: 'Metric ID is required' });
    }

    const metricData = req.body;
    const updatedMetric = await metricService.updateMetric(id, metricData);
    res.status(200).json(updatedMetric);
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
      return res.status(400).json({ message: 'Metric ID is required' });
    }

    await metricService.deleteMetric(id);
    res.status(204).send();
  } catch (error) { 
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
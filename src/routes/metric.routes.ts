import { Router } from 'express';
import * as metricController from '../controllers/metric.controller';
import { validate } from '../middlewares/validate';
import {
  createMetricSchema,
  updateMetricSchema,
  metricParams,
  experimentContextParams,
} from '../schemas/metric.schema';

import { z } from 'zod';

const router = Router();

/**
 * @openapi
 * /experiments/{experimentId}/metrics:
 *   post:
 *     tags: [Metrics]
 *     summary: Cria uma nova métrica para um experimento
 *     parameters:
 *       - in: path
 *         name: experimentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Acurácia"
 *               value:
 *                 type: number
 *                 example: 0.95
 *     responses:
 *       '201':
 *         description: Métrica criada com sucesso.
 */
router.post(
  '/experiments/:experimentId/metrics',
  validate(
    z.object({
      params: experimentContextParams,
      body: createMetricSchema,
    })
  ),
  metricController.create
);

/**
 * @openapi
 * /experiments/{experimentId}/metrics:
 *   get:
 *     tags: [Metrics]
 *     summary: Lista todas as métricas de um experimento
 *     parameters:
 *       - in: path
 *         name: experimentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Lista de métricas.
 */
router.get(
  '/experiments/:experimentId/metrics',
  validate(z.object({ params: experimentContextParams })),
  metricController.findAllByExperiment
);

/**
 * @openapi
 * /metrics/{id}:
 *   get:
 *     tags: [Metrics]
 *     summary: Busca uma métrica pelo seu ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Métrica encontrada.
 *       '404':
 *         description: Métrica não encontrada.
 */
router.get(
  '/metrics/:id',
  validate(z.object({ params: metricParams })),
  metricController.findOne
);

/**
 * @openapi
 * /metrics/{id}:
 *   put:
 *     tags: [Metrics]
 *     summary: Atualiza uma métrica
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               value:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Métrica atualizada com sucesso.
 */
router.put(
  '/metrics/:id',
  validate(
    z.object({
      params: metricParams,
      body: updateMetricSchema,
    })
  ),
  metricController.update
);

/**
 * @openapi
 * /metrics/{id}:
 *   delete:
 *     tags: [Metrics]
 *     summary: Deleta uma métrica
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '204':
 *         description: Métrica deletada com sucesso.
 */
router.delete(
  '/metrics/:id',
  validate(z.object({ params: metricParams })),
  metricController.deleteOne
);

export default router;

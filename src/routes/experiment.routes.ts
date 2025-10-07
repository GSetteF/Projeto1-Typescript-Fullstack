import { Router } from 'express';
import * as experimentController from '../controllers/experiment.controller';
import { validate } from '../middlewares/validate';
import {
  createExperimentSchema,
  updateExperimentSchema,
  experimentParams,
} from '../schemas/experiment.schema';

const router = Router();

/**
 * @openapi
 * /projects/{projectId}/experiments:
 *   post:
 *     tags:
 *       - Experiments
 *     summary: Cria um novo experimento para um projeto
 *     parameters:
 *       - in: path
 *         name: projectId
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
 *               parameters:
 *                 type: object
 *     responses:
 *       '201':
 *         description: Experimento criado com sucesso.
 *
 *   get:
 *     tags:
 *       - Experiments
 *     summary: Lista todos os experimentos de um projeto
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Lista de experimentos.
 *
 * /experiments/{id}:
 *   get:
 *     tags:
 *       - Experiments
 *     summary: Busca um experimento pelo seu ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Experimento encontrado (inclui dados do projeto pai).
 *       '404':
 *         description: Experimento não encontrado.
 *
 *   put:
 *     tags:
 *       - Experiments
 *     summary: Atualiza um experimento existente
 *     parameters:
 *       - in: path
 *         name: id
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
 *               parameters:
 *                 type: object
 *     responses:
 *       '200':
 *         description: Experimento atualizado com sucesso.
 *
 *   delete:
 *     tags:
 *       - Experiments
 *     summary: Deleta um experimento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '204':
 *         description: Experimento deletado com sucesso.
 */
router.post(
  '/projects/:projectId/experiments',
  validate(createExperimentSchema),
  experimentController.create
);

router.get(
  '/projects/:projectId/experiments',
  experimentController.findAllByProject
);

router.get(
  '/experiments/:id',
  validate(experimentParams),
  experimentController.findOne
);

router.put(
  '/experiments/:id',
  validate(updateExperimentSchema),
  experimentController.update
);

router.delete(
  '/experiments/:id',
  validate(experimentParams),
  experimentController.deleteOne
);

export default router;

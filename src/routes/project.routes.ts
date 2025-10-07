import { Router } from 'express';
import * as projectController from '../controllers/project.controller';
import { validate } from '../middlewares/validate';
import {
  createProjectSchema,
  updateProjectSchema,
} from '../schemas/project.schema';

const router = Router();

/**
 * @openapi
 * /projects:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Cria um novo projeto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *     responses:
 *       '201':
 *         description: Projeto criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       '400':
 *         description: Dados inválidos.
 *
 *   get:
 *     tags:
 *       - Projects
 *     summary: Retorna todos os projetos
 *     responses:
 *       '200':
 *         description: Uma lista de projetos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *
 * /projects/{id}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Busca um projeto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: O projeto encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       '404':
 *         description: Projeto não encontrado.
 *
 *   put:
 *     tags:
 *       - Projects
 *     summary: Atualiza um projeto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *     responses:
 *       '200':
 *         description: Projeto atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *
 *   delete:
 *     tags:
 *       - Projects
 *     summary: Deleta um projeto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Projeto deletado com sucesso.
 */
router.post('/', validate(createProjectSchema), projectController.create);
router.get('/', projectController.findAll);
router.get('/:id', projectController.findOne);
router.put('/:id', validate(updateProjectSchema), projectController.update);
router.delete('/:id', projectController.deleteOne);

export default router;

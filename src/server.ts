import express from 'express';
import projectRoutes from './routes/project.routes';
import experimentRoutes from './routes/experiment.routes';
import metricRoutes from './routes/metric.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.config';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  return res.json({ message: 'API is running!' });
});

app.use('/projects', projectRoutes);
app.use('/', experimentRoutes);
app.use('/', metricRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
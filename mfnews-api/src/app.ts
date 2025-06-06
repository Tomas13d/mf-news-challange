import express from 'express';
import cors from 'cors';
import newsRoutes from './routes';
import { swaggerDocument, swaggerUi } from './swagger';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', newsRoutes);

export default app;

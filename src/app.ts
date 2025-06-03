import express from 'express';
import cors from 'cors';
import newsRoutes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', newsRoutes);

export default app;
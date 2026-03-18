import express from 'express';
import { mountRoutes } from './routes';
import { errorHandler } from './middleware';

const app = express();

app.use(express.json());
mountRoutes(app);
app.use(errorHandler);

export default app;

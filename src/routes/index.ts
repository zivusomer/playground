import { Express, Router } from 'express';
import { requestLogger } from '../middleware';
import helloWorld from './helloWorld';

const router = Router();

router.use(requestLogger);

// Mount each API on its own path; each API lives in its own file
router.use('/hello-world', helloWorld);

export function mountRoutes(app: Express): void {
  app.use(router);
}

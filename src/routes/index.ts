import { Express, Router } from 'express';
import { requestLogger } from '../middleware';
import helloWorld from './helloWorld';
import health from './health';

const router = Router();

router.use(requestLogger);

// Mount each API on its own path; each API lives in its own file
router.use('/hello-world', helloWorld);
router.use('/health', health);

export function mountRoutes(app: Express): void {
  app.use(router);
}

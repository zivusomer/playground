import { Express, Router } from 'express';
import { requestLogger } from '../middleware';
import helloWorld from './helloWorld';
import health from './health';
import users from './users';
import protectedApi from './protected';

const router = Router();

router.use(requestLogger);

// Mount each API on its own path; each API lives in its own file
router.use('/hello-world', helloWorld);
router.use('/health', health);
router.use('/users', users);
router.use('/protected', protectedApi);

export function mountRoutes(app: Express): void {
  app.use(router);
}

import { Express, Router } from 'express';
import { requestLogger } from '../middleware';
import helloWorld, { apiOverview as helloWorldOverview } from './helloWorld';
import health, { apiOverview as healthOverview } from './health';
import users, { apiOverview as usersOverview } from './users';
import protectedApi, { apiOverview as protectedOverview } from './protected';

export type ApiOverviewEntry = { method: string; path: string; description: string };

const apiList: { prefix: string; router: Router; overview: ApiOverviewEntry[] }[] = [
  { prefix: '/hello-world', router: helloWorld, overview: helloWorldOverview },
  { prefix: '/health', router: health, overview: healthOverview },
  { prefix: '/users', router: users, overview: usersOverview },
  { prefix: '/protected', router: protectedApi, overview: protectedOverview },
];

function buildEndpoints(baseUrl: string): { method: string; url: string }[] {
  const endpoints: { method: string; url: string }[] = [];
  for (const { prefix, overview } of apiList) {
    for (const { method, path } of overview) {
      const fullPath = prefix + (path === '/' ? '' : path);
      endpoints.push({ method, url: `${baseUrl}${fullPath}` });
    }
  }
  return endpoints;
}

const router = Router();

router.use(requestLogger);

router.get('/', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host') || ''}`;
  res.json({
    message: 'Welcome to the API',
    endpoints: buildEndpoints(baseUrl),
  });
});

for (const { prefix, router: r } of apiList) {
  router.use(prefix, r);
}

export function mountRoutes(app: Express): void {
  app.use(router);
}

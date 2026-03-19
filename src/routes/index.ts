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

function buildEndpoints(): Record<string, string> {
  const endpoints: Record<string, string> = {};
  for (const { prefix, overview } of apiList) {
    for (const { method, path, description } of overview) {
      const fullPath = prefix + (path === '/' ? '' : path);
      endpoints[`${method} ${fullPath}`] = description;
    }
  }
  return endpoints;
}

const router = Router();

router.use(requestLogger);

router.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to the API',
    endpoints: buildEndpoints(),
  });
});

for (const { prefix, router: r } of apiList) {
  router.use(prefix, r);
}

export function mountRoutes(app: Express): void {
  app.use(router);
}

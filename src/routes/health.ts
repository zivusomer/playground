import { Request, Response, NextFunction } from 'express';
import { createApi } from '../api';

function getHealth(_req: Request, res: Response, _next?: NextFunction): void {
  res.json({ status: 'ok' });
}

const api = createApi();
api.get('/', getHealth);

export const apiOverview = [{ method: 'GET', path: '/', description: 'Health check' }];
export default api.router;

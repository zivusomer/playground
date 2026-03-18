import { Request, Response, NextFunction } from 'express';
import { createApi } from '../api';
import { requireAuth } from '../middleware';

function getProtected(_req: Request, res: Response, _next?: NextFunction): void {
  res.json({ message: 'You have access to the protected resource.' });
}

const api = createApi();
api.get('/', requireAuth, getProtected);

export default api.router;

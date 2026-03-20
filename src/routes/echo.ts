import { Request, Response, NextFunction } from 'express';
import { createApi } from '../api';

function postEcho(req: Request, res: Response, _next?: NextFunction): void {
  const body = req.body as { message?: unknown };
  if (typeof body?.message !== 'string') {
    res.status(400).json({ error: 'Body must include a string "message" field' });
    return;
  }
  res.json({ message: body.message });
}

const api = createApi();
api.post('/', postEcho);

export const apiOverview = [{ method: 'POST', path: '/', description: 'Echo message' }];
export default api.router;

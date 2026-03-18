import { Request, Response, NextFunction } from 'express';

/**
 * Middleware that requires a Bearer token in the Authorization header.
 * If missing or invalid, responds with 401 and does not call next().
 */
export function requireAuth(req: Request, res: Response, next?: NextFunction): void {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid Authorization header' });
    return;
  }
  const token = auth.slice(7);
  if (!token) {
    res.status(401).json({ error: 'Missing token' });
    return;
  }
  // Optionally validate token here (e.g. verify JWT); for now any non-empty token is accepted.
  next?.();
}

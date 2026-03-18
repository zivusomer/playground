import { Request, Response, NextFunction } from 'express';
import { createApi } from '../api';

// In-memory store for demo; replace with DB later.
interface User {
  id: number;
  name: string;
  email: string;
}
const users = new Map<number, User>();
let nextId = 1;

function getUsers(req: Request, res: Response, _next?: NextFunction): void {
  const limit = req.query.limit ? Math.max(1, parseInt(String(req.query.limit), 10)) : undefined;
  const list = Array.from(users.values());
  const result = limit !== undefined ? list.slice(0, limit) : list;
  res.json(result);
}

function getUserById(req: Request, res: Response, next?: NextFunction): void {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' });
    return;
  }
  const user = users.get(id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.json(user);
}

function createUser(req: Request, res: Response, _next?: NextFunction): void {
  const { name, email } = req.body as { name?: string; email?: string };
  if (!name || !email) {
    res.status(400).json({ error: 'name and email are required' });
    return;
  }
  const id = nextId++;
  const user: User = { id, name, email };
  users.set(id, user);
  res.status(201).json(user);
}

function updateUser(req: Request, res: Response, next?: NextFunction): void {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' });
    return;
  }
  const user = users.get(id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  const { name } = req.body as { name?: string };
  if (name !== undefined) user.name = name;
  res.json(user);
}

function deleteUser(req: Request, res: Response, _next?: NextFunction): void {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' });
    return;
  }
  if (!users.has(id)) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  users.delete(id);
  res.status(204).send();
}

const api = createApi();
api.get('/', getUsers);
api.get('/:id', getUserById);
api.post('/', createUser);
api.put('/:id', updateUser);
api.delete('/:id', deleteUser);

export default api.router;

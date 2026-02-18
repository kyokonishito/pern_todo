
import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

// CREATE
router.post('/', async (req, res, next) => {
  try {
    const { title } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO todos (title) VALUES ($1) RETURNING id, title, done',
      [title]
    );
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
});

// READ (all)
router.get('/', async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, title, done FROM todos ORDER BY id DESC'
    );
    res.json(rows);
  } catch (err) { next(err); }
});

// UPDATE (partial)
router.put('/:id', async (req, res, next) => {
  try {
    const { title, done } = req.body;
    const { rows } = await pool.query(
      `UPDATE todos
         SET title = COALESCE($1, title),
             done  = COALESCE($2, done)
       WHERE id = $3
       RETURNING id, title, done`,
      [title ?? null, typeof done === 'boolean' ? done : null, req.params.id]
    );
    if (!rows.length) return res.sendStatus(404);
    res.json(rows[0]);
  } catch (err) { next(err); }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM todos WHERE id = $1', [req.params.id]);
    if (!rowCount) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) { next(err); }
});

export default router;

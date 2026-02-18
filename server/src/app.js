
import express from 'express';
import cors from 'cors';
import todos from './routes/todos.js';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/todos', todos);

// error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'internal_error' });
});

const PORT = Number(process.env.PORT || 8000);
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));


import { Pool } from 'pg';
import 'dotenv/config';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || undefined,
  user: process.env.PGUSER,
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'pern_todo',
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT || 5432),
});

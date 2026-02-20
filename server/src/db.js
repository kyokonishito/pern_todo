
import { Pool } from 'pg';
import 'dotenv/config';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || undefined,
  user: process.env.PGUSER,
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'pern_todo',
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT || 5432),
  
  // コネクションプール設定（同時アクセス対策）
  max: 20,                      // 最大接続数（デフォルト: 10）
  idleTimeoutMillis: 30000,     // アイドル接続を保持する時間（30秒）
  connectionTimeoutMillis: 2000, // 接続取得のタイムアウト（2秒）
});

// プール接続エラーのハンドリング
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

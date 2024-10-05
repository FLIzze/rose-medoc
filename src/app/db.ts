import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: 'db',
  user: 'rose-medoc',
  password: '1231',
  database: 'calendar'
});

export default pool;
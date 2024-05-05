import { sql } from './db.js'

await sql`DROP TABLE IF EXISTS videos`

await sql`
CREATE TABLE videos (
  id TEXT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration INTEGER
);
`
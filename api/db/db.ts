// db/db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgres://postgres:00000000@localhost:5432/explorer",
});

export const db = drizzle(pool);
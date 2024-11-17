import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

const sqlite = new Database(process.env.DATABASE_URL);
export const db = drizzle({ client: sqlite });

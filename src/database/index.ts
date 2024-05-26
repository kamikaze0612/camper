import { Pool } from "@neondatabase/serverless";
import type { ExtractTablesWithRelations } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";
import type { NeonQueryResultHKT } from "drizzle-orm/neon-serverless";
import type { PgTransaction } from "drizzle-orm/pg-core";

import { schema } from "./schemas";
import type { Schema } from "./schemas";

const client = new Pool({ connectionString: process.env.DATABASE_URL! });
export const db = drizzle(client, { schema });

export type Transaction = PgTransaction<
  NeonQueryResultHKT,
  Schema,
  ExtractTablesWithRelations<Schema>
>;

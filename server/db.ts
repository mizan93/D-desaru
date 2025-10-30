import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import * as dotenv from 'dotenv';


// 1. REQUIRE AND CONFIGURE DOTENV AT THE VERY TOP
// This ensures environment variables are loaded before app logic starts.
dotenv.config();

// 2. Application Setup
// const app = express();
neonConfig.webSocketConstructor = ws;

//

if (!process.env.DATABASE_URL) {
 throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
// console.warn("DATABASE_URL not set — using dummy value for preview mode.");
  // process.env.DATABASE_URL = "postgresql://postgres:LEDChpNeBHlgWbRUNpLFGRvxvPlrPhHv@postgres.railway.internal:5432/railway";
}

// Optional: Use the variables (e.g., connect to the database)
// console.log(`Attempting to connect to database: ${dbUrl.substring(0, 20)}...`);
// NOTE: dbUrl is guaranteed to be a 'string' here, not 'undefined'.

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });

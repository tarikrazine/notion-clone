import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("🚨 DATABASE_URL is not defined");
}

// Define drizzle configurations
export default defineConfig({
  schema: "./src/db/schema/*",
  out: "./src/migrations",
  driver: "pg",
  dbCredentials: { connectionString: process.env.DATABASE_URL },
  verbose: true,
  strict: true,
});

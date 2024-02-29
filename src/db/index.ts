import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as workspaces from "@/db/schema/workspaces";
import * as folders from "@/db/schema/folders";
import * as files from "@/db/schema/files";
import * as users from "@/db/schema/users";
import * as prices from "@/db/schema/prices";
import * as customers from "@/db/schema/customers";
import * as products from "@/db/schema/products";
import * as enums from "@/db/schema/enums";
import * as subscriptions from "@/db/schema/subscriptions";
import * as collaborators from "@/db/schema/collaborators";

if (!process.env.DATABASE_URL) {
  throw new Error("🚨 DATABASE_URL environment variable is not set");
}

const connectionString = process.env.DATABASE_URL;

const client = postgres(connectionString, { max: 1 });

const db = drizzle(client, {
  schema: {
    ...workspaces,
    ...folders,
    ...files,
    ...users,
    ...prices,
    ...customers,
    ...products,
    ...enums,
    ...subscriptions,
    ...collaborators,
  },
});

// (async function migrateDB() {
//   try {
//     console.log("🟠 Running migrations");
//     await migrate(db, { migrationsFolder: "./src/migrations" });
//     console.log("🟢 Migrations completed");
//   } catch (error) {
//     console.log("[MIGRATE_ERROR]", error);
//     console.log("🔴 Migration failed");
//   }
// })();

export default db;

import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { workspaces } from "./workspaces";
import { users } from "./users";

export const collaborators = pgTable("collaborators", {
  workspaceId: uuid("workspace_id").references(() => workspaces.id, {
    onDelete: "cascade",
  }).notNull(),
  userId: uuid("user_id").references(() => users.id, {
    onDelete: "cascade",
  }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
});

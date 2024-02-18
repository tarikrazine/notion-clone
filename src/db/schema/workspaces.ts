import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const workspaces = pgTable("workspaces", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: text("title").notNull(),
  workspaceOwner: uuid("workspace_Owner").notNull(),
  iconId: text("icon_id").notNull(),
  data: text("data").notNull(),
  inTrash: boolean("in_trash").notNull(),
  logo: text("logo").notNull(),
  bannerUrl: text("banner_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
});

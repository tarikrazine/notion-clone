import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { folders } from "./folders";

export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: text("title").notNull(),
  folderId: uuid("folder_id").references(() => folders.id, {
    onDelete: "cascade",
  }).notNull(),
  iconId: text("icon_id").notNull(),
  data: text("data").notNull(),
  inTrash: boolean("in_trash").notNull(),
  bannerUrl: text("banner_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
});

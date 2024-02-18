import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./users";
import { subscriptionStatus } from "./enums";
import { prices } from "./prices";
import { sql } from "drizzle-orm";

export const subscriptions = pgTable("subscriptions", {
  id: text("id").primaryKey().notNull(),
  userId: uuid("user_id").notNull().references(() => users.id),
  status: subscriptionStatus("status"),
  metadata: jsonb("metadata"),
  priceId: text("price_id").references(() => prices.id),
  quantity: integer("quantity"),
  cancelAtPeriodEnd: boolean("cancel_at_period_end"),
  created: timestamp("created", { withTimezone: true, mode: "string" }).default(
    sql`now()`,
  ).notNull(),
  currentPeriodStart: timestamp("current_period_start", {
    withTimezone: true,
    mode: "string",
  }).default(sql`now()`).notNull(),
  currentPeriodEnd: timestamp("current_period_end", {
    withTimezone: true,
    mode: "string",
  }).default(sql`now()`).notNull(),
  endedAt: timestamp("ended_at", { withTimezone: true, mode: "string" })
    .default(sql`now()`),
  cancelAt: timestamp("cancel_at", { withTimezone: true, mode: "string" })
    .default(sql`now()`),
  canceledAt: timestamp("canceled_at", { withTimezone: true, mode: "string" })
    .default(sql`now()`),
  trialStart: timestamp("trial_start", { withTimezone: true, mode: "string" })
    .default(sql`now()`),
  trialEnd: timestamp("trial_end", { withTimezone: true, mode: "string" })
    .default(sql`now()`),
});

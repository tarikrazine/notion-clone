import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { users } from "./users";

export const customers = pgTable("customers", {
  id: uuid("id").primaryKey().notNull().references(() => users.id),
  stripeCustomerId: text("stripe_customer_id"),
});

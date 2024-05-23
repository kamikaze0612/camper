import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { accommodation } from "./accommodation";

export const host = pgTable("hosts", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  image: text("image"),
});

export const hostRelations = relations(host, ({ many }) => ({
  accommodation: many(accommodation),
}));

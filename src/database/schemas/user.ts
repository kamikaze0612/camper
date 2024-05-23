import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { booking } from "./booking";

export const user = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  hashedPassword: text("hashed_password").notNull(),
  phoneNumber: text("phone_number").notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  bookings: many(booking),
}));

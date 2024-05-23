import {
  boolean,
  date,
  doublePrecision,
  integer,
  pgTable,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { accommodation } from "./accommodation";
import { relations } from "drizzle-orm";

export const booking = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  requestedBreakfast: boolean("requested_breakfast").notNull(),
  startDate: date("start_date", { mode: "date" }).notNull(),
  endDate: date("end_date", { mode: "date" }).notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  accommodationId: uuid("accommodation_id")
    .notNull()
    .references(() => accommodation.id),
  totalPrice: doublePrecision("total_price").notNull(),
  durationInDays: integer("duration_in_days").notNull(),
});

export const bookingRelations = relations(booking, ({ one }) => ({
  user: one(user, {
    fields: [booking.userId],
    references: [user.id],
  }),
  accommodation: one(accommodation, {
    fields: [booking.accommodationId],
    references: [accommodation.id],
  }),
}));

import {
  boolean,
  doublePrecision,
  pgTable,
  real,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { host } from "./host";
import { booking } from "./booking";

export const accommodation = pgTable("accommodations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  hostId: uuid("host_id")
    .notNull()
    .references(() => host.id),
  hasBreakfast: boolean("has_breakfast").notNull(),
  breakfastPrice: real("breakfast_price"),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  pricePerNight: real("price_per_night").notNull(),
});

export const accommodationRelations = relations(
  accommodation,
  ({ many, one }) => ({
    bookings: many(booking),
    host: one(host, {
      fields: [accommodation.hostId],
      references: [host.id],
    }),
  })
);

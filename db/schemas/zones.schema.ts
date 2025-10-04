import {
  serial,
  varchar,
  integer,
  smallint,
  timestamp,
} from "drizzle-orm/pg-core";

import { genzDeliverSchema } from "./table.schema";

export const zones = genzDeliverSchema.table("zones", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  cityId: integer("city_id").notNull(),
  latitude: varchar("latitude", { length: 20 }),
  longitude: varchar("longitude", { length: 20 }),
  isActive: smallint("is_active").notNull().default(1),
  deletedAt: timestamp("deleted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

import { 
  serial, 
  varchar, 
  integer, 
  smallint, 
  timestamp,
  boolean
} from "drizzle-orm/pg-core";
import { genzSchema } from "./table.schema";

export const zones = genzSchema.table("zones", {
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
    .$onUpdate(() =>  new Date())
    .notNull(),
});

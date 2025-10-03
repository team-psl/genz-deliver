import { 
  serial, 
  varchar, 
  integer, 
  smallint, 
  timestamp 
} from "drizzle-orm/pg-core";
import { genzSchema } from "./table.schema";

export const cities = genzSchema.table("cities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }),
  isActive: smallint("is_active").notNull().default(1),
  deletedAt: timestamp("deleted_at", { precision: 0 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() =>  new Date())
    .notNull(),
});

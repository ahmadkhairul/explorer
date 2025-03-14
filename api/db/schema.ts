import { pgTable, serial, text, integer, timestamp, varchar } from "drizzle-orm/pg-core";

export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: text("type").$type<"folder" | "file">().notNull(),
  parent_id: integer("parent_id"),
  size: integer("size").default(0),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  deleted_at: timestamp("deleted_at"),
});

export type File = typeof files.$inferSelect; 
export type NewFile = typeof files.$inferInsert; 

import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { user } from "./auth";

//constant
/**
 * Posts table schema definition.
 */
export const posts = pgTable("posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  published: boolean("published").default(false).notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { posts } from "./posts";

/**
 * Comments table schema definition.
 *
 * This table stores comments on posts with their content and author information.
 * It includes foreign key relationships to both the user table (author) and
 * posts table (parent post).
 *
 * Design decisions:
 * - Flat structure (no nested replies) for simplicity
 * - Soft delete capability via isDeleted flag for moderation
 * - Cascade delete when parent post is deleted
 *
 * @constant comments
 */
export const comments = pgTable("comments", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  postId: text("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

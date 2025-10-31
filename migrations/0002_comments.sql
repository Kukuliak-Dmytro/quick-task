CREATE TABLE IF NOT EXISTS "comments" (
  "id" text PRIMARY KEY,
  "post_id" text NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE,
  "author_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "content" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);




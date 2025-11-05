import { user as userSchema } from "@/app/shared/lib/db/schemas";
import { type InferSelectModel } from "drizzle-orm";

export type IUser = InferSelectModel<typeof userSchema>;

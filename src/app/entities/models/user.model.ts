import { user as userSchema } from "@/pkg/libraries/drizzle";
import { type InferSelectModel } from "drizzle-orm";

//interface
export type IUser = InferSelectModel<typeof userSchema>;

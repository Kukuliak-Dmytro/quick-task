import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

//constant
/**
 * Navigation utilities for locale-aware routing.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

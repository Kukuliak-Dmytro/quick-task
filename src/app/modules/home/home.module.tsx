"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/pkg/libraries/locale";
import { cn } from "@/app/shared/utils/utils";

/**
 * HomeModule component.
 *
 * This module provides a simple landing page with a link to the posts page.
 *
 * @returns JSX element representing the home module
 */
const HomeModule = () => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t("home_welcome")}</h1>
        <p className="mb-6 text-muted-foreground">{t("home_description")}</p>
        <Link
          href="/posts"
          locale={locale}
          className={cn(
            "inline-flex items-center justify-center rounded-md",
            "bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
            "hover:bg-primary/90",
          )}>
          {t("home_view_posts")}
        </Link>
      </div>
    </div>
  );
};

export default HomeModule;

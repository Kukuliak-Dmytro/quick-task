"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/pkg/libraries/locale";
import { cn } from "@/app/shared/utils/utils";
import { Button } from "@/app/shared/components/ui/button";
import * as Sentry from "@sentry/nextjs";

// interface
interface IProps {
  listViewType: string;
}

/**
 * HomeModule component.
 *
 * This module provides a simple landing page with a link to the posts page,
 * buttons to test Sentry error tracking, and displays the GrowthBook feature flag.
 *
 * @returns JSX element representing the home module
 */
const HomeModule = (props: IProps) => {
  const { listViewType } = props;
  const t = useTranslations();
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);

  // Test server-side error via API endpoint
  const handleTestServerError = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/test-error", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Server error occurred");
      }
    } catch (error) {
      // Error is already captured by Sentry in the API route
      console.error("Test error triggered:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Test client-side error
  const handleTestClientError = () => {
    try {
      // Add context before throwing
      Sentry.setContext("test_error", {
        location: "home_page",
        purpose: "Testing client-side Sentry integration",
        timestamp: new Date().toISOString(),
      });

      // Throw a test error
      throw new Error(
        "Sentry Test Error - Client-side test error for Sentry integration",
      );
    } catch (error) {
      // Capture the exception
      Sentry.captureException(error);
      console.error("Client test error triggered:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t("home_welcome")}</h1>
        <p className="mb-6 text-muted-foreground">{t("home_description")}</p>
        <div className="mb-4 rounded-md bg-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            GrowthBook Feature Flag:
          </p>
          <p className="mt-2 text-lg font-bold text-foreground">
            flag_recipe_list_view_optimization_v2 = {listViewType}
          </p>
        </div>
        <div className="flex flex-col gap-4 items-center">
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
          <div className="flex gap-2">
            <Button
              onClick={handleTestServerError}
              disabled={isLoading}
              variant="destructive"
              size="sm">
              {isLoading ? "Testing..." : t("home_test_sentry")}
            </Button>
            <Button
              onClick={handleTestClientError}
              variant="destructive"
              size="sm">
              {t("home_test_sentry_client")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeModule;

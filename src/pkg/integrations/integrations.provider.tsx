"use server";

import { cookies } from "next/headers";
import { MixpanelInitializer } from "./mixpanel/mixpanel-initializer";
import { USER_ID_COOKIE } from "@/proxy";
import { configureServerSideGrowthBook } from "./growthbook";

/**
 * Integrations provider component for server-side initialization.
 *
 * This server component:
 * - Configures GrowthBook for server-side feature flag evaluation
 * - Reads the user ID from cookies and passes it to MixpanelInitializer
 *
 * All integrations are initialized on the server side to ensure proper
 * configuration and avoid client-side bundling of server-only code.
 *
 * @returns The MixpanelInitializer component with the user ID from cookies
 */
export async function IntegrationsProvider() {
  // Configure GrowthBook for server-side evaluation
  configureServerSideGrowthBook();

  // Sentry is initialized via the import above (sentry.server.config.ts)
  // This ensures Sentry is initialized for server-side error tracking

  // Read user ID from cookies (server-side) and pass to Mixpanel
  const cookieStore = await cookies();
  const userId = cookieStore.get(USER_ID_COOKIE)?.value || null;

  return <MixpanelInitializer userId={userId} />;
}

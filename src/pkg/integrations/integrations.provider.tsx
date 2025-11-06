"use server";

import { cookies } from "next/headers";
import { MixpanelInitializer } from "./mixpanel/mixpanel-initializer";
import { USER_ID_COOKIE } from "@/proxy";
import { configureServerSideGrowthBook } from "./growthbook";

//component
/**
 * IntegrationsProvider component for server-side initialization.
 */
export const IntegrationsProvider = async () => {
  // Configure GrowthBook for server-side evaluation
  configureServerSideGrowthBook();

  // Read user ID from cookies (server-side) and pass to Mixpanel
  const cookieStore = await cookies();
  const userId = cookieStore.get(USER_ID_COOKIE)?.value || null;

  //return
  return <MixpanelInitializer userId={userId} />;
};

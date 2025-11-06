"use server";

import { MixpanelInitializer } from "./mixpanel/mixpanel-initializer";
import { configureServerSideGrowthBook } from "./growthbook";

//component
/**
 * IntegrationsProvider component for server-side initialization.
 * Configures GrowthBook and renders client-side MixpanelInitializer.
 */
export const IntegrationsProvider = async () => {
  // Configure GrowthBook for server-side evaluation
  configureServerSideGrowthBook();

  //return
  return <MixpanelInitializer />;
};

"use client";

import { useEffect } from "react";
import { trackPageView } from "./mixpanel.events";
import {
  initMixpanel,
  identifyUser,
  flushMixpanel,
} from "@/pkg/integrations/mixpanel/mixpanel.client";

//interface
interface IMixpanelInitializerProps {
  userId: string | null;
}

//component
/**
 * MixpanelInitializer component for client-side analytics setup.
 */
export const MixpanelInitializer = ({ userId }: IMixpanelInitializerProps) => {
  useEffect(() => {
    const initializeMixpanel = async () => {
      const success = initMixpanel(); // Initialize Mixpanel
      if (success) {
        // Identify user from server-side prop (same cookie as GrowthBook uses)
        // IMPORTANT: Identify before tracking to ensure events are associated with the user
        if (userId) {
          await identifyUser(userId);
          // Small delay to ensure identify is processed
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        // Track app initialization
        await trackPageView("App Initialized", window.location.pathname);
      }
    };

    initializeMixpanel();

    // Flush events on page unload to ensure they're sent
    const handleBeforeUnload = () => {
      flushMixpanel();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [userId]);

  //return
  return null;
};

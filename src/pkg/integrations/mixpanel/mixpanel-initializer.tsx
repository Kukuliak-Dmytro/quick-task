"use client";

import { useEffect } from "react";
import {
  initMixpanel,
  trackPageView,
  identifyUser,
  flushMixpanel,
} from "@/pkg/integrations/mixpanel/mixpanel.client";

/**
 * Props for the MixpanelInitializer component.
 */
interface IMixpanelInitializerProps {
  /**
   * The user ID from the server-side cookie (same as GrowthBook uses).
   * Passed from the server component to avoid an API call.
   */
  userId: string | null;
}

/**
 * Mixpanel initializer component for client-side analytics setup.
 *
 * This component initializes Mixpanel analytics on the client side,
 * identifies the user from the user-id cookie (same as GrowthBook),
 * and tracks the initial page view. It runs once when the component mounts
 * and doesn't render any UI.
 *
 * @param props - Component props containing the user ID
 * @returns This component renders nothing
 */
export function MixpanelInitializer({ userId }: IMixpanelInitializerProps) {
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

        // Flush events to ensure they're sent immediately
        await flushMixpanel();
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

  return null; // This component doesn't render anything
}

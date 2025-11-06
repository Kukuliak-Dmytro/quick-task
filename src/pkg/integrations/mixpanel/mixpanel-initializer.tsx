"use client";

import { useEffect, useState } from "react";
import { trackPageView } from "./mixpanel.events";
import {
  initMixpanel,
  identifyUser,
  flushMixpanel,
} from "@/pkg/integrations/mixpanel/mixpanel.client";

//component
/**
 * MixpanelInitializer component for client-side analytics setup.
 * Fetches user ID from API route to avoid blocking static generation.
 */
export const MixpanelInitializer = () => {
  const [userId, setUserId] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    // Fetch user ID from API route
    const fetchUserId = async () => {
      try {
        const response = await fetch("/api/user-id");
        const data = await response.json();
        setUserId(data.userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
        setUserId(null);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    // Wait until we've fetched the userId (even if it's null)
    if (userId === undefined) {
      return;
    }

    const initializeMixpanel = async () => {
      const success = initMixpanel(); // Initialize Mixpanel
      if (success) {
        // Identify user from API route (same cookie as GrowthBook uses)
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

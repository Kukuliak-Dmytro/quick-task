"use client";

import mixpanel from "mixpanel-browser";
import * as Sentry from "@sentry/nextjs";

import { envClient } from "@/config/envs";
import { setMixpanelInitialized } from "./mixpanel.events";

// Singleton state (no class)
let isInitialized = false;

//function
/**
 * Initializes the Mixpanel analytics client.
 */
export const initMixpanel = () => {
  if (!envClient.NEXT_PUBLIC_MIXPANEL_TOKEN) {
    //return
    return false;
  }

  try {
    mixpanel.init(envClient.NEXT_PUBLIC_MIXPANEL_TOKEN, {
      autocapture: false,
      debug: process.env.NODE_ENV !== "production",
      api_host: envClient.NEXT_PUBLIC_MIXPANEL_API_HOST,
      batch_requests: true,
      batch_size: 50,
      batch_flush_interval_ms: 5000,
    });

    isInitialized = true;
    setMixpanelInitialized(true);

    //return
    return true;
  } catch (error) {
    Sentry.captureException(error, {
      tags: { component: "mixpanel", operation: "initMixpanel" },
    });
    //return
    return false;
  }
};

//function
/**
 * Identifies a user in Mixpanel analytics.
 */
export const identifyUser = async (userId: string) => {
  if (!isInitialized) {
    //return
    return;
  }

  try {
    mixpanel.identify(userId);
  } catch (error) {
    Sentry.captureException(error, {
      tags: { component: "mixpanel", operation: "identifyUser" },
    });
  }
};

//function
/**
 * Flushes queued events to Mixpanel servers.
 */
export const flushMixpanel = async () => {
  if (!isInitialized) {
    //return
    return;
  }

  try {
    // Mixpanel automatically flushes events, but we can trigger it by calling track with no callback
    // or by using the internal flush mechanism
    if (
      typeof (mixpanel as unknown as { flush?: () => void }).flush ===
      "function"
    ) {
      (mixpanel as unknown as { flush: () => void }).flush();
    }
  } catch (error) {
    Sentry.captureException(error, {
      tags: { component: "mixpanel", operation: "flushMixpanel" },
    });
  }
};

//function
/**
 * Checks if Mixpanel is initialized and ready for tracking.
 */
export const isMixpanelReady = () => isInitialized;

"use client";

import mixpanel from "mixpanel-browser";
import * as Sentry from "@sentry/nextjs";

import { envClient } from "@/config/envs";
import { setMixpanelInitialized } from "./mixpanel.events";

// Singleton state (no class)
let isInitialized = false;

/**
 * Initializes the Mixpanel analytics client.
 *
 * This function sets up Mixpanel with the token from environment variables.
 * It configures the client with API host and disables autocapture for better control.
 * The function is synchronous and uses traditional try-catch for error handling.
 *
 * @returns True if initialization was successful, false otherwise
 */
export const initMixpanel = () => {
  if (!envClient.NEXT_PUBLIC_MIXPANEL_TOKEN) {
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

    return true;
  } catch (error) {
    Sentry.captureException(error, {
      tags: { component: "mixpanel", operation: "initMixpanel" },
    });
    return false;
  }
};

/**
 * Identifies a user in Mixpanel analytics.
 *
 * This function associates events with a specific user ID. This should be called
 * when a user logs in or when their identity is known. Errors are automatically
 * reported to Sentry.
 *
 * @param userId - The unique identifier of the user
 * @returns A promise that resolves when identification is complete
 */
export const identifyUser = async (userId: string) => {
  if (!isInitialized) {
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

/**
 * Flushes queued events to Mixpanel servers.
 *
 * This function forces Mixpanel to immediately send all queued events to the server.
 * Mixpanel batches events and sends them automatically, but this can be used to force
 * immediate sending if needed.
 *
 * @returns A promise that resolves when flushing is complete
 */
export const flushMixpanel = async () => {
  if (!isInitialized) {
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

/**
 * Checks if Mixpanel is initialized and ready for tracking.
 *
 * This utility function returns the current initialization state of the Mixpanel client.
 * It can be used to conditionally execute tracking code or show appropriate UI states.
 *
 * @returns True if Mixpanel is initialized and ready, false otherwise
 */
export const isMixpanelReady = () => isInitialized;

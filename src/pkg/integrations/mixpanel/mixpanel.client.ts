"use client";

import mixpanel from "mixpanel-browser";
import * as Sentry from "@sentry/nextjs";
import type { Metric } from "web-vitals";

import { envClient } from "@/config/envs";

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
    console.warn("⚠️ Mixpanel token is missing! Analytics disabled.");
    console.warn(
      "Add NEXT_PUBLIC_MIXPANEL_TOKEN=your_token_here to your .env.local file",
    );
    return false;
  }

  try {
    console.log("🔧 Initializing Mixpanel...", {
      token: envClient.NEXT_PUBLIC_MIXPANEL_TOKEN?.substring(0, 10) + "...",
      apiHost: envClient.NEXT_PUBLIC_MIXPANEL_API_HOST,
    });

    mixpanel.init(envClient.NEXT_PUBLIC_MIXPANEL_TOKEN, {
      autocapture: false, // Disable autocapture for better control
      debug: process.env.NODE_ENV !== "production", // Enable debug in development
      api_host: envClient.NEXT_PUBLIC_MIXPANEL_API_HOST,
      batch_requests: true, // Batch requests for better performance
      batch_size: 50, // Batch size for events
      batch_flush_interval_ms: 5000, // Flush every 5 seconds
      persistence: "localStorage", // Use localStorage for persistence
    });

    isInitialized = true;
    console.log("✅ Mixpanel initialization complete");

    return true;
  } catch (error) {
    console.error("❌ Failed to initialize Mixpanel:", error);
    Sentry.captureException(error, {
      tags: { component: "mixpanel", operation: "initMixpanel" },
    });
    return false;
  }
};

/**
 * Tracks a post view event in Mixpanel analytics.
 *
 * This function sends a "Post View" event to Mixpanel with post details
 * including ID, title, timestamp, and current URL. Errors are automatically
 * reported to Sentry.
 *
 * @param postId - The unique identifier of the post
 * @param postTitle - The title of the post
 * @returns A promise that resolves when tracking is complete
 */
export const trackPostView = async (postId: string, postTitle: string) => {
  if (!isInitialized) {
    console.warn(
      "⚠️ Mixpanel not initialized. Post view not tracked:",
      postTitle,
    );
    return;
  }

  try {
    mixpanel.track("Post View", {
      post_id: postId,
      post_title: postTitle,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    });
    console.log("📊 Mixpanel: Tracked Post View", { postId, postTitle });
  } catch (error) {
    console.error("❌ Failed to track post view:", error);
    Sentry.captureException(error, {
      tags: { component: "mixpanel", operation: "trackPostView" },
    });
  }
};

/**
 * Tracks a post creation event in Mixpanel analytics.
 *
 * This function sends a "Post Created" event to Mixpanel with post details
 * including ID, title, published status, timestamp, and current URL. Errors are
 * automatically reported to Sentry.
 *
 * @param postId - The unique identifier of the post
 * @param postTitle - The title of the post
 * @param published - Whether the post is published
 * @returns A promise that resolves when tracking is complete
 */
export const trackPostCreation = async (
  postId: string,
  postTitle: string,
  published: boolean,
) => {
  if (!isInitialized) {
    console.warn(
      "⚠️ Mixpanel not initialized. Post creation not tracked:",
      postTitle,
    );
    return;
  }

  try {
    mixpanel.track("Post Created", {
      post_id: postId,
      post_title: postTitle,
      published,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    });
    console.log("📊 Mixpanel: Tracked Post Created", {
      postId,
      postTitle,
      published,
    });
  } catch (error) {
    console.error("❌ Failed to track post creation:", error);
    Sentry.captureException(error, {
      tags: { component: "mixpanel", operation: "trackPostCreation" },
    });
  }
};

/**
 * Tracks a page view event in Mixpanel analytics.
 *
 * This function sends a "Page View" event to Mixpanel with page details
 * including page name, path, locale, timestamp, current URL, and referrer.
 * Errors are automatically reported to Sentry.
 *
 * @param page - The name or identifier of the page
 * @param path - The URL path of the page
 * @param locale - Optional locale information
 * @returns A promise that resolves when tracking is complete
 */
export const trackPageView = async (
  page: string,
  path: string,
  locale?: string,
) => {
  if (!isInitialized) {
    console.warn("⚠️ Mixpanel not initialized. Page view not tracked:", page);
    return;
  }

  try {
    mixpanel.track("Page View", {
      page,
      path,
      locale,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer,
    });
    console.log("📊 Mixpanel: Tracked Page View", { page, path, locale });
  } catch (error) {
    console.error("❌ Failed to track page view:", error);
    Sentry.captureException(error, {
      tags: { component: "mixpanel", operation: "trackPageView" },
    });
  }
};

/**
 * Tracks an experiment view event in Mixpanel analytics.
 *
 * This function sends an "Experiment Viewed" event to Mixpanel with experiment
 * details including experiment ID, variation ID, current path, timestamp, and
 * any additional custom properties. Errors are automatically reported to Sentry.
 *
 * @param experimentId - The unique identifier of the experiment
 * @param variationId - The identifier of the variation being viewed
 * @param extra - Optional additional properties to track
 * @returns A promise that resolves when tracking is complete
 */
export const trackExperimentView = async (
  experimentId: string,
  variationId: string,
  extra?: Record<string, unknown>,
) => {
  if (!isInitialized) {
    console.warn(
      "⚠️ Mixpanel not initialized. Experiment exposure not tracked:",
      experimentId,
    );
    return;
  }

  try {
    mixpanel.track("Experiment Viewed", {
      experiment_id: experimentId,
      variation_id: variationId,
      path:
        typeof window !== "undefined" ? window.location.pathname : undefined,
      timestamp: new Date().toISOString(),
      ...extra,
    });
  } catch (error) {
    console.error("❌ Failed to track experiment view:", error);
    Sentry.captureException(error, {
      tags: { component: "mixpanel", operation: "trackExperimentView" },
    });
  }
};

/**
 * Tracks web vitals metrics in Mixpanel analytics.
 *
 * This function sends a "Web Vitals" event to Mixpanel with performance metrics
 * including Core Web Vitals and other performance measurements. Errors are
 * automatically reported to Sentry.
 *
 * @param metrics - Object containing web vitals metrics
 * @returns A promise that resolves when tracking is complete
 */
export const trackWebVitals = async (metrics: Record<string, Metric>) => {
  if (!isInitialized) {
    console.warn("⚠️ Mixpanel not initialized. Web vitals not tracked");
    return;
  }

  try {
    mixpanel.track("Web Vitals", {
      metrics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Failed to track web vitals:", error);
    Sentry.captureException(error, {
      tags: { component: "mixpanel", operation: "trackWebVitals" },
    });
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
    console.warn("⚠️ Mixpanel not initialized. User not identified:", userId);
    return;
  }

  try {
    mixpanel.identify(userId);
    console.log("👤 Mixpanel: Identified user", { userId });
  } catch (error) {
    console.error("❌ Failed to identify user:", error);
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
    console.warn("⚠️ Mixpanel not initialized. Cannot flush events.");
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
      console.log("🔄 Mixpanel: Flushed queued events");
    } else {
      // If flush doesn't exist, events will be sent automatically by Mixpanel
      console.log("🔄 Mixpanel: Events will be flushed automatically");
    }
  } catch (error) {
    console.error("❌ Failed to flush Mixpanel events:", error);
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

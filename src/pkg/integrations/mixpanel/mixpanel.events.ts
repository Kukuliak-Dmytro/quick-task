"use client";

import mixpanel from "mixpanel-browser";
import * as Sentry from "@sentry/nextjs";
import type { Metric } from "web-vitals";

// Track initialization state for event functions
let isInitialized = false;

/**
 * Sets the initialization state. Called from mixpanel.client.ts after initialization.
 */
export const setMixpanelInitialized = (initialized: boolean) => {
  isInitialized = initialized;
};

/**
 * Checks if Mixpanel is initialized and ready for tracking.
 */
const isMixpanelReady = () => isInitialized;

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
  if (!isMixpanelReady()) {
    return;
  }

  try {
    mixpanel.track("Post View", {
      post_id: postId,
      post_title: postTitle,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    });
  } catch (error) {
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
  if (!isMixpanelReady()) {
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
  } catch (error) {
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
  if (!isMixpanelReady()) {
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
  } catch (error) {
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
  if (!isMixpanelReady()) {
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
  if (!isMixpanelReady()) {
    return;
  }

  try {
    mixpanel.track("Web Vitals", {
      metrics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    Sentry.captureException(error, {
      tags: { component: "mixpanel", operation: "trackWebVitals" },
    });
  }
};

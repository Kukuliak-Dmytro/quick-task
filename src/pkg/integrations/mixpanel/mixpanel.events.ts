"use client";

import mixpanel from "mixpanel-browser";
import * as Sentry from "@sentry/nextjs";
import type { Metric } from "web-vitals";

// Track initialization state for event functions
let isInitialized = false;

//function
/**
 * Sets the initialization state.
 */
export const setMixpanelInitialized = (initialized: boolean) => {
  isInitialized = initialized;
};

//function
/**
 * Checks if Mixpanel is initialized and ready for tracking.
 */
const isMixpanelReady = () => isInitialized;

//function
/**
 * Tracks a post view event in Mixpanel analytics.
 */
export const trackPostView = async (postId: string, postTitle: string) => {
  if (!isMixpanelReady()) {
    //return
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

//function
/**
 * Tracks a post creation event in Mixpanel analytics.
 */
export const trackPostCreation = async (
  postId: string,
  postTitle: string,
  published: boolean,
) => {
  if (!isMixpanelReady()) {
    //return
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

//function
/**
 * Tracks a page view event in Mixpanel analytics.
 */
export const trackPageView = async (
  page: string,
  path: string,
  locale?: string,
) => {
  if (!isMixpanelReady()) {
    //return
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

//function
/**
 * Tracks an experiment view event in Mixpanel analytics.
 */
export const trackExperimentView = async (
  experimentId: string,
  variationId: string,
  extra?: Record<string, unknown>,
) => {
  if (!isMixpanelReady()) {
    //return
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

//function
/**
 * Tracks web vitals metrics in Mixpanel analytics.
 */
export const trackWebVitals = async (metrics: Record<string, Metric>) => {
  if (!isMixpanelReady()) {
    //return
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

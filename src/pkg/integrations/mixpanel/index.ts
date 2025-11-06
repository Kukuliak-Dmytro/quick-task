/**
 * Mixpanel library re-exports.
 *
 * This file re-exports all Mixpanel-related utilities and tracking functions
 * for convenient importing throughout the application.
 */
export {
  initMixpanel,
  trackPostView,
  trackPostCreation,
  trackPageView,
  trackExperimentView,
  trackWebVitals,
  identifyUser,
  flushMixpanel,
  isMixpanelReady,
} from "./mixpanel.client";
export { MixpanelInitializer } from "./mixpanel-initializer";

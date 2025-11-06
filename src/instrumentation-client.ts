import * as Sentry from "@sentry/nextjs";

import { envClient } from "@/config/envs";

// init
Sentry.init({
  dsn: envClient.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: 1,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
});

//constant
/**
 * Router transition start handler for Sentry.
 */
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

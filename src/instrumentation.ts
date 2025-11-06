import * as Sentry from "@sentry/nextjs";

//function
/**
 * Registers instrumentation for Sentry.
 */
export const register = async () => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./pkg/integrations/sentry/sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./pkg/integrations/sentry/sentry.edge.config");
  }
};

//constant
/**
 * Request error handler for Sentry.
 */
export const onRequestError = Sentry.captureRequestError;

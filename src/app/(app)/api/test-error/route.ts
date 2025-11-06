import * as Sentry from "@sentry/nextjs";

//function
/**
 * GET /api/test-error - Test error endpoint for Sentry integration.
 */
export const GET = async () => {
  try {
    // Capture a test exception
    const testError = new Error(
      "Sentry Test Error - This is a test error for Sentry integration",
    );
    testError.name = "SentryTestError";

    // Add context to the error
    Sentry.setContext("test_error", {
      endpoint: "/api/test-error",
      purpose: "Testing Sentry integration",
      timestamp: new Date().toISOString(),
    });

    // Capture the exception
    Sentry.captureException(testError);

    // Also throw it to return an error response
    throw testError;
  } catch (error) {
    // Re-throw to ensure error response
    throw error;
  }
};

//function
/**
 * POST /api/test-error - Test error endpoint for Sentry integration with custom error messages.
 */
export const POST = async (request: Request) => {
  try {
    const body = await request.json().catch(() => ({}));
    const { message, type } = body;

    const errorMessage = message || "Sentry Test Error - POST request test";
    const errorType = type || "SentryTestError";

    const testError = new Error(errorMessage);
    testError.name = errorType;

    Sentry.setContext("test_error", {
      endpoint: "/api/test-error",
      method: "POST",
      purpose: "Testing Sentry integration with custom error",
      timestamp: new Date().toISOString(),
      customMessage: message,
      errorType: type,
    });

    Sentry.captureException(testError);

    throw testError;
  } catch (error) {
    throw error;
  }
};

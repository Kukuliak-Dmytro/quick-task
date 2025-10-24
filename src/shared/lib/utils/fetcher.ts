import ky from "ky";

/**
 * HTTP client instance configured for internal API routes.
 *
 * This client is configured with timeout, retry logic, and automatic
 * cookie forwarding for authentication. It can be used on both server
 * and client side for consistent API communication.
 *
 * On the server side, cookies are automatically forwarded from the request.
 * On the client side, cookies are included automatically by the browser.
 */
export const http = ky.create({
  prefixUrl: "/api",
  timeout: 10000,
  retry: 2,
  credentials: "include", // Include cookies for authentication
  hooks: {
    beforeRequest: [
      (request) => {
        // Log request for debugging
        console.log(`[API] ${request.method} ${request.url}`);
      },
    ],
    beforeError: [
      (error) => {
        // Log error for debugging
        console.error("HTTP Error:", {
          url: error.request?.url,
          method: error.request?.method,
          status: error.response?.status,
          message: error.message,
        });

        return error;
      },
    ],
  },
});

import { test as setup, expect } from "@playwright/test";

/**
 * Authentication setup for Playwright tests.
 *
 * This setup file authenticates a test user and saves the authentication state
 * to a file that can be reused across multiple test projects. This ensures that
 * tests that depend on authentication can run without needing to authenticate
 * in each individual test, improving test performance and reliability.
 *
 * The saved authentication state is stored in `playwright/.auth/user.json` and
 * is automatically loaded by tests configured with `storageState` in the
 * Playwright configuration.
 *
 * This setup runs once before all tests that depend on it (configured via
 * project dependencies in playwright.config.ts).
 *
 * @see playwright.config.ts for project dependencies configuration
 */
setup("authenticate", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.getByPlaceholder("Email").fill("test@example.com");
  await page.getByPlaceholder("Password").fill("testtest");
  await page.getByRole("button", { name: "Login" }).click();

  // Wait for redirect to home page after login
  await page.waitForURL("http://localhost:3000/", { timeout: 30000 });
  await expect(page).toHaveURL("http://localhost:3000/");

  // Save authenticated state to a file
  await page.context().storageState({ path: "playwright/.auth/user.json" });
});

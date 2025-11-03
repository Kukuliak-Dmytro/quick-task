import { test, expect } from "@playwright/test";

/**
 * Home page test suite.
 *
 * This test suite verifies the functionality and UI elements of the home page.
 * These tests run with authenticated state (using storageState from auth.setup.ts)
 * since the home page requires authentication to access.
 *
 * Tests included:
 * - Verifies the page title contains "Quick Task"
 * - Verifies the "View Posts" link is visible
 * - Verifies clicking the "View Posts" link navigates to the posts page
 */
test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  test("Has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Quick Task/);
  });

  test("Has link to posts page", async ({ page }) => {
    await expect(page.getByRole("link", { name: "View Posts" })).toBeVisible();
  });

  test("Clicking link to posts page navigates to posts page", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "View Posts" }).click();
    await expect(page).toHaveURL("http://localhost:3000/posts");
  });
});

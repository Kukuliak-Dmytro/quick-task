import { test, expect } from "@playwright/test";

/**
 * Posts test suite.
 *
 * This test suite verifies post creation functionality. Tests run with
 * authenticated state (using storageState from auth.setup.ts) since creating
 * posts requires authentication.
 *
 * Tests included:
 * - Verifies the complete post creation flow from form submission to viewing
 *   the created post
 */
test.describe("Posts", () => {
  /**
   * Tests the complete post creation workflow.
   *
   * This test verifies that a user can:
   * 1. Navigate to the posts page
   * 2. Open the create post form
   * 3. Fill in the post title and content
   * 4. Submit the form to create the post
   * 5. Navigate to the created post
   * 6. Verify the post content is displayed correctly
   */
  test("Can create a new post", async ({ page }) => {
    await page.goto("http://localhost:3000/posts");
    await page.getByRole("button", { name: "Create New Post" }).click();
    await page.getByPlaceholder("Title").fill("test");
    await page.getByPlaceholder("Content").fill("test");
    await page.getByRole("button", { name: "Create Post" }).click();
    await page.waitForTimeout(3000);
    await page.getByRole("link", { name: "test", exact: true }).nth(0).click();
    await page.waitForTimeout(15000);
    await expect(page.getByText("test").first()).toBeVisible();
  });
});

import { test, expect } from "@playwright/test";

test.describe("Product Catalogue Test Case", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://magento.softwaretestingboard.com");
    await expect(page.getByLabel("store logo")).toBeVisible();
  });

  test("User is able to see the product catalog when searching with a specific keyword without logging in", async ({
    page,
  }) => {
    await page.getByPlaceholder("Search entire store here...").click();
    await page.getByPlaceholder("Search entire store here...").fill("jacket");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page.getByText("Related search terms Jacket,")).toBeVisible();
    let productCatalogue = await page
      .locator("//li[@class='item product product-item']")
      .all();

    console.log("Number of product listed:", productCatalogue.length);

    expect(productCatalogue.length).toBeGreaterThan(0);
  });
});

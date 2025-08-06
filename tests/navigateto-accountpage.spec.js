import { test, expect } from "@playwright/test";
import LoginPage from "../pages/login-page";

test("Navigate to the Accounts page", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo(process.env.base_url);
  const landingPage = await loginPage.login(
    process.env.user,
    process.env.password
  );
  const accountPage = await landingPage.clickAccountTab();
  await accountPage.clickAccountLink("Account1");
  expect (await page.title()).toContain("Accounts");
});

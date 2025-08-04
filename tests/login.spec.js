import { test, expect } from "@playwright/test";
import LoginPage from "../pages/login-page.js";
import LandingPage from "../pages/landing-page.js";

test("Verify the login functionality", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo(process.env.base_url);
  const landingPage = await loginPage.login(
    process.env.user,
    process.env.password
  );
  await expect(landingPage.homeTab).toBeVisible();
});

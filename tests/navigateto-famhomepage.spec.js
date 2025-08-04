import { test, expect } from "@playwright/test";
import LoginPage from "../pages/login-page";
import FamHomePage from "../pages/famhome-page";

test("Navigate to FAM Home page", async ({ page }) => {
    test.setTimeout(90000);
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo(process.env.base_url);
  const landinPage = await loginPage.login(
    process.env.user,
    process.env.password
  );
  const accountPage = await landinPage.clickAccountTab();
  await accountPage.clickAccountLink("Account1");
  await accountPage.clickMoreOptionsicon();
  const famHomePage = await accountPage.clickFamLaunchButton();
  await famHomePage.verifyFamHomePage();

});

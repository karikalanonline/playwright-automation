import{test} from '@playwright/test';
import LoginPage from "../pages/login-page";
import testdata from '../data/test-data.js'


test("create the frame agreement", async ({page}) => {
    test.setTimeout(90000)
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
  await famHomePage.createFrameAgreement();
  await famHomePage.clickPricingRuleGroupPicklist();
  await famHomePage.selectPricingRuleGroup(testdata.prgName);
  await famHomePage.clickCreateFrameAgreementButton();
  await famHomePage.enterFaName();
  await famHomePage.clickSaveButton();
})
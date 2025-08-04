import{test} from '@playwright/test';
import LoginPage from "../pages/login-page";
import testdata from '../data/test-data.js'


test("clone the frame agreement", async ({page}) => {
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
  const countBeforeClone = await famHomePage.countFaBeforeClone();
  await famHomePage.cloneFa(countBeforeClone);
  await famHomePage.countFaAfterClone();
  await famHomePage.verifyCountOfFa(countBeforeClone);

})
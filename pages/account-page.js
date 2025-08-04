import BasePage from "../base/base-page";
import LandingPage from "./landing-page";
import Logger from "../utils/logger";
import FamHomePage from "./famhome-page";

class AccountPage extends BasePage {
  constructor(page) {
    super(page);
    this.appLaunchericon = page.locator("div.appLauncher");
    this.showMoreIcon = page.locator('span[class = "slds-assistive-text"]', {
      hasText: "Show more actions",
    });
    this.famLightningButton = page.locator("a", {
      hasText: "FAM_Lightning_SFDC1",
    });
  }

  async clickAccountLink(accountName) {
    const accountLink = this.page.locator('a[class="slds-truncate"] span', {
      hasText: accountName,
    }); //We removed this.accountName
    // from constructor — because it's based on a dynamic argument, we can't declare it statically.
    //Instead, we created the locator inside the method clickAccountLink(accountName)
    await this.click(accountLink);
    return this;
  }

  async clickAppLauncher() {
    Logger.info("Clicking the AppLauncher icon");
    await this.click(this.appLaunchericon);
  }

  async clickMoreOptionsicon() {
    Logger.info("Clicking the show more options icon");
    await this.click(this.showMoreIcon);
  }

  async clickFamLaunchButton() {
    Logger.info("Clicking the FAM lightning button");
    await this.click(this.famLightningButton);
    return new FamHomePage(this.page);
  }
}

export default AccountPage;

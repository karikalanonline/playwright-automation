import BasePage from "../base/base-page";
import Logger from "../utils/logger";
import { expect } from "@playwright/test";
import AccountPage from "./account-page";

class LandingPage extends BasePage {
  constructor(page) {
    super(page);
    this.switchToLightningLink = page.locator('a.switch-to-lightning');
    this.homeTab = page.locator('span.slds-truncate', {hasText: 'Home'});
    this.accountTab = page.locator('a[href="/lightning/o/Account/home"] span.slds-truncate', {hasText: 'Accounts'});
  }


  async switchToLightning() {
    Logger.info("Switching to Lightning");
    await this.click(this.switchToLightningLink);
  }

  async clickAccountTab(){
    Logger.info("Clicking the Account tab");
    await this.click(this.accountTab);
    return new AccountPage(this.page);

  }
}

export default LandingPage;
import { expect } from "@playwright/test";
import BasePage from "../base/base-page";
import AccountPage from "./account-page";
import { TIMEOUT } from "dns";
import Logger from "../utils/logger";
import testData from "../data/test-data.js";

class FamHomePage extends BasePage {
  constructor(page) {
    super(page);
    this.frame = page.frameLocator('iframe[title ="Frame Agreement Manager"]');
    this.famTitle = this.frame.locator('h5[class="fa-main-header__subtitle"]');
    this.addnewagreementbutton = this.frame.locator(
      'div[class="fa-dropdown-group"]'
    );
    this.frameagreementbutton = this.frame.locator("#createnewchild");
    this.pricingRulePickList = this.frame.locator('input[role = "listbox"]');
    this.createFrameAgreementButton = this.frame.locator(
      'button[aria-label = "Create Frame Agreement"]'
    );
    this.faName = this.frame.locator('input[placeholder="Enter text"]').nth(0);
    this.saveButton = this.frame.getByRole("button", { name: "save" });
    this.addProducts = this.frame.getByRole("button", { name: "Add Products" });
    this.successMessage = this.frame.locator("span", {
      hasText: "Successfuly saved frame agreement!",
    });
    this.backArrow = this.frame.locator(
      'div[class="fa-secondary-header__prev"]'
    );
    this.deleteOption = this.frame.locator("button.fa-dropdown__button span", {
      hasText: "Delete",
    });
    this.confirmDelete = this.frame.locator(
      "button.fa-button.fa-button--brand",
      { hasText: "Delete" }
    );
    this.cloneOption = this.frame.locator("button.fa-dropdown__button span", {
      hasText: "Clone",
    });
    this.confirmClone = this.frame.locator(
      "button.fa-button.fa-button--brand",
      { hasText: "Clone" }
    );
    this.fa = this.frame.locator('div[class="fa-panel"]', {
      hasText: testData.faName,
    });
  }

  async verifyFamHomePage() {
    await expect(this.addnewagreementbutton).toBeVisible({ timeout: 30000 });
    return this;
  }

  async waitForAppToLoad() {
    Logger.info("Waiting for the application to load");
    await expect(this.addnewagreementbutton).toBeVisible({ timeout: 60000 });
  }

  async createFrameAgreement() {
    await expect(this.addnewagreementbutton).toBeVisible({ timeout: 40000 });
    await this.click(this.addnewagreementbutton);
    await this.click(this.frameagreementbutton);
    return this;
  }

  async clickPricingRuleGroupPicklist() {
    await this.click(this.pricingRulePickList);
    return this;
  }

  async selectPricingRuleGroup(prg) {
    Logger.info("Selecting the pricing rule group");

    const pricingRuleGroup = this.frame.locator(
      'div[class="cs-data-table-truncate"]',
      {
        hasText: prg,
      }
    );
    await this.page.waitForTimeout(3000);
    await this.click(pricingRuleGroup);
    return this;
  }

  async clickCreateFrameAgreementButton() {
    Logger.info("Clicking the create frame agreement button");
    await this.click(this.createFrameAgreementButton);
  }

  async enterFaName() {
    await expect(this.faName).toBeVisible({ timeout: 40000 });
    Logger.info("Enter the frame agreement name");
    await this.fill(this.faName, testData.faName);
  }

  async clickSaveButton() {
    Logger.info("Clicking the save button");
    this.click(this.saveButton);
    await expect(this.successMessage).toBeVisible({ timeout: 30000 });
  }

  async clickBackButton() {
    Logger.info("Clicking the backward arrow");
    await this.click(this.backArrow);
  }

  async countFaBeforeClone() {
    await this.waitForAppToLoad();
    const countBeforeClone = await this.fa.count();
    console.log(
      "The count of the frame agreement before clone is :" + countBeforeClone
    );
    return countBeforeClone;
  }

  async cloneFa(countFaBeforeClone) {
    Logger.info("cloning the frame agreement");
    await this.waitForAppToLoad();
    const allFa = await this.frame.locator('div[class="fa-panel"]');
    const countOfAllFa = await allFa.count();

    for (let i = 0; i < countOfAllFa; i++) {
      const faLineItem = allFa.nth(i);
      const textContent = await faLineItem.innerText();
      if (textContent.includes(testData.faName)) {
        const threeDots = faLineItem.locator("button.fa-panel__button");
        await threeDots.click();
        await this.click(this.cloneOption);
        await this.click(this.confirmClone);
        await this.page.waitForTimeout(3000);
        await expect(this.fa).toHaveCount(countFaBeforeClone + 1, {
          timeout: 10000,
        });
        console.log("Clicked the clone");
        return;
      }
    }
    throw new Error(`FA ${testData.faName} is not present`);
  }

  async countFaAfterClone() {
    const countAfterClone = await this.fa.count();
    console.log(
      "The count of the frame agreement after clone is :" + countAfterClone
    );
    return countAfterClone;
  }

  async verifyCountOfFa(countBeforeClone) {
    Logger.info("Verifying the FA counts");
    const countAfterClone = await this.countFaAfterClone();

    if (countAfterClone === countBeforeClone + 1) {
      console.log("Cloned the frame agreement successfully");
    } else {
      throw new Error("Clone Failed");
    }
  }
  async deleteFa() {
    Logger.info("Delete the frame agreement");
    await this.waitForAppToLoad();
    const allFa = await this.frame.locator('div[class="fa-panel"]');
    const countOfAllFa = await allFa.count();
    console.log("The count of all frame agreement is :" + countOfAllFa);

    for (let i = 0; i < countOfAllFa; i++) {
      const faLineItem = allFa.nth(i);
      const textContent = await faLineItem.innerText();
      if (textContent.includes(testData.faName)) {
        const threeDots = faLineItem.locator("button.fa-panel__button");
        await threeDots.click();
        await this.click(this.deleteOption);
        await this.click(this.confirmDelete);
        await this.waitForTimeout(3000);
        return;
      }
    }
    throw new Error(`FA ${testData.faName} is not present`);
  }
}
export default FamHomePage;

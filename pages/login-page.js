import BasePage from "../base/base-page.js";
import LandingPage from "../pages/landing-page.js";
import Logger from '../utils/logger.js';

 class LoginPage extends BasePage {
constructor(page){
    super(page);
    this.usernameField = page.locator('#username');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#Login');
}

async login(username, password){
    Logger.info("Starting Login Process");
    await this.fill(this.usernameField, username);
    await this.fill(this.passwordField, password);
    await this.click(this.loginButton);
    await this.page.waitForLoadState('load');
    return new LandingPage(this.page);
    

}


}
export default LoginPage;
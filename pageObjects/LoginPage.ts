import { Locator, Page, expect } from "playwright/test";

class LoginPage {
    private readonly page : Page;
    private readonly inputEmail: Locator;
    private readonly inputPassword: Locator;
    private readonly buttonLogIn: Locator;
    private readonly labelWrongCredentials: Locator;
    private readonly labelPassword: Locator;
    private readonly labelEmailOutlined: Locator;





    constructor(page: Page) {
        this.page = page;
        this.inputEmail = page.locator("#input-0");
        this.inputPassword = page.locator("#input-2");
        this.buttonLogIn = page.locator("//button[normalize-space(.)='Log in']");
        this.labelWrongCredentials = page.locator('.v-messages');
        this.labelPassword = page.locator("//div[contains(@class, '_field')]//label[.='Password']");
        this.labelEmailOutlined = page.locator("//div[contains(@class, '_outline')]//label[.='E-mail']");
    }

    //methods for controls

    async typeEmail(email: string) {
        await this.inputEmail.pressSequentially(email);
    }

    async typePassword(password: string) {
        await this.inputPassword.pressSequentially(password);
    }

    async clickButtonLogIn() {
        await this.buttonLogIn.click();
    }

    async verifyLabelWrongCredentials() {
        await this.labelWrongCredentials.waitFor({ state: "visible" });
        let text = await this.labelWrongCredentials.innerText();
        expect(text.trim()).toEqual('Wrong Email or password');
    }

    private async verifyColorFailedLabel(label: Locator) {
        await expect(label).toHaveCSS('color', "rgb(176, 0, 32)");
    }

    async verifyColorFailedPassword() {
        this.verifyColorFailedLabel(this.labelPassword);
    }

    async verifyLabelEmailOutlined() {
        expect(this.labelEmailOutlined).toBeVisible();
    }

    async login(email: string, password: string) {
        await this.page.goto('/');
        await this.typeEmail(email);
        await this.typePassword(password)
        await this.clickButtonLogIn();
    }

}

export default LoginPage;
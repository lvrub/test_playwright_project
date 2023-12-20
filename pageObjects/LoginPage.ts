import { Locator, Page, expect } from "playwright/test";

class LoginPage {
    private readonly inputEmail: Locator;
    private readonly inputPassword: Locator;
    private readonly buttonLogIn: Locator;
    private readonly labelWrongCredentials: Locator;



    constructor(page: Page) {
        this.inputEmail = page.locator("#input-0");
        this.inputPassword = page.locator("#input-2");
        this.buttonLogIn = page.locator("//button[normalize-space(.)='Log in']");
        this.labelWrongCredentials = page.locator('.v-messages');
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
        let text = await this.labelWrongCredentials.innerText();
        expect(text.trim()).toEqual('Wrong Email or password')
    }
}

export default LoginPage;
import { Locator, Page, expect } from "playwright/test";

class MainPage {
    readonly page: Page;
    readonly toolBar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.toolBar = page.locator("//header[contains(., 'Test User')]");
    }

    async checkToolBar() {
        await this.toolBar.waitFor({ state: "visible" });
        expect(this.toolBar).toBeVisible();
    }
}

export default MainPage;
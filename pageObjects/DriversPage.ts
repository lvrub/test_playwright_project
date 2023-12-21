import { Locator, Page, expect } from "playwright/test";

class DriversPage {
    private readonly page: Page;
    private readonly rowTable: Locator;


    constructor(page: Page) {
        this.page = page;
        this.rowTable = page.locator(".v-data-table__tr");
    }

    //methods for controls

    async navigateToDriversPage() {
        await this.page.goto('/users/drivers');
    }

    private async getAllRowValue() {
        return await this.rowTable.allInnerTexts();
    }

    async verifyTableData() {
        const rowsData = await this.getAllRowValue();
        rowsData.forEach((row, index) => {
            expect.soft(row.replace(/\n/g, ' ').trim().length, `Row # ${index + 1} is empty`).not.toBeLessThan(0);
        });
    }

}

export default DriversPage;
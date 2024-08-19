import { Page, expect } from "@playwright/test";

export class expectPage {
    readonly page: Page;

    constructor(page:Page) {
        this.page= page;
    }

    async validateTextFirst(locator){
        await expect.soft(this.page.getByText(locator).first()).toBeVisible();    
    }


    async fillToBeContaintText(locator, text){
        await expect.soft(this.page.locator(locator)).toHaveText(locator);
    }

    async locatorVIsible(locator){
        await expect.soft(this.page.locator(locator)).toBeVisible();
    }

}
import { Page } from "@playwright/test";

export class fillPage{
    readonly page: Page;

    constructor(page:Page){
        this.page = page;
    }

    async fillText(locator, text){
        await this.page.fill(locator, text, {timeout: 2000});
    }

    async fillGetByPlaceholder(locator, text){
        await this.page.getByPlaceholder(locator).fill(text)
    }

}
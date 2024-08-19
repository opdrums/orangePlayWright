import { Page, expect, BrowserContext } from "@playwright/test";

export class clickPage{
    readonly page: Page;

    constructor(page:Page){
        this.page = page;
    }

    async clickLocator(locator){
        await this.page.locator(locator).click();
    }

    async clickGetByRole(type, buttonName){
        await this.page.getByRole(type, {name:buttonName}).click();
    }

    async checkbox(locator){
        await this.page.locator(locator).check();
    }

    async clickLocatorFirst(locator){
        await this.page.locator(locator).first().click();
    }


    async selectLocatorList(locator,search){
        const itemsLocator = this.page.locator(locator)
        const textoBusqueda = search;
        const elementoLocator = itemsLocator.locator(`text="${textoBusqueda}"`);
        await expect(elementoLocator).toBeVisible();
        await elementoLocator.click();
    }
}
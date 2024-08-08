import { Page, expect, BrowserContext } from "@playwright/test";

export class webBasePage{
    readonly page: Page;
    private context: BrowserContext;

    constructor(page:Page){
        this.page = page;
    }

    async openUrl(url){
        try{
            await this.page.goto(url, {timeout:50000})
            await expect(this.page).not.toHaveURL(/error/);
            await this.context.newPage()
            await expect(this.page).toHaveTitle('OrangeHRM');
            await expect(this.page.locator('input[placeholder="Username"]')).toHaveClass('oxd-input oxd-input--focus');
        }catch(e){
            console.error('Error al abrir la URL:', e);
        }
    }

    async validateTextFirst(locator){
        await expect(this.page.getByText(locator).first()).toBeVisible();    
    }

    async fillText(locator, text){
        await this.page.fill(locator, text, {timeout: 2000});
    }

    async locatorVIsible(locator){
      await expect(this.page.locator(locator)).toBeVisible();
    }

    async clickLocator(locator){
        await this.page.locator(locator).click();
    }

    async clickGetByRole(type, buttonName){
        await this.page.getByRole(type, {name:buttonName}).click()
    }

    async waitTime(time){
        await this.page.waitForTimeout(time)
    }

    async clickLocatorFirst(locator){
        await this.page.locator(locator).first().click();
    }

    async loginUser(userName, userPassword){
        await this.page.fill('input[placeholder="Username"]',  userName)
        await this.page.fill('input[placeholder="Password"]', userPassword)
        await this.page.locator('button[type="submit"]').click();
    }

    async selectLocatorList(locator,search){
        const itemsLocator = this.page.locator(locator)
        const textoBusqueda = search;
        const elementoLocator = itemsLocator.locator(`text="${textoBusqueda}"`);
        await elementoLocator.click();
    }
} 


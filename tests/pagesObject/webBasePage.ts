import { Page, expect, BrowserContext } from "@playwright/test";

export class webBasePage{
    readonly page: Page;
    private context: BrowserContext;

    constructor(page:Page){
        this.page = page;
    }

    async openUrl(url){
        try{
            await this.page.goto(url)
            await this.context.newPage()
            await expect(this.page).toHaveTitle('OrangeHRM');
            await expect(this.page).not.toHaveURL(/error/);
            await expect(this.page.locator('input[placeholder="Username"]')).toHaveClass('oxd-input oxd-input--focus');
        }catch(e){
            console.error('Error al abrir la URL:', e);
        }
    }

    async validateTextFirst(locator){
        await expect(this.page.getByText(locator).first()).toBeVisible();    
    }

    async fillText(locator, text){
        await this.page.fill(locator, text);
    }

    async locatorVIsible(locator){
      await expect(this.page.locator(locator)).toBeVisible();
    }

    async clickLocator(locator){
        await this.page.locator(locator).click();
    }
}


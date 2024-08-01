import { Page, expect } from "@playwright/test";

export class webBasePage{
    readonly page: Page

    constructor(page:Page){
        this.page = page;
    }

    async openUrl(url){
        try{
            await this.page.goto(url)
            await expect(this.page).toHaveTitle('OrangeHRM');
            await expect(this.page).not.toHaveURL(/error/);

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
}


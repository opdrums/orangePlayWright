import { Page, expect } from "@playwright/test";
import { clickPage } from "../pagesObject/clickPage";
import { fillPage } from "./fillPage";
import { expectPage } from "./expectPage";


export class webBasePage{ 
    readonly page: Page;
    public clickPage: clickPage;
    public fillPage: fillPage;
    public expectPage: expectPage;


    constructor(page:Page){
        this.page = page;
        this.clickPage = new clickPage(this.page)
        this.fillPage = new fillPage(this.page)
        this.expectPage = new expectPage(this.page)
    }

    async waitTime(time){
        await this.page.waitForTimeout(time)
    }

    async openUrl(url){
        try{
            await this.page.goto(url, {timeout:50000})
            await expect(this.page).not.toHaveURL(/error/);
            await expect(this.page).toHaveTitle('OrangeHRM');
            await expect(this.page.locator('input[placeholder="Username"]')).toHaveClass('oxd-input oxd-input--focus');
        }catch(e){
            console.error('Error al abrir la URL:', e);
        }
    }

    async loginUser(userName, userPassword){
        await this.page.fill('input[placeholder="Username"]',  userName)
        await this.page.fill('input[placeholder="Password"]', userPassword)
        await this.page.locator('button[type="submit"]').click();
    }
} 


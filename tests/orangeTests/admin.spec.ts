import { test } from "@playwright/test";
import { webBasePage } from "../pagesObject/webBasePage";
import * as fs from 'fs';

let web: webBasePage;

const path = require('path');
const configPath = path.resolve(__dirname, '..//configuration/admin.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

test.beforeEach(async ({page}) =>{
    web = new webBasePage (page);
    await web.openUrl(config.url )
    await web.loginUser(config.userName, config.password)
})

test.describe("modul admin", () =>{

    test('add user admin', async () => {
        await test.step('click button add', async () => {
            await web.waitTime(2000)
            await web.clickPage.selectLocatorList("//div/ul/li", "Admin")
            await web.clickPage.clickGetByRole('button', 'Add')
        })

        await test.step('fill form register user', async () => {
            await web.fillPage.fillText("input[placeholder='Type for hints...']", config.employee)
            await web.waitTime(3000)
            await web.clickPage.clickLocator("div > div.oxd-autocomplete-dropdown.--positon-bottom > div:nth-child(1)")
            await web.fillPage.fillText("//div[4]/div/div[2]/input", config.userN)
            await web.fillPage.fillText("//div[1]/div/div[2]/input", config.userPassword)
            await web.fillPage.fillText("//div[2]/div/div[2]/input", config.userPassword)
        })
        
        await test.step('select list user role', async () => {
            await web.clickPage.clickLocatorFirst("//div[@class='oxd-select-text-input'][normalize-space()='-- Select --']")
            await web.clickPage.selectLocatorList("//div[@role='listbox']/div/span", "Admin")
        })
        

        await test.step('select list state', async () => {
            await web.clickPage.clickLocatorFirst("//div[@class='oxd-select-text-input'][normalize-space()='-- Select --']")
            await web.clickPage.selectLocatorList("//div[@role='listbox']/div/span", "Enabled")
            await web.clickPage.clickGetByRole('button', 'Save')
        })
        
        await test.step('validate created user', async () => {
            await web.expectPage.validateTextFirst("Successfully Saved")
        })
    })

    test('system search user', async () => {
        await test.step('add field userName', async () => {
            await web.clickPage.selectLocatorList("//div/ul/li", "Admin")
            await web.waitTime(2000)
            await web.fillPage.fillText("//div[2]/form/div[1]/div/div[1]/div/div[2]/input", config.userN)
        })

        await test.step('select list user role', async () => {
            await web.clickPage.clickLocatorFirst("//div[@class='oxd-select-text-input'][normalize-space()='-- Select --']")
            await web.clickPage.selectLocatorList("//div[@role='listbox']/div/span","Admin")
        })
        
        await test.step('select list state', async () => {
            await web.clickPage.clickLocatorFirst("//div[@class='oxd-select-text-input'][normalize-space()='-- Select --']")
            await web.clickPage.selectLocatorList("//div[@role='listbox']/div/span","Enabled")
            await web.clickPage.clickLocator("button[type='submit']")
        })

        await test.step('validate user exist', async () => {
            try {
                await web.expectPage.validateTextFirst(config.userN)

            } catch (e) {
                console.error("user not found", e)
            }
        })
        
    })


    test('boton delete', async () => {

        await test.step('click button admin', async () => {
            await web.waitTime(2000)
            await web.clickPage.selectLocatorList("//div/ul/li", "Admin")
        })

        await test.step('delete', async () => {
            await web.clickPage.clickLocator("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > label:nth-child(1) > span:nth-child(2) > i:nth-child(1)")
            await web.clickPage.clickLocator("//*[@id='app']/div[1]/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div[2]/div//div[6]/div/button[1]/i")
            await web.clickPage.clickGetByRole('button', 'Yes, Delete ')
        })  
        
        await test.step('validate created user', async () => {
            await web.expectPage.validateTextFirst("Successfully Deleted")
        })
    })
    
})
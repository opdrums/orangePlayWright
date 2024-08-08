import { test } from "@playwright/test";
import { webBasePage } from "../pagesObject/webBasePage";
import * as fs from 'fs';

let web: webBasePage;

const path = require('path');
const configPath = path.resolve(__dirname, '..//configuration/login.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

test.beforeEach(async ({page}) =>{
    web = new webBasePage (page);
    await web.openUrl(config.url )
    await web.loginUser(config.userName, config.password)
})

test.describe("modul admin", () =>{

    test('system search user', async () => {
        await test.step('add field userName', async () => {
            await web.selectLocatorList("//div/ul/li", "Admin")
            await web.waitTime(2000)
            await web.fillText("//div[2]/form/div[1]/div/div[1]/div/div[2]/input", config.userN)
        })

        await test.step('select list user role', async () => {
            await web.clickLocatorFirst("//div[@class='oxd-select-text-input'][normalize-space()='-- Select --']")
            await web.selectLocatorList("//div[@role='listbox']/div/span","Admin")
        })
        
        await test.step('select list state', async () => {
            await web.clickLocatorFirst("//div[@class='oxd-select-text-input'][normalize-space()='-- Select --']")
            await web.selectLocatorList("//div[@role='listbox']/div/span","Enabled")
            await web.clickLocator("button[type='submit']")
        })

        await test.step('validate user exist', async () => {
            await web.validateTextFirst(config.userN)
        })
        
    })

    test('add user admin', async ({ page }) => {
        await test.step('click button add', async () => {
            await web.waitTime(2000)
            await web.selectLocatorList("//div/ul/li", "Admin")
            await web.clickGetByRole('button', 'Add')
        })

        await test.step('fill form register user', async () => {
            await web.fillText("input[placeholder='Type for hints...']", config.employee)
            await web.waitTime(3000)
            await web.clickLocator("div > div.oxd-autocomplete-dropdown.--positon-bottom > div:nth-child(1)")
            await web.fillText("//div[4]/div/div[2]/input", config.userN)
            await web.fillText("//div[1]/div/div[2]/input", config.userPassword)
            await web.fillText("//div[2]/div/div[2]/input", config.userPassword)
        })
        
        await test.step('select list user role', async () => {
            await web.clickLocatorFirst("//div[@class='oxd-select-text-input'][normalize-space()='-- Select --']")
            await web.selectLocatorList("//div[@role='listbox']/div/span", "Admin")
        })
        

        await test.step('select list state', async () => {
            await web.clickLocatorFirst("//div[@class='oxd-select-text-input'][normalize-space()='-- Select --']")
            await web.selectLocatorList("//div[@role='listbox']/div/span", "Enabled")
            await web.clickGetByRole('button', 'Save')
            await web.validateTextFirst("Successfully Saved")
        })
        
        await test.step('validate created user', async () => {
            await web.validateTextFirst("Successfully Saved")
        })
        
    })
})
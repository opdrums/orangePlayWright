import { test } from "@playwright/test";
import { webBasePage } from '../pagesObject/webBasePage';
import * as fs from 'fs';

let web: webBasePage;

const path = require('path');
const configPath = path.resolve(__dirname, '..//configuration/pim.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

test.describe('Modul PIM', () => {
    
    test.beforeEach(async ({ page}) => {
        web = new webBasePage (page);
        await web.openUrl(config.url);
        await web.loginUser(config.userName, config.password)
    });
    
    test('add PIM', async ({ page }) => {
        
        await test.step('click button add', async () => {
            await web.clickPage.selectLocatorList("//div/ul/li", "PIM")
            await web.clickPage.clickGetByRole('button', 'Add')
        })  

        await test.step('field form', async () => {
            await web.fillPage.fillText("//input[@placeholder='First Name']", config.firstName)
            await web.fillPage.fillText("//input[@placeholder='Middle Name']", config.middleName)
            await web.fillPage.fillText("//input[@placeholder='Last Name']", config.lastName)
            await web.clickPage.clickLocator(".oxd-switch-input.oxd-switch-input--active.--label-right")
            await web.fillPage.fillText("//div[3]/div/div[1]/div/div[2]/input", config.user)
            await web.fillPage.fillText("//div[4]/div/div[1]/div/div[2]/input", config.userPassword)
            await web.fillPage.fillText("//div[4]/div/div[2]/div/div[2]/input", config.userPassword)
            await web.clickPage.clickGetByRole('button', 'Save')
        })

        await test.step('succesfully created pim', async () => {
            await web.expectPage.validateTextFirst("Successfully Saved")
        })

        await test.step('second form', async () => {
            await web.waitTime(3000)
            await web.fillPage.fillText("//form/div[2]/div[1]/div[2]/div/div[2]/input", config.otherID)
            await web.fillPage.fillText("//form/div[2]/div[2]/div[1]/div/div[2]/input", config.driverLicense)
        })

        await test.step('select nationallity status', async () => {
            await web.clickPage.clickLocatorFirst("//div[@class='oxd-select-text-input'][normalize-space()='-- Select --']")
            await web.clickPage.selectLocatorList("//div[@role='listbox']/div/span", config.nationality)
            await web.clickPage.clickLocatorFirst("//div[@class='oxd-select-text-input'][normalize-space()='-- Select --']")
            await web.clickPage.selectLocatorList("//div[@role='listbox']/div/span", config.statePerson)
        })
        

        await test.step('field date and gender', async () => {
            await web.fillPage.fillText("//form/div[2]/div[2]/div[2]/div/div[2]/div/div/input", config.dateExpire)
            await web.fillPage.fillText("//form/div[3]/div[2]/div[1]/div/div[2]/div/div/input", config.date)
            await web.clickPage.clickLocator('div[class="oxd-input-group"] div:nth-child(1) div:nth-child(2) div:nth-child(1) label:nth-child(1)')
            await web.clickPage.clickLocator("div[class='orangehrm-horizontal-padding orangehrm-vertical-padding'] button[type='submit']")
        })

        await test.step('succesfully update pim', async () => {
           await web.expectPage.validateTextFirst("Successfully Updated")
        })

        await test.step('Custom field', async () => {
            await web.clickPage.clickLocatorFirst("//div[@class='oxd-select-text-input'][normalize-space()='-- Select --']")
            await web.clickPage.selectLocatorList("//div[@role='listbox']/div/span", config.typeBlood)
            await web.fillPage.fillText("//form/div[1]/div/div[2]/div/div[2]/input", config.testFIeld)
        })

        await test.step('add attachment', async () => {
            await web.clickPage.clickGetByRole('button', 'Add')
            await page.setInputFiles('input[type="file"]', config.filePath);
            await web.fillPage.fillText("//form/div[2]/div/div/div/div[2]/textarea", config.commentFile)
            await web.clickPage.clickLocator("div[class='orangehrm-attachment'] button[type='submit']")
        })
        
        await test.step('succesfully created and updated pim', async () => {
            await web.waitTime(3000)
            await web.expectPage.validateTextFirst("Successfully Saved")
        })
    })
})

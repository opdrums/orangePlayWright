import { test} from '@playwright/test';
import { ScreenshotPage } from '..//pagesObject/ScreenshotPage';
import { webBasePage } from '../pagesObject/webBasePage';
import * as fs from 'fs';




let takeScreen = false;
let screenshotPage: ScreenshotPage;
let web: webBasePage;

const path = require('path');
const configPath = path.resolve(__dirname, '..//configuration/login.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

test.beforeEach(async ({ page}) => {
  web = new webBasePage (page);
  screenshotPage = new ScreenshotPage(page, takeScreen);
  await web.openUrl(config.url);
});

test.describe('Orange pages', () => {
    
  test('Login success', async ({ page }) => {
    await web.validateTextFirst('Login')
    await web.fillText('input[placeholder="Username"]',  config.userName)
    await web.fillText('input[placeholder="Password"]', config.password)
    await web.locatorVIsible('button[type="submit"]')
    await web.clickLocator('button[type="submit"]');
    await page.waitForTimeout(1000)
    await web.locatorVIsible('img[alt="client brand banner"]')
  });


  test('Logout success', async ({ page }) => {
    await web.fillText('input[placeholder="Username"]',  config.userName)
    await web.fillText('input[placeholder="Password"]', config.password)
    await web.locatorVIsible('button[type="submit"]')
    await web.clickLocator('button[type="submit"]');
    await page.waitForTimeout(1000)
    await web.locatorVIsible('img[alt="client brand banner"]')
    await web.clickLocator('.oxd-userdropdown-img')
    await web.clickLocator('//a[normalize-space()="Logout"]')
    await web.validateTextFirst('Login')

  });

  test('forgot password', async ({context}) =>{
    await web.clickLocator('//p[@class="oxd-text oxd-text--p orangehrm-login-forgot-header"]')
    await web.fillText('input[placeholder="Username"]',  config.userName)
    await web.validateTextFirst("Reset Password")
    await web.clickLocator('button[type="submit"]');
    await web.locatorVIsible(".oxd-text.oxd-text--h6.orangehrm-forgot-password-title")
    await context.clearCookies()
  
  })

});

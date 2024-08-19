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
    
  test('Login success', async ({ context }) => {
    await test.step('login', async () => {
      await web.loginUser( config.userName,config.password)
    })

    await test.step('validate img orange', async () => {
      await web.expectPage.locatorVIsible('img[alt="client brand banner"]')
      await context.clearCookies()
    })
  });


  test('Logout success', async ({context}) => {
    await test.step('login', async () => {
      await web.loginUser( config.userName,config.password)
    })

    await test.step('validate logout user', async () => {
      await web.clickPage.clickLocator('.oxd-userdropdown-img')
      await web.clickPage.clickLocator('//a[normalize-space()="Logout"]')
      await web.expectPage.validateTextFirst('Login')
      await context.clearCookies()
    })
  });

  test('user forgot password', async ({context}) =>{
    await test.step('click botton forgot password', async () => {
      await web.clickPage.clickLocator('//p[@class="oxd-text oxd-text--p orangehrm-login-forgot-header"]')
      await web.fillPage.fillText('input[placeholder="Username"]',  config.userName)
      await web.expectPage.validateTextFirst("Reset Password")
      await web.clickPage.clickLocator('button[type="submit"]');
    })
    
    await test.step('validate alert succes forgot password', async () => {
      await web.expectPage.locatorVIsible(".oxd-text.oxd-text--h6.orangehrm-forgot-password-title")
      await context.clearCookies()
    })
  })
});

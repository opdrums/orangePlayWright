import { test, expect } from '@playwright/test';
import { ScreenshotPage } from '..//pagesObject/ScreenshotPage';
import { webBasePage } from '../pagesObject/webBasePage';
import * as fs from 'fs';




let takeScreen = false;
let screenshotPage: ScreenshotPage;
let web: webBasePage;

const path = require('path');
const configPath = path.resolve(__dirname, '..//configuration/login.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

test.beforeEach(async ({ page }) => {
  web = new webBasePage (page);
  screenshotPage = new ScreenshotPage(page, takeScreen);
  

  await web.openUrl(config.url);
});

test.describe('Orange pages', () => {
    
  test('Login success', async ({ page }) => {
    await web.validateTextFirst('Login')
    await expect(page.locator('input[placeholder="Username"]')).toHaveClass('oxd-input oxd-input--focus');
    await web.fillText('input[placeholder="Username"]',  config.userName)
    await web.fillText('input[placeholder="Password"]', config.password)
    await web.locatorVIsible('button[type="submit"]')
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(1000)
    await web.locatorVIsible('img[alt="client brand banner"]')
  });


  test('Login success1', async ({ page }) => {
    await web.validateTextFirst('Login')
    await expect(page.locator('input[placeholder="Username"]')).toHaveClass('oxd-input oxd-input--focus');
    await web.fillText('input[placeholder="Username"]',  config.userName)
    await web.fillText('input[placeholder="Password"]', config.password)
    await web.locatorVIsible('button[type="submit"]')
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(1000)
    await web.locatorVIsible('img[alt="client brand banner"]')
  });

});

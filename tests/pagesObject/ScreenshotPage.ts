import { Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export class ScreenshotPage {
  readonly page: Page;
  private readonly screenshotsDir: string;
  private readonly captureScreenshots: boolean;

  constructor(page: Page, captureScreenshots: boolean = true) {
    this.page = page;
    this.screenshotsDir = path.join(__dirname, '../screenShot');
    this.captureScreenshots = captureScreenshots;

    // Asegúrate de que la carpeta de capturas de pantalla exista
    if (!fs.existsSync(this.screenshotsDir)) {
      fs.mkdirSync(this.screenshotsDir, { recursive: true });
    }
  }

  private getScreenshotPath(): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Reemplaza caracteres no válidos
    return path.join(this.screenshotsDir, `screenshot-${timestamp}.png`);
  }

  async screen() {
    if (this.captureScreenshots) {
      const screenshotPath = this.getScreenshotPath();
      await this.page.screenshot({ path: screenshotPath });
    }
  }
}

import { Locator, Page } from "@playwright/test";

export abstract class BasePage {
  protected abstract readonly path: string;

  constructor(protected readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }


  protected byTestId(testId: string): Locator {
    return this.page.locator(`[data-testid="${testId}"]`);
  }
}

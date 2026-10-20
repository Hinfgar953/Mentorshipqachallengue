import { Locator } from "@playwright/test";
import { IElement } from "./IElement";

export abstract class BaseElement implements IElement {
  constructor(
    readonly name: string,
    readonly locator: Locator,
  ) {}

  async waitUntilVisible(): Promise<void> {
    await this.locator.waitFor({ state: "visible" });
  }

  toString(): string {
    return `${this.constructor.name} "${this.name}"`;
  }
}

import { BaseElement } from "./BaseElement";
import { IClickable } from "./IElement";

//used for buttons and also for links, because both are just clicked
export class Button extends BaseElement implements IClickable {
  async click(): Promise<void> {
    await this.locator.click();
  }
}

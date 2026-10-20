import { BaseElement } from "./BaseElement";
import { IFillable } from "./IElement";

export class TextInput extends BaseElement implements IFillable {
  async fill(value: string): Promise<void> {
    await this.locator.fill(value);
  }
}

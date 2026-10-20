import { BaseElement } from "./BaseElement";
import { ISelectable } from "./IElement";

export class Dropdown extends BaseElement implements ISelectable {
  async select(option: string, timeout?: number): Promise<void> {
    try {
      await this.locator.selectOption(option, { timeout });
    } catch (error) {
      throw new Error(`The option "${option}" is not available in ${this}.`, { cause: error });
    }
  }
}

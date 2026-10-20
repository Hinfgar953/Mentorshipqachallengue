import { BaseElement } from "./BaseElement";
import { IToggleable } from "./IElement";

export class Checkbox extends BaseElement implements IToggleable {
  //setChecked only clicks when the current state is different from the wanted one
  async setChecked(checked: boolean): Promise<void> {
    await this.locator.setChecked(checked);
  }

  async isChecked(): Promise<boolean> {
    return this.locator.isChecked();
  }
}

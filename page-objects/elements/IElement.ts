import { Locator } from "@playwright/test";

export interface IElement {
  readonly name: string;
  readonly locator: Locator;
  waitUntilVisible(): Promise<void>;
}

export interface IClickable {
  click(): Promise<void>;
}

export interface IFillable {
  fill(value: string): Promise<void>;
}

export interface ISelectable {
  select(option: string, timeout?: number): Promise<void>;
}

export interface IToggleable {
  setChecked(checked: boolean): Promise<void>;
}

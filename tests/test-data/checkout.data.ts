import { PaymentCard, ShippingAddress } from "../../page-objects/pages/ShopPage";


const expiryYear = String((new Date().getFullYear() + 3) % 100).padStart(2, "0");

export const demoAddress: ShippingAddress = {
  name: "Ada Lovelace",
  street: "1 Analytical Ave",
  city: "London",
  state: "LDN",
  zip: "EC1A",
};

export const demoCard: PaymentCard = {
  number: "4111111111111111",
  expiry: `12/30`,
  cvv: "123",
};


export const WIRELESS_MOUSE_ID = 2;

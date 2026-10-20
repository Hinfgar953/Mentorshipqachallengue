import { NewProduct } from "../../api/models";
import { CATEGORIES } from "../../configs/constants";
const uniqueSuffix = Date.now();

export const productCases: Array<{ name: string; product: NewProduct }> = [
  {
    name: "electronics",
    product: {
      title: `USB-C Hub 7 in 1 ${uniqueSuffix}`,
      price: 39.9,
      description: "Hub with HDMI, SD reader and 3 USB ports",
      image: "https://i.pravatar.cc",
      category: CATEGORIES.electronics,
    },
  },
  {
    name: "jewelery",
    product: {
      title: `Silver bracelet ${uniqueSuffix}`,
      price: 85,
      description: "Handmade silver bracelet",
      image: "https://i.pravatar.cc",
      category: CATEGORIES.jewelery,
    },
  },
];

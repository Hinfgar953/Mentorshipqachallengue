import { test, expect } from "../fixtures/test";
import {
  ProductSchema,
  ProductListSchema,
  CategoriesSchema,
  CreatedProductSchema,
} from "../../api/models";
import { parseJson } from "../../utils/parseJson";
import { productCases } from "../test-data/products.data";
import { CATEGORIES } from "../../configs/constants";

test.describe("GET products API testing", () => {
  test("Get the existing products", async ({ productsApi }) => {
    const response = await productsApi.list();
    expect(response).toBeOK();

    const products = await parseJson(response, ProductListSchema);
    expect(products.length).toBeGreaterThan(0);
  });

  test("Return exactly 3 products", async ({ productsApi }) => {
    const response = await productsApi.list({ limit: 3 });
    expect(response).toBeOK();

    const products = await parseJson(response, ProductListSchema);
    expect(products).toHaveLength(3);
  });

  test("Search product by id", async ({ productsApi }) => {
    const response = await productsApi.getById(1);
    expect(response).toBeOK();

    const product = await parseJson(response, ProductSchema);
    expect(product.id).toBe(1);
  });

  test("Should list the known categories", async ({ productsApi }) => {
    const response = await productsApi.categories();
    expect(response).toBeOK();

    const categories = await parseJson(response, CategoriesSchema);
    expect([...categories].sort()).toEqual(Object.values(CATEGORIES).sort());
  });

  test("Search for a non-existing product", async ({ productsApi }) => {
    const response = await productsApi.getById(99999999);

    expect(response.status()).toBe(200);
    expect((await response.text()).trim()).toBe("");
  });
});

test.describe("Products creation", () => {
  for (const { name, product } of productCases) {
    test(`Create product: ${name}`, async ({ productsApi }) => {
      const response = await productsApi.create(product);
      expect(response).toBeOK();

      const createdProduct = await parseJson(response, CreatedProductSchema);
      expect(createdProduct.id).toBeGreaterThan(0);
    });
  }
});
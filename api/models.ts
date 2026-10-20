import { z } from "zod";
export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  rating: z.object({ rate: z.number(), count: z.number() }),
});
export type ProductDto = z.infer<typeof ProductSchema>;

export const ProductListSchema = z.array(ProductSchema);
export const CategoriesSchema = z.array(z.string());


export const NewProductSchema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.string(),
  category: z.string(),
});
export type NewProduct = z.infer<typeof NewProductSchema>;

export const CreatedProductSchema = z.looseObject({ id: z.number() });

export const TokenSchema = z.object({ token: z.string().min(10) });

export const CartSchema = z.looseObject({
  id: z.number(),
  userId: z.number(),
  date: z.string(),
  products: z.array(z.object({ productId: z.number(), quantity: z.number() })),
});
export const CartListSchema = z.array(CartSchema);

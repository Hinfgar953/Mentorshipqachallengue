import { APIRequestContext, APIResponse } from "@playwright/test";
import { NewProduct } from "./models";
import { API_PATHS } from "../configs/constants";

export class ProductsApi {
  constructor(private readonly request: APIRequestContext) { }

  list(params?: { limit?: number; sort?: "asc" | "desc" }): Promise<APIResponse> {
    return this.request.get(API_PATHS.products, { params });
  }

  getById(id: number): Promise<APIResponse> {
    return this.request.get(`${API_PATHS.products}/${id}`);
  }

  categories(): Promise<APIResponse> {
    return this.request.get(API_PATHS.categories);
  }

  byCategory(category: string): Promise<APIResponse> {
    return this.request.get(`${API_PATHS.products}/category/${encodeURIComponent(category)}`);
  }

  create(product: NewProduct): Promise<APIResponse> {
    return this.request.post(API_PATHS.products, { data: product });
  }


  remove(id: number): Promise<APIResponse> {
    return this.request.delete(`${API_PATHS.products}/${id}`);
  }
}

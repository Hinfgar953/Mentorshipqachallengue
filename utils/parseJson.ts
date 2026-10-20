import type { APIResponse } from "@playwright/test";
import { z } from "zod";

export async function parseJson<T extends z.ZodType>(
  response: APIResponse,
  schema: T,
): Promise<z.infer<T>> {
  const body: unknown = await response.json();
  return schema.parse(body);
}
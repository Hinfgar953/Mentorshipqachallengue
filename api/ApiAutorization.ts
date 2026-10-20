import { APIRequestContext, APIResponse } from "@playwright/test";
import { Credentials } from "../domain/Credentials";
import { API_PATHS } from "../configs/constants";

export class ApiAuthorization {
  constructor(private readonly request: APIRequestContext) { }

  login(credentials: Credentials): Promise<APIResponse> {
    return this.request.post(API_PATHS.login, { data: credentials });
  }
}

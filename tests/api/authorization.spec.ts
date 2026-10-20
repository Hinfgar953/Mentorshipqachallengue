import { test, expect } from "../fixtures/test";
import { TokenSchema } from "../../api/models";
import { parseJson } from "../../utils/parseJson";
import { env } from "../../configs/env";
import { ApiAuthorization } from "../../api/ApiAutorization";

test.describe("API authorization tests", () => {
  test("Should return a token with valid credentials", async ({request }) => {
    const apiAuthorization = new ApiAuthorization(request);
    const response = await apiAuthorization.login({
      username: env.api.username,
      password: env.api.password,
    });

    expect(response).toBeOK();
    await parseJson(response, TokenSchema);
  });

  test("Should sent unhautorized error with incorrect credentials", async ({request }) => {
   const apiAuthorization = new ApiAuthorization (request);
   const response = await apiAuthorization.login({ username: "nobody", password: "wrong" });
   expect(response.status()).toBe(401);
   expect(await response.text()).toContain("incorrect");
  });
});

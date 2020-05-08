import { createMockContext } from "@shopify/jest-koa-mocks";

import { authorizeRequest } from "../../src/middleware";

describe("server", () => {
  describe("authorizeRequest", () => {
    const requestToken = "lookatmytokenisntitamazing";

    const headers = { Authorization: requestToken };
    const url = "/graphql";
    const next = jest.fn(async (): Promise<string> => "next!");

    describe("POST request to /graphql", () => {
      const ctx = createMockContext({
        headers,
        url,
        method: "POST",
      });

      describe("when the API tokens match", () => {
        const appToken = requestToken;

        it("calls next", async () => {
          expect.assertions(1);

          const middleware = authorizeRequest(appToken);
          await middleware(ctx, next);

          expect(next.mock.calls.length).toEqual(1);
        });
      });

      describe("when the API tokens don't match", () => {
        const appToken = "thisaintitchief";

        it("returns a 401 response", async () => {
          expect.assertions(1);

          const middleware = authorizeRequest(appToken);
          await middleware(ctx, next);

          expect(ctx.status).toEqual(401);
        });

        it("doesn't call next", async () => {
          expect.assertions(1);

          const middleware = authorizeRequest(appToken);
          await middleware(ctx, next);

          expect(next.mock.calls.length).toEqual(0);
        });
      });
    });

    describe("GET request", () => {
      const ctx = createMockContext({
        headers,
        url,
        method: "GET",
      });

      it("calls next", async () => {
        expect.assertions(1);

        const middleware = authorizeRequest("sometoken");
        await middleware(ctx, next);

        expect(next.mock.calls.length).toEqual(1);
      });
    });
  });
});

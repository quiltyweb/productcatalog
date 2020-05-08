import type { Context } from "koa";

const isAuthorized = (ctx: Context, appApiToken: string): boolean =>
  ctx.request.headers.authorization === appApiToken;
const isApiRequest = (ctx: Context): boolean =>
  ctx.request.path === "/graphql" && ctx.request.method === "POST";

export function authorizeRequest(appApiToken: string) {
  return async (
    ctx: Context,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    next: () => Promise<any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<Promise<any> | void> => {
    if (!isApiRequest(ctx) || isAuthorized(ctx, appApiToken)) {
      return await next();
    }

    ctx.status = 401;
    ctx.body = "Unauthorized";
  };
}

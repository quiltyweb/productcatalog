import bcrypt from "bcrypt";
import session from "koa-generic-session";
import RedisStore from "koa-redis";
import Router from "@koa/router";
import Redis from "ioredis";
import { User } from "./entity/User";
import type { ParameterizedContext } from "koa";
import { buildRouter } from "@admin-bro/koa";
import path from "path";
import serveStatic from "koa-static";
import send from "koa-send";

const DEFAULT_ROOT_PATH = "/admin";
const INVALID_CREDENTIALS_ERROR_MESSAGE = "invalidCredentials";

export const buildCustomAuthRouter = (adminBro, app, connection): Router => {
  const router = new Router({
    prefix: adminBro.options.rootPath,
  });

  let store;
  if (process.env.REDISTOGO_URL) {
    // prod
    store = new RedisStore({
      client: new Redis(process.env.REDISTOGO_URL),
    });
  } else {
    // dev
    store = new RedisStore({
      host: "redis",
    });
  }

  router.use(
    session({
      key: "gattoni:sess",
      prefix: "gattoni:sess",
      store: store,
    })
  );

  const { rootPath } = adminBro.options;
  let { loginPath, logoutPath } = adminBro.options;
  loginPath = loginPath.replace(DEFAULT_ROOT_PATH, "");
  logoutPath = logoutPath.replace(DEFAULT_ROOT_PATH, "");

  // source: https://github.com/SoftwareBrothers/admin-bro-koa/blob/master/src/utils.ts#L81
  router.get(loginPath, async (ctx) => {
    ctx.body = await adminBro.renderLogin({
      action: rootPath + loginPath,
      errorMessage: null,
    });
  });

  const auth = {
    authenticate: async (
      email: string,
      password: string
    ): Promise<typeof User> | null => {
      const user = await connection.manager.findOne(User, {
        email: email,
      });
      if (user) {
        const matched = await bcrypt.compare(password, user.encryptedPassword);
        if (matched) {
          return user;
        }
      }
      return null;
    },
  };

  // source: https://github.com/SoftwareBrothers/admin-bro-koa/blob/master/src/utils.ts#L88
  router.post(loginPath, async (ctx: ParameterizedContext) => {
    const { email, password } = ctx.request.body;
    const adminUser = await auth.authenticate(email, password);
    if (adminUser) {
      ctx.session.adminUser = adminUser;
      if (ctx.session.redirectTo) {
        await ctx.redirect(ctx.session.redirectTo);
      } else {
        await ctx.redirect(rootPath);
      }
    } else {
      ctx.body = await adminBro.renderLogin({
        action: adminBro.options.loginPath,
        errorMessage: INVALID_CREDENTIALS_ERROR_MESSAGE,
      });
    }
  });

  // source: https://github.com/SoftwareBrothers/admin-bro-koa/blob/master/src/utils.ts#L107
  router.use(async (ctx: ParameterizedContext, next) => {
    if (ctx.session.adminUser) {
      await next();
    } else {
      const [redirectTo] = ctx.request.originalUrl.split("/actions");
      ctx.session.redirectTo = redirectTo.includes(`${rootPath}/api`)
        ? rootPath
        : redirectTo;
      ctx.redirect(rootPath + loginPath);
    }
  });

  // source: https://github.com/SoftwareBrothers/admin-bro-koa/blob/master/src/utils.ts#L119
  router.get(logoutPath, async (ctx: ParameterizedContext) => {
    const cookie = await ctx.cookies.get("gattoni:sess", { signed: true });
    await store.destroy(cookie);
    ctx.session = null;
    ctx.redirect(rootPath + loginPath);
  });

  // WILDCARD ROUTER:
  if (process.env.NODE_ENV === "production") {
    // Something prepends the workingdirectory '/app' to the static files path,
    // even if we use absolute paths for everything, but this works, so filo
    const buildPath = path.join("dist", "build");

    router.use(serveStatic(buildPath));

    router.get("(.*)", async (ctx, next) => {
      try {
        await send(ctx, path.join(buildPath, "index.html"));
      } catch (err) {
        ctx.body =
          "Ha ocurrido un error. Por favor, intente nuevamente. Comercial Gattoni.";
        console.log(err);
        return next();
      }
    });
  } else {
    router.get("/", async (ctx) => {
      ctx.body = "Hello World!";
    });
  }

  return buildRouter(adminBro, app, router);
};

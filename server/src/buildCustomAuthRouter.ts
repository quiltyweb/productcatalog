import bcrypt from "bcrypt";
import session from "koa-generic-session";
import RedisStore from "koa-redis";
import Router from "@koa/router";
import redis from "redis";
import { User } from "./entity/User";
import { ParameterizedContext } from "koa";
import { buildRouter } from "@admin-bro/koa";

const DEFAULT_ROOT_PATH = "/admin";
const INVALID_CREDENTIALS_ERROR_MESSAGE = "invalidCredentials";

export const buildCustomAuthRouter = (adminBro, app, connection) => {
  const router = new Router({
    prefix: adminBro.options.rootPath,
  });

  let store;
  if (process.env.REDISTOGO_URL) {
    // prod
    const redisClient = redis.createClient({
      url: process.env.REDISTOGO_URL,
    });
    store = new RedisStore({
      client: redisClient,
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
    authenticate: async (email: string, password: string) => {
      const user: any = await connection.manager.findOne(User, {
        email: email,
      });
      if (user) {
        const matched = await bcrypt.compare(
          password,
          user.encryptedPassword
        );
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

  return buildRouter(adminBro, app, router);
};
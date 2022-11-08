import bcrypt from "bcrypt";
import session from "koa-session";
import Router from "@koa/router";
import AdminJS from "adminjs";
import AdminJSKoa from "@adminjs/koa";
import Koa from "koa";

import type { ParameterizedContext } from "koa";
import type { Connection } from "typeorm";

import { User } from "./entity/User";

const DEFAULT_ROOT_PATH = "/admin";
const INVALID_CREDENTIALS_ERROR_MESSAGE = "invalidCredentials";

export const buildCustomAuthRouter = (
  admin: AdminJS,
  app: Koa,
  connection: Connection
): Router => {
  const router = new Router({
    prefix: admin.options.rootPath,
  });

  router.use(
    session(
      {
        key: "gattoni:sess",
        prefix: "gattoni:sess",
      },
      app
    )
  );

  const { rootPath } = admin.options;
  let { loginPath, logoutPath } = admin.options;
  loginPath = loginPath.replace(DEFAULT_ROOT_PATH, "");
  logoutPath = logoutPath.replace(DEFAULT_ROOT_PATH, "");

  // source: https://github.com/SoftwareBrothers/admin-bro-koa/blob/master/src/utils.ts#L81
  router.get(loginPath, async (ctx) => {
    ctx.body = await admin.renderLogin({
      action: rootPath + loginPath,
      errorMessage: null,
    });
  });

  const auth = {
    authenticate: async (
      email: string,
      password: string
    ): Promise<User> | null => {
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
      ctx.body = await admin.renderLogin({
        action: admin.options.loginPath,
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
    ctx.session = null;
    ctx.redirect(rootPath + loginPath);
  });

  return AdminJSKoa.buildRouter(admin, app, router);
};

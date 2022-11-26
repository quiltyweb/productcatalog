import "reflect-metadata";
import path from "path";
import serveStatic from "koa-static";
import send from "koa-send";
import Koa from "koa";
import Router from "@koa/router";
import { ApolloServer } from "apollo-server-koa";
import helmet from "koa-helmet";
import { Database, Resource } from "@adminjs/typeorm";
import AdminJS from "adminjs";
import bodyParser from "koa-bodyparser";

import type { Context as KoaContext } from "koa";

import { schema } from "./graphql/index";
import Email from "./email";
import { getAdminOptions } from "./getAdminOptions";
import { buildCustomAuthRouter } from "./buildCustomAuthRouter";
import { AppDataSource } from "./dataSource";

const { APP_KEY, PORT } = process.env;

AdminJS.registerAdapter({ Database, Resource });

AppDataSource.initialize()
  .then(async () => {
    const app = new Koa();
    app.use(bodyParser());
    app.keys = [APP_KEY];

    const adminOptions = getAdminOptions(AppDataSource);

    const admin = new AdminJS(adminOptions);
    const adminRouter = buildCustomAuthRouter(admin, app, AppDataSource);

    const clientRouter = new Router();

    const server = new ApolloServer({
      schema,
      context: ({ ctx }): KoaContext => ({
        ...ctx,
        sendEmail: Email.send,
        entityManager: AppDataSource.manager,
      }),
    });

    if (process.env.NODE_ENV === "production") {
      // Something prepends the workingdirectory '/app' to the static files path,
      // even if we use absolute paths for everything, but this works, so filo
      const buildPath = path.join("dist", "build");

      app.use(serveStatic(buildPath));

      clientRouter.get("(.*)", async (ctx, next) => {
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
      clientRouter.get("/", async (ctx) => {
        ctx.body = "Hello World!";
      });
    }

    app
      .use(helmet())
      .use(adminRouter.routes())
      .use(adminRouter.allowedMethods());
    app
      .use(helmet())
      .use(clientRouter.routes())
      .use(clientRouter.allowedMethods());

    server.applyMiddleware({ app, cors: false });

    app.listen(PORT);

    console.log(`Server running on port ${PORT}`);
  })
  .catch((error) => console.error(error));

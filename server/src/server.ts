import "reflect-metadata";
import Koa from "koa";
import Router from "koa-router";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-koa";
import helmet from "koa-helmet";
import serve from "koa-static";
import send from "koa-send";

import { schema } from "./graphql";
import Email from "./email";

import type { Context as KoaContext } from "koa";

const { NODE_ENV, APP_KEY, PORT } = process.env;

const connectionName = NODE_ENV === "development" ? "default" : NODE_ENV;

createConnection(connectionName)
  .then(async (connection) => {
    const app = new Koa();
    const router = new Router();

    app.keys = [APP_KEY];

    const server = new ApolloServer({
      schema,
      context: ({ ctx }): KoaContext => ({
        ...ctx,
        sendEmail: Email.send,
        entityManager: connection.manager,
      }),
    });

    if (process.env.NODE_ENV === "production") {
      const buildPath = __dirname + "/build";

      app.use(serve(buildPath));

      router.get("*", async (ctx, next) => {
        try {
          await send(ctx, buildPath);
        } catch (err) {
          ctx.body = "Something went wrong. Please, try again later.";
          return next();
        }
      });
    } else {
      router.get("/", async (ctx) => {
        ctx.body = "Hello World!";
      });
    }

    app.use(helmet()).use(router.routes()).use(router.allowedMethods());

    server.applyMiddleware({ app, cors: false });

    app.listen(PORT);

    console.log(`Server running on port ${PORT}`);
  })
  .catch((error) => console.error(error));

import "reflect-metadata";
import Koa from "koa";
import Router from "koa-router";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-koa";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import session from "koa-session";

import loadSchema from "./graphql";
import Email from "./email";

import type { Context as KoaContext } from "koa";

const connectionName =
  process.env.NODE_ENV === "development" ? "default" : process.env.NODE_ENV;

const CONFIG = {
  key: "koa:sess",
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
  sameSite: null,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
createConnection()
  .then(async (connection) => {
    const app = new Koa();
    const router = new Router();

    if (!process.env.APP_KEY)
      throw Error("An APP_KEY is required to sign session cookies.");

    app.keys = [process.env.APP_KEY];

    const schema = await loadSchema(connection);
    const server = new ApolloServer({
      schema,
      context: ({ ctx }): KoaContext => ({ ...ctx, sendEmail: Email.send }),
    });

    router.get("/", async (ctx) => {
      ctx.body = "Hello World!";
    });

    app
      .use(cors())
      .use(helmet())
      .use(session(CONFIG, app))
      .use(router.routes())
      .use(router.allowedMethods());

    server.applyMiddleware({ app });

    app.listen(process.env.PORT);

    console.log(`Server running on port ${process.env.PORT}`);
  })
  .catch((error) => console.error(error));

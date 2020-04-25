import "reflect-metadata";
import Koa from "koa";
import Router from "koa-router";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-koa";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import session from "koa-session";

import { schema } from "./graphql";
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

createConnection(connectionName)
  .then(async (connection) => {
    const app = new Koa();
    const router = new Router();

    if (!process.env.APP_KEY)
      throw Error("An APP_KEY is required to sign session cookies.");

    app.keys = [process.env.APP_KEY];

    const server = new ApolloServer({
      schema,
      context: ({ ctx }): KoaContext => ({
        ...ctx,
        // It shouldn't make a difference, but unless I explicitly define
        // session here, it ends up being undefined in GQL resolvers.
        session: ctx.session,
        sendEmail: Email.send,
        entityManager: connection.manager,
      }),
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

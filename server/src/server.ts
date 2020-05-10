import "reflect-metadata";
import Koa from "koa";
import Router from "koa-router";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-koa";
import helmet from "koa-helmet";
import session from "koa-session";

import { schema } from "./graphql";
import Email from "./email";

import type { Context as KoaContext } from "koa";

const { NODE_ENV, APP_KEY, PORT } = process.env;

const connectionName = NODE_ENV === "development" ? "default" : NODE_ENV;

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

    if (!APP_KEY)
      throw Error("An APP_KEY is required to sign session cookies.");

    app.keys = [APP_KEY];

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
      .use(helmet())
      .use(session(CONFIG, app))
      .use(router.routes())
      .use(router.allowedMethods());

    server.applyMiddleware({ app, cors: false });

    app.listen(PORT);

    console.log(`Server running on port ${PORT}`);
  })
  .catch((error) => console.error(error));

import "reflect-metadata";
import Koa from "koa";
import Router from "koa-router";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-koa";
import helmet from "koa-helmet";

import loadSchema from "./graphql";
import Email from "./email";

const connectionName =
  process.env.NODE_ENV === "development" ? "default" : process.env.NODE_ENV;

createConnection(connectionName)
  .then(async (connection) => {
    const app = new Koa();
    const router = new Router();

    const schema = await loadSchema(connection);
    const context = { sendEmail: Email.send };
    const server = new ApolloServer({ schema, context });

    router.get("/", async (ctx) => {
      ctx.body = "Hello World!";
    });

    app.use(helmet()).use(router.routes()).use(router.allowedMethods());

    server.applyMiddleware({ app });

    app.listen(process.env.PORT);

    console.log(`Server running on port ${process.env.PORT}`);
  })
  .catch((error) => console.log(error));

import "reflect-metadata";
import Koa from "koa";
import Router from "koa-router";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-koa";
import helmet from "koa-helmet";

import loadSchema from "./graphql";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
createConnection()
  .then(async (connection) => {
    const app = new Koa();
    const router = new Router();

    const schema = await loadSchema(connection);
    const server = new ApolloServer({ schema });
    app.use(server.getMiddleware());

    router.get("/", async (ctx) => {
      ctx.body = "Hello World!";
    });

    app.use(helmet()).use(router.routes()).use(router.allowedMethods());

    server.applyMiddleware({ app });

    app.listen(3000);

    console.log("Server running on port 3000");
  })
  .catch((error) => console.log(error));

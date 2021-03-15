import "reflect-metadata";
import Koa from "koa";
import Router from "koa-router";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-koa";
import helmet from "koa-helmet";
import serve from "koa-static";

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
      router.get("*", async (ctx) => {
        ctx.body = `
           <!DOCTYPE html>
             <html lang="en">
             <head>
               <meta charset="UTF-8">
               <title>React SSR</title>
             </head>
             <body>
               <div id="root"></div>
               <script type="text/javascript" src="` + __dirname + `/build/bundle.js"></script>
             </body>
           </html>
         `;
      });

      app.use(serve(__dirname + "/build"));
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

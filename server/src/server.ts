import "reflect-metadata";
import path from "path";
import serveStatic from "koa-static";
import send from "koa-send";
import Koa from "koa";
import Router from "@koa/router";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-koa";
import helmet from "koa-helmet";
import { Database, Resource } from "@admin-bro/typeorm";
import AdminBro from "admin-bro";
import { schema } from "./graphql/index";
import Email from "./email";
import type { Context as KoaContext } from "koa";
import bodyParser from "koa-bodyparser";
import { getAdminBroOptions } from "./getAdminBroOptions";
import { buildCustomAuthRouter } from "./buildCustomAuthRouter";

const { NODE_ENV, APP_KEY, PORT } = process.env;
const connectionName = NODE_ENV === "development" ? "default" : NODE_ENV;

AdminBro.registerAdapter({ Database, Resource });

createConnection(connectionName)
  .then(async (connection) => {
    const app = new Koa();
    app.use(bodyParser());
    app.keys = [APP_KEY];

    const adminBroOptions = getAdminBroOptions(connection);

    const adminBro = new AdminBro(adminBroOptions);

    const adminBroRouter = buildCustomAuthRouter(adminBro, app, connection);

    const clientRouter = new Router();

    const server = new ApolloServer({
      schema,
      context: ({ ctx }): KoaContext => ({
        ...ctx,
        sendEmail: Email.send,
        entityManager: connection.manager,
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
      .use(adminBroRouter.routes())
      .use(adminBroRouter.allowedMethods());
    app
      .use(helmet())
      .use(clientRouter.routes())
      .use(clientRouter.allowedMethods());

    server.applyMiddleware({ app, cors: false });

    app.listen(PORT);

    console.log(`Server running on port ${PORT}`);
  })
  .catch((error) => console.error(error));

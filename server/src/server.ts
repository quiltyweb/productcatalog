import "reflect-metadata";
import path from "path";
import Koa from "koa";
import { createConnection, Connection } from "typeorm";
import { ApolloServer } from "apollo-server-koa";
import helmet from "koa-helmet";
import serveStatic from "koa-static";
import send from "koa-send";
import { Database, Resource } from "@admin-bro/typeorm";
import AdminBro from "admin-bro";
import { schema } from "./graphql";
import Email from "./email";
import type { Context as KoaContext } from "koa";
import { Product } from "./entity/Product";
import { Category } from "./entity/Category";
import { User } from "./entity/User";
import bodyParser from "koa-bodyparser";
import { buildCustomAuthRouter } from "./buildCustomAuthRouter";
import { getAdminBroOptions } from './getAdminBroOptions';
import { buildRouter } from "@admin-bro/koa";

const { NODE_ENV, APP_KEY, PORT } = process.env;
const connectionName = NODE_ENV === "development" ? "default" : NODE_ENV;

AdminBro.registerAdapter({ Database, Resource });

createConnection(connectionName)
  .then(async (connection: Connection) => {
    const app = new Koa();
    app.use(bodyParser());
    app.keys = [APP_KEY];

    Product.useConnection(connection);
    Category.useConnection(connection);
    User.useConnection(connection);

    const adminBroOptions = getAdminBroOptions(connection);

    const adminBro = new AdminBro(adminBroOptions);

    // const router = buildCustomAuthRouter(adminBro, app, connection);
    const router = buildRouter(adminBro,app );

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

      router.get("(.*)", async (ctx, next) => {
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
      router.get("/", async (ctx) => {
        ctx.body = "Hello World!";
      });
    }

    app
      .use(helmet())
      .use(router.routes())
      .use(router.allowedMethods());

    server.applyMiddleware({ app, cors: false });

    app.listen(PORT);

    console.log(`Server running on port ${PORT}`);
  })
  .catch((error) => console.error(error));

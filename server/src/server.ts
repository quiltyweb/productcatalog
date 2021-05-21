import "reflect-metadata";
import Koa from "koa";
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

    const router = buildCustomAuthRouter(adminBro, app, connection);

    const server = new ApolloServer({
      schema,
      context: ({ ctx }): KoaContext => ({
        ...ctx,
        sendEmail: Email.send,
        entityManager: connection.manager,
      }),
    });

    app.use(helmet()).use(router.routes()).use(router.allowedMethods());

    server.applyMiddleware({ app, cors: false });

    app.listen(PORT);

    console.log(`Server running on port ${PORT}`);
  })
  .catch((error) => console.error(error));

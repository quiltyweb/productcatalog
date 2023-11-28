import http from "http";
import path from "path";

import "reflect-metadata";
import { Database, Resource } from "@adminjs/typeorm";
import AdminJS from "adminjs";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import cookieParser from "cookie-parser";
import { urlencoded, json } from "body-parser";
import helmet from "helmet";
import cors from "cors";

import schema from "./graphql";
import Email from "./email";
import { getAdminOptions } from "./getAdminOptions";
import { buildCustomAuthRouter } from "./buildCustomAuthRouter";
import { AppDataSource } from "./dataSource";

const { APP_KEY, PORT } = process.env;

// These are hashes for inline scripts loaded by AdminJS
// that violate helmet's default content security policies.
// We add them to the safelist, so we can actually load JS
// on the admin pages
const ADMINJS_INLINE_SCRIPT_HASHES = [
  "'sha256-ROxt2HUekUmX5g60CHlTB7C3zpHOn/gqdFw/oqs3bHg='",
  "'sha256-pkwpdv1oJEeHRnTwSrHzOZ/jofA8ZDxsjRg5GRkxp4M='",
];

AdminJS.registerAdapter({ Database, Resource });
const app = express();
const httpServer = http.createServer(app);

AppDataSource.initialize()
  .then(async () => {
    app.use(cors());
    app.use(cookieParser(APP_KEY));

    const clientRouter = express.Router();

    if (process.env.NODE_ENV === "production") {
      // Something prepends the workingdirectory '/app' to the static files path,
      // even if we use absolute paths for everything, but this works, so filo
      const buildPath = path.join("dist", "build");
      app.use(express.static(buildPath));

      clientRouter.get("(.*)", async (req, res, next) => {
        try {
          res.send(path.join(buildPath, "index.html"));
        } catch (err) {
          console.log(err);
          return next(
            Error(
              "Ha ocurrido un error. Por favor, intente nuevamente. Comercial Gattoni."
            )
          );
        }
      });
    } else {
      clientRouter.get("/", (_, res) => {
        res.send("Hello World!");
      });
    }

    const adminOptions = getAdminOptions(AppDataSource);
    const admin = new AdminJS(adminOptions);
    const adminRouter = buildCustomAuthRouter(admin, AppDataSource);
    app
      .use(
        helmet({
          contentSecurityPolicy: {
            directives: {
              scriptSrc: ["'self'", ...ADMINJS_INLINE_SCRIPT_HASHES],
            },
          },
        })
      )
      .use(admin.options.rootPath, adminRouter);

    app.use(urlencoded({ extended: false }));
    app.use(json());
    app.use(helmet()).use(clientRouter);

    const apolloServer = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await apolloServer.start();
    app.use(
      expressMiddleware(apolloServer, {
        context: async ({ req, res }) => ({
          req,
          res,
          sendEmail: Email.send,
          entityManager: AppDataSource.manager,
        }),
      })
    );

    await new Promise<void>((resolve) =>
      httpServer.listen({ port: PORT }, resolve)
    );

    console.log(`Server running on port ${PORT}`);
  })
  .catch((error) => console.error(error));

import "reflect-metadata";
import path from "path";
import Koa from "koa";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-koa";
import helmet from "koa-helmet";
import serveStatic from "koa-static";
import send from "koa-send";
import { Database, Resource } from "@admin-bro/typeorm";
import AdminBro, {
  AdminBroOptions,
  ActionRequest,
  PageContext,
} from "admin-bro";
import { buildAuthenticatedRouter } from "@admin-bro/koa";
import { schema } from "./graphql";
import Email from "./email";
import type { Context as KoaContext } from "koa";
import { Product } from "./entity/Product";
import { Category } from "./entity/Category";
import { User } from "./entity/User";
import bcrypt from "bcrypt";

const { NODE_ENV, APP_KEY, PORT } = process.env;

AdminBro.registerAdapter({ Database, Resource });

const connectionName = NODE_ENV === "development" ? "default" : NODE_ENV;

createConnection(connectionName)
  .then(async (connection) => {
    const app = new Koa();
    app.keys = ["super-secret1"];

    Product.useConnection(connection);
    Category.useConnection(connection);
    User.useConnection(connection);

    const adminBroOptions: AdminBroOptions = {
      resources: [
        {
          resource: Product,
          options: {
            navigation: {
              name: "Contenido",
            },
            properties: {
              id: { isVisible: false },
            },
            actions: {
              show: { icon: "View" },
              bulkDelete: { isVisible: false },
            },
          },
        },
        {
          resource: Category,
          options: {
            navigation: {
              name: "Contenido",
            },
            properties: {
              id: { isVisible: false },
            },
            actions: {
              new: { isVisible: false },
              edit: { isVisible: false },
              delete: { isVisible: false },
              show: { isVisible: false },
              bulkDelete: { isVisible: false },
            },
          },
        },
        {
          resource: User,
          options: {
            navigation: {
              name: "Usuarios",
            },
            properties: {
              encryptedPassword: {
                isVisible: false,
              },
              password: {
                type: "string",
                isVisible: {
                  list: false,
                  edit: true,
                  filter: false,
                  show: false,
                },
              },
            },
            actions: {
              new: {
                before: async (
                  request: ActionRequest
                ): Promise<ActionRequest> => {
                  if (request.payload.password) {
                    request.payload = {
                      ...request.payload,
                      encryptedPassword: await bcrypt.hash(
                        request.payload.password,
                        10
                      ),
                      password: undefined,
                    };
                  }
                  return request;
                },
              },
            },
          },
        },
      ],
      branding: {
        logo:
          "https://product-catalog.sfo2.digitaloceanspaces.com/assets/gattoni-admin.png",
        companyName: "Gattoni Admin",
        softwareBrothers: false,
      },
      locale: {
        language: "es",
        translations: {
          buttons: {
            filter: "Filtrar",
          },
          labels: {
            Product: "Productos",
            Category: "Categorías",
          },
          resources: {
            Product: {
              properties: {
                name: "Nombre",
                description: "Descripción",
                imagePath: "Imagen",
                attachmentPath: "Adjunto",
                purchasePrice: "Precio neto",
                salePrice: "Precio venta",
                supplierName: "proveedor",
                category: "Categoría",
                createdAt: "Creación",
                updatedAt: "Actualizacón",
              },
              actions: {
                new: "Crear nuevo Producto",
                show: "Detalle de Producto",
                edit: "Editar Producto",
                delete: "Borrar Producto",
              },
            },
            Category: {
              properties: {
                name: "Nombre",
                createdAt: "Creación",
                updatedAt: "Actualizacón",
              },
            },
          },
        },
      },
      dashboard: {
        handler: async (): Promise<{ some: string }> => {
          return { some: "output" };
        },
        component: AdminBro.bundle("./admin/Dashboard"),
      },
      pages: {
        Estadisticas: {
          handler: async (
            request: any,
            response: any,
            context: PageContext
          ): Promise<{ text: string }> => {
            return {
              text: "Panel de Estadisticas de Gattoni.cl",
            };
          },
          component: AdminBro.bundle("./admin/Stats"),
        },
      },
      rootPath: "/admin",
    };
    const adminBro = new AdminBro(adminBroOptions);

    const router = buildAuthenticatedRouter(adminBro, app, {
      authenticate: async (email: string, password: string) => {
        const user: any = await connection.manager.findOne(User, {
          email: email,
        });
        if (user) {
          const matched = await bcrypt.compare(
            password,
            user.encryptedPassword
          );
          if (matched) {
            return user;
          }
        }
        return null;
      },
    });

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

    app.use(helmet()).use(router.routes()).use(router.allowedMethods());

    server.applyMiddleware({ app, cors: false });

    app.listen(PORT);

    console.log(`Server running on port ${PORT}`);
  })
  .catch((error) => console.error(error));

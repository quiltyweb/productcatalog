import "reflect-metadata";
import path from "path";
import Koa from "koa";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-koa";
import helmet from "koa-helmet";
import serveStatic from "koa-static";
import send from "koa-send";
import { Database, Resource } from "@admin-bro/typeorm";
import AdminBro, { ActionRequest, PageContext } from "admin-bro";
import { buildRouter } from "@admin-bro/koa";
import { schema } from "./graphql";
import Email from "./email";
import type { Context as KoaContext } from "koa";
import { Product } from "./entity/Product";
import { Category } from "./entity/Category";
import { User } from "./entity/User";
import bcrypt from "bcrypt";
import session from "koa-generic-session";
import RedisStore from "koa-redis";
import Router from "@koa/router";
import { ParameterizedContext } from "koa";
import bodyParser from "koa-bodyparser";
import redis from "redis";
const { NODE_ENV, APP_KEY, PORT } = process.env;

const DEFAULT_ROOT_PATH = "/admin";
const INVALID_CREDENTIALS_ERROR_MESSAGE = "invalidCredentials";

AdminBro.registerAdapter({ Database, Resource });

const connectionName = NODE_ENV === "development" ? "default" : NODE_ENV;

createConnection(connectionName)
  .then(async (connection) => {
    const app = new Koa();
    app.use(bodyParser());
    app.keys = [APP_KEY];

    Product.useConnection(connection);
    Category.useConnection(connection);
    User.useConnection(connection);

    const adminBroOptions = {
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
            save: "Guardar",
            addNewItem: "Agregar nuevo Item",
            filter: "Filtrar",
            applyChanges: "Aplicar cambios",
            resetFilter: "Cancelar",
            confirmRemovalMany: "Confirma la eliminación de {{count}} registro",
            confirmRemovalMany_plural:
              "Confirma la eliminación de {{count}} registros",
            logout: "Salir",
            seeTheDocumentation: "Ver: <1>La documentacion</1>",
            createFirstRecord: "Crear Primer Registro",
          },
          labels: {
            navigation: "Navegación",
            pages: "Páginas",
            Product: "Productos",
            Category: "Categorías",
            User: "Usuarios",
            loginWelcome: "Comercial Gattoni",
            filters: "Filtros",
            selectedRecords: "({{selected}}) Seleccionados",
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
                list: "Listado de Productos",
              },
            },
            Category: {
              properties: {
                name: "Nombre",
                createdAt: "Creación",
                updatedAt: "Actualizacón",
              },
              actions: {
                list: "Listado de Categorías",
              },
            },
          },
          messages: {
            loginWelcome: "",
            confirmDelete: "Realmente desea eliminar este ítem?",
            invalidCredentials: "Email y/o contraseña incorrectos",
          },
        },
      },
      dashboard: {
        component: AdminBro.bundle("./admin/Dashboard"),
      },
      pages: {
        Estadisticas: {
          handler: async (
            request: any,
            response: any,
            context: PageContext
          ): Promise<{
            content: string;
            categoryCounter: number;
            productCounter: number;
          }> => {
            const categoryCounter = await connection.manager.count(Category);
            const productCounter = await connection.manager.count(Product);
            return {
              content: "Panel de Estadisticas de Gattoni.cl",
              categoryCounter: categoryCounter,
              productCounter: productCounter,
            };
          },
          component: AdminBro.bundle("./admin/Stats"),
        },
      },
      rootPath: "/admin",
    };

    const adminBro = new AdminBro(adminBroOptions);

    const redisRouter = () => {
      const router = new Router({
        prefix: adminBro.options.rootPath,
      });

      let store;
      if (process.env.REDISTOGO_URL) {
        // prod
        const redisClient = redis.createClient({
          url: process.env.REDISTOGO_URL,
        });
        store = new RedisStore({
          client: redisClient,
        });
      } else {
        // dev
        store = new RedisStore({
          host: "redis",
        });
      }

      router.use(
        session({
          key: "gattoni:sess",
          prefix: "gattoni:sess",
          store: store,
        })
      );

      const { rootPath } = adminBro.options;
      let { loginPath, logoutPath } = adminBro.options;
      loginPath = loginPath.replace(DEFAULT_ROOT_PATH, "");
      logoutPath = logoutPath.replace(DEFAULT_ROOT_PATH, "");

      // source: https://github.com/SoftwareBrothers/admin-bro-koa/blob/master/src/utils.ts#L81
      router.get(loginPath, async (ctx) => {
        ctx.body = await adminBro.renderLogin({
          action: rootPath + loginPath,
          errorMessage: null,
        });
      });

      const auth = {
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
      };

      // source: https://github.com/SoftwareBrothers/admin-bro-koa/blob/master/src/utils.ts#L88
      router.post(loginPath, async (ctx: ParameterizedContext) => {
        const { email, password } = ctx.request.body;
        const adminUser = await auth.authenticate(email, password);
        if (adminUser) {
          ctx.session.adminUser = adminUser;
          if (ctx.session.redirectTo) {
            await ctx.redirect(ctx.session.redirectTo);
          } else {
            await ctx.redirect(rootPath);
          }
        } else {
          ctx.body = await adminBro.renderLogin({
            action: adminBro.options.loginPath,
            errorMessage: INVALID_CREDENTIALS_ERROR_MESSAGE,
          });
        }
      });

      // source: https://github.com/SoftwareBrothers/admin-bro-koa/blob/master/src/utils.ts#L107
      router.use(async (ctx: ParameterizedContext, next) => {
        if (ctx.session.adminUser) {
          await next();
        } else {
          const [redirectTo] = ctx.request.originalUrl.split("/actions");
          ctx.session.redirectTo = redirectTo.includes(`${rootPath}/api`)
            ? rootPath
            : redirectTo;
          ctx.redirect(rootPath + loginPath);
        }
      });

      // source: https://github.com/SoftwareBrothers/admin-bro-koa/blob/master/src/utils.ts#L119
      router.get(logoutPath, async (ctx: ParameterizedContext) => {
        const cookie = await ctx.cookies.get("gattoni:sess", { signed: true });
        await store.destroy(cookie);
        ctx.session = null;
        ctx.redirect(rootPath + loginPath);
      });

      return buildRouter(adminBro, app, router);
    };

    const finalRouter = redisRouter();

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

      finalRouter.get("(.*)", async (ctx, next) => {
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
      finalRouter.get("/", async (ctx) => {
        ctx.body = "Hello World!";
      });
    }

    app
      .use(helmet())
      .use(finalRouter.routes())
      .use(finalRouter.allowedMethods());

    server.applyMiddleware({ app, cors: false });

    app.listen(PORT);

    console.log(`Server running on port ${PORT}`);
  })
  .catch((error) => console.error(error));

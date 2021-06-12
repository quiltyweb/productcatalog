import path from "path";
import { Product } from "./entity/Product";
import { Category } from "./entity/Category";
import { User } from "./entity/User";
import AdminBro, { ActionRequest, AdminBroOptions } from "admin-bro";
import bcrypt from "bcrypt";
import { Connection } from "typeorm";
import uploadFeature from "@admin-bro/upload";
import { DigitalOceanProvider } from "./DigitalOceanProvider";

export const getAdminBroOptions = (connection: Connection): AdminBroOptions => {
  Product.useConnection(connection);
  Category.useConnection(connection);
  User.useConnection(connection);

  const {
    NODE_ENV,
    SPACES_ENDPOINT,
    SPACES_ACCESS_KEY_ID,
    SPACES_SECRET_ACCESS_KEY,
    SPACES_REGION,
    SPACES_BUCKET,
  } = process.env;
  const componentPath =
    NODE_ENV === "development" || NODE_ENV === "test"
      ? "./admin/"
      : "../../src/admin/";
  const dashboardPath = path.join(componentPath, "Dashboard");
  const statsPath = path.join(componentPath, "Stats");

  const digitalOceanOptions = {
    endpoint: SPACES_ENDPOINT,
    accessKeyId: SPACES_ACCESS_KEY_ID,
    secretAccessKey: SPACES_SECRET_ACCESS_KEY,
    region: SPACES_REGION,
    bucket: SPACES_BUCKET,
  };

  const adminBroOptions = {
    resources: [
      {
        resource: Product,
        options: {
          listProperties: [
            "id",
            "name",
            "description",
            "createdAt",
            "updatedAt",
            "imagePath",
            "attachmentPath",
          ],
          navigation: {
            name: "Contenido",
          },
          properties: {
            id: { isVisible: false },
            imagePath: { isVisible: false },
            attachmentPath: { isVisible: false },
          },
          actions: {
            show: { icon: "View" },
            bulkDelete: { isVisible: false },
          },
        },
        features: [
          uploadFeature({
            provider: new DigitalOceanProvider(digitalOceanOptions),
            properties: {
              file: "imageFile",
              filePath: "imageFilePath",
              filesToDelete: `imageFilesToDelete`,
              key: "imagePath",
            },
            validation: {
              mimeTypes: ["image/jpeg", "image/jpeg"],
            },
            uploadPath: (record, filename) => {
              return `products/${filename}`;
            },
          }),
          uploadFeature({
            provider: new DigitalOceanProvider(digitalOceanOptions),
            properties: {
              file: "attachmentFile",
              filePath: "attachmentFilePath",
              filesToDelete: `attachmentFilesToDelete`,
              key: "attachmentPath",
            },
            validation: {
              mimeTypes: ["application/pdf"],
            },
            uploadPath: (record, filename) => {
              return `adjuntos/${filename}`;
            },
          }),
        ],
      },
      {
        resource: Category,
        options: {
          listProperties: ["id", "name", "createdAt", "updatedAt"],
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
            name: "Roles",
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
              isVisible: false,
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
            edit: { isVisible: false },
            delete: { isVisible: false },
            show: { isVisible: false },
            bulkDelete: { isVisible: false },
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
      component: AdminBro.bundle(dashboardPath),
    },
    pages: {
      Estadisticas: {
        handler: async (): Promise<{
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
        component: AdminBro.bundle(statsPath),
      },
    },
    rootPath: "/admin",
  };

  return adminBroOptions;
};

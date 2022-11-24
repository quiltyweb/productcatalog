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
  const imagePath = path.join(componentPath, "ImagePreview");
  const attachmentPath = path.join(componentPath, "AttachmentPreview");
  const helpPath = path.join(componentPath, "Help");

  const digitalOceanOptions = {
    endpoint: SPACES_ENDPOINT,
    accessKeyId: SPACES_ACCESS_KEY_ID,
    secretAccessKey: SPACES_SECRET_ACCESS_KEY,
    region: SPACES_REGION,
    bucket: SPACES_BUCKET,
  };

  const isRoleAdmin = ({ currentAdmin }): boolean => {
    return currentAdmin && currentAdmin.role === "admin";
  };

  const adminBroOptions = {
    resources: [
      {
        resource: Product,
        options: {
          listProperties: [
            "id",
            "imagePath",
            "attachmentPath",
            "name",
            "description",
            "updatedAt",
          ],
          navigation: {
            name: "Contenido",
          },
          properties: {
            id: { isVisible: false },
            imagePath: {
              position: 1,
              isVisible: false,
              components: {
                list: AdminBro.bundle(imagePath),
              },
            },
            attachmentPath: {
              position: 2,
              isVisible: false,
              components: {
                list: AdminBro.bundle(attachmentPath),
              },
            },
            description: {
              type: "textarea",
              isVisible: true,
            },
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
          listProperties: ["id", "email", "createdAt", "updatedAt", "role"],
          navigation: {
            name: "Roles",
          },
          properties: {
            encryptedPassword: {
              type: "password",
              isVisible: false,
            },
            password: {
              type: "password",
              isVisible: true,
            },
            role: {
              isVisible: true,
            },
          },
          actions: {
            new: {
              isAccessible: isRoleAdmin,
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
            edit: { isAccessible: isRoleAdmin },
            delete: { isAccessible: isRoleAdmin },
            show: { isAccessible: isRoleAdmin },
            bulkDelete: { isAccessible: isRoleAdmin },
            list: { isAccessible: isRoleAdmin },
            search: { isAccessible: isRoleAdmin },
          },
        },
      },
    ],
    branding: {
      logo: "https://product-catalog.sfo2.digitaloceanspaces.com/assets/gattoni-admin.png",
      companyName: "Gattoni Admin",
      softwareBrothers: false,
    },
    locale: {
      language: "es",
      translations: {
        actions: {
          new: "Crear nuevo",
          edit: "Editar",
          show: "Mostrar",
          delete: "Eliminar",
          bulkDelete: "Eliminar todo",
          list: "Listar",
        },
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
          successfullyBulkDeleted: "{{count}} registro eliminado exitosamente",
          successfullyBulkDeleted_plural:
            "{{count}} registros eliminados exitosamente",
          successfullyDeleted: "Registro eliminado exitosamente",
          successfullyUpdated: "Registro actualizado exitosamente",
          thereWereValidationErrors:
            "Se encontraron errores de validacion - revise consola de errores.",
          successfullyCreated: "Registro creado exitosamente",
          bulkDeleteError:
            "Hubo un error al eliminar registros, revise consola de error para mas informacion",
          errorFetchingRecords:
            "Hubo un error al obtener los registros, revise consola de error para mas informacion",
          errorFetchingRecord:
            "Hubo un error al obtener el registro, revise consola de error para mas informacion",
          noRecordsSelected: "No ha seleccionado ningun registro",
          theseRecordsWillBeRemoved: "El siguiente registro sera eliminado",
          theseRecordsWillBeRemoved_plural:
            "Los siguientes registros seran eliminados",
          pickSomeFirstToRemove:
            "Para eliminar registros, debe seleccionarlos primero",
          error404Resource:
            "Recurso con ID: {{resourceId}} no se ha encontrado",
          error404Action:
            "Recurso con ID: {{resourceId}} no tiene una accion con nombre: {{actionName}}",
          error404Record:
            "Recurso con ID: {{resourceId}} no tiene registro con id: {{recordId}}",
          seeConsoleForMore:
            "Revise consola de desarrollo para mas detalles...",
          noActionComponent:
            "Tiene que implementar un componente de accion para su Accion",
          noRecordsInResource: "No existen registros para este recurso",
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
      Tutoriales: {
        component: AdminBro.bundle(helpPath),
      },
    },
    rootPath: "/admin",
  };

  return adminBroOptions;
};

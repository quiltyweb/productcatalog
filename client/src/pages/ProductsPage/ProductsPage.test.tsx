import React from "react";
import {
  createMockEnvironment,
  MockPayloadGenerator,
  MockEnvironment,
} from "relay-test-utils";
import { render, screen } from "@testing-library/react";
import { ProductsPage } from "./ProductsPage";
import { MemoryRouter } from "react-router-dom";
import { Provider as AlertProvider } from "react-alert";
import { OperationDescriptor } from "react-relay";

const AlertTemplate = () => <div>template</div>;

let environment: MockEnvironment;
beforeEach(() => {
  environment = createMockEnvironment();
  render(
    <AlertProvider template={AlertTemplate}>
      <MemoryRouter initialEntries={["/categoria/:categoryId"]}>
        <ProductsPage environment={environment} />
      </MemoryRouter>
    </AlertProvider>
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

afterAll(() => {
  jest.clearAllMocks();
});

describe("ProductsPage", () => {
  test("should render loading state", () => {
    screen.getByText("Cargando...");
  });

  test.only("should render category name and product cards", async () => {
    environment.mock.resolveMostRecentOperation(
      (operation: OperationDescriptor) =>
        MockPayloadGenerator.generate(operation, {
          Category() {
            return {
              id: "1000",
              name: "mocked_category_name",
            };
          },
          ProductConnection() {
            return {
              edges: [
                {
                  node: {
                    id: "1",
                    name: "Soldador",
                    imagePath: "imagePath1",
                    attachmentPath: "attachmentPath1",
                  },
                },
                {
                  node: {
                    id: "2",
                    name: "Zapatos",
                    imagePath: "imagePath2",
                    attachmentPath: "attachmentPath2",
                  },
                },
              ],
            };
          },
        })
    );
    screen.getByRole("heading", {
      name: "Categoría seleccionada: mocked_category_name",
    });
    screen.getByRole("heading", { name: "Soldador" });
    screen.getByRole("heading", { name: "Zapatos" });
    screen.getAllByRole("link", { name: "ver producto" });
    screen.getAllByRole("button", { name: "Agregar a cotización" });
  });

  test("should render empty state when there are no products", async () => {
    environment.mock.resolveMostRecentOperation(
      (operation: OperationDescriptor) =>
        MockPayloadGenerator.generate(operation, {
          ProductConnection() {
            return {
              edges: [],
            };
          },
        })
    );
    screen.getByText(
      "No se encontraron productos. Intente con otra palabra o categoría."
    );
  });

  test("Error State", () => {
    environment.mock.rejectMostRecentOperation(new Error());

    screen.getByText(
      "Se ha producido un Error, intente nuevamente haciendo click en una categoría."
    );
  });
});

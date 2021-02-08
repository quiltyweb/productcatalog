import React from "react";
import {
  createMockEnvironment,
  MockPayloadGenerator,
  RelayMockEnvironment,
} from "relay-test-utils";
import { render, screen } from "@testing-library/react";
import { ProductsPage } from "./ProductsPage";
import { MemoryRouter } from "react-router-dom";

let environment: RelayMockEnvironment;
beforeEach(() => {
  environment = createMockEnvironment();
  render(
    <MemoryRouter initialEntries={["/categoria/:categoryId"]}>
      <ProductsPage environment={environment} />
    </MemoryRouter>
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

  test("should render data", async () => {
    environment.mock.resolveMostRecentOperation((operation) =>
      MockPayloadGenerator.generate(operation, {
        Category() {
          return {
            id: "1000",
            name: "Category title Lorem ipsum",
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
    screen.getByRole("heading", { name: "Category title Lorem ipsum" });
    screen.getByRole("heading", { name: "Soldador" });
    screen.getByRole("heading", { name: "Zapatos" });
    screen.getAllByRole("link", { name: "ver producto" });
    screen.getAllByRole("button", { name: "Añadir a cotización" });
  });

  test("should render empty state when there are no products", async () => {
    environment.mock.resolveMostRecentOperation((operation) =>
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
    environment.mock.rejectMostRecentOperation(new Error("Uh-oh"));

    screen.getByText("Se ha producido un Error, intente nuevamente.");
  });
});

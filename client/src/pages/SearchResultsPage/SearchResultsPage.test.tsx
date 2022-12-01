import React from "react";
import {
  createMockEnvironment,
  MockPayloadGenerator,
  MockEnvironment,
} from "relay-test-utils";
import { render, screen } from "@testing-library/react";
import SearchResultsPage from "./SearchResultsPage";
import { MemoryRouter } from "react-router-dom";
import { Provider as AlertProvider } from "react-alert";
import { OperationDescriptor } from "react-relay";

const AlertTemplate = () => <div>template</div>;

// TODO: check what type can be used for this module instead of `any`
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useParams: () => ({
    searchTerm: "zapato",
  }),
}));

let environment: MockEnvironment;
beforeEach(() => {
  environment = createMockEnvironment();
  render(
    <AlertProvider template={AlertTemplate}>
      <MemoryRouter initialEntries={["/categoria/:categoryId"]}>
        <SearchResultsPage environment={environment} />
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

describe("SearchResultsPage", () => {
  test("should render loading state", () => {
    screen.getByText("Cargando...");
  });

  test("should render data", async () => {
    environment.mock.resolveMostRecentOperation(
      (operation: OperationDescriptor) =>
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
    screen.getByRole("heading", { name: 'Resultados para: "zapato"' });
    screen.getByRole("heading", { name: "Soldador" });
    screen.getByRole("heading", { name: "Zapatos" });
    screen.getAllByRole("link", { name: "ver producto" });
    screen.getAllByRole("button", { name: "Agregar a cotización" });
  });

  test("should render empty state", async () => {
    environment.mock.resolveMostRecentOperation(
      (operation: OperationDescriptor) =>
        MockPayloadGenerator.generate(operation, {
          Category() {
            return {
              id: "1000",
              name: "Category title Lorem ipsum",
            };
          },
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

    screen.getByText("Se ha producido un Error, intente nuevamente. Uh-oh");
  });
});

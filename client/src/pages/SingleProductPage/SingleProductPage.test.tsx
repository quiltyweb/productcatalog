import React from "react";
import {
  createMockEnvironment,
  MockPayloadGenerator,
  RelayMockEnvironment,
} from "relay-test-utils";
import { render, screen } from "@testing-library/react";
import SingleProductPage from "./SingleProductPage";
import { MemoryRouter } from "react-router-dom";
import { Provider as AlertProvider } from "react-alert";

const AlertTemplate = () => <div>template</div>;

// TODO: check what type can be used for this module instead of `any`
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useParams: () => ({
    productId: "id123456",
  }),
}));

let environment: RelayMockEnvironment;
beforeEach(() => {
  environment = createMockEnvironment();
  render(
    <AlertProvider template={AlertTemplate}>
      <MemoryRouter initialEntries={["/producto/:productId"]}>
        <SingleProductPage environment={environment} />
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

describe("SingleProductPage", () => {
  test("should render loading state", () => {
    screen.getByText("Cargando...");
  });

  test("should render data", async () => {
    environment.mock.resolveMostRecentOperation((operation) =>
      MockPayloadGenerator.generate(operation, {
        Product() {
          return {
            id: "1",
            name: "Soldador",
            description: "description lorem ipsum",
            imagePath: "imagePath1",
            attachmentPath: "attachmentPath1",
          };
        },
      })
    );

    screen.getByRole("button", { name: "← volver a resultados" });
    screen.getByRole("heading", { name: "Soldador" });
    screen.getByAltText("Soldador");
    screen.getByText("description lorem ipsum");
    screen.getByRole("link", { name: "Descargar ficha técnica" });
    screen.getByRole("button", { name: "Agregar a cotización" });
  });

  test("Error State", () => {
    environment.mock.rejectMostRecentOperation(new Error());
    screen.getByText("Se ha producido un Error, intente nuevamente.");
  });
});

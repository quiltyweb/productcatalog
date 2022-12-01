import React from "react";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import { render, screen, within } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { OperationDescriptor } from "react-relay";

window.scrollTo = jest.fn();

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

afterAll(() => {
  jest.clearAllMocks();
});

describe("App", () => {
  test("should render Nav bar and Footer", () => {
    const environment = createMockEnvironment();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App environment={environment} />
      </MemoryRouter>
    );
    screen.getByRole("heading", { name: "GATTONI Seguridad Industrial" });
    screen.getByLabelText("Ingrese su búsqueda:");
    screen.getByText("Buscar");
    screen.getAllByText("Productos");
    screen.getAllByText("Contacto");
    screen.getAllByText("Mi Cotización");
    screen.getAllByText("Certificaciones");
  });

  test("should render categories", async () => {
    const environment = createMockEnvironment();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App environment={environment} />
      </MemoryRouter>
    );
    environment.mock.resolveMostRecentOperation(
      (operation: OperationDescriptor) =>
        MockPayloadGenerator.generate(operation, {
          CategoryConnection() {
            return {
              edges: [
                {
                  node: { id: "1", name: "Soldador" },
                },
                {
                  node: { id: "2", name: "Zapatos" },
                },
              ],
            };
          },
        })
    );

    screen.getByRole("navigation");
    const mainSection = screen.getByRole("main");
    within(mainSection).getByText("Nuestros Productos");
    const cat1 = within(mainSection).getByRole("link", {
      name: "categoría Soldador",
    });
    expect(cat1).toHaveAttribute("href", "/categoria/1");
    const cat2 = within(mainSection).getByRole("link", {
      name: "categoría Zapatos",
    });
    expect(cat2).toHaveAttribute("href", "/categoria/2");
    screen.getByRole("contentinfo");
  });

  test("Error State", () => {
    const environment = createMockEnvironment();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App environment={environment} />
      </MemoryRouter>
    );

    environment.mock.rejectMostRecentOperation(new Error());

    screen.getByText("Se ha producido un Error, intente nuevamente.");
  });
});

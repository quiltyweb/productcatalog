import React from "react";
import {
  createMockEnvironment,
  MockPayloadGenerator,
  RelayMockEnvironment,
} from "relay-test-utils";
import { render, screen, within } from "@testing-library/react";
import HomePage from "./HomePage";
import { MemoryRouter } from "react-router-dom";

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

describe.skip("HomePage", () => {
  test("should render loading state", () => {
    const environment: RelayMockEnvironment = createMockEnvironment();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomePage environment={environment} />
      </MemoryRouter>
    );
    screen.getByText("Cargando...");
  });

  test("should render data", async () => {
    const environment: RelayMockEnvironment = createMockEnvironment();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomePage environment={environment} />
      </MemoryRouter>
    );
    environment.mock.resolveMostRecentOperation((operation) =>
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
      name: "categoria Soldador Soldador",
    });
    expect(cat1).toHaveAttribute("href", "/categoria/1");
    const cat2 = within(mainSection).getByRole("link", {
      name: "categoria Zapatos Zapatos",
    });
    expect(cat2).toHaveAttribute("href", "/categoria/2");
    screen.getByRole("contentinfo");
  });

  test("Error State", () => {
    const environment = createMockEnvironment();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomePage environment={environment} />
      </MemoryRouter>
    );

    environment.mock.rejectMostRecentOperation(new Error("Uh-oh"));

    screen.getByText("Se ha producido un Error, intente nuevamente. Uh-oh");
  });
});

import React from "react";
import {
  createMockEnvironment,
  MockPayloadGenerator,
  MockEnvironment,
} from "relay-test-utils";
import { render, screen, within } from "@testing-library/react";
import HomePage from "./HomePage";
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

describe("HomePage", () => {
  test("should render loading state", () => {
    const environment: MockEnvironment = createMockEnvironment();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomePage environment={environment} />
      </MemoryRouter>
    );
    screen.getByRole("heading", { name: "Nuestros Productos" });
    expect(screen.getAllByRole("listitem")).toHaveLength(12);
  });

  test("should render category names", async () => {
    const environment: MockEnvironment = createMockEnvironment();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomePage environment={environment} />
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

    screen.getByRole("heading", { name: "Nuestros Productos" });
    const cat1 = screen.getByRole("link", {
      name: "categoría Soldador",
    });
    expect(cat1).toHaveAttribute("href", "/categoria/1");
    const cat2 = screen.getByRole("link", {
      name: "categoría Zapatos",
    });
    expect(cat2).toHaveAttribute("href", "/categoria/2");
  });

  test("Error State", () => {
    const environment = createMockEnvironment();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomePage environment={environment} />
      </MemoryRouter>
    );

    environment.mock.rejectMostRecentOperation(new Error());

    screen.getByText("Se ha producido un Error, intente nuevamente.");
  });
});

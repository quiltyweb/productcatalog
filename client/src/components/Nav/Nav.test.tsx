import React from "react";
import { render, screen } from "@testing-library/react";
import Nav from "./Nav";
import { axe, toHaveNoViolations } from "jest-axe";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import HomePageContext from "./../../pages/HomePage/HomePageContext";

expect.extend(toHaveNoViolations);
const history = createMemoryHistory();

describe("Nav Component", () => {
  it("should render", () => {
    render(
      <Router history={history}>
        <Nav />
      </Router>
    );
    screen.getByRole("heading", { name: "GATTONI Seguridad Industrial" });
    screen.getByRole("link", { name: "Productos" });
    screen.getByRole("link", { name: "Contacto" });
    screen.getByRole("link", { name: "Mi Cotización" });
    screen.getByText("Ingrese su búsqueda:");
    screen.getByRole("button", { name: "Buscar" });
  });

  it("should render a cart counter", () => {
    render(
      <HomePageContext.Provider
        value={{
          cart: [],
          cartCount: 66,
          updateCartItem: () => null,
          addCartItem: () => null,
          handleCart: () => null,
          incrementCartItem: () => null,
          decrementCartItem: () => null,
          removeCartItem: () => null,
        }}
      >
        <Router history={history}>
          <Nav />
        </Router>
      </HomePageContext.Provider>
    );

    screen.getByText("66");
  });

  it("should be accessible", async () => {
    const { container } = render(
      <Router history={history}>
        <Nav />
      </Router>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

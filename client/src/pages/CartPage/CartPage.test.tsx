import React from "react";
import { render, screen } from "@testing-library/react";
import CartPage from "./CartPage";
import { axe, toHaveNoViolations } from "jest-axe";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import HomePageContext from "../../context/HomePageContext";
import { Provider as AlertProvider } from "react-alert";

const AlertTemplate = () => <div>template</div>;

expect.extend(toHaveNoViolations);
const history = createMemoryHistory();

describe("CartPage Component", () => {
  it("should render without crashing", () => {
    render(
      <AlertProvider template={AlertTemplate}>
        <HomePageContext.Provider
          value={{
            cart: [],
            cartCount: 0,
            updateCartItem: () => null,
            addCartItem: () => null,
            handleCart: () => null,
            incrementCartItem: () => null,
            decrementCartItem: () => null,
            removeCartItem: () => null,
          }}
        >
          <Router history={history}>
            <CartPage />
          </Router>
        </HomePageContext.Provider>
      </AlertProvider>
    );
    screen.getByRole("heading", { name: "Mi Cotización:" });
  });

  it("should render empty state", () => {
    render(
      <AlertProvider template={AlertTemplate}>
        <HomePageContext.Provider
          value={{
            cart: [],
            cartCount: 0,
            updateCartItem: () => null,
            addCartItem: () => null,
            handleCart: () => null,
            incrementCartItem: () => null,
            decrementCartItem: () => null,
            removeCartItem: () => null,
          }}
        >
          <Router history={history}>
            <CartPage />
          </Router>
        </HomePageContext.Provider>
      </AlertProvider>
    );

    screen.getByText("No hay Productos en la Cotización.");
    screen.getByRole("link", {
      name: "Click aqui para empezar a agregar productos a su cotización.",
    });
  });

  it("should render cart table with items", () => {
    render(
      <AlertProvider template={AlertTemplate}>
        <HomePageContext.Provider
          value={{
            cart: [
              {
                productId: "123",
                productName: "zapato soldador",
                productImage: "blank",
                quantity: 1,
              },
              {
                productId: "456",
                productName: "casco minero",
                productImage: "blank",
                quantity: 2,
              },
              {
                productId: "457",
                productName: "lampara",
                productImage: "blank",
                quantity: 3,
              },
              {
                productId: "458",
                productName: "mascara",
                productImage: "blank",
                quantity: 4,
              },
              {
                productId: "459",
                productName: "cinturon",
                productImage: "blank",
                quantity: 5,
              },
              {
                productId: "460",
                productName: "cinturon2",
                productImage: "blank",
                quantity: 5,
              },
            ],
            cartCount: 3,
            updateCartItem: () => null,
            addCartItem: () => null,
            handleCart: () => null,
            incrementCartItem: () => null,
            decrementCartItem: () => null,
            removeCartItem: () => null,
          }}
        >
          <Router history={history}>
            <CartPage />
          </Router>
        </HomePageContext.Provider>
      </AlertProvider>
    );

    screen.getByRole("heading", { name: "Mi Cotización:" });
    screen.getByText("zapato soldador");
    screen.getByText("casco minero");
    expect(
      screen.getAllByRole("link", {
        name: "Siguiente paso: Ingrese sus datos",
      })
    ).toHaveLength(2);
  });

  it("should be accessible", async () => {
    const { container } = render(
      <AlertProvider template={AlertTemplate}>
        <HomePageContext.Provider
          value={{
            cart: [
              {
                productId: "123",
                productName: "zapato soldador",
                productImage: "blank",
                quantity: 1,
              },
              {
                productId: "456",
                productName: "casco minero",
                productImage: "blank",
                quantity: 2,
              },
            ],
            cartCount: 3,
            updateCartItem: () => null,
            addCartItem: () => null,
            handleCart: () => null,
            incrementCartItem: () => null,
            decrementCartItem: () => null,
            removeCartItem: () => null,
          }}
        >
          <Router history={history}>
            <CartPage />
          </Router>
        </HomePageContext.Provider>
      </AlertProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

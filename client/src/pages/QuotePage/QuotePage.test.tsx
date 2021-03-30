import React from "react";
import { render, screen } from "@testing-library/react";
import QuotePage from "./QuotePage";
import { axe, toHaveNoViolations } from "jest-axe";
import HomePageContext from "../../context/HomePageContext";
import { Provider as AlertProvider } from "react-alert";

const AlertTemplate = () => <div>template</div>;
expect.extend(toHaveNoViolations);

describe("QuotePage Component", () => {
  it("should render table with cart products", () => {
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
            ],
            cartCount: 0,
            updateCartItem: () => null,
            addCartItem: () => null,
            handleCart: () => null,
            incrementCartItem: () => null,
            decrementCartItem: () => null,
            removeCartItem: () => null,
          }}
        >
          <QuotePage />
        </HomePageContext.Provider>
      </AlertProvider>
    );

    screen.getByText("Imagen:");
    screen.getByText("Producto:");
    screen.getByText("Cantidad:");
    screen.getByText("zapato soldador");
    screen.getByText("1");
    screen.getByRole("heading", { name: "Ingrese datos de su cotización" });
  });

  it("should render quotation form", () => {
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
            ],
            cartCount: 0,
            updateCartItem: () => null,
            addCartItem: () => null,
            handleCart: () => null,
            incrementCartItem: () => null,
            decrementCartItem: () => null,
            removeCartItem: () => null,
          }}
        >
          <QuotePage />
        </HomePageContext.Provider>
      </AlertProvider>
    );

    screen.getByLabelText("Nombre o Empresa");
    screen.getByLabelText("E-mail");
    screen.getByLabelText("Telefono");
    screen.getByLabelText("Observaciones Generales");
    screen.getByText("Click en el botón para verificar antispam:");
    screen.getByRole("button", { name: "Enviar Cotización" });
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
          <QuotePage />
        </HomePageContext.Provider>
      </AlertProvider>
    );

    screen.getByText("Mi Cotización:");
    screen.getByText("No hay Productos en la Cotización.");
    screen.getByText(
      "Agregue articulos a su cotización navegando a través del menú de categorias"
    );
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
            ],
            cartCount: 0,
            updateCartItem: () => null,
            addCartItem: () => null,
            handleCart: () => null,
            incrementCartItem: () => null,
            decrementCartItem: () => null,
            removeCartItem: () => null,
          }}
        >
          <QuotePage />
        </HomePageContext.Provider>
      </AlertProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

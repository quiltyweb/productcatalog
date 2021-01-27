import React from "react";
import { render, screen } from "@testing-library/react";
import { CartTable } from "./CartTable";
import HomePageContext from "../../pages/HomePage/HomePageContext";

describe("CartTable Component", () => {
  describe("When CartTable is not editable", () => {
    it("should render correct table headers", () => {
      render(
        <HomePageContext.Provider
          value={{
            cart: [],
            cartCount: 2,
            updateCartItem: () => null,
            addCartItem: () => null,
            handleCart: () => null,
            incrementCartItem: () => null,
            decrementCartItem: () => null,
            removeCartItem: () => null,
          }}
        >
          <CartTable isEditable={false} />
        </HomePageContext.Provider>
      );

      screen.getByText("Imagen:");
      screen.getByText("Producto:");
      screen.getByText("Cantidad:");
      expect(screen.queryByText("Acción:")).not.toBeInTheDocument();
    });

    it("should render product details", () => {
      render(
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
          <CartTable isEditable={false} />
        </HomePageContext.Provider>
      );

      expect(screen.getAllByRole("row")).toHaveLength(3);
      screen.getAllByRole("img");
      screen.getByText("zapato soldador");
      screen.getByText("casco minero");
      screen.getByText("1");
      screen.getByText("2");
      expect(screen.queryAllByRole("button", { name: "+" })).toHaveLength(0);
      expect(screen.queryAllByRole("button", { name: "-" })).toHaveLength(0);
    });

    it("should not render action button to delete item", () => {
      render(
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
            cartCount: 1,
            updateCartItem: () => null,
            addCartItem: () => null,
            handleCart: () => null,
            incrementCartItem: () => null,
            decrementCartItem: () => null,
            removeCartItem: () => null,
          }}
        >
          <CartTable isEditable={false} />
        </HomePageContext.Provider>
      );

      expect(screen.getAllByRole("columnheader")).toHaveLength(3);
      expect(
        screen.queryByRole("button", { name: "Borrar" })
      ).not.toBeInTheDocument();
    });
  });

  describe("When CartTable is editable", () => {
    it("should render Accion table header", () => {
      render(
        <HomePageContext.Provider
          value={{
            cart: [],
            cartCount: 2,
            updateCartItem: () => null,
            addCartItem: () => null,
            handleCart: () => null,
            incrementCartItem: () => null,
            decrementCartItem: () => null,
            removeCartItem: () => null,
          }}
        >
          <CartTable isEditable={true} />
        </HomePageContext.Provider>
      );
      screen.getByText("Acción:");
    });

    it("should render a QuantityPicker for each product item", () => {
      render(
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
                productName: "zapato soldador 2",
                productImage: "blank",
                quantity: 1,
              },
            ],
            cartCount: 1,
            updateCartItem: () => null,
            addCartItem: () => null,
            handleCart: () => null,
            incrementCartItem: () => null,
            decrementCartItem: () => null,
            removeCartItem: () => null,
          }}
        >
          <CartTable isEditable={true} />
        </HomePageContext.Provider>
      );

      expect(screen.getAllByRole("row")).toHaveLength(3);
      expect(screen.queryAllByRole("button", { name: "+" })).toHaveLength(2);
      expect(screen.queryAllByRole("button", { name: "-" })).toHaveLength(2);
    });

    it("should render action button to delete item", () => {
      render(
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
            cartCount: 1,
            updateCartItem: () => null,
            addCartItem: () => null,
            handleCart: () => null,
            incrementCartItem: () => null,
            decrementCartItem: () => null,
            removeCartItem: () => null,
          }}
        >
          <CartTable isEditable={true} />
        </HomePageContext.Provider>
      );

      expect(screen.getAllByRole("columnheader")).toHaveLength(4);
      expect(
        screen.queryByRole("button", { name: "Borrar" })
      ).toBeInTheDocument();
    });
  });
});

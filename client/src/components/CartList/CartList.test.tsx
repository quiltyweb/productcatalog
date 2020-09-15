import React from "react";
import { render, screen } from "@testing-library/react";
import CartList from "./CartList";
import HomePageContext from "../../pages/HomePage/HomePageContext";

describe("CartList Component", () => {
  it("should render correct headers", () => {
    // mock const { cart, removeCartItem } = useHomePageContext();

    render(
      <HomePageContext.Provider
        value={{
          cart: [
            {
              productId: "123",
              productName: "name",
              productImage: "blak",
              quantity: 1,
            },
          ],
          cartCount: 2,
          updateCartItem: () => null,
          addCartItem: () => null,
          handleCart: () => null,
          incrementCartItem: () => null,
          decrementCartItem: () => null,
          removeCartItem: () => null,
        }}
      >
        <CartList />
      </HomePageContext.Provider>
    );

    screen.getByText("Imagen:");
    screen.getByText("Producto:");
    screen.getByText("Cantidad:");
  });
});

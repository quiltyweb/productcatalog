import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import { axe, toHaveNoViolations } from "jest-axe";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import HomePageContext from "../../context/HomePageContext";
import userEvent from "@testing-library/user-event";
import { Provider as AlertProvider } from "react-alert";

const AlertTemplate = () => <div>template</div>;

expect.extend(toHaveNoViolations);
const history = createMemoryHistory();
const user = userEvent.setup();

describe("ProductCard Component", () => {
  it("should render", () => {
    render(
      <AlertProvider template={AlertTemplate}>
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
            <ProductCard
              productId="test_productId"
              name="test_name"
              linkImage="test_linkImage"
              description="test_description"
            />
          </Router>
        </HomePageContext.Provider>
      </AlertProvider>
    );
    const image = screen.getByAltText("test_name");
    expect(image).toHaveStyle({
      "max-width": "100%",
      "max-height": "160px",
    });
    screen.getByRole("heading", { name: "test_name" });
    screen.getByRole("link", { name: "ver producto" });
    screen.getByRole("button", { name: "Agregar a cotización" });
    screen.getByText("test_description");
  });

  it("when click on `Agregar a cotización` should call addCartItem callback", async () => {
    const mockedAddCartItem = jest.fn();
    render(
      <AlertProvider template={AlertTemplate}>
        <HomePageContext.Provider
          value={{
            cart: [],
            cartCount: 66,
            updateCartItem: () => null,
            addCartItem: mockedAddCartItem,
            handleCart: () => null,
            incrementCartItem: () => null,
            decrementCartItem: () => null,
            removeCartItem: () => null,
          }}
        >
          <Router history={history}>
            <ProductCard
              productId="test_productId"
              name="test_name"
              linkImage="test_linkImage"
            />
          </Router>
        </HomePageContext.Provider>
      </AlertProvider>
    );

    const addToCartButton = screen.getByRole("button", {
      name: "Agregar a cotización",
    });

    await user.click(addToCartButton);

    await waitFor(() =>
      expect(mockedAddCartItem).toHaveBeenCalledWith({
        productId: "test_productId",
        productName: "test_name",
        productImage:
          "https://product-catalog.sfo2.cdn.digitaloceanspaces.com/products/test_linkImage",
        quantity: 1,
      })
    );
  });

  it("should be accessible", async () => {
    const { container } = render(
      <Router history={history}>
        <AlertProvider template={AlertTemplate}>
          <ProductCard
            productId="test_productId"
            name="test_name"
            linkImage="test_linkImage"
          />
        </AlertProvider>
      </Router>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe("isSinglePage", () => {
    it("should render correct links", () => {
      render(
        <AlertProvider template={AlertTemplate}>
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
              <ProductCard
                productId="test_productId"
                name="test_name"
                linkImage="test_linkImage"
                isSinglePage={true}
                attachmentPath="test_attachmentPath"
              />
            </Router>
          </HomePageContext.Provider>
        </AlertProvider>
      );
      screen.getByRole("link", { name: "Certificado" });
      screen.getByRole("link", { name: "Descargar ficha técnica" });
      expect(
        screen.queryByRole("link", { name: "ver producto" })
      ).not.toBeInTheDocument();
    });

    it("should render correct image styles", () => {
      render(
        <AlertProvider template={AlertTemplate}>
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
              <ProductCard
                productId="test_productId"
                name="test_name"
                linkImage="test_linkImage"
                isSinglePage={true}
                attachmentPath="test_attachmentPath"
              />
            </Router>
          </HomePageContext.Provider>
        </AlertProvider>
      );
      const image = screen.getByAltText("test_name");
      expect(image).toHaveStyle({
        "max-width": "100%",
        "max-height": "400px",
      });
    });
  });
});

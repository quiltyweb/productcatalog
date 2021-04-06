import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Switch, Route, useLocation } from "react-router-dom";
import { Environment } from "react-relay";
import { Provider as BumbagProvider, PageWithHeader, Alert } from "bumbag";
import Footer from "./components/Footer";
import { newTheme } from "../../theme";
import ContactForm from "../../components/ContactForm/ContactForm";
import { ContentList } from "../../components/ContentList/ContentList";
import { ProductsPage } from "../ProductsPage/ProductsPage";
import SingleProductPage from "../SingleProductPage/SingleProductPage";
import SearchResultsPage from "../SearchResultsPage/SearchResultsPage";
import CartPage from "../CartPage/CartPage";
import QuotePage from "../QuotePage/QuotePage";
import Nav from "../../components/Nav/Nav";
import HomePageContext from "../../context/HomePageContext";
import { CartItemProps } from "../../context/HomePageContext";
import ScrollToTop from "./components/ScrollToTop";
import { certificationLinks } from "./certificationLinks";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import PageNotFound from "../PageNotFound/PageNotFound";
import HomePage from "../HomePage/HomePage";
import CategorySideBar from "../../components/CategorySideBar/CategorySideBar";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import {
  transitions,
  positions,
  Provider as AlertProvider,
  AlertComponentPropsWithStyle,
} from "react-alert";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 760px) {
    flex-direction: row;
  }
`;

const alertProviderOptions = {
  position: positions.BOTTOM_RIGHT,
  timeout: 3000,
  offset: "20px",
  transition: transitions.FADE,
  containerStyle: {
    zIndex: 1000,
  },
};

const AlertTemplate: React.FunctionComponent<AlertComponentPropsWithStyle> = ({
  style,
  options,
  message,
  close,
}) => {
  return (
    <Alert
      style={style}
      role="alert"
      variant="bordered"
      type="success"
      showCloseButton
      onClickClose={close}
    >
      {message}
    </Alert>
  );
};

type AppProps = {
  environment: Environment;
};
const App: React.FunctionComponent<AppProps> = ({
  environment,
}): JSX.Element => {
  const [cart, setCart] = useState<CartItemProps[]>([]);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const stringifyCart = sessionStorage.getItem("cart");
    const parsedCart = JSON.parse(stringifyCart || "[]");
    setCart(parsedCart);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  type ProductItemUpdateProps = {
    productId: string;
    quantity: number;
  };
  const updateCartItem = ({ productId, quantity }: ProductItemUpdateProps) => {
    if (isNaN(quantity) || quantity < 1) {
      return;
    }
    const newCart = cart.map((item: CartItemProps) => {
      return item.productId === productId ? { ...item, quantity } : item;
    });
    setCart(newCart);
  };

  const addCartItem = ({
    productId,
    productName,
    productImage,
    quantity,
  }: CartItemProps) => {
    if (cart.some((item: CartItemProps) => item.productId === productId)) {
      const newCart = cart.map((item: CartItemProps) => {
        return item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
      setCart(newCart);
    } else {
      setCart([...cart, { productId, productName, productImage, quantity }]);
    }
  };

  const incrementCartItem = ({ productId }: { productId: string }) => {
    //TODO: should we need a max number here??
    const newCart = cart.map((item: CartItemProps) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(newCart);
  };

  const decrementCartItem = ({ productId }: { productId: string }) => {
    const item = cart.find(
      (item: CartItemProps) => item.productId === productId
    );
    if (item && item.quantity === 0) {
      return;
    }
    const newCart = cart.map((item: CartItemProps) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(newCart);
  };

  const sumCartItems = (cart: CartItemProps[]): number => {
    const sum = cart.reduce((acc, curr, index, src) => {
      return acc + Number(curr.quantity);
    }, 0);
    return sum;
  };

  const removeCartItem = (productId: string) => {
    const filteredCard = cart.filter(
      (item: any) => item.productId !== productId
    );
    setCart(filteredCard);
  };

  return (
    <ErrorBoundary>
      <ScrollToTop>
        <BumbagProvider theme={newTheme}>
          <AlertProvider template={AlertTemplate} {...alertProviderOptions}>
            <HomePageContext.Provider
              value={{
                cart,
                cartCount: sumCartItems(cart),
                updateCartItem,
                addCartItem,
                handleCart: setCart,
                incrementCartItem,
                decrementCartItem,
                removeCartItem,
              }}
            >
              <PageWithHeader
                header={<Nav />}
                border="default"
                sticky
                headerHeight="80px"
              >
                <PageWrapper title="Comercial Gattoni seguridad industrial - Inicio">
                  <AppContainer>
                    {!isHomePage && (
                      <CategorySideBar environment={environment} />
                    )}
                    <main style={{ flexBasis: "80%", margin: "0.5rem auto" }}>
                      <Switch>
                        <Route path="/contacto">
                          <ContactForm
                            initialValues={{
                              nombre: "",
                              empresa: "",
                              email: "",
                              mensaje: "",
                              telefono: "",
                              recaptcha: "",
                            }}
                          />
                        </Route>
                        <Route path="/certificaciones">
                          <ContentList
                            title="Certificaciones"
                            description="Descargue documentos que certifican la calidad de nuestos productos."
                            links={certificationLinks}
                          />
                        </Route>
                        <Route path="/cotizacion">
                          <CartPage />
                        </Route>
                        <Route path="/enviar-cotizacion">
                          <QuotePage />
                        </Route>
                        <Route path="/categoria/:categoryId">
                          <ProductsPage environment={environment} />
                        </Route>
                        <Route path="/resultados/:searchTerm">
                          <SearchResultsPage environment={environment} />
                        </Route>
                        <Route path="/producto/:productId">
                          <SingleProductPage environment={environment} />
                        </Route>
                        <Route exact path="/">
                          <HomePage environment={environment} />
                        </Route>
                        <Route path="*">
                          <PageNotFound />
                        </Route>
                      </Switch>
                    </main>
                  </AppContainer>
                </PageWrapper>
              </PageWithHeader>
              <Footer />
            </HomePageContext.Provider>
          </AlertProvider>
        </BumbagProvider>
      </ScrollToTop>
    </ErrorBoundary>
  );
};
export default App;

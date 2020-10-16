import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../../environment";
import { Provider as BumbagProvider, PageWithHeader } from "bumbag";
import CategoryList from "../../components/CategoryList/CategoryList";
import Footer from "../../components/Footer/Footer";
import { newTheme } from "../../theme";
import ContactForm from "../../components/ContactForm/ContactForm";
import CertificationsList from "../../components/CertificationsList/CertificationsList";
import { ProductsPage } from "../ProductsPage/ProductsPage";
import SingleProductPage from "../SingleProductPage/SingleProductPage";
import SearchResultsPage from "../SearchResultsPage/SearchResultsPage";
import CartPage from "../CartPage/CartPage";
import QuotePage from "../QuotePage/QuotePage";
import Main from "../../components/Main/Main";
import Nav from "../../components/Nav/Nav";
import HomePageContext from "./HomePageContext";
import { CartItemProps } from "./HomePageContext";
import ScrollToTop from "../ScrollToTop";
import Loader from "../../components/Loader/Loader";

const HomePage: React.FunctionComponent = () => {
  const [cart, setCart] = useState<CartItemProps[]>([]);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isQuotePage = location.pathname === "/enviar-cotizacion";
  const isContactoPage = location.pathname === "/contacto";

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
    <ScrollToTop>
      <BumbagProvider theme={newTheme}>
        <QueryRenderer
          environment={environment}
          query={graphql`
            query HomePageQuery {
              fetchCategories {
                ...CategoryList_categories
                ...CategoryGrid_categoryGridItems
              }
            }
          `}
          variables={{}}
          render={({ error, props }: { error: any; props: any }) => {
            if (error) {
              console.log("error: ", error);
              return <div>Error!</div>;
            }
            if (!props) {
              return <Loader />;
            }

            return (
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
                <PageWithHeader header={<Nav />} border="default">
                  <div style={{ display: "flex" }}>
                    {!isHomePage && (
                      <aside style={{ flexBasis: "20%", paddingTop: "2rem" }}>
                        <CategoryList categories={props.fetchCategories} />
                      </aside>
                    )}
                    <main style={{ flexBasis: "80%", margin: "0 auto" }}>
                      <Switch>
                        <Route path="/contacto">
                          <ContactForm />
                        </Route>
                        <Route path="/certificaciones">
                          <CertificationsList />
                        </Route>
                        <Route path="/cotizacion">
                          <CartPage />
                        </Route>
                        <Route path="/enviar-cotizacion">
                          <QuotePage />
                        </Route>
                        <Route path="/categoria/:categoryId">
                          <ProductsPage />
                        </Route>
                        <Route path="/resultados/:searchTerm">
                          <SearchResultsPage />
                        </Route>
                        <Route path="/producto/:productId">
                          <SingleProductPage />
                        </Route>
                        <Route path="/">
                          <Main categories={props.fetchCategories} />
                        </Route>
                      </Switch>
                    </main>
                  </div>
                </PageWithHeader>
                <Footer />
              </HomePageContext.Provider>
            );
          }}
        />
      </BumbagProvider>
    </ScrollToTop>
  );
};
export default HomePage;

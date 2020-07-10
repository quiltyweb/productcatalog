import React, { useState } from "react";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../../environment";
import { ThemeProvider, styled, palette } from "fannypack";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CategoryList from "../../components/CategoryList/CategoryList";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import theme from "../../theme";
import ContactForm from "../../components/ContactForm/ContactForm";
import ProductsPage from "../ProductsPage/ProductsPage";
import SearchResultsPage from "../SearchResultsPage/SearchResultsPage";
import CartPage from "../CartPage/CartPage";
import Main from "../../components/Main/Main";
import HomePageContext from "./HomePageContext";
import { CartItemProps } from './HomePageContext';

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding: 2rem 2rem;
  background-color: ${palette("white")};

  @media (min-width: 760px) {
    flex-direction: row;
    padding: 2rem 2rem;
  }

  @media (min-width: 1020px) {
    padding: 2rem 2rem;
  }
`;

const MainContent = styled.div`
  @media (min-width: 760px) {
    flex-basis: 80%;
    padding-left: 4rem;
    padding-right: 4rem;
  }

  @media (min-width: 1020px) {
    padding-left: 8rem;
    padding-right: 8rem;
  }
`;

const MainSidebar = styled.aside`
  flex-basis: 20%;
`;

const HomePage: React.FunctionComponent = () => {

  const [ cart, setCart ] = useState<CartItemProps[]>([]);

  // TODO: I'm organising these functions here for now. I'll refactor later.remove console logs later.
  const updateCartItem = ({ productId, quantity }: CartItemProps) => {
    const newCart = cart.map(item => {
      return item.productId === productId ? {...item, quantity } : item;
    })
    setCart(newCart);
  }

  const addCartItem = ({ productId, quantity }: CartItemProps) => {
    setCart([...cart, { productId, quantity }]);
  }

  const incrementCartItem = ({ productId }: { productId: string }) => {
    const newCart = cart.map(item => item.productId === productId ? {...item, quantity: item.quantity + 1 } : item);
    setCart(newCart);
  }

  const decrementCartItem = ({ productId }: { productId: string }) => {
    const newCart = cart.map(item => item.productId === productId ? {...item, quantity: item.quantity - 1 } : item);
    setCart(newCart);
  }

  const sumCartItems = (cart: CartItemProps[]): number => {
    const sum = cart.reduce((acc, curr, index, src) => {
      return acc + curr.quantity
    }, 0);
    return sum;
  }

  const removeCartItem = (productId: string) => {
    console.log('remove item::: ', productId)
    const filteredCard = cart.filter((item: any) => item.productId !== productId);
    setCart(filteredCard);
  }


  return (
    <Router>
      <ThemeProvider theme={theme}>
        <QueryRenderer
          environment={environment}
          query={graphql`
            query HomePageQuery {
              fetchCategories {
                ...CategoryList_categories
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
              return <div>Loading...</div>;
            }

            return (
              <HomePageContext.Provider value={{
                cart,
                cartCount: sumCartItems(cart),
                updateCartItem,
                addCartItem,
                handleCart: setCart,
                incrementCartItem,
                decrementCartItem,
                removeCartItem
              }}>
              <>
                <header>
                  <Nav />
                </header>
                <MainWrapper>
                  <MainContent>
                    <Switch>
                      <Route path="/contacto">
                        <ContactForm />
                      </Route>
                      <Route path="/cotizacion">
                        <CartPage />
                      </Route>
                      <Route path="/categoria/:categoryName">
                        <ProductsPage />
                      </Route>
                      <Route path="/resultados/:searchTerm">
                        <SearchResultsPage />
                      </Route>
                      <Route path="/">
                        <Main />
                      </Route>
                    </Switch>
                  </MainContent>
                  <MainSidebar>
                    <CategoryList categories={props.fetchCategories} />
                  </MainSidebar>
                </MainWrapper>
                <Footer />
              </>
              </HomePageContext.Provider>
            );
          }}
        />
      </ThemeProvider>
    </Router>
  );
};
export default HomePage;

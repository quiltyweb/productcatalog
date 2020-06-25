import React from "react";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { createGlobalStyle } from "styled-components";
 
import environment from "../../environment";
import CategoryList from "../../components/CategoryList/CategoryList";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

// import logo from "./logo.png";

const GlobalStyle = createGlobalStyle`
  body {
    color: #212121;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1rem;
    line-height: 1.5;
  }
  a {
    color: #212121;
    text-decoration: dashed;
  }
  a:hover {
    color:  #D32F2F;
  }
  li {
    margin: .5rem;
    list-style: none;
  }
`

const Home: React.FunctionComponent = () => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query HomeQuery {
          fetchCategories {
            ...CategoryList_categories
          }
        }
      `}
      variables={{}}
      render={({ error, props }: { error: any; props: any }) => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }

        return (
          <>
            <GlobalStyle />
            <header>
              <Nav />
            </header>
            <main>
              <CategoryList categories={props.fetchCategories} />
            </main>
            <Footer />
          </>
        );
      }}
    />
  );
};

export default Home;

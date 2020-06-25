import React from "react";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import styled, { createGlobalStyle } from "styled-components";
import environment from "../../environment";
import CategoryList from "../../components/CategoryList/CategoryList";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

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
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding: calc(2rem * 4) 2rem;
  background-color: #ffffff;
`;

const MainContent = styled.div`
  padding: 2rem;
`;

const MainSidebar = styled.aside`
  flex-basis: 20%;
`;

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
            <Main>
              <MainContent>content goes here...</MainContent>
              <MainSidebar>
                <CategoryList categories={props.fetchCategories} />
              </MainSidebar>
            </Main>

            <Footer />
          </>
        );
      }}
    />
  );
};

export default Home;

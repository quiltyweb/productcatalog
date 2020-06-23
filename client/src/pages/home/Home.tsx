import React from "react";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../../environment";
import CategoryList from "../../components/CategoryList/CategoryList";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

import "./Home.css";
import logo from "./logo.png";

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
          <div className="App">
            <header className="App-header">
              <p>Bienvenidos a Comercial Gattoni</p>
              <img src={logo} className="App-logo" alt="logo" />
              <Nav />
            </header>
            <main>
              <CategoryList categories={props.fetchCategories} />
            </main>
            <Footer />
          </div>
        );
      }}
    />
  );
};

export default Home;

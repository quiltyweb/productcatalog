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
  padding: 2rem 2rem;
  background-color: #ffffff;

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
              <MainContent>
                <h1>Sómos Seguridad Industrial</h1>
                <h2>
                  Con más de 20 años de experiencia en la Región de Atacama
                </h2>
                <p>
                  Comercial Gattoni le da la más cordial bienvenida y le invita
                  a conocer su amplia gama de productos de seguridad Industrial.
                  Somos una Empresa con más de 20 años de experiencia en el área
                  de venta de artículos de Seguridad Industrial, ubicada en
                  Copiapó, Región de Atacama.
                </p>
                <p>
                  Ofrecemos a Ud. y empresa productos de la más alta calidad
                  como Botas de Agua, Mascaras de protección Respiratoria,
                  servicios de Bordados industriales computacionales y más.
                  Distribuidores de Vicsa en Copiapó.
                </p>
              </MainContent>
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

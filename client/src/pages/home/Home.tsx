import React from "react";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { ThemeProvider, styled, palette, Columns, Column } from 'fannypack';
import environment from "../../environment";
import CategoryList from "../../components/CategoryList/CategoryList";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import theme from '../../theme';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding: 2rem 2rem;
  background-color: ${palette('white')};

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
    <ThemeProvider theme={theme}>
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
            console.log('error: ', error)
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }

          return (
            <>
               <header>
                <Nav />
              </header>
              <Main>
                <MainContent>
                  <h1>Sómos Seguridad Industrial</h1>
                  <h2>
                    Con más de 20 años de experiencia en la Región de Atacama.
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
                  <ContactForm />
                  <h2 id="heading-destacados">Productos Destacados:</h2>
                  <Columns aria-labelledby="heading-destacados">
                    <Column>
                      <Card name="Lente l-300" description="lorem ipsum" linkImage="http://www.gattoni.cl/Visual/LENTE%20SEGURIDAD%20L300.jpg" />
                    </Column>
                    <Column>
                      <Card name="Guante Respirador 2 vias m500 masprot" description="lorem ipsum" linkImage="http://www.gattoni.cl/Respiratoria/%C3%ADndice.jpg" />
                    </Column>
                    <Column>
                      <Card name="Botin negro economico pu-100" description="lorem ipsum" linkImage="http://www.gattoni.cl/Zapatos/SAMARA.jpg" />
                    </Column>
                  </Columns>
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
     </ThemeProvider>

  );
};

export default Home;

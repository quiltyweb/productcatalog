import React from 'react'
import { QueryRenderer } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'
import { ThemeProvider, styled, palette } from 'fannypack'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import environment from '../../environment'
import CategoryList from '../../components/CategoryList/CategoryList'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import theme from '../../theme'
import ContactForm from '../../components/ContactForm/ContactForm'
import QuoteForm from '../../components/QuoteForm/QuoteForm'
import ProductList from '../../components/ProductList/ProductList'

import Main from '../../components/Main/Main'

const MainWrapper = styled.main`
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
`

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
`

const MainSidebar = styled.aside`
  flex-basis: 20%;
`

const Home: React.FunctionComponent = () => {
  return (
    <Router>
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
              return <div>Error!</div>
            }
            if (!props) {
              return <div>Loading...</div>
            }

            return (
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
                        <QuoteForm />
                      </Route>
                      <Route path="/categoria/:categoryId">
                        <ProductList />
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
            )
          }}
        />
      </ThemeProvider>
    </Router>
  )
}

export default Home

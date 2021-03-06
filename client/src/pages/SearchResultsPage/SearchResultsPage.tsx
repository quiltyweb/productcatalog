import React from "react";
import { Environment, QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { useParams } from "react-router-dom";
import ProductList from "../../components/ProductList/ProductList";
import { Heading } from "bumbag";
import Loader from "../../components/Loader/Loader";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

type SearchResultsPageProps = {
  environment: Environment;
};

export const SearchResultsPage: React.FunctionComponent<SearchResultsPageProps> = ({
  environment,
}): JSX.Element => {
  const { searchTerm } = useParams<{ searchTerm: string }>();

  // TODO: backend needs to update fetchCategories query. https://trello.com/c/GoBJE1mZ
  // FOR NOW, using the searchProducts query to render list of products.
  // this: searchProducts(searchTerm: "categoryName") will be updated with: fetchCategories(categoryID: <theIDFromRouterParams>)

  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query SearchResultsPageQuery($searchTerm: String!) {
          searchProducts(searchTerm: $searchTerm) {
            ...ProductList_products
          }
        }
      `}
      variables={{ searchTerm: searchTerm }}
      render={({ error, props }: { error: any; props: any }) => {
        if (error) {
          return (
            <div>
              Se ha producido un Error, intente nuevamente. {error.message}
            </div>
          );
        }
        if (!props) {
          return <Loader />;
        }

        return (
          <PageWrapper title="Comercial Gattoni seguridad industrial - Resultados de busqueda">
            <>
              <Heading use="h2" fontSize="400" paddingBottom="1rem">
                Resultados para: "{searchTerm}"
              </Heading>
              <ProductList products={props.searchProducts} />
            </>
          </PageWrapper>
        );
      }}
    />
  );
};
export default SearchResultsPage;

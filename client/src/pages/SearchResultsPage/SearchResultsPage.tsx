import React from "react";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../../environment";
import { useParams } from "react-router-dom";
import ProductList from "../../components/ProductList/ProductList";
import { Heading, Page } from "fannypack";
import Loader from "../../components/Loader/Loader";

export const SearchResultsPage = () => {
  const { searchTerm } = useParams();

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
          console.log("error: ", error);
          return <div>Error!</div>;
        }
        if (!props) {
          return <Loader />;
        }
        return (
          <Page.Content isFluid>
            <Heading use="h1">Resultados para: "{searchTerm}"</Heading>
            <ProductList products={props.searchProducts} />
          </Page.Content>
        );
      }}
    />
  );
};
export default SearchResultsPage;

import React from "react";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../../environment";
import { useParams } from "react-router-dom";
import ProductList from "../../components/ProductList/ProductList";
import { Heading, Page } from "fannypack";
import Loader from "../../components/Loader/Loader";

export const ProductsPage = () => {
  const { categoryId } = useParams();

  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query ProductsPageQuery($categoryId: ID!) {
          fetchCategory(categoryId: $categoryId) {
            id
            name
            products {
              ...ProductList_products
            }
          }
        }
      `}
      variables={{ categoryId: categoryId }}
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
            <Heading use="h1">{props.fetchCategory.name}</Heading>
            <ProductList products={props.fetchCategory.products} />
          </Page.Content>
        );
      }}
    />
  );
};
export default ProductsPage;

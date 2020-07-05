import React from "react";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../../environment";
import { useParams } from "react-router-dom";
import ProductList from "../../components/ProductList/ProductList";

export const ProductsPage = () => {
  const { categoryName } = useParams();

  // TODO: backend needs to update fetchCategories query. https://trello.com/c/GoBJE1mZ
  // FOR NOW, using the searchProducts query to render list of products.
  // this: searchProducts(searchTerm: "categoryName") will be updated with: fetchCategories(categoryID: <theIDFromRouterParams>)

  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query ProductsPageQuery($categoryName: String!) {
          searchProducts(searchTerm: $categoryName) {
            ...ProductList_products
          }
        }
      `}
      variables={{ categoryName: categoryName }}
      render={({ error, props }: { error: any; props: any }) => {
        if (error) {
          console.log("error: ", error);
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }
        return (
          <ProductList
            categoryName={categoryName}
            products={props.searchProducts}
          />
        );
      }}
    />
  );
};
export default ProductsPage;

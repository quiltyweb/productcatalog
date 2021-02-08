import React from "react";
import { Environment, QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";

import { useParams } from "react-router-dom";
import ProductList from "../../components/ProductList/ProductList";
import { Heading, PageContent } from "bumbag";
import Loader from "../../components/Loader/Loader";

type ProductsPageProps = {
  environment: Environment;
};

export const ProductsPage: React.FunctionComponent<ProductsPageProps> = ({
  environment,
}): JSX.Element => {
  const { categoryId } = useParams<{ categoryId: string }>();

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
          return <div>Se ha producido un Error, intente nuevamente.</div>;
        }
        if (!props) {
          return <Loader />;
        }

        return (
          <PageContent isFluid>
            <Heading use="h2" fontSize="400" paddingBottom="1rem">
              {props.fetchCategory.name}
            </Heading>
            <ProductList products={props.fetchCategory.products} />
          </PageContent>
        );
      }}
    />
  );
};

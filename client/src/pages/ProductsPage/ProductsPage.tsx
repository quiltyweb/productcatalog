import React from "react";
import { Environment, QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { useParams } from "react-router-dom";
import ProductList from "../../components/ProductList/ProductList";
import { Heading } from "bumbag";
import Loader from "../../components/Loader/Loader";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

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
          return (
            <div>
              Se ha producido un Error, intente nuevamente haciendo click en una
              categoría.
            </div>
          );
        }
        if (!props) {
          return <Loader />;
        }

        return (
          <PageWrapper
            title={`Comercial Gattoni seguridad industrial - Categoria: ${props.fetchCategory.name}`}
          >
            <>
              <Heading use="h2" fontSize="400" paddingBottom="1rem">
                Categoría: {props.fetchCategory.name}
              </Heading>
              <ProductList products={props.fetchCategory.products} />
            </>
          </PageWrapper>
        );
      }}
    />
  );
};

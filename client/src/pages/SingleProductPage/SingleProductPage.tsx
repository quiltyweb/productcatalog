import React from "react";
import { Environment, QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { useParams, useHistory } from "react-router-dom";
import { Button, Columns, Column, PageContent } from "bumbag";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Loader/Loader";

type SingleProductPageProps = {
  environment: Environment;
};

export const SingleProductPage: React.FunctionComponent<SingleProductPageProps> = ({
  environment,
}): JSX.Element => {
  const { productId } = useParams<{ productId: string }>();
  const { goBack } = useHistory();

  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query SingleProductPageQuery($id: ID!) {
          node(id: $id) {
            ... on Product {
              id
              name
              description
              imagePath
              attachmentPath
            }
          }
        }
      `}
      variables={{ id: productId }}
      render={({ error, props }: { error: any; props: any }) => {
        if (error) {
          return <div>Se ha producido un Error, intente nuevamente.</div>;
        }
        if (!props) {
          return <Loader />;
        }

        return (
          <PageContent breakpoint="desktop">
            <Columns style={{ justifyContent: "center" }}>
              <Column key={props.node.id} spread={9}>
                <Button
                  palette="primary"
                  variant="outlined"
                  onClick={() => {
                    goBack();
                  }}
                  marginBottom="1rem"
                >
                  &#8592; volver a resultados
                </Button>
                <ProductCard
                  productId={props.node.id}
                  name={props.node.name}
                  description={props.node.description}
                  attachmentPath={props.node.attachmentPath}
                  linkImage={`https://product-catalog.sfo2.cdn.digitaloceanspaces.com/products/${props.node.imagePath}`}
                  hasPrintCTA
                  isSinglePage
                />
              </Column>
            </Columns>
          </PageContent>
        );
      }}
    />
  );
};
export default SingleProductPage;

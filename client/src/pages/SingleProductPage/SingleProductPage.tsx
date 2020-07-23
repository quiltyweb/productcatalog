import React from "react";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../../environment";
import { useParams, useHistory } from "react-router-dom";
import { Box, Columns, Column } from "fannypack";
import Card from "../../components/Card/Card";

export const SingleProductPage: React.FunctionComponent = () => {
  const { productId } = useParams();
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
          console.log("error: ", error);
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }

        return (
          <>
            <Box padding="major-2">
              <Columns style={{ justifyContent: "center" }}>
                <Column key={props.node.id} spread={9}>
                  <button
                    onClick={() => {
                      goBack();
                    }}
                    style={{ marginBottom: "1rem" }}
                  >
                    volver a resultados
                  </button>
                  <Card
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
            </Box>
          </>
        );
      }}
    />
  );
};
export default SingleProductPage;

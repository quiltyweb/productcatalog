import React from "react";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../../environment";
import { useParams, useHistory } from "react-router-dom";
import { Columns, Column, styled, Page } from "fannypack";
import { Button } from "bumbag";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

const GoBackButton = styled(Button)`
  display: block;
  text-align: right;
  color: #000000;
  font-weight: 600;
  font-size: 1.2rem;
  white-space: nowrap;
  padding: 1rem;
  transition: color 0.2s;
  border-radius: 4px;
  color: #d32f2f;
  &:hover {
    color: #ff0000;
    text-decoration: underline;
  }
`;

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
          return <Loader />;
        }

        return (
          <Page.Content isFluid>
            <Columns style={{ justifyContent: "center" }}>
              <Column key={props.node.id} spread={9}>
                <GoBackButton
                  palette="primary"
                  variant="link"
                  onClick={() => {
                    goBack();
                  }}
                >
                  &#8592; volver a resultados
                </GoBackButton>
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
          </Page.Content>
        );
      }}
    />
  );
};
export default SingleProductPage;

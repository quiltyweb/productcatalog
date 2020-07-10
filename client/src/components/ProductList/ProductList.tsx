import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";
import { Box, Heading, Columns, Column } from "fannypack";
import Card from "../../components/Card/Card";
import { ProductList_products } from "./__generated__/ProductList_products.graphql";

type ProductListProps = {
  categoryName: string;
  products: ProductList_products;
};

const ProductList: React.FunctionComponent<ProductListProps> = ({
  categoryName,
  products,
}) => {
  const fakeCategoryName = "Guantes";
  return (
    <Box padding="major-2">
      <Heading use="h2">Categoria: {categoryName}</Heading>
      <Columns aria-labelledby="heading-destacados">
        {products && products.edges && products.edges.length > 0 ? (
          products.edges.map((product: any) => {
            console.log(product);

            return (
              <Column key={product.node.id} spread={3}>
                <Card
                  productId={product.node.id}
                  name={product.node.name}
                  description={product.node.description}
                  linkImage={`http://gattoni.cl/${fakeCategoryName}/${product.node.imagePath}`}
                />
              </Column>
            );
          })
        ) : (
          <div>No se encontraron productos para esta Categoria</div>
        )}
      </Columns>
    </Box>
  );
};

export default createFragmentContainer(ProductList, {
  products: graphql`
    fragment ProductList_products on ProductConnection {
      edges {
        node {
          id
          name
          description
          imagePath
        }
      }
    }
  `,
});

import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";
import { Box, Columns, Column } from "fannypack";
import Card from "../../components/Card/Card";
import { ProductList_products } from "./__generated__/ProductList_products.graphql";

type ProductListProps = {
  products: ProductList_products;
};

const ProductList: React.FunctionComponent<ProductListProps> = ({
  products,
}) => {
  return (
    <Box padding="major-2">
      <Columns aria-labelledby="heading-destacados">
        {products && products.edges && products.edges.length > 0 ? (
          products.edges.map((product: any) => {
            return (
              <Column padding="major-2" key={product.node.id} spread={4}>
                <Card
                  productId={product.node.id}
                  name={product.node.name}
                  linkImage={`https://product-catalog.sfo2.cdn.digitaloceanspaces.com/products/${product.node.imagePath}`}
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
          imagePath
        }
      }
    }
  `,
});

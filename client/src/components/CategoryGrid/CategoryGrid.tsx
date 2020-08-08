import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";
import { Card, Heading, Image, styled } from "fannypack";
import { CategoryGrid_categoryGridItems } from "./__generated__/CategoryGrid_categoryGridItems.graphql";
import { Link } from "react-router-dom";

const GridList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  @supports (display: grid) {
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const GridItemLink = styled(Link)`
  display: block;
  &:hover {
    transform: translateY(3px);
    transition: all 0.5s;
    img {
      opacity: 0.5;
      transition: all 0.5s;
    }
  }
`;

type CategoryGridProps = {
  categoryGridItems: CategoryGrid_categoryGridItems;
};

const CategoryGrid: React.FunctionComponent<CategoryGridProps> = ({
  categoryGridItems,
}): JSX.Element => {
  return (
    <GridList>
      {categoryGridItems &&
      categoryGridItems.edges &&
      categoryGridItems.edges.length > 0 ? (
        categoryGridItems.edges.map((item: any) => {
          return (
            <li>
              <GridItemLink to={`/categoria/${item.node.id}`}>
                <Card.Card>
                  <Card.Content>
                    <Image
                      fit="contain"
                      fitPosition="top"
                      width={350}
                      height={150}
                      src={`https://product-catalog.sfo2.cdn.digitaloceanspaces.com/categories/${item.node.name.toLowerCase()}.jpg`}
                      alt="Bean"
                      backgroundColor="white"
                    />
                  </Card.Content>
                  <Card.Footer justifyContent="center">
                    <Heading use="h2" style={{ whiteSpace: "nowrap" }}>
                      {item.node.name}
                    </Heading>
                  </Card.Footer>
                </Card.Card>
              </GridItemLink>
            </li>
          );
        })
      ) : (
        <p>No hay categorias</p>
      )}
    </GridList>
  );
};

export default createFragmentContainer(CategoryGrid, {
  categoryGridItems: graphql`
    fragment CategoryGrid_categoryGridItems on CategoryConnection {
      edges {
        node {
          id
          name
        }
      }
    }
  `,
});

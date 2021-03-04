import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";
import { palette, Card, List, Image } from "bumbag";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CategoryGrid_categoryGridItems } from "./__generated__/CategoryGrid_categoryGridItems.graphql";

const GridList = styled((props) => <List {...props} />)`
  display: flex;
  flex-wrap: wrap;
  @supports (display: grid) {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  }
`;

const GridItemLink = styled((props) => <Link {...props} />)`
  display: block;
  text-decoration: none;
  color: ${palette("primary")};
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

export const CategoryGrid: React.FunctionComponent<CategoryGridProps> = ({
  categoryGridItems,
}): JSX.Element => {
  return (
    <GridList>
      {categoryGridItems &&
      categoryGridItems.edges &&
      categoryGridItems.edges.length > 0 ? (
        categoryGridItems.edges.map((item: any) => {
          return (
            <List.Item key={item.node.id}>
              <GridItemLink to={`/categoria/${item.node.id}`}>
                <Card standalone>
                  <Card.Content alignX="center">
                    <Image
                      aria-hidden={true}
                      fit="contain"
                      height="150px"
                      src={`https://product-catalog.sfo2.cdn.digitaloceanspaces.com/categories/${item.node.name.toLowerCase()}.jpg`}
                      backgroundColor="white"
                      alt=""
                    />
                  </Card.Content>
                  <Card.Header use="h2" alignX="center">
                    <Card.Title aria-label={"categoría " + item.node.name}>
                      {item.node.name}
                    </Card.Title>
                  </Card.Header>
                </Card>
              </GridItemLink>
            </List.Item>
          );
        })
      ) : (
        <List.Item>No hay categorias</List.Item>
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

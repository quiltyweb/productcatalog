import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";
import styled from "styled-components";

const ProductsList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  line-height: 1;
  list-style: none;
  border-top: 1px solid grey;
  border-left: 1px solid grey;

  @media (min-width: 760px) {
    flex-direction: column;
    flex-wrap: nowrap;
    border: none;
  }
`;

const ProductItem = styled.li`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  margin: 0;
  padding: 2rem 2rem;
  border-bottom: 1px solid grey;
  border-right: 1px solid grey;
  @media (min-width: 760px) {
    display: block;
    padding: calc(2rem / 2) calc(2rem / 2);
    margin: calc(2rem / 4) 0;
    border: none;
  }
`;

const ProductsListLink = styled.a`
  position: relative;
  display: block;
  color: black;
  font-size: 1rem;
  white-space: nowrap;
  transition: color 0.2s;
  &:hover {
    color: red;
    text-decoration: underline;
  }
`;

type CategoryListProps = {
  categories: any;
};

const CategoryList: React.FunctionComponent<CategoryListProps> = ({
  categories,
}): JSX.Element => {
  console.log(categories);

  return (
    <>
      <ProductsList>
        {categories && categories.edges && categories.edges.length > 0 ? (
          categories.edges.map((item: any) => {
            return (
              <ProductItem key={item.node.id}>
                <ProductsListLink href="#">{item.node.name}</ProductsListLink>
              </ProductItem>
            );
          })
        ) : (
          <ProductItem>No categories</ProductItem>
        )}
      </ProductsList>
    </>
  );
};

export default createFragmentContainer(CategoryList, {
  categories: graphql`
    fragment CategoryList_categories on CategoryConnection {
      edges {
        node {
          id
          name
        }
      }
    }
  `,
});

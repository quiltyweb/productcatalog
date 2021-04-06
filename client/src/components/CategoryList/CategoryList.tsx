import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { CategoryList_categories } from "./__generated__/CategoryList_categories.graphql";
import { SelectField } from "bumbag";

const StyledCategoryList = styled.ul`
  display: none;
  @media (min-width: 760px) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    line-height: 1;
    list-style: none;
    margin: 0;
    padding: 0;
    flex-direction: column;
    flex-wrap: nowrap;
  }
`;

const ProductItem = styled.li`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid grey;
  width: 70%;
  @media (min-width: 760px) {
    display: block;
    padding: 0;
    margin: 0;
    border: none;
    border-radius: 30px;
  }
`;

const CategoryListLink = styled((props) => <Link {...props} />)`
  position: relative;
  padding: 1rem;
  display: block;
  color: #000;
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  @media (min-width: 425px) {
    font-size: 1.2rem;
    &:hover {
      color: #000;
      background-color: rgba(255, 204, 0, 0.3);
      transition: background-color 0.2s;
      border-radius: 1px;
    }
  }
`;

const MobileSelect = styled((props) => <SelectField {...props} />)`
  display: flex;
  justify-content: center;
  position: fixed;
  background-color: white;
  top: 80px;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 0.5rem;
  border-bottom: 1px solid #e6e6eb;
  .bb-FieldWrapper {
    display: flex;
    align-items: center;
    label {
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 760px) {
    display: none;
  }
`;

type CategoryListProps = {
  categories: CategoryList_categories;
};

export const CategoryList: React.FunctionComponent<CategoryListProps> = ({
  categories,
}): JSX.Element => {
  const history = useHistory();

  const categoryArray =
    categories &&
    categories.edges &&
    categories.edges.length > 0 &&
    categories.edges.map((item: any) => ({
      id: item.node.id,
      label: item.node.name,
      value: `/categoria/${item.node.id}`,
    }));

  if (categories && categories.edges && categories.edges.length === 0) {
    return <ProductItem>No hay categorias</ProductItem>;
  }

  return (
    <>
      <StyledCategoryList data-testid="categoryList-list">
        {categoryArray &&
          categoryArray.map((item) => (
            <ProductItem key={item.id}>
              <CategoryListLink to={item.value}>{item.label}</CategoryListLink>
            </ProductItem>
          ))}
      </StyledCategoryList>
      <MobileSelect
        label="Categoría"
        options={categoryArray}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          return history.push(e.target.value);
        }}
      />
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

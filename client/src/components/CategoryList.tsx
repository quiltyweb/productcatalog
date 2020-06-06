import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";

type CategoryListProps = {
  categories: any;
};

const CategoryList: React.FunctionComponent<CategoryListProps> = ({
  categories,
}): JSX.Element => {
  return (
    <>
      <div>Categorias:</div>
      <ul>
        {categories.edges.map((item: any) => {
          return <li key={item.node.id}>{item.node.name}</li>;
        })}
      </ul>
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

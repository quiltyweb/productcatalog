import React from "react";
import CategoryList from "../CategoryList/CategoryList";
import { graphql } from "babel-plugin-relay/macro";
import { Environment, QueryRenderer } from "react-relay";
import Skeleton from "react-loading-skeleton";

type CategorySideBarProps = {
  environment: Environment;
};

const CategorySideBar: React.FunctionComponent<CategorySideBarProps> = ({
  environment,
}): JSX.Element => {
  return (
    <aside
      style={{ flexBasis: "20%", paddingTop: "1rem", position: "relative" }}
    >
      <QueryRenderer
        environment={environment}
        query={graphql`
          query CategorySideBarQuery {
            fetchCategories {
              ...CategoryList_categories
            }
          }
        `}
        variables={{}}
        render={({ error, props }: { error: any; props: any }) => {
          if (error) {
            return <div>Se ha producido un Error, intente nuevamente.</div>;
          }
          if (!props) {
            return (
              <Skeleton
                count={12}
                duration={1}
                delay={1}
                width="184px"
                height="45px"
              />
            );
          }

          return <CategoryList categories={props.fetchCategories} />;
        }}
      />
    </aside>
  );
};

export default CategorySideBar;

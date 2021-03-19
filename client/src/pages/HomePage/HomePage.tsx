import React from "react";
import { Environment, QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { Box, Heading } from "bumbag";
import CategoryGrid from "../../components/CategoryGrid/CategoryGrid";

type HomePageProps = {
  environment: Environment;
};

const HomePageHeading: React.FunctionComponent = () => (
  <Heading
    use="h2"
    fontSize="400"
    paddingTop="3rem"
    paddingBottom="2rem"
    variant="decorative-heading"
  >
    Nuestros Productos
  </Heading>
);

const HomePage: React.FunctionComponent<HomePageProps> = ({
  environment,
}): JSX.Element => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query HomePageQuery {
          fetchCategories {
            ...CategoryGrid_categoryGridItems
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
            <>
              <HomePageHeading />
              <CategoryGrid isLoading />
            </>
          );
        }

        return (
          <div>
            <HomePageHeading />
            <Box paddingBottom="2rem">
              <CategoryGrid
                categoryGridItems={props.fetchCategories}
                isLoading={false}
              />
            </Box>
          </div>
        );
      }}
    />
  );
};
export default HomePage;

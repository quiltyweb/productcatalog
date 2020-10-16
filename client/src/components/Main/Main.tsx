import React from "react";
import { Box, Heading } from "bumbag";
import CategoryGrid from "../CategoryGrid/CategoryGrid";

type MainProps = {
  categories: any;
};

const Main: React.FunctionComponent<MainProps> = ({
  categories,
}): JSX.Element => {
  return (
    <>
      <Heading
        use="h2"
        fontSize="400"
        paddingTop="3rem"
        paddingBottom="2rem"
        variant="decorative-heading"
      >
        Nuestros Productos
      </Heading>
      <Box paddingBottom="2rem">
        <CategoryGrid categoryGridItems={categories} />
      </Box>
    </>
  );
};

export default Main;

import React from "react";
import { Heading } from "bumbag";
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
        paddingBottom="3rem"
        variant="decorative-heading"
      >
        Nuestros Productos
      </Heading>
      <CategoryGrid categoryGridItems={categories} />
    </>
  );
};

export default Main;

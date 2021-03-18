import React from "react";
import { Box, Heading } from "bumbag";

type MainProps = {
  children: JSX.Element;
};

const Main: React.FunctionComponent<MainProps> = ({
  children,
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
      <Box paddingBottom="2rem">{children}</Box>
    </>
  );
};

export default Main;

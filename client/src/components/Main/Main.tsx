import React from "react";
import { Heading, Paragraph, Page, styled } from "fannypack";
import CategoryGrid from "../CategoryGrid/CategoryGrid";

type MainProps = {
  categories: any;
};

const Main: React.FunctionComponent<MainProps> = ({
  categories,
}): JSX.Element => {
  return (
    <>
      {/* <Page.Content
        breakpoint="widescreen"
        wrapperProps={{
          padding: "major-1",
          background: "linear-gradient(90deg, #ff8a00, #f9c100)",
          color: "#FFFFFF",
        }}
      >
        <Paragraph
          style={{
            textAlign: "center",
            fontSize: "1.4rem",
            fontWeight: "bold",
          }}
        >
          Sómos Seguridad Industrial en la Región de Atacama.
        </Paragraph>
      </Page.Content> */}

      <Page.Content breakpoint="widescreen">
        <Heading
          use="h1"
          style={{ textAlign: "center", padding: "1rem", fontSize: "1.7rem" }}
        >
          Nuestros productos
        </Heading>
        <CategoryGrid categoryGridItems={categories} />
      </Page.Content>
    </>
  );
};

export default Main;

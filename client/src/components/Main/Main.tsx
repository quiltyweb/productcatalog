import React from "react";
import {
  Heading,
  Paragraph,
  Columns,
  Column,
  Card,
  Image,
  Page,
} from "fannypack";

type MainProps = {
  categories: any;
};

// const TileCategory = styled(Card)``;
const Main: React.FunctionComponent<MainProps> = ({
  categories,
}): JSX.Element => {
  return (
    <>
      <Page.Content
        // isFluid
         breakpoint="desktop"
        wrapperProps={{ backgroundColor: "white800", padding: 'major-4' }}
      >
        <Heading use="h1">Sómos Seguridad Industrial</Heading>
        <Paragraph>
          Comercial Gattoni le da la más cordial bienvenida y le invita a
          conocer su amplia gama de productos de seguridad Industrial. Somos una
          Empresa con más de 20 años de experiencia en el área de venta de
          artículos de Seguridad Industrial, ubicada en Copiapó, Región de
          Atacama.
        </Paragraph>
      </Page.Content>

      <Page.Content
        breakpoint="desktop"
      >
        <Heading use="h2">
          Categoria de Productos
        </Heading>

        <Columns>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item: any) => {
            return (
              <Column spread={3}>
                <Card.Card>
                  <Card.Content>
                    <Image
                      fit="cover"
                      fitPosition="top"
                      width={350}
                      height={150}
                      src="https://via.placeholder.com/350x150"
                      alt="Bean"
                      backgroundColor="whitesmoke"
                    />
                  </Card.Content>
                  <Card.Footer justifyContent="center">
                    <Heading use="h2">Agricola</Heading>
                  </Card.Footer>
                </Card.Card>
              </Column>
            );
          })}
        </Columns>
      </Page.Content>
    </>
  );
};

export default Main;

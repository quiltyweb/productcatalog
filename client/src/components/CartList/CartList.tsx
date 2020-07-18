import React from "react";
import { Box, Heading, Table, Button, styled, Image } from "fannypack";
import QuantityPicker from "../QuantityPicker/QuantityPicker";
import { useHomePageContext } from "../../pages/HomePage/HomePageContext";

const ImageStyled = styled(Image)`
  max-width: 100%;
  max-height: 60px;
  margin-right: 0.5rem;
`;

interface CardProps {
  isEditable?: boolean;
}

// TODO: we need to grab the product name via query maybe
const CartList: React.FunctionComponent<CardProps> = ({
  isEditable = true,
}): JSX.Element => {
  const { cart, removeCartItem } = useHomePageContext();

  return (
    <Box>
      {isEditable && <Heading>Mi Cotización:</Heading>}
      <Table hasBorder isResponsive>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Imagen</Table.HeadCell>
            <Table.HeadCell>Producto</Table.HeadCell>
            <Table.HeadCell>Cantidad</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body hasBorders>
          {cart.map((item) => {
            return (
              <Table.Row>
                <Table.Cell>
                  <ImageStyled fit="cover" src={item.productImage} />
                </Table.Cell>
                <Table.Cell>{item.productName}</Table.Cell>
                <Table.Cell>
                  {isEditable ? (
                    <QuantityPicker
                      productId={item.productId}
                      quantity={item.quantity}
                    />
                  ) : (
                    <span>{item.quantity}</span>
                  )}
                </Table.Cell>
                {isEditable && (
                  <Table.Cell>
                    <Button onClick={() => removeCartItem(item.productId)}>
                      Borrar
                    </Button>
                  </Table.Cell>
                )}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Box>
  );
};

export default CartList;

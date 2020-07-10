import React from 'react'
import {
  Box,
  Heading,
  Table,
  Button,
  Paragraph
} from 'fannypack'
 import QuantityPicker from '../QuantityPicker/QuantityPicker'
import { useHomePageContext } from '../../pages/HomePage/HomePageContext';

// TODO: we need to grab the product name via query maybe
const CartList = (): JSX.Element => {
  const { cart, removeCartItem } = useHomePageContext();

  if (!cart.length) {
    return (
      <Box padding="major-2">
        <Paragraph>No hay Productos en la Cotización.</Paragraph>
        <Paragraph>Agregue articulos a su cotización navegando a través del menú de categorias</Paragraph>
      </Box>
    );
  }

  return (
    <Box padding="major-2">
      <Heading use="h2">Productos:</Heading>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Id producto</Table.HeadCell>
            <Table.HeadCell>Cantidad</Table.HeadCell>

          </Table.Row>
        </Table.Head>
        <Table.Body>
          {
            cart.map(item => {
              return(
                <Table.Row>
                <Table.Cell>{item.productId}</Table.Cell>
                <Table.Cell><QuantityPicker productId={item.productId} quantity={item.quantity}/></Table.Cell>
                <Table.Cell><Button onClick={() => removeCartItem(item.productId)}>Borrar</Button></Table.Cell>
              </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
    </Box>
  )
}

export default CartList

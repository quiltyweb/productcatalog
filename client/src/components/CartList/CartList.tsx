import React from 'react'
import {
  Box,
  Heading,
  Table,
  Button
} from 'fannypack'
 import QuantityPicker from '../QuantityPicker/QuantityPicker'
import { useHomePageContext } from '../../pages/HomePage/HomePageContext';

// TODO: we need to grab the product name via query maybe
const CartList = (): JSX.Element => {
  const { cart, removeCartItem } = useHomePageContext();

  return (
    <Box padding="major-2">
    <Heading>Mi Cotización:</Heading>
      <Table hasBorder isResponsive>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Id producto</Table.HeadCell>
            <Table.HeadCell>Cantidad</Table.HeadCell>

          </Table.Row>
        </Table.Head>
        <Table.Body hasBorders>
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

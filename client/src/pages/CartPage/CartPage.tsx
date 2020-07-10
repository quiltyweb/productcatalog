import React from 'react';
import {
  Heading,
  Paragraph,
  Box
} from 'fannypack'
import CartList from "../../components/CartList/CartList";
import QuoteForm from "../../components/QuoteForm/QuoteForm";
import { useHomePageContext } from '../../pages/HomePage/HomePageContext';

export const CartPage = () => {
  const { cart } = useHomePageContext();

  if (!cart.length) {
    return (
      <Box>
        <Heading>Mi Cotización:</Heading>
        <Paragraph>No hay Productos en la Cotización.</Paragraph>
        <Paragraph>Agregue articulos a su cotización navegando a través del menú de categorias</Paragraph>
      </Box>
    );
  }

  return (
    <>
      <CartList />
      <QuoteForm />
    </>
  );
};
export default CartPage;

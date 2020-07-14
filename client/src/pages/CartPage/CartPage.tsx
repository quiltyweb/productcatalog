import React from "react";
import { Heading, Paragraph, Box } from "fannypack";
import CartList from "../../components/CartList/CartList";
import { useHomePageContext } from "../../pages/HomePage/HomePageContext";
import { Link } from "react-router-dom";

export const CartPage = () => {
  const { cart } = useHomePageContext();

  if (!cart.length) {
    return (
      <Box>
        <Heading>Mi Cotización:</Heading>
        <Paragraph>No hay Productos en la Cotización.</Paragraph>
        <Paragraph>
          Agregue articulos a su cotización navegando a través del menú de
          categorias
        </Paragraph>
      </Box>
    );
  }

  return (
    <>
      <CartList />
      <Link to="/enviar-cotizacion">Enviar Cotización</Link>
    </>
  );
};
export default CartPage;

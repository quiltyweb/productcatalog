import React from "react";
import { Heading, Paragraph, Box } from "fannypack";
import QuoteForm from "../../components/QuoteForm/QuoteForm";
import { useHomePageContext } from "../HomePage/HomePageContext";

export const QuotePage = () => {
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
      <h2>Ingrese datos de su cotizacion</h2>
      <QuoteForm cartItems={cart} />
    </>
  );
};
export default QuotePage;

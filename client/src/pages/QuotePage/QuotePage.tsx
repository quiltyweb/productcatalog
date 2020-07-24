import React from "react";
import { Column, Columns, palette, styled } from "fannypack";
import { Heading, Paragraph, Box } from "fannypack";
import QuoteForm from "../../components/QuoteForm/QuoteForm";
import { useHomePageContext } from "../HomePage/HomePageContext";
import CartList from "../../components/CartList/CartList";

const QuoteSummaryColumn = styled(Column)`
  background-color: ${palette("white")};
  padding: 0;
  margin-right: 1rem;
`;

const FormColumn = styled(Column)`
  background-color: ${palette("white800")};
  border-radius: 5px;
`;

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
    <Box>
      <Heading>Ingrese datos de su cotización</Heading>
      <Columns padding="major-2">
        <QuoteSummaryColumn>
          <CartList isEditable={false} />
        </QuoteSummaryColumn>
        <FormColumn>
          <QuoteForm cartItems={cart} />
        </FormColumn>
      </Columns>
    </Box>
  );
};
export default QuotePage;

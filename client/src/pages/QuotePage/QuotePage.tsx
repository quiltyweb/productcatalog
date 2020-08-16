import React from "react";
import {
  Column,
  Columns,
  palette,
  styled,
  Heading,
  Paragraph,
  Box,
  Page,
} from "fannypack";
import QuoteForm from "../../components/QuoteForm/QuoteForm";
import { useHomePageContext } from "../HomePage/HomePageContext";
import CartList from "../../components/CartList/CartList";

const QuoteSummaryBox = styled(Box)`
  background-color: ${palette("white")};
`;

const FormBox = styled(Box)`
  background-color: ${palette("white800")};
  border-radius: 5px;
`;

export const QuotePage = () => {
  const { cart } = useHomePageContext();
  if (!cart.length) {
    return (
      <Page.Content isFluid breakpoint="desktop">
        <Heading>Mi Cotización:</Heading>
        <Paragraph>No hay Productos en la Cotización.</Paragraph>
        <Paragraph>
          Agregue articulos a su cotización navegando a través del menú de
          categorias
        </Paragraph>
      </Page.Content>
    );
  }

  return (
    <Page.Content isFluid breakpoint="desktop">
      <Heading>Ingrese datos de su cotización:</Heading>
      <Columns>
        <Column>
          <QuoteSummaryBox>
            <CartList isEditable={false} />
          </QuoteSummaryBox>
        </Column>
        <Column>
          <FormBox>
            <QuoteForm cartItems={cart} />
          </FormBox>
        </Column>
      </Columns>
    </Page.Content>
  );
};
export default QuotePage;

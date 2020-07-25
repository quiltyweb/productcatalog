import React from "react";
import {
  Column,
  Columns,
  palette,
  styled,
  Heading,
  Paragraph,
  Box,
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
      <Heading>Ingrese datos de su cotización:</Heading>
      <Columns padding="major-2">
        <Column
          spread={6}
          spreadDesktop={12}
          spreadTablet={12}
          spreadMobile={12}
        >
          <QuoteSummaryBox>
            <CartList isEditable={false} />
          </QuoteSummaryBox>
        </Column>
        <Column
          spread={6}
          spreadDesktop={12}
          spreadTablet={12}
          spreadMobile={12}
        >
          <FormBox>
            <QuoteForm cartItems={cart} />
          </FormBox>
        </Column>
      </Columns>
    </Box>
  );
};
export default QuotePage;

import React from "react";
import { Button, Input, Group } from "bumbag";
import { useHomePageContext } from "../../context/HomePageContext";

type QuantityPickerProps = {
  productId: string;
  quantity: number;
};

const QuantityPicker: React.FunctionComponent<QuantityPickerProps> = ({
  productId,
  quantity,
}): JSX.Element => {
  const {
    updateCartItem,
    incrementCartItem,
    decrementCartItem,
  } = useHomePageContext();

  return (
    <Group>
      <Button onClick={() => decrementCartItem({ productId })}>-</Button>
      <Input
        aria-label="selector de cantidad"
        onChange={(e: any) => {
          updateCartItem({
            productId,
            quantity: e.target.value,
          });
        }}
        value={String(quantity)}
        name="quantityPickerInput"
        width="3rem"
        readOnly={true}
      />
      <Button onClick={() => incrementCartItem({ productId })}>+</Button>
    </Group>
  );
};

export default QuantityPicker;

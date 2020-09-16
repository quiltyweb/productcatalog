import React from "react";
import { Input, Group } from "fannypack";
import { useHomePageContext } from "../../pages/HomePage/HomePageContext";

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
      <button onClick={() => decrementCartItem({ productId })}>-</button>
      <Input
        onChange={(e: any) =>
          updateCartItem({
            productId,
            quantity: e.target.value,
          })
        }
        value={String(quantity)}
        name="quantityPickerInput"
        width="3rem"
        readOnly // TOOD: readOnly for now
      />
      <button onClick={() => incrementCartItem({ productId })}>+</button>
    </Group>
  );
};

export default QuantityPicker;

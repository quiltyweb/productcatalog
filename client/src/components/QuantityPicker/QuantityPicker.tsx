import React from 'react'
import {
  Input,
  Button,
  Group
} from 'fannypack'
import { useHomePageContext } from '../../pages/HomePage/HomePageContext';

type QuantityPickerProps = {
  productId: string
  quantity: number
};

const QuantityPicker: React.FunctionComponent<QuantityPickerProps> = ({ productId, quantity }): JSX.Element => {
  const { updateCartItem, incrementCartItem, decrementCartItem } = useHomePageContext();

  return (
    <Group>
      <Button onClick={ () => decrementCartItem({ productId}) }>-</Button>
      <Input
        onChange={(e: any) => updateCartItem({ productId, quantity: e.target.value }) }
        value={quantity}
        name="quantityPickerInput"
        width="3rem"
      />
      <Button onClick={ () => incrementCartItem({ productId }) }>+</Button>
    </Group>
  )
}

export default QuantityPicker

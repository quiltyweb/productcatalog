import { createContext, useContext } from 'react';

export type CartItemProps = {
  productId: string
  quantity: number
}


type ProductItemProps = {
  productId: string
  quantity: number
}

interface HomePageContextProps {
  cart: ProductItemProps[]
  cartCount: number
  handleCart: (cart: CartItemProps[]) => void
  updateCartItem: (item: ProductItemProps) => void
  addCartItem: (item: ProductItemProps) => void
  incrementCartItem: (item: { productId: string }) => void
  decrementCartItem: (item: { productId: string }) => void
  removeCartItem: (productId: string) => void
};

// const HomePageContext = createContext<Partial<HomePageContextProps>>({});
const HomePageContext = createContext({} as HomePageContextProps)

export const useHomePageContext = () => useContext(HomePageContext)

export default HomePageContext
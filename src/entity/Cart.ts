import { Product } from "./Product";

type CartItemOptions = {
  id?: number;
  product: Product;
  quantity: number;
};

export class CartItem {
  public id: number;
  public product: Product;
  public quantity: number;

  constructor(product: Product, quantity: number, id = 1) {
    if (quantity <= 0) throw Error("quantity must be greater than 0");

    this.id = id;
    this.product = product;
    this.quantity = quantity;
  }
}

export class Cart {
  public cartItems: CartItem[];

  constructor({ cartItems = [] }: { cartItems?: Array<CartItem> } = {}) {
    this.cartItems = [];

    cartItems.forEach((cartItem) => this.addCartItem(cartItem));
  }

  public addCartItem = (cartItem: CartItem): void => {
    cartItem.id = this.cartItems.length + 1;
    this.cartItems = this.cartItems.concat(cartItem);
  };

  public updateCartItemQuantity = (
    cartItemId: number,
    quantity: number
  ): void => {
    const cartItem = this.cartItems.find(
      (cartItem) => cartItem.id === cartItemId
    );
    cartItem.quantity = quantity;
  };

  public removeCartItem = (cartItemId: number): void => {
    this.cartItems = this.cartItems.filter(
      (cartItem: CartItem) => cartItem.id !== cartItemId
    );
  };
}

import faker from "faker";

import { Cart, CartItem } from "../../src/entity/Cart";
import { Product } from "../../src/entity/Product";
import { Category } from "../../src/entity/Category";

const category = new Category();
category.name = faker.commerce.productAdjective();

const product = new Product();

const purchasePrice = faker.random.number({ min: 10000, max: 100000 });

product.category = category;
product.name = faker.commerce.productName();
product.description = faker.lorem.paragraph();
product.imagePath = faker.internet.url();
product.attachmentPath = faker.internet.url();
product.purchasePrice = purchasePrice;
product.salePrice = faker.random.number({
  min: 10000,
  max: purchasePrice,
});
product.supplierName = faker.company.companyName();

describe("Cart", () => {
  let cart: Cart;
  beforeEach(() => {
    cart = new Cart();
  });

  describe("cartItems", () => {
    it("defaults to an empty array", () => {
      expect(cart.cartItems).toEqual([]);
    });
  });

  describe("addCartItem", () => {
    it("appends the given cartItem to the cart's cartItems", () => {
      const cartItem = new CartItem(product, faker.random.number({ min: 1 }));

      cart.addCartItem(cartItem);

      expect(cart.cartItems).toContainEqual(cartItem);
    });
  });

  describe("updateCartItemQuantity", () => {
    it("changes the given cart item's quantity", () => {
      const oldQuantity = 3;
      const newQuantity = oldQuantity + 2;
      const cartItem = new CartItem(product, oldQuantity);

      cart = new Cart({ cartItems: [cartItem] });
      cart.updateCartItemQuantity(cartItem.id, newQuantity);

      expect(cart.cartItems[0].quantity).toEqual(5);
    });
  });

  describe("removeCartItem", () => {
    it("removes the given cart item", () => {
      const cartItem = new CartItem(product, 2);

      cart = new Cart({ cartItems: [cartItem] });
      cart.removeCartItem(1);

      expect(cart.cartItems).toEqual([]);
    });
  });
});

describe("CartItem", () => {
  describe("quantity", () => {
    it("is invalid if less than 1", () => {
      expect(() => {
        new CartItem(product, 0);
      }).toThrowError("quantity must be greater than 0");
    });
  });
});

import { GraphQLInt, GraphQLNonNull, GraphQLID } from "graphql";
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";

import { Cart, CartItem } from "../entity/Cart";
import { Product } from "../entity/Product";
import GQLTypes from "./GqlTypes";
import { getObjectFromGlobalId } from "../graphql";

import type { GraphQLFieldConfig } from "graphql";

import type { TSource, TContext } from "../types";
import { EntityManager } from "typeorm";

// We need special types for session objects based on entities,
// because they have the same attributes, but aren't instances
// of the relevant classes, which confuses Relay's node resolution.
type SessionProduct = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  imagePath: string;
  attachmentPath: string;
  purchasePrice: number;
  salePrice: number;
  supplierName: string;
};
type SessionCartItem = {
  id: number;
  product: SessionProduct;
  quantity: number;
};
type SessionCart = {
  cartItems?: Array<SessionCartItem>;
} | void;

class Mutations {
  private types: GQLTypes;

  constructor(types: GQLTypes) {
    this.types = types;
  }

  get addProductToCart(): GraphQLFieldConfig<TSource, TContext> {
    return mutationWithClientMutationId({
      name: "AddProductToCart",
      inputFields: {
        productId: {
          type: GraphQLNonNull(GraphQLID),
        },
        quantity: {
          type: GraphQLNonNull(GraphQLInt),
        },
      },
      outputFields: {
        cart: {
          type: this.types.cartType,
          resolve: (payload): Cart => payload.Cart,
        },
      },
      mutateAndGetPayload: async ({ productId, quantity }, ctx) => {
        const cart = await this.parseSessionCart(
          ctx.session.cart,
          ctx.entityManager
        );

        const entity = await getObjectFromGlobalId(productId, ctx);
        const product = entity instanceof Product ? entity : null;

        if (!product) throw Error("Given ID was not for a product.");

        cart.addCartItem(new CartItem(product, quantity));
        ctx.session.cart = cart;

        return { Cart: ctx.session.cart };
      },
    });
  }

  get removeProductFromCart(): GraphQLFieldConfig<TSource, TContext> {
    return mutationWithClientMutationId({
      name: "RemoveProductFromCart",
      inputFields: {
        cartItemId: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      outputFields: {
        cart: {
          type: this.types.cartType,
          resolve: (payload): Cart => payload.Cart,
        },
      },
      mutateAndGetPayload: async ({ cartItemId }, ctx) => {
        const cart = await this.parseSessionCart(
          ctx.session.cart,
          ctx.entityManager
        );
        const cartItemIndex = Number(fromGlobalId(cartItemId).id);

        cart.removeCartItem(cartItemIndex);
        ctx.session.cart = cart;

        return { Cart: ctx.session.cart };
      },
    });
  }

  get updateCartItemQuantity(): GraphQLFieldConfig<TSource, TContext> {
    return mutationWithClientMutationId({
      name: "UpdateCartItemQuantity",
      inputFields: {
        cartItemId: {
          type: GraphQLNonNull(GraphQLID),
        },
        quantity: {
          type: GraphQLNonNull(GraphQLInt),
        },
      },
      outputFields: {
        cart: {
          type: this.types.cartType,
          resolve: (payload): Cart => payload.Cart,
        },
      },
      mutateAndGetPayload: async ({ cartItemId, quantity }, ctx) => {
        const cart = await this.parseSessionCart(
          ctx.session.cart || {},
          ctx.entityManager
        );
        const cartItemIndex = Number(fromGlobalId(cartItemId).id);

        cart.updateCartItemQuantity(cartItemIndex, quantity);
        ctx.session.cart = cart;

        return { Cart: ctx.session.cart };
      },
    });
  }

  async parseSessionCart(
    sessionCart: SessionCart,
    entityManager: EntityManager
  ): Promise<Cart> {
    if (!sessionCart || !sessionCart.cartItems) return new Cart();

    const cartItems = await Promise.all(
      sessionCart.cartItems.map((cartItem) =>
        this.parseSessionCartItem(cartItem, entityManager)
      )
    );

    return new Cart({ cartItems });
  }

  async parseSessionCartItem(
    sessionCartItem: SessionCartItem,
    entityManager: EntityManager
  ): Promise<CartItem> {
    const {
      quantity,
      product: { id: productId },
    } = sessionCartItem;
    const product = await entityManager.findOne(Product, productId);

    return new CartItem(product, quantity);
  }
}

export default Mutations;

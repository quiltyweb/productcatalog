import React from "react";
import { CartTable } from "./CartTable";

export default {
  title: "CartTable",
  component: CartTable,
};

export const CartTableStory: React.VFC<any> = () => <CartTable />;

CartTableStory.storyName = "I am the CartTableStory";

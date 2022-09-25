import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { ProductCard } from "./ProductCard";

const history = createMemoryHistory();

export default {
  title: "ProductCard",
  component: ProductCard,
};

export const ProductCardStory = () => (
  <Router history={history}>
    <ProductCard
      productId="test_productId"
      name="test_name"
      linkImage="test_linkImage"
      description="test_description"
    />
  </Router>
);

ProductCardStory.storyName = "I am the ProductCardStory";

import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { ProductList } from "./ProductList";

const history = createMemoryHistory();

export default {
  title: "ProductList",
  component: ProductList,
};

export const ProductListStory = () => (
  <Router history={history}>
    <ProductList
      products={{
        edges: [
          {
            node: {
              id: "1",
              name: "Soldador",
              imagePath: "imagePath1",
              attachmentPath: "attachmentPath1",
            },
          },
          {
            node: {
              id: "2",
              name: "Zapatos",
              imagePath: "imagePath2",
              attachmentPath: "attachmentPath2",
            },
          },
        ],
      }}
    />
  </Router>
);

ProductListStory.storyName = "I am the ProductListStory";

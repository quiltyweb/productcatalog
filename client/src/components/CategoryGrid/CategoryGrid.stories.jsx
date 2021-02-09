import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { CategoryGrid } from "./CategoryGrid";

const history = createMemoryHistory();

export default {
  title: "CategoryGrid",
  component: CategoryGrid,
};

export const CategoryGridStory: React.VFC<any> = () => (
  <Router history={history}>
    <CategoryGrid
      categoryGridItems={{
        edges: [
          {
            node: { id: "1", name: "Soldador" },
          },
          {
            node: { id: "2", name: "Zapatos" },
          },
        ],
      }}
    />
  </Router>
);

CategoryGridStory.storyName = "I am the CategoryGridStory";

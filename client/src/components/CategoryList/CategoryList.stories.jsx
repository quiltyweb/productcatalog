import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { CategoryList } from "./CategoryList";

const history = createMemoryHistory();

export default {
  title: "CategoryList",
  component: CategoryList,
};

export const CategoryListStory: React.VFC<any> = () => (
  <Router history={history}>
    <CategoryList
      CategoryListItems={{
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

CategoryListStory.storyName = "I am the CategoryListStory";

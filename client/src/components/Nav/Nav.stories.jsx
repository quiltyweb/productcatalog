import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Nav from "./Nav";

const history = createMemoryHistory();

export default {
  title: "Nav",
  component: Nav,
};

export const NavStory = () => (
  <Router history={history}>
    <Nav />
  </Router>
);

NavStory.storyName = "I am the NavStory";

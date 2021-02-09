import React from "react";
import Loader from "./Loader";

export default {
  title: "Loader",
  component: Loader,
};

export const LoaderStory: React.VFC<any> = () => <Loader />;

LoaderStory.storyName = "I am the LoaderStory";

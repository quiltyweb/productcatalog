import React from "react";
import { ContentList } from "./ContentList";

export default {
  title: "ContentList",
  component: ContentList,
};

export const ContentListStory = () => (
  <ContentList
    title="title text"
    description="description text"
    links={[
      {
        label: "Certificación Comercial Gattoni",
        href: "#",
      },
      {
        label: "Certificación Comercial Gattoni anteojos policarbonato",
        href: "#",
      },
    ]}
  />
);

ContentListStory.storyName = "I am the ContentListStory";

import React from "react";
import { render, screen } from "@testing-library/react";
import { ContentList } from "./ContentList";

const Certificationlinks = [
  {
    label: "Certificación Comercial Gattoni",
    href: "#",
  },
  {
    label: "Certificación Comercial Gattoni anteojos policarbonato",
    href: "#",
  },
];

describe("ContentList Component", () => {
  it("should render a title, description and list of links", () => {
    render(
      <ContentList
        title="title text"
        description="description text"
        links={Certificationlinks}
      />
    );
    screen.getByRole("heading", { name: "title text" });
    screen.getByText("description text");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});

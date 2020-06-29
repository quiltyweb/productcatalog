import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe('Card Component', () => {
  it("should render as a list item", () => {
    render(<Card name="card name" description="card description" linkImage="cardImage.jpg" />);
    const ListItem = screen.getByRole('listitem');
    expect(ListItem).toBeInTheDocument();
  });

  it("should contain a heading level 3", () => {
    render(<Card name="card name" description="card description" linkImage="cardImage.jpg" />);
    const Heading = screen.getByRole('heading');
    expect(Heading.tagName).toBe('H3');
  });

  it("should contain a CTA link", () => {
    render(<Card name="card name" description="card description" linkImage="cardImage.jpg" />);
    const CTA = screen.getByRole('link');
    expect(CTA).toHaveTextContent('Cotizar →');
  });
})
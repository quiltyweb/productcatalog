import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import PageWrapper from "./PageWrapper";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

describe("PageWrapper Component", () => {
  it("should render with default page title and children", async () => {
    render(
      <PageWrapper>
        <div>content goes here...</div>
      </PageWrapper>
    );

    await waitFor(() =>
      expect(document.title).toEqual("Comercial Gattoni - seguridad industrial")
    );
    screen.getByText("content goes here...");
  });

  it("should render page title", async () => {
    render(
      <PageWrapper title="title lorem ipsum">
        <div>content goes here...</div>
      </PageWrapper>
    );

    await waitFor(() => expect(document.title).toEqual("title lorem ipsum"));
  });

  it("should be accessible", async () => {
    const { container } = render(
      <PageWrapper>
        <div>content goes here...</div>
      </PageWrapper>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

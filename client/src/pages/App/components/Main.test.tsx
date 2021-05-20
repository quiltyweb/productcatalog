import React from "react";
import { render, screen } from "@testing-library/react";
import Main from "./Main";

describe("Main Component", () => {
  it("should render with children", () => {
    render(
      <Main>
        <div>item</div>
      </Main>
    );
    screen.getByText("item");
  });
});

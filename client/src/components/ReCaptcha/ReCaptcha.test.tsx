import React from "react";
import { render, screen } from "@testing-library/react";
import { ReCaptcha } from "./ReCaptcha";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

describe("ReCaptcha Component", () => {
  const onVerifyCaptchaSpy = jest.fn();
  it("should render", () => {
    render(<ReCaptcha id="123" onVerifyCaptcha={onVerifyCaptchaSpy} />);
    screen.getByRole("button", { name: "No soy robot!" });
  });

  it("should be accessible", async () => {
    const { container } = render(
      <ReCaptcha id="123" onVerifyCaptcha={onVerifyCaptchaSpy} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { AssertionError } from "assert";

describe('Footer Component', () => {
  it("should render address with semantic itemProps", () => {
    render(<Footer />);
    const address = screen.getByText('Rodriguez 757-A');
    const city = screen.getByText('Copiapó,');
    const region = screen.getByText('Región de Atacama, Chile.');
    // work in progress
    // const telephoneM = screen.getByRole('link', { } );
    // const faxNumber = screen.getByText('52-2-216257');

    expect.assertions(3);
    expect(address).toHaveAttribute('itemProp', 'streetAddress');
    expect(city).toHaveAttribute('itemProp', 'addressLocality');
    expect(region).toHaveAttribute('itemProp', 'addressRegion');
    // expect(telephoneM).toHaveAttribute('itemProp', 'telephone');
    // expect(faxNumber).toHaveAttribute('itemProp', 'faxNumber');
  });
})
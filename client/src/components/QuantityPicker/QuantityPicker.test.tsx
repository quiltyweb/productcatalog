import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import QuantityPicker from "./QuantityPicker";
import { axe, toHaveNoViolations } from "jest-axe";
import HomePageContext from "../../context/HomePageContext";
import userEvent from "@testing-library/user-event";
expect.extend(toHaveNoViolations);

const decrementCartItemSpy = jest.fn();
const incrementCartItemSpy = jest.fn();
const updateCartItemSpy = jest.fn();

beforeEach(() => {
  render(
    <HomePageContext.Provider
      value={{
        cart: [],
        cartCount: 2,
        updateCartItem: updateCartItemSpy,
        incrementCartItem: incrementCartItemSpy,
        decrementCartItem: decrementCartItemSpy,
        addCartItem: () => null,
        handleCart: () => null,
        removeCartItem: () => null,
      }}
    >
      <QuantityPicker productId="123" quantity={10} />
    </HomePageContext.Provider>
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

afterAll(() => {
  jest.clearAllMocks();
});

describe("QuantityPicker Component", () => {
  it("should render", () => {
    screen.getByRole("button", { name: "-" });
    screen.getByRole("button", { name: "+" });
    const quantityPickerInput = screen.getByLabelText("selector de cantidad");
    expect(quantityPickerInput).toHaveValue("10");
  });

  it("should call decrementCartItem callback", async () => {
    const decrementButton = screen.getByRole("button", { name: "-" });

    act(() => {
      userEvent.click(decrementButton);
    });

    await waitFor(() =>
      expect(decrementCartItemSpy).toHaveBeenCalledWith({ productId: "123" })
    );
  });

  it("should call incrementCartItem callback", async () => {
    const incrementButton = screen.getByRole("button", { name: "+" });

    act(() => {
      userEvent.click(incrementButton);
    });

    await waitFor(() =>
      expect(incrementCartItemSpy).toHaveBeenCalledWith({ productId: "123" })
    );
  });

  it("should be accessible", async () => {
    const { container } = render(
      <QuantityPicker productId="123" quantity={10} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

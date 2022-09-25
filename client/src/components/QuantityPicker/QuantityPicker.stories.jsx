import React from "react";
import QuantityPicker from "./QuantityPicker";

export default {
  title: "QuantityPicker",
  component: QuantityPicker,
};

export const QuantityPickerStory = () => (
  <QuantityPicker productId="123" quantity={10} />
);

QuantityPickerStory.storyName = "I am the QuantityPickerStory";

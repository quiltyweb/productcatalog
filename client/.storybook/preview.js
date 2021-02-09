import React from "react";
import { Provider as BumbagProvider } from "bumbag";
import { newTheme } from "../src/theme";

export const decorators = [
  (Story) => (
    <BumbagProvider theme={newTheme}>
      <Story />
    </BumbagProvider>
  ),
];

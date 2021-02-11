import React from "react";
import { Provider as BumbagProvider } from "bumbag";
import { newTheme } from "../src/theme";
import { darkTheme } from "../src/darktheme";
import { addDecorator } from "@storybook/react";
import { withThemes } from '@react-theming/storybook-addon';


export const decorators = [
  (Story) => (
    <BumbagProvider theme={newTheme}>
      <Story />
    </BumbagProvider>
  ),
];

// pass ThemeProvider and array of your themes to decorator
addDecorator(withThemes(BumbagProvider, [newTheme, darkTheme]));
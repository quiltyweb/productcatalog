import { css } from "bumbag";
import { ThemeConfig } from "bumbag/ts/types";

export const darkTheme: ThemeConfig = {
  global: {
    fontSize: 28,
    styles: {
      base: css`
        html {
          height: auto;
          overflow: auto;
          box-sizing: border-box;
        }
        body {
          background-color: #000000;
          color: #ffffff;
        }
        a {
          color: #ffffff;
          &:hover {
            color: #e16204;
          }
        }
      `,
    },
  },
  palette: {
    primary: "red",
    secondary: "blue",
    text: "#ffffff",
    info: "#1e67d5",
    success: "#007933",
    danger: "#da291c",
    warning: "#ed9c22",
  },
  Heading: {
    styles: {
      base: {
        color: "primary",
      },
    },
    variants: {
      "decorative-heading": {
        styles: {
          base: css`
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            &:after {
              content: "";
              border-bottom: 3px solid #e16204;
              padding-top: 10px;
              width: 260px;
            }
          `,
        },
      },
      "light-heading": {
        styles: {
          base: {
            color: "white",
          },
        },
      },
    },
  },
};

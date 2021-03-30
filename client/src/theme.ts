import { css } from "bumbag";
import { ThemeConfig } from "bumbag/ts/types";

export const newTheme: ThemeConfig = {
  global: {
    fontSize: 16,
    styles: {
      base: css`
        html {
          height: auto;
          overflow: auto;
          box-sizing: border-box;
        }
        body {
          background-color: #ffffff;
          color: #212121;
        }
        a {
          color: #212121;
          &:hover {
            color: #e16204;
          }
        }
      `,
    },
  },
  palette: {
    primary: "#041e42",
    secondary: "#f7941d",
    text: "#3e4349",
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
  Alert: {
    styles: {
      base: {
        background: "#ffe3a4",
      },
    },
  },
};

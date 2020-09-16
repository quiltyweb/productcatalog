import { css } from "bumbag";
import { ThemeConfig, PaletteThemeConfig } from "bumbag/ts/types";

interface GattoniPaletteThemeConfig extends PaletteThemeConfig {
  secondary: string;
  primary: string;
  background: string;
  focus: string;
}

interface GattoniThemeConfig extends ThemeConfig {
  palette: GattoniPaletteThemeConfig;
}

export const newTheme: GattoniThemeConfig = {
  global: {
    fontSize: 18,
    styles: {
      base: css`
        html {
          height: auto;
          overflow: auto;
          box-sizing: border-box;
          background-color: #ffffff;
        }
        body {
          height: auto;
          color: #212121;
          font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
            Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol";
          font-size: 1rem;
          line-height: 1.5;
        }
        a {
          color: #212121;
          text-decoration: dashed;
        }
        a:hover {
          color: #d32f2f;
        }
        a:focus {
          outline: 2px solid #041e42;
          outline-offset: 2px;
        }
        ul {
          padding: 0 0.5rem;
        }
        li {
          margin: 0.5rem;
          list-style: none;
        }
        ::-webkit-input-placeholder {
          /* Chrome/Opera/Safari */
          color: #000000 !important;
          font-weight: 500;
        }
        ::-moz-placeholder {
          /* Firefox 19+ */
          color: #000000 !important;
          font-weight: 500;
        }
        :-ms-input-placeholder {
          /* IE 10+ */
          color: #000000 !important;
          font-weight: 500;
        }
        :-moz-placeholder {
          /* Firefox 18- */
          color: #000000 !important;
          font-weight: 500;
        }
      `,
    },
  },
  palette: {
    secondary: "#f7941d",
    primary: "#041e42",
    background: "#f5f6f7",
    focus: "#D32F2F",
    danger: "#da291c",
    success: "#007933",
    text: "#3e4349",
    gray: "#d8d8d8",
  },
  Heading: {
    h1: {
      fontSize: "700",
    },
    h2: {
      fontSize: "600",
    },
    h3: {
      fontSize: "500",
    },
    h4: {
      fontSize: "400",
    },
    h5: {
      fontSize: "300",
    },
    h6: {
      fontSize: "200",
    },
  },
};

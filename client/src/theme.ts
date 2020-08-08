import { css } from "fannypack";
import { ThemeConfig, PaletteThemeConfig } from "fannypack/ts/types";

interface GattoniPaletteThemeConfig extends PaletteThemeConfig {
  secondary: string;
  primary: string;
  background: string;
  focus: string;
}

interface GattoniThemeConfig extends ThemeConfig {
  palette: GattoniPaletteThemeConfig;
}

export const theme: GattoniThemeConfig = {
  global: {
    base: css`
      html {
        height: auto;
        overflow: auto;
        box-sizing: border-box;
        background-color: #fff;
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
    `,
  },
  Heading: {
    base: css`
      font-weight: bold;
    `,
    h1: css`
      font-size: 1.5rem;
    `,
    h2: css`
      font-size: 1.2rem;
    `,
    h3: css`
      font-size: 1rem;
    `,
    h4: css`
      font-size: 0.75rem;
    `,
  },
  palette: {
    secondary: "#f7941d",
    primary: "#041e42",
    danger: "#da291c",
    success: "#007933",
    text: "#3e4349",
    gray: "#d8d8d8",
    background: "#f5f6f7",
    focus: "#D32F2F",
  },
};

export default theme;

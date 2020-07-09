import { css } from 'fannypack';
import { ThemeConfig, PaletteThemeConfig } from 'fannypack/ts/types';

interface GattoniPaletteThemeConfig extends PaletteThemeConfig {
  secondary: string
  primary: string
  background: string
  focus: string
}

interface GattoniThemeConfig extends ThemeConfig {
  palette: GattoniPaletteThemeConfig
}

export const theme: GattoniThemeConfig = {
  global: {
    base: css`
      html {
        height: 100%;
        box-sizing: border-box;
        background-color: #fff;
      }
      body {
        height: 100%;
        color: #212121;
        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 1rem;
        line-height: 1.5;
      }
      a {
        color: #212121;
        text-decoration: dashed;
      }
      a:hover {
        color:  #D32F2F;
      }
      li {
        margin: .5rem;
        list-style: none;
      }
    
    `
  },
  Heading: {
    base: css`
      font-weight: bold;
    `,
    h1: css`
      font-size: 2rem;
    `,
    h2: css`
      font-size: 1.25rem;
    `,
    h3: css`
      font-size: 1rem;
    `,
    h4: css`
      font-size: 0.75rem;
    `
  },
  palette: {
    secondary: '#f7941d',
    primary: '#041e42',
    danger: '#da291c',
    success: '#007933',
    text: '#3e4349',
    gray: '#d8d8d8',
    background: '#f5f6f7',
    focus: '#D32F2F'
  }
}

export default theme;
import { css } from "bumbag";
import { ThemeConfig } from "bumbag/ts/types";

export const newTheme: ThemeConfig = {
  global: {
    fontSize: 18,
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
};

// export const newTheme: GattoniThemeConfig = {
//   global: {
//     styles: {
//       base: css`
//         html {
//           height: auto;
//           overflow: auto;
//           box-sizing: border-box;
//           background-color: #ffffff;
//         }
//         body {
//           font-size: 1rem;
//           height: auto;
//           color: #212121;
//           background-color: #ffffff;
//           font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
//             Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
//             "Segoe UI Symbol";
//           line-height: 1.5;
//         }
//         a {
//           color: #212121;
//           text-decoration: dashed;
//         }
//         a:hover {
//           color: #d32f2f;
//         }
//         a:focus {
//           outline: 2px solid #041e42;
//           outline-offset: 2px;
//         }
//         ul {
//           padding: 0 0.5rem;
//         }
//         li {
//           margin: 0.5rem;
//           list-style: none;
//         }
//         h1 {
//           font-size: 2rem;
//         }
//         h2 {
//           color: yellow;
//           font-size: 1.5rem !important;
//         }
//         ::-webkit-input-placeholder {
//           /* Chrome/Opera/Safari */
//           color: #000000 !important;
//           font-weight: 500;
//         }
//         ::-moz-placeholder {
//           /* Firefox 19+ */
//           color: #000000 !important;
//           font-weight: 500;
//         }
//         :-ms-input-placeholder {
//           /* IE 10+ */
//           color: #000000 !important;
//           font-weight: 500;
//         }
//         :-moz-placeholder {
//           /* Firefox 18- */
//           color: #000000 !important;
//           font-weight: 500;
//         }
//       `,
//     },
//   },
// };

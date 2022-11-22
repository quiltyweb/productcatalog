// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import "jest-axe/extend-expect";
import "isomorphic-fetch";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useLocation: () => ({
    path: "123",
    search: "456",
  }),
}));

jest.mock("react-ga");

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

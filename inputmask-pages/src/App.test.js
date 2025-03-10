import { render, screen } from "@testing-library/react";

import App from "./App";

test("renders App", () => {
  render(<App></App>);
  const appContainer = screen.getByTestId("app-container");
  expect(appContainer).toBeInTheDocument();
});

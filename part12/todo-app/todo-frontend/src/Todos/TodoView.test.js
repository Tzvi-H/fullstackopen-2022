import { render } from "@testing-library/react";
import TodoView from "./TodoView";

test('<TodoView /> renders an h1 tag with the text "Todos"', () => {
  const { container } = render(<TodoView />);
  const h1 = container.querySelector("h1");
  expect(h1).toHaveTextContent("Todos");
});

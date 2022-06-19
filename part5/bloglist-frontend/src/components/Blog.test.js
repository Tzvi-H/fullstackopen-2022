import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "title 1",
    author: "author 1",
    url: "url 1",
    likes: 1,
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText("title 1 author 1");
  expect(element).toBeDefined();
});

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

describe("rendering a Blog", () => {
  let container;

  beforeEach(() => {
    const blog = {
      title: "title 1",
      author: "author 1",
      url: "url 1",
      likes: 1,
    };

    container = render(<Blog blog={blog} />).container;
  });

  test("renders it's title and author", () => {
    const element = screen.getByText("title 1 author 1");
    expect(element).toBeDefined();
  });

  test("will not show the details by default", () => {
    const div = container.querySelector(".blogDetails");
    expect(div).toBeNull();
  });

  test("and clicking on the 'view' button will show the details", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);
    const div = container.querySelector(".blogDetails");
  });
});

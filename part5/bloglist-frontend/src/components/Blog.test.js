import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

describe("rendering a Blog", () => {
  let container;
  let mockHandler;

  beforeEach(() => {
    const blog = {
      title: "title 1",
      author: "author 1",
      url: "url 1",
      likes: 1,
      user: 191938383,
    };

    mockHandler = jest.fn();
    container = render(
      <Blog blog={blog} handleUpdateBlog={mockHandler} />
    ).container;
  });

  test("renders it's title and author", () => {
    const element = screen.getByText("title 1 author 1");
    expect(element).toBeDefined();
  });

  test("will not show the details by default", () => {
    const div = container.querySelector(".blogDetails");
    expect(div).toBeNull();
  });

  describe("and clicking the view button", () => {
    let user;

    beforeEach(async () => {
      user = userEvent.setup();
      const button = screen.getByText("view");
      await user.click(button);
    });

    test("will show the details", async () => {
      const div = container.querySelector(".blogDetails");
      expect(div).toBeDefined();
    });

    test("will invoke the event handler twice when clicking the like button twice ", async () => {
      const button = screen.getByText("like");
      await user.click(button);
      await user.click(button);
      expect(mockHandler.mock.calls).toHaveLength(2);
    });
  });
});

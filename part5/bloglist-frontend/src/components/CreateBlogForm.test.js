import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import CreateBlogForm from "./CreateBlogForm";

describe("rendering the CreateBlogForm", () => {
  let handleCreateBlog;
  let container;

  beforeEach(() => {
    handleCreateBlog = jest.fn();
    container = render(
      <CreateBlogForm handleCreateBlog={handleCreateBlog} />
    ).container;
  });

  describe("and submitting the form", () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      const titleInput = container.querySelector("#titleInput");
      const authorInput = container.querySelector("#authorInput");
      const urlInput = container.querySelector("#urlInput");
      const submitButton = container.querySelector('input[type="submit"]');
      await user.type(titleInput, "jest title");
      await user.type(authorInput, "jest author");
      await user.type(urlInput, "jest url");
      await user.click(submitButton);
    });

    test("will invoke the submit handler with the correct arguments", () => {
      expect(handleCreateBlog.mock.calls).toHaveLength(1);
      expect(handleCreateBlog.mock.calls[0][0]).toEqual({
        title: "jest title",
        author: "jest author",
        url: "jest url",
      });
    });
  });
});

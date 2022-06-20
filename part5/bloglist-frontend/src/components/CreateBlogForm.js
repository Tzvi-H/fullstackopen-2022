import { useState, forwardRef, useImperativeHandle } from "react";

const CreateBlogForm = forwardRef(({ handleCreateBlog }, refs) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateBlog({ title, author, url });
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  useImperativeHandle(refs, () => {
    return {
      resetForm,
    };
  });

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            id="titleInput"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="authorInput"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="urlInput"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <input type="submit" value="create" />
      </form>
    </div>
  );
});

export default CreateBlogForm;

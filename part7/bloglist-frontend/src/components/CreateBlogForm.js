import { useState, forwardRef, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";
import { addBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";

const CreateBlogForm = forwardRef((props, refs) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    blogService.create({ title, author, url }).then((newblog) => {
      dispatch(addBlog(newblog));
      props.togglableFormRef.current.toggleVisiblity();
      resetForm();
      dispatch(
        setNotification({
          message: `${title} by ${author} added`,
        })
      );
      setTimeout(() => {
        dispatch(removeNotification());
      }, 4000);
    });
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

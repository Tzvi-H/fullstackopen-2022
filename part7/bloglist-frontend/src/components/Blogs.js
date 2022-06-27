import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog";
import blogService from "../services/blogs";
import { updateBlog, removeBlog } from "../reducers/blogReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const Blogs = () => {
  const blogs = useSelector((state) =>
    state.blogs.sort((b1, b2) => {
      if (b1.likes > b2.likes) {
        return -1;
      } else if (b2.likes > b1.likes) {
        return 1;
      } else {
        return 1;
      }
    })
  );
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleUpdateBlog = async (blogId, blogInfo) => {
    try {
      const updatedBlog = await blogService.update(blogId, blogInfo);
      dispatch(updateBlog(updatedBlog));
      dispatch(setNotification({ message: `"${blogInfo.title}" liked` }));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 4000);
    } catch (error) {
      dispatch(
        setNotification({ message: "something went wrong..", type: "error" })
      );
      setTimeout(() => {
        dispatch(removeNotification());
      }, 4000);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await blogService.destroy(blogId);
      dispatch(removeBlog(blogId));
      dispatch(setNotification({ message: "successfully removed" }));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 4000);
    } catch (e) {
      setNotification({ message: "something went wrong..", type: "error" });
      setTimeout(() => {
        dispatch(removeNotification());
      }, 4000);
    }
  };

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdateBlog={handleUpdateBlog}
          handleDeleteBlog={handleDeleteBlog}
          user={user}
        />
      ))}
    </div>
  );
};

export default Blogs;

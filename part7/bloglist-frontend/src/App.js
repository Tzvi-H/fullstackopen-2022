import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Blogs from "./components/Blogs";
import CreateBlogForm from "./components/CreateBlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import {
  setNotification,
  removeNotification,
} from "./reducers/notificationReducer";
import { setBlogs, addBlog } from "./reducers/blogReducer";

const App = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const togglableFormRef = useRef();
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, [dispatch]);

  useEffect(() => {
    const userJson = window.localStorage.getItem("loggedInBlogUser");
    if (userJson) {
      const user = JSON.parse(userJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = (loginInfo) => {
    loginService
      .login(loginInfo)
      .then((user) => {
        setUser(user);
        blogService.setToken(user.token);
        window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user));
        dispatch(
          setNotification({ message: `${user.name} logged in successfully` })
        );
        setTimeout(() => {
          dispatch(removeNotification());
        }, 4000);
      })
      .catch((error) => {
        dispatch(
          setNotification({
            message: "wrong username or password",
            type: "error",
          })
        );
        setTimeout(() => {
          dispatch(removeNotification());
        }, 4000);
      });
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("loggedInBlogUser");
  };

  const handleCreateBlog = (blogInfo) => {
    blogService.create(blogInfo).then((newblog) => {
      dispatch(addBlog(newblog));
      togglableFormRef.current.toggleVisiblity();
      blogFormRef.current.resetForm();
      dispatch(
        setNotification({
          message: `${blogInfo.title} by ${blogInfo.author} added`,
        })
      );
      setTimeout(() => {
        dispatch(removeNotification());
      }, 4000);
    });
  };

  const handleUpdateBlog = async (blogId, blogInfo) => {
    try {
      const updatedBlog = await blogService.update(blogId, blogInfo);
      // setBlogs(blogs.map((b) => (b.id !== blogId ? b : updatedBlog)));
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
      // setBlogs(blogs.filter((b) => b.id !== blogId));
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

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>
        {user.name} logged in<button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={togglableFormRef}>
        <CreateBlogForm handleCreateBlog={handleCreateBlog} ref={blogFormRef} />
      </Togglable>
      <Blogs
        handleUpdateBlog={handleUpdateBlog}
        handleDeleteBlog={handleDeleteBlog}
        user={user}
      />
    </div>
  );
};

export default App;

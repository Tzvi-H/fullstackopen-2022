import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import CreateBlogForm from "./components/CreateBlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import usersService from "./services/users";
import loginService from "./services/login";
import {
  setNotification,
  removeNotification,
} from "./reducers/notificationReducer";
import {
  setBlogs,
  addBlog,
  updateBlog,
  removeBlog,
} from "./reducers/blogReducer";
import { setUser, removeUser } from "./reducers/userReducer";
import { setUsers } from "./reducers/usersReducer";

const App = () => {
  const dispatch = useDispatch();

  const togglableFormRef = useRef();
  const blogFormRef = useRef();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, [dispatch]);

  useEffect(() => {
    usersService.getAll().then((users) => dispatch(setUsers(users)));
  }, [dispatch]);

  useEffect(() => {
    const userJson = window.localStorage.getItem("loggedInBlogUser");
    if (userJson) {
      const user = JSON.parse(userJson);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = (loginInfo) => {
    loginService
      .login(loginInfo)
      .then((user) => {
        dispatch(setUser(user));
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
    dispatch(removeUser());
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
      />
      <Routes>
        <Route path="users" element={<Users />} />
      </Routes>
    </div>
  );
};

export default App;

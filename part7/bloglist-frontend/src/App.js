import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";
import CreateBlogForm from "./components/CreateBlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import usersService from "./services/users";
import { setBlogs } from "./reducers/blogReducer";
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

  const handleLogout = () => {
    dispatch(removeUser());
    blogService.setToken(null);
    window.localStorage.removeItem("loggedInBlogUser");
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>
        {user.username} logged in<button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={togglableFormRef}>
        <CreateBlogForm ref={blogFormRef} togglableFormRef={togglableFormRef} />
      </Togglable>
      <Blogs />
      <Routes>
        <Route path="/users/:id" element={<User />} />
        <Route path="users" element={<Users />} />
        <Route path="blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;

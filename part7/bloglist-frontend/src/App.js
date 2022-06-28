import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Container from "@mui/material/Container";

import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Notification from "./components/Notification";
import Navigation from "./components/Navigation";

import blogService from "./services/blogs";
import usersService from "./services/users";

import { setBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { setUsers } from "./reducers/usersReducer";

const App = () => {
  const dispatch = useDispatch();

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

  if (user === null) {
    return (
      <Container>
        <Notification />
        <LoginForm />
      </Container>
    );
  }

  return (
    <Container>
      <Notification />
      <Navigation />

      <h2>blog app</h2>

      <Routes>
        <Route path="/users/:id" element={<User />} />
        <Route path="users" element={<Users />} />

        <Route path="blogs" element={<Home />} />
        <Route path="blogs/:id" element={<Blog />} />

        <Route path="/" element={<Home />} />
      </Routes>
    </Container>
  );
};

export default App;

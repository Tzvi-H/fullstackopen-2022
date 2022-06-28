import { useState } from "react";
import { useDispatch } from "react-redux";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setUser } from "../reducers/userReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";
import { TextField, Button } from "@mui/material";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginService
      .login({ username, password })
      .then((user) => {
        dispatch(setUser(user));
        blogService.setToken(user.token);
        window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user));
        dispatch(
          setNotification({
            message: `${user.username} logged in successfully`,
          })
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

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="username"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label="password"
            id="password"
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          id="login-button"
        >
          log in
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;

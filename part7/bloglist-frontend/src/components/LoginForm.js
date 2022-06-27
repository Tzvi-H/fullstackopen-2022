import { useState } from "react";
import { useDispatch } from "react-redux";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setUser } from "../reducers/userReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

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
          username
          <input
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <input type="submit" value="log in" id="login-button" />
      </form>
    </div>
  );
};

export default LoginForm;

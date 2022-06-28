import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../reducers/userReducer";
import blogService from "../services/blogs";
import { AppBar, Toolbar, Button } from "@mui/material";

const Navigation = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(removeUser());
    blogService.setToken(null);
    window.localStorage.removeItem("loggedInBlogUser");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/blogs">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          logout
        </Button>
        {user.username} logged in
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;

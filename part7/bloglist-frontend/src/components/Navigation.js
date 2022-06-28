import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../reducers/userReducer";
import blogService from "../services/blogs";

const Navigation = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(removeUser());
    blogService.setToken(null);
    window.localStorage.removeItem("loggedInBlogUser");
  };

  return (
    <div>
      <Link to="/">blogs</Link> <Link to="/users">users</Link> {user.username}{" "}
      logged in <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Navigation;

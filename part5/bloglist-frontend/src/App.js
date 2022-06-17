import { useState, useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import CreateBlogForm from "./components/CreateBlogForm";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userJson = window.localStorage.getItem("loggedInBlogUser");
    if (userJson) {
      const user = JSON.parse(userJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = (loginInfo) => {
    loginService.login(loginInfo).then((user) => {
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user));
    });
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("loggedInBlogUser");
  };

  const handleCreateBlog = (blogInfo) => {
    blogService.create(blogInfo).then((newblog) => {
      setBlogs(blogs.concat(newblog));
      blogFormRef.current.resetForm();
    });
  };

  if (user === null) {
    return <LoginForm handleLogin={handleLogin} />;
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in<button onClick={handleLogout}>logout</button>
      </p>
      <CreateBlogForm handleCreateBlog={handleCreateBlog} ref={blogFormRef} />
      <Blogs blogs={blogs} />
    </div>
  );
};

export default App;

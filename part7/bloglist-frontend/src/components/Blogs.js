import { useSelector } from "react-redux";
import Blog from "./Blog";

const Blogs = ({ handleUpdateBlog, handleDeleteBlog, user }) => {
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

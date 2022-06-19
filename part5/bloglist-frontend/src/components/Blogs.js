import Blog from "./Blog";

const Blogs = ({ blogs, handleUpdateBlog }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleUpdateBlog={handleUpdateBlog} />
      ))}
    </div>
  );
};

export default Blogs;

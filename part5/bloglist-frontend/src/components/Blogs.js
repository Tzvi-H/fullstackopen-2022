import Blog from "./Blog";

const Blogs = ({ blogs, handleUpdateBlog }) => {
  const blogsToShow = blogs.sort((b1, b2) => {
    if (b1.likes > b2.likes) {
      return -1;
    } else if (b2.likes > b1.likes) {
      return 1;
    } else {
      return 1;
    }
  });

  return (
    <div>
      {blogsToShow.map((blog) => (
        <Blog key={blog.id} blog={blog} handleUpdateBlog={handleUpdateBlog} />
      ))}
    </div>
  );
};

export default Blogs;

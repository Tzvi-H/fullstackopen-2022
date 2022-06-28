import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const blogLinkStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blogs = () => {
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

  // const handleDeleteBlog = async (blogId) => {
  //   try {
  //     await blogService.destroy(blogId);
  //     dispatch(removeBlog(blogId));
  //     dispatch(setNotification({ message: "successfully removed" }));
  //     setTimeout(() => {
  //       dispatch(removeNotification());
  //     }, 4000);
  //   } catch (e) {
  //     setNotification({ message: "something went wrong..", type: "error" });
  //     setTimeout(() => {
  //       dispatch(removeNotification());
  //     }, 4000);
  //   }
  // };

  return (
    <div>
      {blogs.map((blog) => (
        <div style={blogLinkStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Blogs;

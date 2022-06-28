import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import blogService from "../services/blogs";
import { updateBlog } from "../reducers/blogReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const Blog = () => {
  const dispatch = useDispatch();

  const blogId = useParams().id;
  const blog = useSelector((state) => state.blogs.find((b) => b.id === blogId));

  if (!blog) {
    return null;
  }

  const handleUpdateBlog = async () => {
    try {
      const updatedBlog = await blogService.update(blogId, {
        title: blog.title,
        url: blog.url,
        author: blog.author,
        likes: blog.likes + 1,
        user: blog.user.id,
      });
      dispatch(updateBlog(updatedBlog));
      dispatch(setNotification({ message: `"${updatedBlog.title}" liked` }));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 4000);
    } catch (error) {
      dispatch(
        setNotification({ message: "something went wrong..", type: "error" })
      );
      setTimeout(() => {
        dispatch(removeNotification());
      }, 4000);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    const comment = e.target.comment.value;
    const updatedBlog = await blogService.createComment(blogId, comment);
    dispatch(updateBlog(updatedBlog));
    dispatch(setNotification({ message: "successfully added comment" }));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 4000);

    e.target.comment.value = "";
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes <button onClick={handleUpdateBlog}>like</button>
        <br />
        added by {blog.author}
      </div>
      <div>
        <h3>comments</h3>
        <form onSubmit={handleSubmitComment}>
          <input name="comment" />
          <input type="submit" value="add comment" />
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// const Blog = ({ blog, user, handleUpdateBlog, handleDeleteBlog }) => {
//   const [showDetails, setShowDetails] = useState(false);

//   const { author, likes, title, url } = blog;

//   const buttonText = showDetails ? "hide" : "view";

//   const handleLikeClick = () => {
//     const updatedBlog = {
//       title,
//       url,
//       author,
//       likes: likes + 1,
//       user: blog.user.id,
//     };
//     handleUpdateBlog(blog.id, updatedBlog);
//   };

//   const handleDeleteClick = () => {
//     if (window.confirm(`Remove blog ${title} by ${author}`)) {
//       handleDeleteBlog(blog.id);
//     }
//   };

//   return (
//     <div style={blogStyle} className="blog">
//       {title} {author}{" "}
//       <button onClick={() => setShowDetails(!showDetails)}>{buttonText}</button>
//       {showDetails && (
//         <div className="blogDetails">
//           {url}
//           <br />
//           likes {likes}
//           <button onClick={handleLikeClick}>like</button>
//           <br />
//           {author}
//           {user && user.username === blog.user.username && (
//             <>
//               <br />
//               <button onClick={handleDeleteClick}>remove</button>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// Blog.propTypes = {
//   blog: PropTypes.object,
// };

export default Blog;

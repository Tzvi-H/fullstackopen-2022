import { useState } from "react";
import PropTypes from "prop-types";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, user, handleUpdateBlog, handleDeleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const { author, likes, title, url } = blog;

  const buttonText = showDetails ? "hide" : "view";

  const handleLikeClick = () => {
    const updatedBlog = {
      title,
      url,
      author,
      likes: likes + 1,
      user: blog.user.id,
    };
    handleUpdateBlog(blog.id, updatedBlog);
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      handleDeleteBlog(blog.id);
    }
  };

  return (
    <div style={blogStyle} className="blog">
      {title} {author}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>{buttonText}</button>
      {showDetails && (
        <div className="blogDetails">
          {url}
          <br />
          likes {likes}
          <button onClick={handleLikeClick}>like</button>
          <br />
          {author}
          {user && user.username === blog.user.username && (
            <>
              <br />
              <button onClick={handleDeleteClick}>remove</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
};

export default Blog;

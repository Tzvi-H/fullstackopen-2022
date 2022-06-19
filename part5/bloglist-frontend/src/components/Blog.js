import { useState } from "react";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, handleUpdateBlog }) => {
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

  return (
    <div style={blogStyle}>
      {title} {author}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>{buttonText}</button>
      {showDetails && (
        <div>
          {url}
          <br />
          likes {likes}
          <button onClick={handleLikeClick}>like</button>
          <br />
          {author}
        </div>
      )}
    </div>
  );
};

export default Blog;

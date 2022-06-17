import { useState } from "react";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const { author, likes, title, url } = blog;

  const buttonText = showDetails ? "hide" : "view";

  return (
    <div style={blogStyle}>
      {title} {author}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>{buttonText}</button>
      {showDetails && (
        <div>
          {url}
          <br />
          likes {likes}
          <br />
          {author}
        </div>
      )}
    </div>
  );
};

export default Blog;

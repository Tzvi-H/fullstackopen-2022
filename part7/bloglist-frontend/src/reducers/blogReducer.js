const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return action.data;
    case "ADD_BLOG":
      return state.concat(action.data);
    case "UPDATE_BLOG":
      return state.map((b) => (b.id !== action.data.id ? b : action.data));
    case "REMOVE_BLOG":
      return state.filter((b) => b.id !== action.data);
    default:
      return state;
  }
};

export const setBlogs = (blogs) => {
  return {
    type: "SET_BLOGS",
    data: blogs,
  };
};

export const addBlog = (blog) => {
  return {
    type: "ADD_BLOG",
    data: blog,
  };
};

export const updateBlog = (blog) => {
  return {
    type: "UPDATE_BLOG",
    data: blog,
  };
};

export const removeBlog = (blogId) => {
  return {
    type: "REMOVE_BLOG",
    data: blogId,
  };
};

export default blogReducer;

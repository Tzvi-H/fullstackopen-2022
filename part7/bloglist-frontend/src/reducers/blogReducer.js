const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return action.data;
    case "ADD_BLOG":
      return state.concat(action.data);
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

export default blogReducer;

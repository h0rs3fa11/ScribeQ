import blogService from "../services/blog";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_BLOG":
      return [...state, action.payload];
    case "UPDATE_ALL":
      return action.payload;
    case "REMOVE_BLOG":
      return state.filter((blog) => blog.id !== action.payload.id);
    default:
      return state;
  }
};

export const createBlog = (blogObj) => async (dispatch) => {
  try{
    const blog = await blogService.createBlog(blogObj);
    dispatch({ type: "NEW_BLOG", payload: blog });
    return blog;
  } catch(err) {
    console.error("Failed to create blog", err);
    throw err;
  }
};

export const updateAll = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch({ type: "UPDATE_ALL", payload: blogs });
};

export const removeBlog = (id) => async (dispatch) => {
  const result = await blogService.deleteOne(id);
  dispatch({ type: "REMOVE_BLOG", payload: { id: id } });
  console.log(result);
};

export default blogReducer;

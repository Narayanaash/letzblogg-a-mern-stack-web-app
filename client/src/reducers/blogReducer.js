import {
  GET_BLOGS,
  ADD_BLOG,
  DELETE_BLOG,
  BLOGS_LOADING,
  BLOG_UPLOADING,
} from "../actions/types";

const initialState = {
  blogs: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
        loading: false,
        uploaded: false,
      };
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog._id !== action.payload),
      };
    case ADD_BLOG:
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
        uploaded: true,
      };
    case BLOGS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case BLOG_UPLOADING:
      return {
        ...state,
        uploading: true,
      };
    default:
      return state;
  }
}

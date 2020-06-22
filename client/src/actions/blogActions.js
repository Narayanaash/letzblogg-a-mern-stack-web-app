import axios from "axios";
import {
  GET_BLOGS,
  ADD_BLOG,
  DELETE_BLOG,
  BLOGS_LOADING,
  BLOG_UPLOADING,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getBlogs = () => (dispatch) => {
  dispatch(setBlogLoading());
  axios
    .get("/api/blogs")
    .then((res) =>
      dispatch({
        type: GET_BLOGS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addBlog = (blog, id) => (dispatch, getState) => {
  dispatch(setBlogUploading());
  if (id) {
    axios
      .put("/api/blogs/" + id, blog, tokenConfig(getState))
      .then((res) =>
        dispatch({
          type: ADD_BLOG,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  } else {
    axios
      .post("/api/blogs", blog, tokenConfig(getState))
      .then((res) =>
        dispatch({
          type: ADD_BLOG,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  }
};

export const deleteBlog = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/blogs/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_BLOG,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setBlogLoading = () => {
  return {
    type: BLOGS_LOADING,
  };
};

export const setBlogUploading = () => {
  return {
    type: BLOG_UPLOADING,
  };
};

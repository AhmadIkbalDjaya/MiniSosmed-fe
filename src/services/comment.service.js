import axios from "axios";
import { headers, apiUrl } from "./api";

export const getPostComment = async (postId) => {
  try {
    const response = await axios.get(`${apiUrl}comment/${postId}`, {
      headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const storeComment = async (postId, data) => {
  try {
    const response = await axios.post(`${apiUrl}comment/${postId}`, data, {
      headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(`${apiUrl}comment/${commentId}`, {
      headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

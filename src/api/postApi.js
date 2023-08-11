import axios from "axios";
import { headers, apiUrl } from "./api";

export const getPostDashboard = async () => {
  const posts = await axios.get(`${apiUrl}dashboard`, {
    headers,
  });
  return posts.data.data;
};

export const getUserPost = async (username) => {
  const posts = await axios.get(`${apiUrl}profile/posts/${username}`, {
    headers,
  });
  return posts.data.data;
};

export const storePost = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}post`, data, {
      headers: headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

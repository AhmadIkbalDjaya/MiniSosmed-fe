import axios from "axios";
import { headers, apiUrl } from "./api";

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

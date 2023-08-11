import axios from "axios";
import { headers, apiUrl } from "./api";

export const getUserProfile = async (username) => {
  const profile = await axios.get(`${apiUrl}profile/${username}`, { headers });
  return profile.data.data;
};

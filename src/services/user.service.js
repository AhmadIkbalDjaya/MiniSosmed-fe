import axios from "axios";
import { headers, apiUrl } from "./api";

export const getUserProfile = async (username) => {
  const profile = await axios.get(`${apiUrl}profile/${username}`, { headers });
  return profile.data.data;
};

export const updateBio = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}profile/updateBio`, data, {
      headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const userFollowers = async (username) => {
  try {
    const response = await axios.get(`${apiUrl}user/followers/${username}`, {
      headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const userFollowing = async (username) => {
  try {
    const response = await axios.get(`${apiUrl}user/following/${username}`, {
      headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const searhUser = async (name) => {
  try {
    const response = await axios.get(`${apiUrl}search?search=${name}`, {
      headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const followUser = async (username) => {
  try {
    const response = await axios.post(
      `${apiUrl}follow/${username}`,
      {},
      {
        headers,
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const friend_suggest = async () => {
  try {
    const response = await axios.get(`${apiUrl}friend_suggest`, {
      headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

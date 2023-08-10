import axios from "axios"
import Cookies from "universal-cookie"

const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${new Cookies().get("Authorization")}`
};

export const getUserProfile = async (username) => {
  const profile = await axios.get(`https://sgso-invitation.com/api/profile/${username}`, {headers})
  return profile.data.data;
}
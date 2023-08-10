import axios from "axios";
import Cookies from "universal-cookie";

const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${new Cookies().get("Authorization")}`
};
export const getPostDashboard = async () => {
  const posts = await axios.get("https://sgso-invitation.com/api/dashboard", {headers});
  return posts.data.data;
};

import axios from "axios";

export const getPostDashboard = async () => {
  const posts = await axios.get("https://sgso-invitation.com/api/dashboard", {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer 12|Y598JrVZVBZTecKL4yvGCp12Cf8aiId1blh6bOej",
    },
  });
  return posts.data.data;
  // if (posts.status == 200) {
    
  // }
  // console.log(posts);
};

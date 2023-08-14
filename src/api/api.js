import Cookies from "universal-cookie";

export const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${new Cookies().get("Authorization")}`,
};

// export const apiUrl = "https://sgso-invitation.com/api/";
export const apiUrl = "http://127.0.0.1:8000/api/";

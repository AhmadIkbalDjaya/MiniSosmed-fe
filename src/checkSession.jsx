import Cookies from "universal-cookie";
import { UseAuth } from "./hooks/useAuth";
import axios from "axios";

export const checkSession = () => {
  const { auth, setAuth } = UseAuth();
  const isAuthSeesion = new Cookies().get("Authorization");
  if (isAuthSeesion) {
    axios
      .get("https://sgso-invitation.com/api/authUser", {
        headers: {
          Authorization: `Bearer ${isAuthSeesion}`,
        },
      })
      .then((response) => {
        setAuth(response.data.data.user);
        console.log(auth);
      });
  }
};

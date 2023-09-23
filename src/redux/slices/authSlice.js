import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token") || null,
    username: localStorage.getItem("username") || null,
    name: localStorage.getItem("name") || null,
    user_id: localStorage.getItem("user_id") || null,
    email: localStorage.getItem("email") || null,
    profil_image: localStorage.getItem("profil_image") || null,
  },
  reducers: {
    setAuth: (state, action) => {
      const { token, user_id, username, name, email, profil_image } =
        action.payload;
      state.status = true;
      state.token = token;
      state.user_id = user_id;
      state.username = username;
      state.name = name;
      state.email = email;
      state.profil_image = profil_image;

      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("username", username);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profil_image", profil_image);
    },
    deleteAuth: (state, action) => {
      state.status = null;
      state.token = null;
      state.user_id = null;
      state.username = null;
      state.name = null;
      state.email = null;
      state.profil_image = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("profil_image");
    },
  },
});

export const { setAuth, deleteAuth } = authSlice.actions;
export default authSlice.reducer;

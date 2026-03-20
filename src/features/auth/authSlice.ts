import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorage";

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  error: string | null;
  signupSuccess:boolean;
}

const initialState: AuthState = {
  user: loadFromLocalStorage("loggedUser"),
  error:null,
  signupSuccess:false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<User>) => {
      const users =
        JSON.parse(localStorage.getItem("registeredUsers") || "[]");

      // check duplicate email
      const exists = users.find(
        (u: User) => u.email === action.payload.email
      );

      if (exists) {
        // alert("User already exists");
        state.error ="User already exists"
        state.signupSuccess = false;
        return;
      } 

      const updatedUsers = [...users, action.payload];

      localStorage.setItem(
        "registeredUsers",
        JSON.stringify(updatedUsers)
      );

      state.error=null;
      state.signupSuccess=true;
    },

    login: (state, action: PayloadAction<User>) => {
      const users =
        JSON.parse(localStorage.getItem("registeredUsers") || "[]");

      const foundUser = users.find(
        (u: User) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );

      if (foundUser) {
        state.user = foundUser;
        state.error = null;
        saveToLocalStorage("loggedUser", foundUser);
      } else {
        // alert("Invalid Credentials");
        state.error="Invalid Credentials";
      }
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem("loggedUser");
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
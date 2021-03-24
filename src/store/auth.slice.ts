import { RootState } from "store/index";
import { AddDispatch } from "./index";
import { AuthForm, bootstrapUser } from "./../context/authContext";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "./../screens/project-list/SearchPanel";

import * as auth from "authProvider";
interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const login = (form: AuthForm) => (dispatch: AddDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)));

export const register = (form: AuthForm) => (dispatch: AddDispatch) =>
  auth.register(form).then((user) => dispatch(setUser(user)));

export const logout = () => (dispatch: AddDispatch) =>
  auth.logout().then(() => dispatch(setUser(null)));

export const bootstrap = () => (dispatch: AddDispatch) =>
  bootstrapUser().then((user) => dispatch(setUser(user)));

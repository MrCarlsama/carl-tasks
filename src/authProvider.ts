// firebase第三方auth服务。

import { User } from "screens/project-list/SearchPanel";

const apiUrl = process.env.REACT_APP_API_URL;
const loaclStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(loaclStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(loaclStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res: Response) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(await res.json());
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res: Response) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(await res.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(loaclStorageKey);

import React, { ReactNode, useCallback, useState } from "react";
import * as auth from "authProvider";
import { User } from "screens/project-list/SearchPanel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/useAsync";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import * as authStore from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";

export interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;

  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

// const AuthContext = React.createContext<
//   | {
//       user: User | null;
//       login: (form: AuthForm) => Promise<void>;
//       register: (form: AuthForm) => Promise<void>;
//       logout: () => Promise<void>;
//     }
//   | undefined
// >(undefined);

// AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    // data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    // setData: setUser,
  } = useAsync<User | null>();

  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  // const login = (form: AuthForm) => auth.login(form).then(setUser);
  // const register = (form: AuthForm) => auth.register(form).then(setUser);
  // const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(dispatch(authStore.bootstrap()));
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    // <AuthContext.Provider
    //   value={{ user, login, register, logout }}
    //   children={children}
    // />
    <div>{children}</div>
  );
};

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(authStore.selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  return {
    user,
    login,
    register,
    logout,
  };
  // const context = React.useContext(AuthContext);

  // if (!context) {
  //   throw new Error("useAuth must be used in AuthProvider");
  // }

  // return context;
};

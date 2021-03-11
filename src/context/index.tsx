import { AuthProvider } from "context/authContext";
import { ReactNode } from "react";

const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProviders;

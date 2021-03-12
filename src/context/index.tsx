import { AuthProvider } from "context/authContext";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;

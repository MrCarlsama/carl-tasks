import { AuthProvider } from "context/authContext";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const AppProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;

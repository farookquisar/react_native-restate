import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";
import { useCurrentUser } from "./queries";
import { Alert } from "react-native";

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

// Configure the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContextContent>{children}</GlobalContextContent>
    </QueryClientProvider>
  );
};

const GlobalContextContent = ({ children }: GlobalProviderProps) => {
  const { 
    data: user, 
    isLoading,
    error,
    refetch,
  } = useCurrentUser();

  // Handle error state
  useEffect(() => {
    if (error) {
      Alert.alert(
        "Error",
        "Failed to fetch user data. Please try again later.",
        [{ text: "OK" }]
      );
    }
  }, [error]);

  const isLogged = !!user;

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        user: user ?? null,
        loading: isLoading,
        error: error instanceof Error ? error : null,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalProvider;

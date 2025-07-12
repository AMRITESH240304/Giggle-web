"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  createAccount,
  login,
  logout,
  getCurrentUser,
  getJWT,
  storeTokenInCookie,
  getTokenFromCookie,
  removeTokenFromCookie,
  updateEmailVerification,
  createEmailVerification,
} from "@/lib/appwrite";
import type { Models } from "appwrite";

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  refreshToken: () => Promise<void>;
  sendVerificationEmail: (url: string) => Promise<void>;
  verifyEmail: (userId: string, secret: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      checkAuth();
    }
  }, [isClient]);

  const checkAuth = async () => {
    try {
      const storedToken = getTokenFromCookie();

      if (storedToken) {
        setToken(storedToken);
      }

      const currentUser = await getCurrentUser();

      if (currentUser) {
        setUser(currentUser);

        if (!storedToken) {
          await refreshToken();
        }
      } else {
        setUser(null);
        setToken(null);
        removeTokenFromCookie();
      }
    } catch (error) {
      setUser(null);
      setToken(null);
      removeTokenFromCookie();
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const jwt = await getJWT();
      if (jwt) {
        setToken(jwt);
        storeTokenInCookie(jwt);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      setToken(null);
      removeTokenFromCookie();
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      await checkAuth();
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logout();
      console.log("logout response", res);
      setUser(null);
      setToken(null);
      removeTokenFromCookie();
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      await createAccount(email, password, name);
      await handleLogin(email, password);
    } catch (error) {
      throw error;
    }
  };

  const handleSendVerificationEmail = async (url: string) => {
    try {
      await createEmailVerification(url);
    } catch (error) {
      throw error;
    }
  };

  const handleVerifyEmail = async (userId: string, secret: string) => {
    try {
      await updateEmailVerification(userId, secret);
      await checkAuth();
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: loading || !isClient,
        token,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
        refreshToken,
        sendVerificationEmail: handleSendVerificationEmail,
        verifyEmail: handleVerifyEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

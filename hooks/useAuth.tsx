"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  createAccount,
  login,
  logout,
  getCurrentUser,
  getJWT,
  getJWTWithExpiry,
  storeTokenInCookie,
  getTokenFromCookie,
  removeTokenFromCookie,
  updateEmailVerification,
  createEmailVerification,
  loginWithGoogle,
  loginWithApple,
  refreshAppwriteToken,
} from "@/lib/appwrite";
import { isTokenExpired } from "@/lib/tokenUtils";
import type { Models } from "appwrite";

// Extend window interface to include our timer
declare global {
  interface Window {
    tokenRefreshTimer?: ReturnType<typeof setTimeout>;
  }
}

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  refreshToken: () => Promise<string | null>;
  sendVerificationEmail: (url: string) => Promise<void>;
  verifyEmail: (userId: string, secret: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    checkAuth();
    
    // Cleanup timer on unmount
    return () => {
      if (typeof window !== 'undefined' && window.tokenRefreshTimer) {
        clearTimeout(window.tokenRefreshTimer);
      }
    };
  }, []);

  const checkAuth = async () => {
    try {
      const storedToken = getTokenFromCookie();

      if (storedToken) {
        // Check if token is expired or about to expire
        if (isTokenExpired(storedToken)) {
          console.log("Token is expired, refreshing...");
          await refreshToken();
        } else {
          setToken(storedToken);
          
          // Calculate and set refresh timer based on existing token
          const tokenData = await getJWTWithExpiry();
          if (tokenData?.refreshTime && typeof window !== 'undefined') {
            scheduleTokenRefresh(tokenData.refreshTime);
          }
        }
      }

      const currentUser = await getCurrentUser();

      if (currentUser) {
        setUser(currentUser);

        // If we have a user but no token, refresh the token
        if (!storedToken) {
          await refreshToken();
        }
      } else {
        setUser(null);
        setToken(null);
        removeTokenFromCookie();
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      setUser(null);
      setToken(null);
      removeTokenFromCookie();
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      // Use the direct token refresh function that handles storing the token in cookies
      const newToken = await refreshAppwriteToken();
      
      if (newToken) {
        setToken(newToken);
        
        // Calculate refresh time based on the new token
        const expiryTime = getJWTWithExpiry().then(data => {
          if (data?.refreshTime) {
            console.log(`Token will refresh in ${Math.round(data.refreshTime / 1000)} seconds`);
            scheduleTokenRefresh(data.refreshTime);
          }
        });
        
        return newToken;
      }
      return null;
    } catch (error) {
      console.error("Error refreshing token:", error);
      setToken(null);
      removeTokenFromCookie();
      return null;
    }
  };
  
  // Schedule token refresh before it expires
  const scheduleTokenRefresh = (refreshTimeMs: number) => {
    if (typeof window === 'undefined') return;
    
    // Clear any existing refresh timers
    if (window.tokenRefreshTimer) {
      clearTimeout(window.tokenRefreshTimer);
    }
    
    // Set new refresh timer - ensure minimum of 10 seconds for safety
    const safeRefreshTime = Math.max(refreshTimeMs, 10000);
    console.log(`Scheduling token refresh in ${Math.round(safeRefreshTime / 1000)} seconds`);
    
    window.tokenRefreshTimer = setTimeout(() => {
      console.log('Refreshing token automatically');
      refreshToken().catch(error => {
        console.error('Failed to refresh token automatically:', error);
        // If auto-refresh fails, try again after 30 seconds
        setTimeout(() => refreshToken(), 30000);
      });
    }, safeRefreshTime);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      await checkAuth();
    } catch (error) {
      throw error;
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Error with Google login:", error);
      throw error;
    }
  };

  const handleLoginWithApple = async () => {
    try {
      await loginWithApple();
    } catch (error) {
      console.error("Error with Apple login:", error);
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
        loading: loading || !isMounted,
        token,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
        refreshToken,
        sendVerificationEmail: handleSendVerificationEmail,
        verifyEmail: handleVerifyEmail,
        loginWithGoogle: handleLoginWithGoogle,
        loginWithApple: handleLoginWithApple,
      }}
    >
      {isMounted ? children : null}
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
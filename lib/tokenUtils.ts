import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  exp: number; // Expiration time
  iat: number; // Issued at time
  nbf?: number; // Not valid before time
  iss?: string; // Issuer
  sub?: string; // Subject (user ID)
}

export const getTokenExpiryTime = (token: string): number | null => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return decoded.exp * 1000; // Convert seconds to milliseconds
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const expiryTime = getTokenExpiryTime(token);
  if (!expiryTime) return true;
  
  // Return true if current time is past expiry time
  return Date.now() >= expiryTime;
};

export const getTimeUntilExpiry = (token: string): number => {
  const expiryTime = getTokenExpiryTime(token);
  if (!expiryTime) return 0;
  
  const timeUntilExpiry = expiryTime - Date.now();
  return Math.max(0, timeUntilExpiry);
};

// Calculate refresh time (e.g., 1 minute before expiry)
export const calculateRefreshTime = (token: string, bufferMs: number = 60000): number => {
  const timeUntilExpiry = getTimeUntilExpiry(token);
  return Math.max(0, timeUntilExpiry - bufferMs);
};

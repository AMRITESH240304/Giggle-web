import { Client, Account, Databases, ID, AppwriteException, OAuthProvider } from "appwrite";
import Cookies from "js-cookie";
import { getTokenExpiryTime, isTokenExpired, calculateRefreshTime } from "./tokenUtils";

export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
  // JWT token expires in 15 minutes (900 seconds) by default in Appwrite
  tokenExpiryBuffer: 60000, // 1 minute buffer before expiry
};

const cookieConfig = {
  expires: 7,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

const client = new Client();
client.setEndpoint(appwriteConfig.endpoint);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);

export const getJWT = async () => {
  try {
    const jwt = await account.createJWT();
    return jwt.jwt;
  } catch (error) {
    console.error("Error creating JWT:", error);
    return null;
  }
};

export const getJWTWithExpiry = async () => {
  try {
    const jwtToken = await getJWT();
    if (!jwtToken) return null;
    
    const expiryTime = getTokenExpiryTime(jwtToken);
    const refreshTime = calculateRefreshTime(jwtToken, appwriteConfig.tokenExpiryBuffer);
    
    return {
      token: jwtToken,
      expiryTime,
      refreshTime,
    };
  } catch (error) {
    console.error("Error creating JWT with expiry:", error);
    return null;
  }
};

export const refreshAppwriteToken = async (): Promise<string | null> => {
  try {
    // Directly call Appwrite API to create a new JWT token
    const jwt = await account.createJWT();
    const token = jwt.jwt;
    
    // Store the fresh token in cookie
    storeTokenInCookie(token);
    
    console.log("Appwrite token refreshed successfully");
    return token;
  } catch (error) {
    console.error("Failed to refresh Appwrite token:", error);
    return null;
  }
};

export const storeTokenInCookie = (token: string) => {
  Cookies.set("auth-token", token, cookieConfig);
};

export const getTokenFromCookie = (): string | undefined => {
  return Cookies.get("auth-token");
};

export const removeTokenFromCookie = () => {
  Cookies.remove("auth-token", { path: "/" });
};

export const createAccount = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const userAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );
    console.log("Account created successfully:", userAccount);
    return userAccount;
  } catch (error) {
    console.error("Error creating account:", error);
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    const jwtData = await getJWTWithExpiry();
    if (jwtData?.token) {
      storeTokenInCookie(jwtData.token);
    }

    return session;
  } catch (error) {
    console.error("Error logging in:", error);
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error logging out:", error);
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const isAuthenticated = async () => {
  try {
    const user = await account.get();
    return !!user;
  } catch (error) {
    return false;
  }
};

export const createEmailVerification = async (url: string) => {
  try {
    const verification = await account.createVerification(url);
    return verification;
  } catch (error) {
    console.error("Error creating email verification:", error);
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const updateEmailVerification = async (userId: string, secret: string) => {
  try {
    const verification = await account.updateVerification(userId, secret);
    return verification;
  } catch (error) {
    console.error("Error updating email verification:", error);
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const saveUserProfile = async (
  userId: string,
  userData: {
    name: string;
    email: string;
    userType: string;
    firstName: string;
    lastName: string;
  }
) => {
  try {
    const document = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      userData
    );
    return document;
  } catch (error) {
    console.error("Error saving user profile:", error);
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const loginWithGoogle = async () => {
  try {
    // update these
    const redirectUrls = {
      success: `${window.location.origin}/dashboard`,
    };

    account.createOAuth2Session(
      OAuthProvider.Google,
      redirectUrls.success,
    );
  } catch (error) {
    console.error("Error with Google OAuth:", error);
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const loginWithApple = async () => {
  try {
    // update these
    const redirectUrls = {
      success: `${window.location.origin}/dashboard`,
    };

    account.createOAuth2Session(
      OAuthProvider.Apple,
      redirectUrls.success,
    );
  } catch (error) {
    console.error("Error with Apple OAuth:", error);
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export default client;
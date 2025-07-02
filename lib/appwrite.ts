import { Client, Account, Databases, ID, AppwriteException } from "appwrite";
import Cookies from "js-cookie";

export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
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

    const jwt = await getJWT();
    if (jwt) {
      storeTokenInCookie(jwt);
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

export default client;

import { Client, Account, Databases, ID } from "appwrite"

export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
}

const client = new Client().setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId)

export const account = new Account(client)
export const databases = new Databases(client)

// Authentication functions
export const authService = {
  // Create account
  async createAccount(email: string, password: string, name: string) {
    try {
      const userAccount = await account.create(ID.unique(), email, password, name)
      console.log("Account created successfully:", userAccount)
      return userAccount
    } catch (error) {
      console.error("Error creating account:", error)
      throw error
    }
  },

  // Login
  async login(email: string, password: string) {
    try {
      // await account.deleteSession('current');
      const session = await account.createEmailPasswordSession(email, password)
      if (typeof window !== "undefined") {
        document.cookie = `appwrite-session=true; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
      }
      return session
    } catch (error) {
      console.error("Error logging in:", error)
      throw error
    }
  },

  // Logout
  async logout() {
    try {
      await account.deleteSession("current")
      if (typeof window !== "undefined") {
        document.cookie = "appwrite-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      }
    } catch (error) {
      console.error("Error logging out:", error)
      throw error
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const user = await account.get()
      return user
    } catch (error) {
      console.error("Error getting current user:", error)
      return null
    }
  },

  async isAuthenticated() {
    try {
      const user = await account.get()
      return !!user
    } catch (error) {
      return false
    }
  },

  // Save user profile to database
  async saveUserProfile(
    userId: string,
    userData: {
      name: string
      email: string
      userType: string
      firstName: string
      lastName: string
    },
  ) {
    try {
      const document = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        userId,
        userData,
      )
      return document
    } catch (error) {
      console.error("Error saving user profile:", error)
      throw error
    }
  },
}

export default client

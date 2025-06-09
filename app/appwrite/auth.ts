// Import necessary Appwrite SDK components and client configuration
import { OAuthProvider, Query } from "appwrite";
import { account, appwriteConfig, databases } from "./client";
import { redirect } from "react-router";

/**
 * Initiates Google OAuth login flow
 * Creates an OAuth2 session with Google as the provider
 * Redirects user to Google's consent screen for authentication
 */
export const loginWithGoogle = async () => {
  try {
    // Create OAuth2 session with Google provider
    // This will redirect the user to Google's authentication page
    account.createOAuth2Session(OAuthProvider.Google);
  } catch (error) {
    console.error("Error during Google login:", error);
  }
};

/**
 * Logs out the current user by deleting their active session
 * Removes the 'current' session from Appwrite
 */
export const logoutUser = async () => {
  try {
    // Delete the current active session
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

/**
 * Retrieves the current authenticated user's data from the database
 * First gets the account info from Appwrite auth, then fetches user details from database
 * Redirects to sign-in page if no user is found
 * @returns User document from database or null if not found
 */
export const getUser = async () => {
  try {
    // Get the currently authenticated user from Appwrite auth
    const user = await account.get();
    
    // If no user is authenticated, redirect to sign-in page
    if (!user) {
      return redirect("/sign-in");
    }
    
    // Query the users collection to get additional user data
    const { documents } = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        // Find user by matching accountId with the authenticated user's ID
        Query.equal("accountId", user.$id),
        // Only select specific fields to optimize the query
        Query.select(["name", "email", "imageUrl", "accountId", "dateJoined"]),
      ]
    );
    
    // Return the first (and should be only) matching user document
    return documents[0] || null;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

/**
 * Fetches the user's profile photo from Google People API
 * Uses the OAuth access token from the current Appwrite session
 * @returns Google profile photo URL or null if not available
 */
export const getGoogleImage = async () => {
  try {
    // Get the current session which contains the OAuth access token
    const session = await account.getSession("current");
    
    // Extract the provider access token (Google's OAuth token)
    const accessToken = session.providerAccessToken;

    // Make authenticated request to Google People API to get profile photos
    const response = await fetch(
      "https://people.googleapis.com/v1/people/me?personFields=photos",
      {
        headers: {
          // Use Bearer token authentication with Google's access token
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Parse the response and extract photo URL
    const data = await response.json();
    
    // Return the first photo URL if available, otherwise null
    return data.photos?.[0]?.url || null;
  } catch (error) {
    console.error("Error fetching Google profile photo:", error);
    return null;
  }
};

/**
 * Stores user data in the database after successful OAuth authentication
 * Creates a new document in the users collection with user information
 * Fetches and includes the user's Google profile photo
 * @returns The created user document or null if failed
 */
export const storeUserData = async () => {
  try {
    // Get the authenticated user's account information
    const user = await account.get();
    
    // Fetch the user's Google profile photo
    const imageUrl = await getGoogleImage();

    // Create a new document in the users collection
    const newUserDocument = await databases.createDocument(
      appwriteConfig.databaseId,           // Database ID from config
      appwriteConfig.userCollectionId,     // Users collection ID from config
      user.$id,                           // Use user ID as document ID
      {
        // User data to store in the database
        accountId: user.$id,               // Reference to Appwrite account
        name: user.name,                   // User's display name from Google
        email: user.email,                 // User's email from Google
        imageUrl: imageUrl,                // Profile photo URL from Google
        dateJoined: new Date().toISOString(), // Current timestamp as join date
      }
    );
    
    // Return the created document for further use
    return newUserDocument;
  } catch (error) {
    console.error("Error storing user data:", error);
    return null;
  }
};

/**
 * Checks if a user already exists in the database
 * Queries the users collection to find an existing user by accountId
 * Used to prevent duplicate user creation during OAuth flow
 * @returns Existing user document or null if not found
 */
export const getExistingUser = async () => {
  try {
    // Get the currently authenticated user's account information
    const user = await account.get();
    
    // Query the users collection to check if user already exists
    const { documents } = await databases.listDocuments(
      appwriteConfig.databaseId,           // Database ID from config
      appwriteConfig.userCollectionId,     // Users collection ID from config
      [
        // Find user by matching accountId with authenticated user's ID
        Query.equal("accountId", user.$id)
      ]
    );
    
    // Return the first matching document or null if no user exists
    return documents[0] || null;
  } catch (error) {
    console.error("Error getting existing user:", error);
    return null;
  }
};

import React, { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import auth from "./firebase";

// Define user info interface
interface UserInfo {
  email: string;
  password: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  createUser: (userInfo: UserInfo) => Promise<any>;
  signInUser: (userInfo: UserInfo) => Promise<any>;
  googleSignIn: () => Promise<any>;
  logOut: () => Promise<void>;
}

// Define props interface for AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Create context with proper typing
export const AuthContext = createContext<AuthContextType | null>(null);

const googleProvider = new GoogleAuthProvider();

// Create user
export const createUser = ({ email, password }: UserInfo) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in user
export const signInUser = ({ email, password }: UserInfo) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
  return signOut(auth);
};

export const googleSignIn = () => {
  return signInWithPopup(auth, googleProvider);
};

// AuthProvider component
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Observe onAuth state change
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Observing Current user: ", currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authValue: AuthContextType = {
    user,
    loading,
    createUser,
    signInUser,
    googleSignIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
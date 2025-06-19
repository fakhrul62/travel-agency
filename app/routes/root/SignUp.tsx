import React, { useEffect, useState } from "react";
import "../../signup.css"; // Remove or comment out global CSS import
import useAuth from "src/hook/useAuth";
import useAxiosPublic from "src/hook/useAxiosPublic";
import { useNavigate } from "react-router";

const SignUp: React.FC = () => {
  const [isRightActive, setIsRightActive] = useState(true);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);

  // Auth and HTTP hooks
  const auth = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  
  // Function to sign up user and upload to MongoDB and Firebase
  const signUpUser = async (name: string, email: string, password: string) => {
    setSignUpLoading(true);
    const photoURL = "https://i.ibb.co/93p5LyKz/avatardefault-92824.webp";
    const role = "user";
    const tripCreated = "0";
    const joinedAt = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    try {
      // Save to Firebase Auth
      if (auth?.createUser) {
        const userCredential = await auth.createUser({ email, password });
        if (userCredential && userCredential.user) {
          // Dynamically import updateProfile to avoid circular deps
          const { updateProfile } = await import("firebase/auth");
          await updateProfile(userCredential.user, {
            displayName: name,
            photoURL,
          });
        }
      }
      // Save to MongoDB
      const res = await axiosPublic.post("/users", {
        name,
        email,
        password,
        photoURL,
        role,
        tripCreated,
        joinedAt,
      });
      console.log("User created:", res.data);
      navigate("/");
    } catch (error: any) {
      console.error("Sign up error:", error.message);
      // Optionally show error to user
    } finally {
      setSignUpLoading(false);
    }
  };

  // Handler for sign up form
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    signUpUser(name, email, password);
    if (e.currentTarget && typeof e.currentTarget.reset === "function") {
      e.currentTarget.reset();
    }
  };

  // Handler for sign in form
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignInLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      if (auth?.signInUser) {
        await auth.signInUser({ email, password });
        setIsRightActive(false); // Switch to sign-in panel and hide signup overlay
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Sign in error:", error.message);
      // Optionally show error to user
    } finally {
      setSignInLoading(false);
      e.currentTarget?.reset();
    }
  };

  // Handler for Google Sign In
  const [time] = useState(new Date());
  const handleGoogleSignIn = () => {
    if (!auth?.googleSignIn) return;
    auth
      .googleSignIn()
      .then((result: any) => {
        axiosPublic
          .post("/users", {
            name: result.user.displayName,
            email: result.user.email,
            password: "123456",
            photoURL: result.user.photoURL,
            role: "user",
            tripCreated: "0",
            joinedAt: time.toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            }),
          })
          .then((res: any) => {
            console.log(res.data);
            navigate("/");
          });
      })
      .catch((error: any) => {
        console.log(error.message);
      });
  };

  return (
    <div className="signup-fullscreen-wrapper">
      <div className={`signup-container ${isRightActive ? "signup-right-panel-active" : ""}`}>
        {/* Sign Up Form */}
        <div className="signup-container__form signup-container--signup">
          <form className="signup-form" onSubmit={handleSignUp}>
            <h2 className="signup-form__title">Sign Up</h2>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="signup-input"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="signup-input"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="signup-input"
            />
            <button className="signup-btn mt-5" type="submit" disabled={signUpLoading}>
              {signUpLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="4" strokeDasharray="60" strokeDashoffset="20"/></svg>
                  Signing Up...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="signup-container__form signup-container--signin">
          <form className="signup-form" onSubmit={handleSignIn}>
            <h2 className="signup-form__title">Sign In</h2>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="signup-input"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="signup-input"
            />
            <button className="signup-btn mt-5" type="submit" disabled={signInLoading}>
              {signInLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="4" strokeDasharray="60" strokeDashoffset="20"/></svg>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
            <button
              type="button"
              className="signup-btn mt-3 flex items-center gap-2 w-full justify-center"
              onClick={handleGoogleSignIn}
            >
              <img
                src="/assets/icons/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Google
            </button>
          </form>
        </div>

        {/* Overlay Panel */}
        <div className="signup-container__overlay">
          <div className="signup-overlay">
            <div className="signup-overlay__panel signup-overlay--left">
              <button className="signup-btn-o" onClick={() => setIsRightActive(false)}>
                Sign In
              </button>
            </div>
            <div className="signup-overlay__panel signup-overlay--right ">
              <button className="signup-btn-o" onClick={() => setIsRightActive(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

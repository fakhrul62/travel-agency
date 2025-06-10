import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import useAuth from "src/hook/useAuth";
import useAxiosPublic from "src/hook/useAxiosPublic";
import { googleSignIn } from "src/provider/AuthProvider";

const SignIn = () => {
  const auth = useAuth();
  // const googleSignIn = auth?.googleSignIn;
  const navigate = useNavigate();
  
  // Check if user is already signed in, redirect to homepage if true
  const { user } = auth || {};
  
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const axiosPublic = useAxiosPublic();
  const handleGoogleSignIn = () => {
    if (!googleSignIn) return;
    
    googleSignIn()
      .then((result) => {
        axiosPublic
          .post("/users", {
            name: result.user.displayName,
            email: result.user.email,
            password: "123456",
            photoURL: result.user.photoURL,
            role: "user",
          })
          .then((res) => {
            console.log(res.data);
            // Redirect to homepage after successful sign-in
            navigate('/');
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <main className="auth">
      <section className="size-full glassmorphism flex-center px-6">
        <div className="sign-in-card">
          <header className="header">
            <Link to="/" className="logo">
              <img src="/assets/icons/logo.svg" alt="Logo" className="size-[30px]" />
            </Link>
            <h1 className="p-28-bold text-dark-100">ToureChol</h1>
          </header>
          <article>
            <h2 className="p-28-semibold text-dark-100 text-center">Start your Travel</h2>
            <p className="p-18-regular text-center text-gray-100 !leading-7">Sign in with Google to manage your travel plans and bookings</p>
          </article>

          
          <button 
            className="btn !h-11 !w-full" 
            onClick={handleGoogleSignIn}
          > 
            <img src="/assets/icons/google.svg" alt="google" className="size-5" />
            Google Sign In
          </button>
        </div>
      </section>
    </main>
  )
}

export default SignIn;
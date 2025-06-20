import React from "react";
import { Helmet } from "react-helmet";
import useAuth from "src/hook/useAuth";
import useUserProfile from "src/hook/useUserProfile";
import "../../signup.css";

const AdminProfile: React.FC = () => {
  const { user } = useAuth();
  const { userProfile, isProfileLoading, error } = useUserProfile();

  if (isProfileLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <img src="/assets/icons/loader.svg" alt="Loading" className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Failed to load profile.</div>;
  }

  if (!userProfile) {
    return <div className="text-center mt-10">No profile data found.</div>;
  }

  return (
    <>
      <Helmet>
        <title>Admin Profile | ToureChol</title>
        <meta name="description" content="View and manage admin profile on ToureChol." />
      </Helmet>
      <div className="w-full h-full">
        <main className="max-w-4xl mx-auto mt-12 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-2xl p-0 flex flex-col md:flex-row items-center gap-0 overflow-hidden border border-blue-100">
          <section className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-600 to-blue-400 text-white p-10 md:w-1/3 w-full h-full">
            <img
              src={userProfile.photoURL || "/assets/images/david.webp"}
              alt={userProfile.name || userProfile.email}
              className="w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover mb-6"
            />
            <h1 className="text-2xl font-bold mb-1">{userProfile.name}</h1>
            <p className="text-base opacity-90">{userProfile.email}</p>
            <span className="mt-3 px-4 py-1 bg-white/20 rounded-full text-sm font-semibold border border-white/30">{userProfile.role}</span>
          </section>
          <section className="flex-1 w-full p-10 flex flex-col gap-4 bg-white">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Profile Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Show password field first if present */}
              {userProfile.password && (
                <div className="bg-blue-50 rounded-lg p-4 shadow-sm flex flex-col">
                  <span className="text-xs text-blue-600 font-semibold mb-1 uppercase tracking-wider">Password</span>
                  <span className="text-base text-gray-800 break-all">{userProfile.password}</span>
                </div>
              )}
              {Object.entries(userProfile).map(([key, value]) => {
                if (["_id", "name", "email", "photoURL", "role", "password"].includes(key)) return null;
                return (
                  <div key={key} className="bg-blue-50 rounded-lg p-4 shadow-sm flex flex-col">
                    <span className="text-xs text-blue-600 font-semibold mb-1 uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                    <span className="text-base text-gray-800 break-all">{String(value)}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default AdminProfile;

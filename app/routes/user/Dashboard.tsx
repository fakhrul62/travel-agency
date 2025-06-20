import React from "react";
import { Helmet } from "react-helmet";
import useUserProfile from "src/hook/useUserProfile";

const UserDashboard: React.FC = () => {
  const { userProfile } = useUserProfile();

  return (
    <>
      <Helmet>
        <title>User Dashboard | ToureChol</title>
        <meta name="description" content="Your personal dashboard for trips and account info." />
      </Helmet>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Welcome, {userProfile?.name || "User"}!</h1>
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Your Trips</h2>
          {/* TODO: Render user's trips here */}
          <p className="text-gray-600">You have {userProfile?.tripCreated || 0} trips created.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Account Info</h2>
          <p><span className="font-semibold">Email:</span> {userProfile?.email}</p>
          <p><span className="font-semibold">Joined:</span> {userProfile?.joinedAt}</p>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;

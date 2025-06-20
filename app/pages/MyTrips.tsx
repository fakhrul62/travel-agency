import React from "react";

const MyTrips: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">My Trips</h1>
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-600">You have no trips yet. Start planning your next adventure!</p>
      </div>
    </div>
  );
};

export default MyTrips;

import React from "react";
import { Helmet } from "react-helmet";

const AiTrip: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>AI Trip | ToureChol</title>
        <meta name="description" content="Plan your next trip with AI on ToureChol." />
      </Helmet>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">AI Trip</h1>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-600">Use our AI to plan your next trip! (Feature coming soon)</p>
        </div>
      </div>
    </>
  );
};

export default AiTrip;

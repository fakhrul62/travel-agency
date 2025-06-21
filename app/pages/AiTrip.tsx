import React from "react";
import { Helmet } from "react-helmet";

const AiTrip: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>AI Trip | ToureChol</title>
        <meta name="description" content="Plan your next trip with AI on ToureChol." />
      </Helmet>
      <div className="p-3 sm:p-4 md:p-6 w-full max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#106de6]" style={{ fontFamily: 'League Gothic, Impact, Arial Narrow, Arial, sans-serif' }}>AI Trip</h1>
        <div className="bg-white rounded-xl shadow p-4 md:p-6">
          <p className="text-gray-600 text-base md:text-lg">Use our AI to plan your next trip! (Feature coming soon)</p>
        </div>
      </div>
    </>
  );
};

export default AiTrip;

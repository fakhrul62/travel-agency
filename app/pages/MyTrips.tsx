import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import useUserProfile from "src/hook/useUserProfile";
import { getAllTrips } from "app/routes/api/Trip";
import UserTripCard from "components/UserTripCard";


const MyTrips: React.FC = () => {
  const { userProfile, isProfileLoading } = useUserProfile();
  const { data, isLoading } = useQuery({
    queryKey: ["allTrips"],
    queryFn: getAllTrips,
  });

  const trips = React.useMemo(() => {
    if (!userProfile || !data?.allTrips) return [];
    return data.allTrips.filter((trip: any) => trip.userId === userProfile.email);
  }, [userProfile, data]);

  return (
    <>
      <Helmet>
        <title>My Trips | ToureChol</title>
        <meta name="description" content="View and manage your trips on ToureChol." />
      </Helmet>
      <div className="p-0 md:p-8 bg-white min-h-screen">
        <h1
          className="text-4xl text-[#222] mb-2"
          style={{ fontFamily: 'League Gothic, Impact, Arial Narrow, Arial, sans-serif', letterSpacing: '0.01em' }}
        >
          My Trips
        </h1>
        <p className="text-lg font-medium mb-8" style={{ color: '#444' }}>Trips created by you</p>
        {isProfileLoading || isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <img src="/assets/icons/loader.svg" alt="Loading" className="w-10 h-10 animate-spin" />
          </div>
        ) : trips.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 border border-[#eee] text-center">
            <p className="text-[#888]">You have no trips yet. Start planning your next adventure!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trips.map((trip: any) => (
              <UserTripCard
                key={trip._id || trip.id || trip.name}
                id={trip._id || trip.id}
                name={trip.name}
                imageUrls={trip.imageUrls?.[0] || "/assets/images/sample.jpeg"}
                location={trip.itinerary?.[0]?.location || trip.country || ""}
                tags={[trip.interests, trip.travelStyle].filter(Boolean)}
                travelStyle={trip.travelStyle}
                estimatedPrice={trip.estimatedPrice}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyTrips;

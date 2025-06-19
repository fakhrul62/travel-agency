import { Header, TripCard } from "components";
import { Link, type LoaderFunctionArgs } from "react-router";
import { getAllTrips, getTripById } from "../api/Trip";
import type { Route } from "./+types/Trips";
import { allTrips } from '../../constants/index';
import gsap from "gsap";
import { useEffect, useRef } from "react";

export const loader = async () => {


  const [allTripsResult] = await Promise.all([

    getAllTrips()
  ]);
  const { allTrips } = allTripsResult;
  return { allTrips };
};
const Trips = ({ loaderData }: Route.ComponentProps) => {
  const allTrips: Trip[] = Array.isArray(loaderData?.allTrips)
    ? loaderData.allTrips
    : [];
  const mainRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, []);
  return (
    <main className="wrapper">
      <Header
        title={`All Trips`}
        subtitle={`Manage Created Trips`}
        ctaText="Create Trip"
        ctaLink={`/trips/create`}
      />
      <section className="py-6">
        <div className="trip-grid">
          {allTrips.map((trip) => (
            <div  key={trip._id} className="trip-card">
              <TripCard
                travelStyle={trip.travelStyle}
                id={trip._id}
                name={trip.name}
                location={trip.itinerary?.[0].location ?? ""}
                imageUrls={trip.imageUrls[0]}
                tags={[trip.interests, trip.travelStyle]}
                estimatedPrice={trip.estimatedPrice}
              />
            </div>
          ))}
        </div>
      </section>
      
    </main>
  );
};

export default Trips;

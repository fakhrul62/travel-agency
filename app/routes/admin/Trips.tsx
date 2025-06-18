import { Header, TripCard } from "components";
import { Link, type LoaderFunctionArgs } from "react-router";
import { getAllTrips, getTripById } from "../api/Trip";
import type { Route } from "./+types/Trips";
import { allTrips } from '../../constants/index';

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
            <Link to={`/trips/${trip._id}`} key={trip.id} className="trip-card">
              <TripCard
                id={trip._id}
                name={trip.name}
                location={trip.itinerary?.[0].location ?? ""}
                imageUrls={trip.imageUrls[0]}
                tags={[trip.interests, trip.travelStyle]}
                estimatedPrice={trip.estimatedPrice}
              />
            </Link>
          ))}
        </div>
      </section>
      
    </main>
  );
};

export default Trips;

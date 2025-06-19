import gsap from "gsap";
import { Link, type LoaderFunctionArgs } from "react-router";
import { getAllTrips, getTripById } from "../api/Trip";
import type { Route } from "./+types/TripDetails";
import { cn, parseTripData } from "~/lib/utils";
import { Header, InfoPill, TripCard } from "components";
import { useEffect, useRef } from "react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { tripId } = params;

  if (!tripId) {
    throw new Error("Trip ID is required");
  }

  const [tripResult, allTripsResult] = await Promise.all([
    getTripById(tripId),
    getAllTrips(),
  ]);
  const { trip } = tripResult;
  const { allTrips } = allTripsResult;
  return { trip, allTrips };
};

const TripDetails = ({ loaderData }: Route.ComponentProps) => {
  const tripData: Trip | null = loaderData?.trip
    ? (loaderData.trip as Trip)
    : null;
  const allTrips: Trip[] = Array.isArray(loaderData?.allTrips)
    ? loaderData.allTrips
    : [];
  const {
    name,
    duration,
    itinerary,
    travelStyle,
    groupType,
    budget,
    interests,
    estimatedPrice,
    description,
    bestTimeToVisit,
    weatherInfo,
    country,
    imageUrls,
  } = tripData || {};

  const visitTimeAndWeatherTime = [
    { title: "Best Time to Visit: ", items: bestTimeToVisit },
    { title: "Weather Info: ", items: weatherInfo },
  ];

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
    <main className="travel-detail wrapper">
      <Header
        title="Trip Details"
        subtitle="View and Edit AI-Genretaed travel plans"
      ></Header>

      <section className="container wrapper-md">
        <header>
          <h1 className="p-40-semibold text-dark-100">{name}</h1>
          <div className="flex items-center gap-5">
            <InfoPill
              text={`${duration} Day Plan`}
              image="/assets/icons/calendar.svg"
            ></InfoPill>
            <InfoPill
              text={`${
                itinerary
                  ?.slice(0, 4)
                  .map((item) => item.location)
                  .join(", ") || ""
              }`}
              image="/assets/icons/location-mark.svg"
            ></InfoPill>
          </div>
        </header>
        <section className="gallery">
          {imageUrls?.map((url: string, i: number) => (
            <img
              src={url}
              key={i}
              className={cn(
                "w-full rounded-xl border border-white object-cover",
                i === 0
                  ? "md:col-span-2 md:row-span-2 h-[330px]"
                  : "md:row-span-1 h-[150px]"
              )}
              alt=""
            />
          ))}
        </section>
        <section className="flex gap-3 md:gap-5 items-center flex-wrap">
          <div className="bg-blue-200 text-blue-600 badge px-3 mr-2 travel-chip ">
            {travelStyle}
          </div>
          <div className="bg-pink-200 text-pink-600 badge px-3 mr-2 travel-chip ">
            {groupType}
          </div>
          <div className="bg-zinc-200 text-zinc-600 badge px-3 mr-2 travel-chip">
            {budget}
          </div>
          <div className="bg-emerald-100 text-emerald-600 badge px-3 mr-2 travel-chip">
            {interests}
          </div>
          <ul className=" flex gap-1 items-center">
            {Array(5)
              .fill("null")
              .map((_, i) => (
                <li key={i}>
                  <img
                    src="/assets/icons/star.svg"
                    alt="star"
                    className="size-[18px]"
                  />
                </li>
              ))}
            <li className="ml-1">
              <div className="bg-yellow-100 text-yellow-600 badge px-3 mr-2 travel-chip ">
                4.9/5
              </div>
            </li>
          </ul>
        </section>
        <section className="title">
          <article>
            <h3 className="!text-xl md:!text-3xl !text-dark-100 !font-semibold">
              {duration}-Day {country} {travelStyle} Trip
            </h3>
            <p className="!text-base md:!text-2xl !text-gray-100 !font-normal">
              {budget}, {groupType} and {interests}
            </p>
          </article>
          <h2 className="!text-sm md:!text-xl !font-normal !text-dark-100">
            {estimatedPrice}
          </h2>
        </section>
        <p className="text-sm md:text-lg font-normal text-dark-400">
          {description}
        </p>
        <ul className="itinerary">
          {itinerary?.map((day, index) => (
            <li key={index}>
              <h3>
                Day {day.day}: {day.location}
              </h3>
              <ul className="">
                {day.activities.map((activity, index) => (
                  <li key={index}>
                    <span className="flex-shrink-0 p-18-semibold">
                      {activity.time}
                    </span>
                    <p className="flex-grow">{activity.description}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        {visitTimeAndWeatherTime.map((section, index) => (
          <section key={index} className="visit">
            <div>
              <h3>{section.title}</h3>
              <ul>
                {section.items?.map((item) => (
                  <li key={item}>
                    <p className="flex-grow">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </section>
      <section className="flex flex-col gap-6">
        <h2 className="p-24-semibold text-dark-400">Popular Trips</h2>
        <div className="trip-grid">
          {allTrips.slice(0, 3).map((trip) => (
            <div key={trip._id} className="trip-card">
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

export default TripDetails;

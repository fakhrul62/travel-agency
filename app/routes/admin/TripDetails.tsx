import type { LoaderFunctionArgs } from "react-router";
import { getTripById } from "../api/Trip";
import type { Route } from "./+types/TripDetails";
import { cn, parseTripData } from "~/lib/utils";
import { Header, InfoPill } from "components";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { tripId } = params;

  if (!tripId) {
    throw new Error("Trip ID is required");
  }

  const { trip } = await getTripById(tripId);
  return trip;
};

const TripDetails = ({ loaderData }: Route.ComponentProps) => {
  const tripData: Trip | null = loaderData ? (loaderData as Trip) : null;
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
                  ?.slice(0, 2)
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
                <h3 className="!text-xl md:!text-3xl !text-dark-100 !font-semibold">{duration}-Day {country} {travelStyle} Trip</h3>
                <p className="!text-base md:!text-2xl !text-gray-100 !font-normal">{budget}, {groupType} and {interests}</p>
              </article>
              <h2 className="!text-sm md:!text-xl !font-normal !text-dark-100">{estimatedPrice}</h2>
        </section>
      </section>
    </main>
  );
};

export default TripDetails;

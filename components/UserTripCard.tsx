import React, { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router";
import { cn } from "~/lib/utils";

const UserTripCard = ({
  id,
  name,
  imageUrls,
  location,
  tags,
  estimatedPrice,
}: TripCardProps) => {
  const path = useLocation();
  const [taken, setTaken] = useState(false);

  return (
    <RouterLink
      to={
        path.pathname === "/" || path.pathname.startsWith("/travel")
          ? `/travel/${id}`
          : `/trip/${id}`
      }
      className="trip-card bg-white rounded-xl shadow flex flex-col overflow-hidden p-0 w-full max-w-full min-w-0 transition hover:shadow-lg focus:outline-none"
    >
      <img
        src={imageUrls}
        alt={name}
        className="w-full h-40 sm:h-48 md:h-56 object-cover object-center"
      />
      <article className="px-4 pt-4">
        <h2
          className="text-lg md:text-xl font-semibold mb-1 truncate"
          style={{
            fontFamily:
              "League Gothic, Impact, Arial Narrow, Arial, sans-serif",
          }}
        >
          {name}
        </h2>
        <figure className="flex items-center gap-1 text-sm text-gray-500 mb-2">
          <img
            src="/assets/icons/location-mark.svg"
            alt="location"
            className="w-4 h-4"
          />
          <figcaption className="truncate max-w-[80%]">{location}</figcaption>
        </figure>
      </article>
      <article className="tripCard-pill absolute top-3 right-3 bg-[#222] text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full shadow">
        {estimatedPrice}
      </article>
      <div className="flex flex-col sm:flex-row gap-2 mt-4 px-4 pb-2">
        <button
          type="button"
          className={cn(
            "flex-1 px-3 py-1 rounded text-xs font-semibold transition-colors",
            taken
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-[#222] text-white hover:bg-[#444]"
          )}
          onClick={e => {
            e.preventDefault();
            setTaken(t => !t);
          }}
        >
          {taken ? "Marked as Taken" : "Mark as Taken"}
        </button>
        <RouterLink
          to={
            path.pathname === "/" || path.pathname.startsWith("/travel")
              ? `/travel/${id}`
              : `/trip/${id}`
          }
          className="flex-1 px-3 py-1 rounded bg-[#eee] text-[#222] text-xs font-semibold hover:bg-[#ccc] transition-colors text-center flex items-center justify-center"
          onClick={e => e.stopPropagation()}
        >
          View Trip
        </RouterLink>
        <button
          type="button"
          className="flex-1 px-3 py-2 rounded bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200 transition-colors"
          // onClick={handleDelete}
          onClick={e => e.preventDefault()}
        >
          Delete
        </button>
      </div>
    </RouterLink>
  );
};

export default UserTripCard;

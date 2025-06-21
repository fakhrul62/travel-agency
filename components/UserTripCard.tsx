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
      className="trip-card"
    >
      <img src={imageUrls} alt={name} />
      <article>
        <h2>{name}</h2>
        <figure>
          <img
            src="/assets/icons/location-mark.svg"
            alt="location"
            className="size-4"
          />
          <figcaption>{location}</figcaption>
        </figure>
      </article>
      <article className="tripCard-pill">{estimatedPrice}</article>
      <div className="flex gap-2 mt-4 px-4 pb-2">
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

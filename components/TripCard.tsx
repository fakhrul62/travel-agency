import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utils";

const TripCard = ({
  id,
  name,
  imageUrls,
  location,
  tags,
  estimatedPrice,
}: TripCardProps) => {
  const path = useLocation();
  return (
    <Link
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
      <div className="flex flex-wrap gap-2 mt-2 px-4 pb-4">
        {tags?.map((tag, idx) => (
          <div
            key={idx}
            className={cn(
              idx === 1 ? "badge-info" : "badge-secondary",
              "badge px-3 text-xs md:text-sm py-1 rounded-full bg-blue-600 text-white"
            )}
          >
            {tag}
          </div>
        ))}
      </div>
      <article className="tripCard-pill absolute top-3 right-3 bg-[#222] text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full shadow">
        {estimatedPrice}
      </article>
    </Link>
  );
};

export default TripCard;

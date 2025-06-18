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
          : `/all-trips/${id}`
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
      <div className="mt-5 pl-[18px] pr-3.5 pb-5">
        {tags?.map((tag, idx) => (
          <div
            key={idx}
            className={cn(
              idx === 1 ? "badge-info" : "badge-secondary",
              "badge px-3 mr-2 text-white"
            )}
          >
            {tag}
          </div>
        ))}
      </div>
      <article className="tripCard-pill">
        {estimatedPrice}
      </article>
    </Link>
  );
};

export default TripCard;

import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utils";

interface Props {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
}
const Header = ({ title, subtitle, ctaText, ctaLink }: Props) => {
  const location = useLocation();

  return (
    <header className="header">
      <article>
        <h1
          className={cn(
            "text-dark-100",
            location.pathname === "/dashboard"
              ? "text-xl md:text-3xl font-bold"
              : "text-lg md:text-xl font-semibold"
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "text-gray-100 font-normal",
            location.pathname === "/dashboard"
              ? "text-base md:text-lg"
              : "text-sm md:text-lg"
          )}
        >
          {subtitle}
        </p>
      </article>
      {ctaText && ctaLink && (
        <Link to={ctaLink}>
          <button className="btn !h-11 !w-full md:!w-[240px]">
            <img src="/assets/icons/plus.svg" alt="plus" className="size-5" /> <span>{ctaText}</span>
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;

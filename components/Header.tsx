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
    <header className="header w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0 px-2 sm:px-4 md:px-0 py-2 md:py-0">
      <article>
        <h1
          className={cn(
            "text-dark-100 font-league uppercase text-lg sm:text-xl md:text-4xl",
            location.pathname === "/dashboard"
              ? "text-xl sm:text-2xl md:text-4xl"
              : "text-lg sm:text-xl md:text-3xl"
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "text-gray-100 font-normal text-sm sm:text-base md:text-lg",
            location.pathname === "/dashboard"
              ? "text-base sm:text-lg md:text-lg"
              : "text-sm sm:text-base md:text-lg"
          )}
        >
          {subtitle}
        </p>
      </article>
      {ctaText && ctaLink && (
        <Link to={ctaLink} className="w-full md:w-auto mt-2 md:mt-0">
          <button className="btn !h-11 !w-full md:!w-[240px] flex items-center justify-center gap-2">
            <img src="/assets/icons/plus.svg" alt="plus" className="size-5" />{" "}
            <span>{ctaText}</span>
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;

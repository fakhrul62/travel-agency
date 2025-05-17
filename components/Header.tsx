import { useLocation } from "react-router";
import { cn } from "~/lib/utils";

interface Props {
  title: string;
  subtitle: string;
}
const Header = ({title, subtitle} : Props) => {

  const location = useLocation();
  
  return (
    <header>
      <article>
        <h1 className={cn("text-dark-100", 
          location.pathname === "/dashboard" ? "text-xl md:text-3xl font-bold" : "text-lg md:text-xl font-semibold",
        )}>{title}</h1>
        <p className={cn("text-gray-100 font-normal", 
          location.pathname === "/dashboard" ? "text-base md:text-lg" : "text-sm md:text-lg",
        )}>{subtitle}</p>
      </article>
    </header>
  )
}

export default Header
import { Link, NavLink } from "react-router";
import { sidebarItems } from "~/constants";
import { cn } from "~/lib/utils";

const NavItems = () => {

  const user = {
    name: "Fakhrul Alam",
    image: "/assets/images/david.webp",
    email: "david@tourechol.com"
  }

  return (
    <section className="nav-items">
      <Link to="/" className="link-logo">
        <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
        <h1>ToureChol</h1>
      </Link>
      <div className="container">
        <nav>
          {sidebarItems.map(({ href, id, label, icon }) => (
            <NavLink to={href} key={id}>
              {({ isActive }: { isActive: boolean }) => (
                <div className={cn('group nav-item', {'bg-primary-100 !text-white': isActive})}>
                  <img src={icon} alt={label} className={`brightness-0 size-5 group-hover:invert ${isActive ? 'brightness-0 invert' : 'text-dark-200'}`} />
                  {label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
        <footer className="nav-footer">
          <img src={user? user.image : '/assets/images/david.webp'} alt={user? user.name : 'John Doe'} />
          <article>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </article>
          <button onClick={() => {console.log("Log Out")}} className="cursor-pointer">
            <img src="/assets/icons/logout.svg" alt="logout" className="size-5" />
          </button>
        </footer>
      </div>
    </section>
  );
};

export default NavItems;

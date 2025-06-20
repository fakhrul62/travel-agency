import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "src/hook/useAuth";
import { logOut } from "src/provider/AuthProvider";
import { adminSidebarItems, userSidebarItems } from "app/constants/sidebarItems";
import useUserProfile from "src/hook/useUserProfile";
import { cn } from "~/lib/utils";

const NavItems = () => {
  const { user } = useAuth();
  const { userProfile } = useUserProfile();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    await logOut();
    navigate("/sign-up");
  };

  // Determine sidebar items and correct dashboard url based on user role
  type SidebarItem = { href: string; id: number; label: string; icon: string };
  let sidebar: SidebarItem[] = [];
  if (userProfile?.role === "admin") {
    sidebar = adminSidebarItems;
  } else if (userProfile?.role === "user") {
    // Patch dashboard link for user
    sidebar = userSidebarItems.map((item) =>
      item.label === "Dashboard" ? { ...item, href: "/user-dashboard" } : item
    );
  }

  return (
    <section className="nav-items">
      <Link to="/" className="link-logo">
        <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
        <h1>ToureChol</h1>
      </Link>
      <div className="container">
        <nav>
          {sidebar.map(({ href, id, label, icon }) => (
            <NavLink to={href} key={id}>
              {({ isActive }: { isActive: boolean }) => (
                <div
                  className={cn("group nav-item", {
                    "bg-primary-100 !text-white": isActive,
                  })}
                >
                  <img
                    src={icon}
                    alt={label}
                    className={`brightness-0 size-5 group-hover:invert ${
                      isActive ? "brightness-0 invert" : "text-dark-200"
                    }`}
                  />
                  {label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
        <footer className="nav-footer">
          <Link to="/profile" className="flex items-center gap-2">
            <img
              className="border border-zinc-300"
              src={(user && user.photoURL) || "/assets/images/david.webp"}
              alt={(user && user.displayName) || "John Doe"}
              referrerPolicy="no-referrer"
            />
            <article>
              <h2>{user?.displayName}</h2>
              <p>{user?.email}</p>
            </article>
          </Link>
          <button onClick={handleLogOut} className="cursor-pointer">
            <img
              src="/assets/icons/logout.svg"
              alt="logout"
              className="size-5"
            />
          </button>
        </footer>
      </div>
    </section>
  );
};

export default NavItems;

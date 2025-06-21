import React, { useEffect, useRef } from "react";
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
  const navRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    <section className="nav-items bg-[#222] border-r border-[#222] min-h-screen">
      <Link to="/" className="link-logo flex items-center gap-2 mb-6">
        <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
        <h1 className="text-2xl font-bold text-white" >ToureChol</h1>
      </Link>
      <div className="container">
        <nav className="flex flex-col gap-2">
          {sidebar.map(({ href, id, label, icon }, idx) => (
            <NavLink to={href} key={id} end>
              {({ isActive }: { isActive: boolean }) => (
                <div
                  ref={el => { navRefs.current[idx] = el; }}
                  className={cn(
                    "group nav-item flex items-center gap-3 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer",
                    isActive ? "bg-white text-[#111] shadow" : "hover:bg-[#222] text-white"
                  )}
                  style={{ fontFamily: 'Inter, Arial, sans-serif', color: isActive ? '#111' : '#fff', background: isActive ? '#fff' : 'transparent', letterSpacing: '0.04em' }}
                >
                  <img
                    src={icon}
                    alt={label}
                    className={`size-5 ${isActive ? "brightness-0" : "invert"}`}
                    style={{ opacity: 1 }}
                  />
                  <span>{label}</span>
                </div>
              )}
            </NavLink>
          ))}
        </nav>
        <footer className="nav-footer mt-8 border-t border-[#222] pt-4 flex items-center gap-2">
          <Link to={userProfile?.role === "admin" ? "/admin/profile" : "/user/profile"} className="flex items-center gap-2">
            <img
              className="border border-[#222] rounded-full w-8 h-8 object-cover"
              src={(user && user.photoURL) || "/assets/images/david.webp"}
              alt={(user && user.displayName) || "John Doe"}
              referrerPolicy="no-referrer"
            />
            <article className="text-xs font-semibold" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
              <h2 className="text-white">{user?.displayName}</h2>
              <p className="text-[#aaa]">{user?.email}</p>
            </article>
          </Link>
          <button onClick={handleLogOut} className="ml-auto cursor-pointer p-2 rounded-full hover:bg-[#222] transition-colors">
            <img
              src="/assets/icons/logout.svg"
              alt="logout"
              className="size-5 invert"
            />
          </button>
        </footer>
      </div>
    </section>
  );
};

export default NavItems;

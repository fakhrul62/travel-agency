import { Outlet, redirect } from "react-router";
import { styled } from "@mui/material/styles";
import { Drawer as MuiDrawer } from "@mui/material";
import { MobileSidebar, NavItems } from "components";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const drawerWidth = 270;

const AdminLayout = () => {
  const layoutRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (layoutRef.current) {
      gsap.fromTo(
        layoutRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  const Drawer = styled(MuiDrawer)(({ theme }) => ({
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
    },
  }));

  return (
    <div
      className="admin-layout "
      ref={layoutRef}
    >
      <MobileSidebar />
      <aside className="w-full max-w-[270px] hidden lg:block">
        <Drawer variant="permanent" anchor="left">
          <NavItems />
        </Drawer>
      </aside>
      <aside className="children flex-1 p-6  overflow-auto">
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
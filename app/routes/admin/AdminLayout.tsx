import { Outlet, redirect } from "react-router";
import { styled } from "@mui/material/styles";
import { Drawer as MuiDrawer } from "@mui/material";
import { MobileSidebar, NavItems } from "components";

const drawerWidth = 270;



const AdminLayout = () => {
  const Drawer = styled(MuiDrawer)(({ theme }) => ({
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
    },
  }));

  return (
    <div className="admin-layout">
      <MobileSidebar />
      <aside className="w-full max-w-[270px] hidden lg:block">
        <Drawer variant="permanent" anchor="left">
          <NavItems />
        </Drawer>
      </aside>
      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
import React from "react";
import { Outlet } from "react-router";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Drawer as MuiDrawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import { NavItems } from "components";
const drawerWidth = 270;
const AdminLayout = () => {
  // You can drop the styled wrapper if you don't need collapse/expand behavior
  const Drawer = styled(MuiDrawer)(({ theme }) => ({
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
    },
  }));
  return (
    <div className="admin-layout">
      MobileSidebar
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

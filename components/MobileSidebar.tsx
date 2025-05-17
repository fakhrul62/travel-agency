import React from "react";
import { Link } from "react-router";
import Drawer from "@mui/material/Drawer";
import NavItems from "./NavItems";

const drawerWidth = 270;

const MobileSidebar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen((prev) => !prev);

  return (
    <div className="mobile-sidebar wrapper">
      <header className="flex items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/assets/icons/logo.svg" alt="logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold">ToureChol</h1>
        </Link>

        <button onClick={toggle} className="h-7 w-7">
          <img src="/assets/icons/menu.svg" alt="menu" />
        </button>
      </header>

      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={toggle}
        ModalProps={{ keepMounted: true }}
      >
        <NavItems />
      </Drawer>
    </div>
  );
};

export default MobileSidebar;

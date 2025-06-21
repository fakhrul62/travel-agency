import React from "react";
import { Link } from "react-router";
import Drawer from "@mui/material/Drawer";
import NavItems from "./NavItems";

const drawerWidth = 270;

const MobileSidebar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen((prev) => !prev);

  return (
    <div className="mobile-sidebar wrapper w-full">
      <header className="flex items-center justify-between px-3 sm:px-4 md:p-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
          />
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
            ToureChol
          </h1>
        </Link>

        <button
          onClick={toggle}
          className="h-8 w-8 sm:h-9 sm:w-9 md:h-7 md:w-7 flex items-center justify-center rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <img
            src="/assets/icons/menu.svg"
            alt="menu"
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
        </button>
      </header>

      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={toggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: drawerWidth,
            maxWidth: "100vw",
          },
        }}
      >
        <NavItems />
      </Drawer>
    </div>
  );
};

export default MobileSidebar;

import { Outlet } from "react-router";
import { MobileSidebar, NavItems } from "components";

const UserLayout = () => {
  return (
    <div className="admin-layout">
      <MobileSidebar />
      <aside className="w-full max-w-[270px] hidden lg:block">
        <div className="h-full bg-white border-r border-blue-100">
          <NavItems />
        </div>
      </aside>
      <aside className="children flex-1 p-6 overflow-auto">
        <Outlet />
      </aside>
    </div>
  );
};

export default UserLayout;

import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="py-2 mx-auto px-4 max-w-2xl">
      <Outlet />
    </div>
  );
}

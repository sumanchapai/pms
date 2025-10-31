import { Outlet } from "react-router";
import type { Route } from "./+types/layout";

export function loader() {
  const title = import.meta.env.VITE_TITLE as string | undefined; // or process.env.REACT_APP_API_URL
  return { title };
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  return (
    <div className="py-2 mx-auto px-4 max-w-7xl">
      <title>{loaderData?.title}</title>
      <Outlet />
    </div>
  );
}

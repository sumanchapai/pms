import { Link, Outlet } from "react-router";

export default function InnerLayout() {
  return (
    <>
      <Link to="../" className="hover:underline mt-4 inline-block">
        &larr; Back
      </Link>
      <div className="mt-4" />
      <Outlet />
    </>
  );
}

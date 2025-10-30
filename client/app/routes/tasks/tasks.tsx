import Tasks from "~/components/tasks";
import type { Route } from "./+types/tasks";
import { Outlet } from "react-router";
import { APIS } from "~/lib/apis";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Home | TODO App" },
    { name: "description", content: "Todo App" },
  ];
}

export interface TODO {
  id: string;
  status: string;
  task: string;
}

export async function loader() {
  const todos = fetch(APIS.TODOS).then((x) => x.json());
  return todos as Promise<TODO[]>;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Tasks data={loaderData} />
      <Outlet />
    </>
  );
}

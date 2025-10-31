import { Link } from "react-router";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Route } from "./+types/home";

export function loader() {
  const title = import.meta.env.VITE_TITLE as string | undefined; // or process.env.REACT_APP_API_URL
  const dataServer = import.meta.env.VITE_DATA_SERVER_URL as string | undefined; // or process.env.REACT_APP_API_URL
  return { title: title, dataServer };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="mt-8">
      <h1 className="text-3xl font-medium">{loaderData.title}</h1>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-16">
        <Link to="/analytics">
          {" "}
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Note montly analytics.</CardDescription>
            </CardHeader>
          </Card>{" "}
        </Link>
        <Link to={loaderData.dataServer || "/"}>
          <Card>
            <CardHeader>
              <CardTitle>Data Server</CardTitle>
              <CardDescription>Commit and Backup your Changes</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>Other Features</CardTitle>
            <CardDescription>Coming Soon...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

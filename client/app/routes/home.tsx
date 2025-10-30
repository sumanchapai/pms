import { Link } from "react-router";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-16">
      <Link to="/tasks">
        {" "}
        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>Manage tasks.</CardDescription>
          </CardHeader>
        </Card>{" "}
      </Link>
      <Link to="/analytics">
        {" "}
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Note montly analytics.</CardDescription>
          </CardHeader>
        </Card>{" "}
      </Link>
    </div>
  );
}

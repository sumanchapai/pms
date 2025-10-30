import { Link } from "react-router";
import type { TODO } from "~/routes/tasks/tasks";

export default function Tasks({ data }: { data: TODO[] }) {
  return (
    <div className="grid gap-y-6">
      {data.map((x) => (
        <Link key={x.id} to={`edit/${x.id}`}>
          <div className="hover:bg-gray-200 px-2 py-1 cursor-pointer">
            <span
              className={`px-2 py-1 
              ${
                x.status.toUpperCase() === "COMPLETED"
                  ? "bg-green-800 text-white"
                  : x.status.toUpperCase() === "IN_PROGRESS"
                    ? "bg-blue-800 text-white"
                    : "bg-black text-white"
              }  text-xs`}
            >
              {x.status}
            </span>
            <p>{x.task}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

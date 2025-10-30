import { useMemo } from "react";
import { CartesianGrid, Line, XAxis, LineChart, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { APIS } from "~/lib/apis";
import type { Route } from "./+types/analytics";
import { Button } from "~/components/ui/button";
import { Link, Outlet } from "react-router";

export async function loader() {
  const bookingRatingPromise = fetch(APIS.BOOKING_RATING_SCORES).then((x) =>
    x.json(),
  ) as Promise<ChartData>;
  const bookingRatingsCountPromise = fetch(APIS.BOOKING_RATING_COUNT).then(
    (x) => x.json(),
  ) as Promise<ChartData>;
  const googleRatingPromise = fetch(APIS.GOOGLE_RATING_SCORES).then((x) =>
    x.json(),
  ) as Promise<ChartData>;
  const googleRatingsCountPromise = fetch(APIS.GOOGLE_RATING_COUNT).then((x) =>
    x.json(),
  ) as Promise<ChartData>;

  const [bookingRating, bookingRatingsCount, googleRating, googleRatingsCount] =
    await Promise.all([
      bookingRatingPromise,
      bookingRatingsCountPromise,
      googleRatingPromise,
      googleRatingsCountPromise,
    ]);

  return {
    bookingRating,
    bookingRatingsCount,
    googleRating,
    googleRatingsCount,
  };
}

export default function Analytics({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1 className="text-4xl font-medium">Analytics</h1>
      <div className="flex justify-end gap-x-8 mt-4">
        <Link to="list">
          <Button className="cursor-pointer" variant="outline">
            Edit
          </Button>
        </Link>
        <Link to="new">
          <Button className="cursor-pointer">Add New</Button>
        </Link>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-y-16">
        <LinearChart
          title="Booking.Com Rating"
          domain={[0, 10]}
          description=""
          data={loaderData.bookingRating}
        />
        <LinearChart
          title="Booking.com reviews #"
          description=""
          data={loaderData.bookingRatingsCount}
          color="blue"
        />
        <LinearChart
          title="Google Rating"
          description=""
          domain={[0, 5]}
          data={loaderData.googleRating}
        />
        <LinearChart
          title="Google reviews #"
          description=""
          data={loaderData.googleRatingsCount}
          color="blue"
        />
      </div>
      <Outlet />
    </div>
  );
}

export type ChartData = Array<{
  date: string; // e.g. "2025-11-01"
  value: number;
}>;

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${date.toLocaleString("en-US", { month: "short" })}`;
}

function LinearChart({
  title,
  data,
  description,
  domain,
  color,
}: {
  title: string;
  data: ChartData;
  description: string;
  domain?: Array<number>;
  color?: string;
}) {
  const sortedData = useMemo(() => {
    return [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }, [data]);

  const chartConfig = {
    desktop: {
      label: title,
      color: color || "var(--chart-1)",
    },
  } satisfies ChartConfig;
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={sortedData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <YAxis dataKey={"value"} axisLine={false} domain={domain} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={formatDate}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent labelFormatter={formatDate} />}
              />
              <Line
                dataKey="value"
                type="linear"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}

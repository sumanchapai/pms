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
import type { AnalyticsDataBaics } from "./new";

export async function loader() {
  const analytics = (await fetch(APIS.ANALYTICS).then((x) =>
    x.json(),
  )) as AnalyticsDataArray;

  const bookingRating = analytics.map((x) => {
    return { date: x.date, value: x.bookingReviewsScores };
  });

  const bookingRatingsCount = analytics.map((x) => {
    return { date: x.date, value: x.bookingReviewsCount };
  });

  const bookingCityRanking = analytics.map((x) => {
    return { date: x.date, value: x.bookingCityRanking };
  });

  const googleRatingsCount = analytics.map((x) => {
    return { date: x.date, value: x.googleReviewsCount };
  });

  const googleRating = analytics.map((x) => {
    return { date: x.date, value: x.googleReviewsScores };
  });

  const airbnbRatingsCount = analytics.map((x) => {
    return { date: x.date, value: x.airbnbReviewsCount };
  });

  const airbnbRating = analytics.map((x) => {
    return { date: x.date, value: x.airbnbReviewsScores };
  });

  const tripAdvisorRatingsCount = analytics.map((x) => {
    return { date: x.date, value: x.tripAdvisorReviewsCount };
  });

  const tripAdvisorRating = analytics.map((x) => {
    return { date: x.date, value: x.tripAdvisorReviewsScores };
  });

  return {
    bookingRating,
    bookingRatingsCount,
    bookingCityRanking,
    googleRating,
    googleRatingsCount,
    airbnbRating,
    airbnbRatingsCount,
    tripAdvisorRating,
    tripAdvisorRatingsCount,
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
      <div className="mt-16 grid grid-cols-1 gap-x-4 lg:grid-cols-2 gap-y-16">
        <LinearChart
          title="Booking.Com Rating"
          description=""
          color="blue"
          data={loaderData.bookingRating}
          domain={[
            Math.max(
              Math.min(...loaderData.bookingRating.map((x) => x.value)) - 1,
              0,
            ),
            10,
          ]}
        />
        <LinearChart
          title="Booking.Com Ranking within the city"
          yAxisReversed={true}
          color="blue"
          description=""
          data={loaderData.bookingCityRanking}
          domain={[
            Math.min(...loaderData.bookingCityRanking.map((x) => x.value)) - 10,
            Math.max(...loaderData.bookingCityRanking.map((x) => x.value)) + 10,
          ]}
        />
        <LinearChart
          title="Booking.com reviews #"
          description=""
          data={loaderData.bookingRatingsCount}
          color="blue"
          domain={[
            Math.min(...loaderData.bookingRatingsCount.map((x) => x.value)) -
              10,
            Math.max(...loaderData.bookingRatingsCount.map((x) => x.value)) +
              10,
          ]}
        />
        <LinearChart
          title="Google Rating"
          color="red"
          description=""
          data={loaderData.googleRating}
          domain={[
            Math.max(
              Math.min(...loaderData.googleRating.map((x) => x.value)) - 1,
              0,
            ),
            5,
          ]}
        />
        <LinearChart
          title="Google reviews #"
          description=""
          color="red"
          data={loaderData.googleRatingsCount}
          domain={[
            Math.min(...loaderData.googleRatingsCount.map((x) => x.value)) - 10,
            Math.max(...loaderData.googleRatingsCount.map((x) => x.value)) + 10,
          ]}
        />
        <LinearChart
          title="TripAdvisor Rating"
          color="purple"
          description=""
          data={loaderData.tripAdvisorRating}
          domain={[
            Math.max(
              Math.min(...loaderData.tripAdvisorRating.map((x) => x.value)) - 1,
              0,
            ),
            5,
          ]}
        />
        <LinearChart
          title="TripAdvisor reviews #"
          description=""
          color="purple"
          data={loaderData.tripAdvisorRatingsCount}
          domain={[
            Math.min(
              ...loaderData.tripAdvisorRatingsCount.map((x) => x.value),
            ) - 10,
            Math.max(
              ...loaderData.tripAdvisorRatingsCount.map((x) => x.value),
            ) + 10,
          ]}
        />
        <LinearChart
          title="Airbnb Rating"
          description=""
          data={loaderData.airbnbRating}
          domain={[
            Math.max(
              Math.min(...loaderData.airbnbRating.map((x) => x.value)) - 1,
              0,
            ),
            5,
          ]}
        />
        <LinearChart
          title="Airbnb reviews #"
          description=""
          data={loaderData.airbnbRatingsCount}
          color="blue"
          domain={[
            Math.min(...loaderData.airbnbRatingsCount.map((x) => x.value)) - 10,
            Math.max(...loaderData.airbnbRatingsCount.map((x) => x.value)) + 10,
          ]}
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

export type AnalyticsDataArray = Array<AnalyticsData>;

export type AnalyticsData = Omit<AnalyticsDataBaics, "date"> & {
  id: string;
  date: string;
  createdAt: string; // eg. timestamp
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${date.toLocaleString("en-US", { month: "short" })}`;
}

function formatDateWithDate(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${date.toLocaleString("en-US", { month: "short" })}-${date.getDate()}`;
}

function LinearChart({
  title,
  data,
  description,
  domain,
  color,
  yAxisReversed,
}: {
  title: string;
  data: ChartData;
  description: string;
  domain?: Array<number>;
  color?: string;
  yAxisReversed?: boolean;
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
              <YAxis
                dataKey={"value"}
                axisLine={false}
                domain={domain}
                reversed={yAxisReversed}
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={formatDate}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent labelFormatter={formatDateWithDate} />
                }
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

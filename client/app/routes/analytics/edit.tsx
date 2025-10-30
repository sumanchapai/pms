import { AnalyticsAddEdit } from "~/components/analytics/form";
import type { AnalyticsData } from "./analytics";
import { APIS } from "~/lib/apis";
import type { Route } from "./+types/edit";
import { AnalyticsPostPUTAction } from "./new";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id!;
  return (await fetch(`${APIS.ANALYTICS}/${id}`).then((x) =>
    x.json(),
  )) as AnalyticsData;
}

export async function action({ ...rest }: Route.ActionArgs) {
  return AnalyticsPostPUTAction({
    isPost: false,
    ...rest,
  });
}

export default function AnalyticsEdit({ loaderData }: Route.ComponentProps) {
  return (
    <AnalyticsAddEdit
      initialMonth={loaderData.month}
      initialGoogleReviewsCount={loaderData.googleReviewsCount}
      initialGoogleReviewsScore={loaderData.googleReviewsScore}
      initialBookingReviewsCount={loaderData.bookingReviewsCount}
      initialBookingReviewsScore={loaderData.bookingReviewsScore}
    />
  );
}

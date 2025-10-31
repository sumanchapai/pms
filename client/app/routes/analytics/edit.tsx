import { AnalyticsAddEdit } from "~/components/analytics/form";
import type { AnalyticsData } from "./analytics";
import { APIS } from "~/lib/apis";
import type { Route } from "./+types/edit";
import { AnalyticsPostPUTAction } from "./new";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id!;
  const data = (await fetch(`${APIS.ANALYTICS}/${id}`).then((x) =>
    x.json(),
  )) as AnalyticsData;
  return { data, id };
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
      method="post"
      action={"."}
      initialDate={loaderData.data.date}
      initialBookingReviewsScore={loaderData.data.bookingReviewsScores}
      initialBookingCityRanking={loaderData.data.bookingCityRanking}
      initialBookingReviewsCount={loaderData.data.bookingReviewsCount}
      initialGoogleReviewsCount={loaderData.data.googleReviewsCount}
      initialGoogleReviewsScore={loaderData.data.googleReviewsScores}
      initialAirbnbReviewsScore={loaderData.data.airbnbReviewsScores}
      initialTripadvisorReviewsCount={loaderData.data.tripAdvisorReviewsCount}
      initialAirbnbReviewsCount={loaderData.data.airbnbReviewsCount}
      initialTripadvisorReviewsScore={loaderData.data.tripAdvisorReviewsScores}
    />
  );
}

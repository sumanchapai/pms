import { z } from "zod";
import { redirect } from "react-router";
import type { Route } from "./+types/analytics";
import {
  APIS,
  errorJSONResponse,
  POST_JSON_OPTIONS,
  PUT_JSON_OPTIONS,
} from "~/lib/apis";
import { AnalyticsAddEdit } from "~/components/analytics/form";

const analyticsSchema = z.object({
  month: z.string().nonempty(), // YYYY-MM
  bookingReviewsCount: z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Must be a non-negative number",
    }),
  bookingReviewsScores: z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val) && val >= 0 && val <= 10, {
      message: "Must be between 0 and 10",
    }),
  googleReviewsCount: z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Must be a non-negative number",
    }),
  googleReviewsScores: z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val) && val >= 0 && val <= 5, {
      message: "Must be between 0 and 5",
    }),
});

interface PostPutActionArgs extends Route.ActionArgs {
  isPost: boolean;
}

// This action can be reused by both create analytics and update analytics pages.
export async function AnalyticsPostPUTAction({
  request,
  params,
  isPost,
}: PostPutActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  const result = analyticsSchema.safeParse(data); // throws if invalid
  if (result.error) {
    const errors = z.treeifyError(result.error);
    return new Response(JSON.stringify({ errors }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  // Save data
  let err;
  const basicDataBody = {
    createdAt: new Date().toISOString(),
    month: data.month,
    bookingReviewsScore: data.bookingReviewsScores,
    bookingReviewsCount: data.bookingReviewsCount,
    googleReviewsScore: data.googleReviewsScores,
    googleReviewsCount: data.googleReviewsCount,
  };
  const fetchData = isPost
    ? {
        ...POST_JSON_OPTIONS,
        body: JSON.stringify(basicDataBody),
      }
    : {
        ...PUT_JSON_OPTIONS,
        body: JSON.stringify({ id: params.id, ...basicDataBody }),
      };

  await fetch(APIS.ANALYTICS, fetchData).catch((e) => {
    err = e;
  });

  if (err) {
    console.error(err);
    return errorJSONResponse("Failed to save.");
  }
  return redirect("..");
}

export async function action({ ...rest }: Route.ActionArgs) {
  return AnalyticsPostPUTAction({
    isPost: true,
    ...rest,
  });
}

export default function NewAnalytics() {
  return <AnalyticsAddEdit />;
}

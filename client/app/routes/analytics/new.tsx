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
  date: z.coerce.date(), // YYYY-MM-DD
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

export async function AnalyticsPostPUTAction({
  request,
  params,
  isPost,
}: PostPutActionArgs) {
  try {
    console.log("1");
    // 1️⃣ Parse form data
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    // 2️⃣ Validate using Zod
    const result = analyticsSchema.safeParse(data);
    if (!result.success) {
      const errors = z.treeifyError(result.error);
      return new Response(JSON.stringify({ errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("2");
    // 3️⃣ Prepare body
    const body = {
      createdAt: new Date().toISOString(),
      date: data.date,
      bookingReviewsScore: data.bookingReviewsScores,
      bookingReviewsCount: data.bookingReviewsCount,
      googleReviewsScore: data.googleReviewsScores,
      googleReviewsCount: data.googleReviewsCount,
    };

    // 4️⃣ Choose request options
    const fetchOptions = isPost
      ? { ...POST_JSON_OPTIONS, body: JSON.stringify(body) }
      : {
          ...PUT_JSON_OPTIONS,
          body: JSON.stringify(body),
        };

    console.log("3");
    // 5️⃣ Make the request
    const res = await fetch(
      isPost ? APIS.ANALYTICS : `${APIS.ANALYTICS}/${params.id}`,
      fetchOptions,
    );
    console.log("4");

    // 6️⃣ Handle HTTP errors
    if (!res.ok) {
      console.error(APIS.ANALYTICS, fetchOptions);
      // Try to extract error details from the response
      let errorText = "";
      try {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          errorText = data?.message || JSON.stringify(data);
        } else {
          errorText = await res.text();
        }
      } catch (_) {
        errorText = "Unknown server error";
      }
      console.error("Server responded with error:", res.status, errorText);
      return errorJSONResponse(
        `Failed to delete (status ${res.status}): ${errorText || "Unknown error"}`,
      );
    }

    // 7️⃣ Redirect on success
    return redirect("..");
  } catch (err: unknown) {
    // 8️⃣ Handle unexpected errors
    console.error("AnalyticsPostPUTAction error:", err);
    return new Response(
      JSON.stringify({ errors: { message: "Unexpected server error." } }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export async function action({ ...rest }: Route.ActionArgs) {
  return AnalyticsPostPUTAction({
    isPost: true,
    ...rest,
  });
}

export default function NewAnalytics() {
  return <AnalyticsAddEdit method="post" action="." />;
}

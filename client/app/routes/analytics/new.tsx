import { z } from "zod";
import { Link, Form, useActionData, useNavigate, redirect } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "~/components/ui/field";
import type { Route } from "./+types/analytics";
import { useState } from "react";
import { APIS } from "~/lib/apis";

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

const POST_JSON_OPTIONS = {
  method: "POST",
};

export async function action({ request }: Route.ActionArgs) {
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
  // TODO:
  // Save data
  let err;
  await fetch(APIS.ANALYTICS, {
    ...POST_JSON_OPTIONS,
    body: JSON.stringify({
      date: data.month,
      bookingReviewsScore: data.bookingReviewsScores,
      bookingReviewsCount: data.bookingReviewsCount,
      googleReviewsScore: data.googleReviewsScores,
      googleReviewsCount: data.googleReviewsCount,
    }),
  }).catch((e) => {
    err = e;
  });

  if (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        errors: {
          message: "Error while saving data. Check server console for error.",
        },
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
  return redirect("..");
}

export default function NewAnalytics() {
  const actionData = useActionData();
  const fieldErrors = actionData?.errors?.properties;
  const navigate = useNavigate();
  const [dirty, setDirty] = useState(false);
  const handleChange = () => setDirty(true);

  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open) {
          if (!dirty || confirm("Discard Changes?")) {
            navigate("..");
          }
        }
      }}
    >
      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <DialogContent
        className="sm:max-w-lg bg-white"
        onInteractOutside={(e) => e.preventDefault()} // 🔒 Prevent closing by clicking outside
        onEscapeKeyDown={(e) => e.preventDefault()} // 🔒 Prevent closing by ESC
      >
        <DialogHeader>
          <DialogTitle>Add Analytics</DialogTitle>
        </DialogHeader>
        <p className="text-red-800">{actionData?.errors?.message}</p>
        <Form method="post" className="grid grid-cols-1 gap-y-4 mt-4">
          <Field>
            <FieldLabel htmlFor="month">Month</FieldLabel>
            <Input
              id="month"
              name="month"
              type="month"
              required
              onChange={handleChange}
            />
            <FieldError>{fieldErrors?.month?.errors?.[0]}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="bookingReviewsCount">
              Booking.com Reviews Count
            </FieldLabel>
            <Input
              type="number"
              required
              onChange={handleChange}
              id="bookingReviewsCount"
              name="bookingReviewsCount"
              step={1}
              min={0}
            />
            {/* Input, Select, Switch, etc. */}
            <FieldDescription></FieldDescription>
            <FieldError>
              {fieldErrors?.bookingReviewsCount?.errors?.[0]}
            </FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="bookingReviewsScores">
              Booking.com Review Score
            </FieldLabel>
            <Input
              type="number"
              step={0.1}
              required
              onChange={handleChange}
              id="bookingReviewsScores"
              name="bookingReviewsScores"
              min={0}
              max={10}
            />
            {/* Input, Select, Switch, etc. */}
            <FieldDescription></FieldDescription>
            <FieldError>
              {fieldErrors?.bookingReviewsScores?.errors?.[0]}
            </FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="googleReviewsCount">
              Google.com Reviews Count
            </FieldLabel>
            <Input
              type="number"
              required
              onChange={handleChange}
              id="googleReviewsCount"
              name="googleReviewsCount"
              step={1}
              min={0}
            />
            {/* Input, Select, Switch, etc. */}
            <FieldDescription></FieldDescription>
            <FieldError className="">
              {fieldErrors?.googleReviewsCount?.errors?.[0] ?? " "}
            </FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="googleReviewsScores">
              Google.com Review Score
            </FieldLabel>
            <Input
              type="number"
              step={0.1}
              required
              id="googleReviewsScores"
              name="googleReviewsScores"
              onChange={handleChange}
              min={0}
              max={5}
            />
            {/* Input, Select, Switch, etc. */}
            <FieldDescription></FieldDescription>
            <FieldError>
              {fieldErrors?.googleReviewsScores?.errors?.[0] ?? ""}
            </FieldError>
          </Field>
          <div className="flex mt-4 justify-between gap-x-4">
            <Button className="cursor-pointer" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { Form, useActionData, useNavigate } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "~/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "~/components/ui/dialog";

interface AnalyticsAddEditProps {
  initialMonth?: string;
  initialBookingReviewsCount?: number;
  initialBookingReviewsScore?: number;
  initialGoogleReviewsCount?: number;
  initialGoogleReviewsScore?: number;
}
export function AnalyticsAddEdit({ ...props }: AnalyticsAddEditProps) {
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
              defaultValue={props.initialMonth}
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
              Number of Booking.com Reviews
            </FieldLabel>
            <Input
              defaultValue={props.initialBookingReviewsCount}
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
              defaultValue={props.initialBookingReviewsScore}
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
              Number of Google.com Reviews
            </FieldLabel>
            <Input
              type="number"
              required
              defaultValue={props.initialGoogleReviewsCount}
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
              defaultValue={props.initialGoogleReviewsScore}
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

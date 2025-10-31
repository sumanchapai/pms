import { useState } from "react";
import {
  Form,
  useActionData,
  useNavigate,
  type HTMLFormMethod,
} from "react-router";
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
  action: string;
  method: HTMLFormMethod;
  initialDate?: string;
  initialBookingCityRanking?: number;
  initialBookingReviewsCount?: number;
  initialBookingReviewsScore?: number;
  initialTripadvisorReviewsCount?: number;
  initialTripadvisorReviewsScore?: number;
  initialAirbnbReviewsCount?: number;
  initialAirbnbReviewsScore?: number;
  initialGoogleReviewsCount?: number;
  initialGoogleReviewsScore?: number;
}
export function AnalyticsAddEdit({
  method,
  action,
  ...props
}: AnalyticsAddEditProps) {
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
        className="sm:max-w-lg bg-white max-h-[80%] overflow-auto"
        onInteractOutside={(e) => e.preventDefault()} // 🔒 Prevent closing by clicking outside
        onEscapeKeyDown={(e) => e.preventDefault()} // 🔒 Prevent closing by ESC
      >
        <DialogHeader>
          <DialogTitle>Add Analytics</DialogTitle>
        </DialogHeader>
        <p className="text-red-800">{actionData?.errors?.message}</p>
        <Form
          method={method}
          action={action}
          className="grid grid-cols-1 gap-y-4 mt-4"
        >
          <Field>
            <FieldLabel htmlFor="date">Date</FieldLabel>
            <Input
              defaultValue={props.initialDate}
              id="date"
              name="date"
              type="date"
              required
              onChange={handleChange}
            />
            <FieldError>{fieldErrors?.date?.errors?.[0]}</FieldError>
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
            <FieldError>
              {fieldErrors?.bookingReviewsScores?.errors?.[0]}
            </FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="bookingReviewsCount">
              Booking.com City Ranking
            </FieldLabel>
            <Input
              defaultValue={props.initialBookingCityRanking}
              type="number"
              required
              onChange={handleChange}
              id="bookingCityRanking"
              name="bookingCityRanking"
              step={1}
              min={1}
            />
            <FieldError>
              {fieldErrors?.bookingReviewsCount?.errors?.[0]}
            </FieldError>
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
            <FieldError>
              {fieldErrors?.googleReviewsScores?.errors?.[0] ?? ""}
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
            <FieldError className="">
              {fieldErrors?.googleReviewsCount?.errors?.[0] ?? " "}
            </FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="tripAdvisorReviewsScores">
              TripAdvisor Review Score
            </FieldLabel>
            <Input
              type="number"
              step={0.1}
              required
              defaultValue={props.initialTripadvisorReviewsScore}
              id="tripAdvisorReviewsScores"
              name="tripAdvisorReviewsScores"
              onChange={handleChange}
              min={0}
              max={5}
            />
            <FieldError>
              {fieldErrors?.tripAdvisorReviewsScores?.errors?.[0] ?? ""}
            </FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="tripAdvisorReviewsCount">
              Number of TripAdvisor Reviews
            </FieldLabel>
            <Input
              type="number"
              required
              defaultValue={props.initialTripadvisorReviewsCount}
              onChange={handleChange}
              id="tripAdvisorReviewsCount"
              name="tripAdvisorReviewsCount"
              step={1}
              min={0}
            />
            <FieldError className="">
              {fieldErrors?.tripAdvisorReviewsCount?.errors?.[0] ?? " "}
            </FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="airbnbReviewsScores">
              Airbnb Review Score
            </FieldLabel>
            <Input
              type="number"
              step={0.1}
              required
              defaultValue={props.initialAirbnbReviewsScore}
              id="airbnbReviewsScores"
              name="airbnbReviewsScores"
              onChange={handleChange}
              min={0}
              max={5}
            />
            <FieldError>
              {fieldErrors?.airbnbReviewsScores?.errors?.[0] ?? ""}
            </FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="airbnbReviewsCount">
              Number of Airbnb Reviews
            </FieldLabel>
            <Input
              type="number"
              required
              defaultValue={props.initialAirbnbReviewsCount}
              onChange={handleChange}
              id="airbnbReviewsCount"
              name="airbnbReviewsCount"
              step={1}
              min={0}
            />
            <FieldError className="">
              {fieldErrors?.airbnbReviewsCount?.errors?.[0] ?? " "}
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

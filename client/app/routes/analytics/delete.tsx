import { APIS, errorJSONResponse } from "~/lib/apis";
import type { AnalyticsData } from "./analytics";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
} from "~/components/ui/dialog";
import { Form, Link, redirect, useActionData, useNavigate } from "react-router";
import type { Route } from "./+types/delete";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "~/components/ui/button";

export async function action({ params }: Route.ActionArgs) {
  // Update the action...
  const id = params.id!;
  const url = `${APIS.ANALYTICS}/${id}`;

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
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

    return redirect("..");
  } catch (err) {
    console.error("Network or unexpected error:", err);
    return errorJSONResponse(`Network error: ${err}`);
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id!;
  return (await fetch(`${APIS.ANALYTICS}/${id}`).then((x) =>
    x.json(),
  )) as AnalyticsData;
}

export default function Delete({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const actionData = useActionData();
  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open) {
          navigate("..");
        }
      }}
    >
      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <DialogContent className="sm:max-w-lg bg-white">
        <DialogHeader>
          <DialogTitle>Delete Analytics</DialogTitle>
        </DialogHeader>
        <p className="text-red-800">{actionData?.errors?.message}</p>
        <Form method="delete">
          <p>
            Are you sure you want to delete analytics data for{" "}
            {loaderData.month}?
          </p>
          <div className="flex gap-x-4 justify-between mt-8">
            <Link to="..">
              <Button className="cursor-pointer">No, Cancel</Button>
            </Link>
            <Button
              type="submit"
              variant={"destructive"}
              className="cursor-pointer"
            >
              Yes
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

import { Form, redirect, useNavigate } from "react-router";
import type { TODO } from "./tasks";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "~/components/ui/dialog";
import type { Route } from "./+types/edit-task";

export async function action({ request, params }: Route.ActionArgs) {
  // Update the action...
  const formData = await request.formData();
  const id = params.id!;

  const updatedTodo = {
    task: formData.get("task"),
    status: formData.get("status"),
  };

  // PUT request to json-server
  const res = await fetch(`http://localhost:4000/todo/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo),
  });

  if (!res.ok) {
    throw new Error("Failed to update todo");
  }

  return redirect("..");
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id!;
  const todo = (await fetch(`http://localhost:4000/todo/${id}`).then((x) =>
    x.json(),
  )) as TODO;
  return { todo };
}

export default function Edit({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={(_) => {
        navigate("..");
      }}
    >
      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <DialogContent className="sm:max-w-lg bg-white">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>{`#${loaderData.todo.id}`}</DialogDescription>
        </DialogHeader>
        <Form method="post">
          <div className="grid grid-cols-1 gap-y-4">
            <div>
              <select
                name="status"
                defaultValue={loaderData.todo.status.toUpperCase()}
              >
                <option value="COMPLETED">COMPLETED</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>
            <label htmlFor="task">Title</label>
            <input
              autoFocus
              type="text"
              id="task"
              name="task"
              className="border px-2 py-1"
              defaultValue={loaderData.todo.task}
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="border px-2 py-1"
            />
            <Button variant="outline">Submit</Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

import { APIS } from "~/lib/apis";
import type { AnalyticsDataArray } from "./analytics";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
} from "~/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "~/components/ui/empty";
import { Link, useNavigate } from "react-router";
import type { Route } from "./+types/list";
import { useMemo } from "react";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export async function loader() {
  return (await fetch(APIS.ANALYTICS).then((x) =>
    x.json(),
  )) as AnalyticsDataArray;
}

export default function List({ loaderData }: Route.ComponentProps) {
  const dataSorted = useMemo(() => {
    return loaderData.sort(
      (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime(),
    );
  }, [loaderData]);
  const navigate = useNavigate();
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
          {dataSorted.length === 0 ? (
            <NoAnalytics />
          ) : (
            <Table className="mt-8">
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataSorted.map((x) => (
                  <TableRow key={x.id}>
                    <TableCell>
                      <Link to={`../edit/${x.id}`}>{x.month}</Link>
                    </TableCell>
                    <TableCell className="">
                      {new Date(x.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="">
                      <Link to={`../delete/${x.id}`}>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="cursor-pointer hover:bg-red-600 bg-red-800"
                        >
                          x
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function NoAnalytics() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No data</EmptyTitle>
        <EmptyDescription>
          You don&apos;t seem to have added any analytics yet.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link to="../new">
          <Button>Add data</Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
}

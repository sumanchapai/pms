import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./components/layout.tsx", [
    index("routes/home.tsx"),
    layout("./components/innerLayout.tsx", [
      route("tasks", "routes/tasks/tasks.tsx", [
        route("edit/:id", "./routes/tasks/edit-task.tsx"),
      ]),
      route("analytics", "routes/analytics/analytics.tsx", [
        route("new", "routes/analytics/new.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;

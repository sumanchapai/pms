import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/suman", "./routes/suman.tsx"),
] satisfies RouteConfig;

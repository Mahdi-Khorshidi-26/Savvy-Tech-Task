import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/about-me", "routes/aboutMe.tsx"),
  route("/app", "routes/app.tsx", [index("routes/app/index.tsx")]),
] satisfies RouteConfig;

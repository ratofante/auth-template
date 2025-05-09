import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/site-layout.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
  ]),
  layout("./layouts/auth-layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
    route("email-validation", "routes/auth/email-validation.tsx"),
    route("email-confirmation", "routes/email-confirmation.tsx"),
  ]),
  layout("./layouts/app-layout.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
  ]),
  route("without-layout", "./routes/without-layout.tsx"),
] satisfies RouteConfig;

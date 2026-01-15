import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("app/dashboard", "routes/dashboard.tsx"),
  route("app/pos", "routes/pos.tsx"),
  route("app/orders", "routes/orders.tsx"),
  route("app/tables", "routes/tables.tsx"),
  route("app/analytics", "routes/analytics.tsx"),
  route("app/products", "routes/products.tsx"),
  route("app/settings", "routes/settings.tsx"),
] satisfies RouteConfig;

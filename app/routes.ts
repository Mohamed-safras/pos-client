import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("app/dashboard", "routes/dashboard.tsx"),
  route("app/pos", "routes/pos.tsx"),
  route("app/orders", "routes/orders.tsx"),
  route("app/reports", "routes/reports.tsx"),
  route("app/products", "routes/products.tsx"),
] satisfies RouteConfig;

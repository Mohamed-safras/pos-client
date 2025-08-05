import type { Route } from "./+types/products";
import { Products as ProductsPage } from "../products/products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Products() {
  return <ProductsPage />;
}

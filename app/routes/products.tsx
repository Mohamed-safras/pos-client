import { Header } from "~/products/Header";
import type { Route } from "./+types/products";
import BarChart from "components/BarChart";

import type { Product } from "types";
import { ProductTable } from "~/products/producttable";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Products() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {/* <Header /> */}
      <ProductTable />
    </main>
  );
}

import type { Route } from "./+types/dashboard";
import { Dashboard as DashboardPage } from "../dashboard/dashboard";
import PolarAreaChart from "components/PolarAreaChart";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Dashboard() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-8">
        This is the dashboard page. You can customize it with your widgets.
      </p>
      <DashboardPage />
      <PolarAreaChart />
    </main>
  );
}

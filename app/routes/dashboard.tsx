import type { Route } from "./+types/dashboard";

import { FinancialSummary } from "~/dashboard/financialsummary";
import { StatsChart } from "~/dashboard/statschart";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Welcome to the Dashboard!" },
  ];
}

export default function Dashboard() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-8">
        This is the dashboard page. You can customize it with your widgets.
      </p>
      <FinancialSummary />
      <StatsChart />
    </main>
  );
}

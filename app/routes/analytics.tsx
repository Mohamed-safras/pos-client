import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  fetchDailyReport,
  fetchWeeklyReport,
  fetchMonthlyReport,
} from "store/slices/reportsSlice";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import type { Route } from "./+types/analytics";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Analytics" },
    { name: "description", content: "Sales analytics and reports" },
  ];
}

const Analytics = () => {
  const dispatch = useAppDispatch();
  const { dailyReport, weeklyReport, monthlyReport, loading } = useAppSelector(
    (state) => state.reports
  );

  useEffect(() => {
    dispatch(fetchDailyReport());
    dispatch(fetchWeeklyReport());
    dispatch(fetchMonthlyReport());
  }, [dispatch]);

  const salesData = {
    labels: ["Daily", "Weekly", "Monthly"],
    datasets: [
      {
        label: "Total Sales",
        data: [
          dailyReport?.totalSales || 0,
          weeklyReport?.totalSales || 0,
          monthlyReport?.totalSales || 0,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
      },
    ],
  };

  const orderData = {
    labels: ["Daily", "Weekly", "Monthly"],
    datasets: [
      {
        label: "Order Count",
        data: [
          dailyReport?.orderCount || 0,
          weeklyReport?.orderCount || 0,
          monthlyReport?.orderCount || 0,
        ],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="p-6 h-full overflow-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Analytics Dashboard
      </h1>

      {loading && <p>Loading reports...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium mb-2">
            Daily Sales
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            ${dailyReport?.totalSales.toFixed(2) || "0.00"}
          </p>
          <span className="text-sm text-green-500 font-medium">
            +12% from yesterday
          </span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium mb-2">
            Weekly Sales
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            ${weeklyReport?.totalSales.toFixed(2) || "0.00"}
          </p>
          <span className="text-sm text-green-500 font-medium">
            +5% from last week
          </span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium mb-2">
            Monthly Sales
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            ${monthlyReport?.totalSales.toFixed(2) || "0.00"}
          </p>
          <span className="text-sm text-green-500 font-medium">
            +8% from last month
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Sales Overview
          </h2>
          <Bar options={{ responsive: true }} data={salesData} />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Order Trends</h2>
          <Line options={{ responsive: true }} data={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;

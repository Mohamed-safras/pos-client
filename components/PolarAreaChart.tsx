// PolarAreaChart.tsx
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const data = {
  labels: ["Electronics", "Groceries", "Clothing", "Home Decor", "Books"],
  datasets: [
    {
      label: "Sales by Category",
      data: [1200, 900, 600, 400, 300],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => `${context.label}: ₹${context.raw}`,
      },
    },
  },
};

export default function PolarAreaChart() {
  return (
    <div className="w-full aspect-video p-4 rounded-lg shadow-md bg-white cursor-cell">
      <PolarArea data={data} options={options} />
    </div>
  );
}

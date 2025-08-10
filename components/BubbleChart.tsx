import { Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";

ChartJS.register(PointElement, LinearScale, Tooltip, Legend, Title);

const data = {
  datasets: [
    {
      label: "Performance Metrics",
      data: [
        { x: 10, y: 20, r: 15 },
        { x: 25, y: 10, r: 10 },
        { x: 15, y: 30, r: 20 },
      ],
      backgroundColor: ["#4CBF50", "#2196F3", "#EEAF50"],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" as const },
    title: {
      display: true,
      text: "Bubble Chart Overview",
    },
  },
  scales: {
    x: {
      title: { display: true, text: "X Value" },
    },
    y: {
      title: { display: true, text: "Y Value" },
    },
  },
};

export default function BubbleChart() {
  return (
    <div className="w-full aspect-video p-4 rounded-lg shadow-md bg-white cursor-cell">
      <Bubble data={data} options={options} />
    </div>
  );
}

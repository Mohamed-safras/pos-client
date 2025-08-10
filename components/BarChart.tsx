import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartType,
  type ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type FlexibleChartData<TType extends ChartType = "bar"> = ChartData<
  TType,
  (number | { x: string | number; y: number })[],
  string | number
>;

type BarChartOptions = {
  responsive: boolean;
  plugins: {
    legend: {
      position: "top" | "left" | "right" | "bottom" | "center";
      labels?: {
        usePointStyle?: boolean;
        color?: string;
      };
    };
    title: {
      display: boolean;
      text: string;
    };
  };
};

interface BarChartProps {
  data: FlexibleChartData;
  options?: BarChartOptions;
}

export default function BarChart({ data, options }: BarChartProps) {
  return (
    <div className="w-full aspect-video p-4 rounded-lg shadow-md bg-white cursor-cell">
      <Bar data={data} options={options} className="cursor-pointer" />
    </div>
  );
}

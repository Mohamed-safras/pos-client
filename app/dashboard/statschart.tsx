import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import useCustomWidget from "hooks/useCustomWidget";
import { useEffect, useState } from "react";

import { SortableWidget } from "components/SortableWidget";
import BarChart from "components/BarChart";
import BubbleChart from "components/BubbleChart";
import PolarAreaChart from "components/PolarAreaChart";

const chartData1 = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Sales",
      data: [1200, 1900, 800, 1500, 2000, 1700, 900],
      backgroundColor: "#4CBF50",
    },
    {
      label: "Purchases",
      data: [1000, 1400, 700, 1300, 1600, 1200, 800],
      backgroundColor: "#2196F3",
    },
  ],
};

const chartData2 = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Orders",
      data: [1100, 1800, 800, 1500, 800, 900, 900],
      backgroundColor: "#E196A3",
    },
    {
      label: "Stocks",
      data: [1000, 1400, 700, 1300, 1600, 1200, 800],
      backgroundColor: "#ECBF50",
    },
  ],
};

const chartData3 = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Sales",
      data: [1200, 1900, 800, 1500, 2000, 1700, 900],
      backgroundColor: "#EEAF50",
    },
    {
      label: "Expenses",
      data: [1000, 1400, 700, 1300, 1600, 1200, 800],
      backgroundColor: "#EEA6F3",
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  interaction: {
    mode: "index",
    intersect: true,
  },
};

const widgets = [
  {
    id: "wsp",
    children: (
      <BarChart
        data={chartData1}
        options={{
          ...chartOptions,
          plugins: {
            title: { text: "Weekly Sales vs Purchases", display: true },
            legend: { position: "top" as const },
          },
        }}
      />
    ),
  },
  {
    id: "tsp",
    children: (
      <BarChart
        data={chartData2}
        options={{
          ...chartOptions,
          plugins: {
            title: { text: "Weekly Orders vs Stocks", display: true },
            legend: {
              position: "top" as const,
            },
          },
        }}
      />
    ),
  },
  {
    id: "tpc",
    children: <BubbleChart />,
  },
];

export function StatsChart() {
  const { items, sensors, handleDragEnd } = useCustomWidget(widgets);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  if (!isClient) return null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 my-8 items-center">
          {items.map((widget) => (
            <SortableWidget key={widget?.id} widget={widget}>
              {widget?.children}
            </SortableWidget>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

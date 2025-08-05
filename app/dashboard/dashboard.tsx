import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableWidget } from "components/SortableWidget";
import useCustomWidget from "hooks/useCustomWidget";
import { useEffect, useState } from "react";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";

const widgets = [
  {
    id: "products",
    name: "Total Products",
    value: 0,
    icon: <StorefrontIcon style={{ fontSize: "2rem" }} />,
    className: "stats-card-blue-purple",
  },
  {
    id: "sales",
    name: "Today's Sales",
    value: 0,
    icon: <AttachMoneyIcon style={{ fontSize: "2rem" }} />,
    className: "stats-card-purple-indigo",
  },
  {
    id: "orders",
    name: "Today's Orders",
    value: 0,
    icon: <ReceiptLongIcon style={{ fontSize: "2rem" }} />,
    className: "stats-card-pink-red",
  },
  {
    id: "low-stock",
    name: "Low Stock Items",
    value: 0,
    icon: <TrendingDownIcon style={{ fontSize: "2rem" }} />,
    className: "stats-card-yellow-orange",
  },
  {
    id: "total-purchases",
    name: "Total Purchases",
    value: 0,
    icon: <WarningAmberIcon style={{ fontSize: "2rem" }} />,
    className: "stats-card-teal-cyan",
  },
  {
    id: "total-expenses",
    name: "Total Expenses",
    value: 0,
    icon: <MoneyOffIcon style={{ fontSize: "2rem" }} />,
    className: "stats-card-red-pink",
  },
];

export function Dashboard() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {items.map((widget) => (
            <SortableWidget key={widget.id} widget={widget} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

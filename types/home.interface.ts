import type { ReactNode } from "react";

export interface AnalyticsCardProps {
  title: string;
  value: string | number;
  percentage: string | number;
  icon: ReactNode;
}

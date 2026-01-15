import React from "react";
import type { AnalyticsCardProps } from "types/home.interface";

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  percentage,
  icon,
}) => {
  return (
    <div className="p-4 rounded-lg bg-[var(--background)] flex-1">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div
          className="relative flex items-center justify-center ml-2"
          style={{ height: "48px", width: "48px" }}
        >
          {/* Enhanced transparent glassmorphism background behind the icon */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-lg shadow-md"
            style={{
              zIndex: 0,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 100%)",
              backdropFilter: "blur(10px)",
            }}
          ></div>
          <span className="relative z-10 opacity-80">{icon}</span>
        </div>
      </div>
      <div>
        <p className="text-xl">{value}</p>
        <p className="text-sm text-[var(--foreground)]">
          <span className="text-[var(--color-green)]">{percentage} %</span> than
          yesterday
        </p>
      </div>
    </div>
  );
};

export default AnalyticsCard;

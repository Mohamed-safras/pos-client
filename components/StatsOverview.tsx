import React from "react";

interface StatsOverviewProps {
  name: String;
  quantity: number;
  className?: string;
  icon: string;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({
  name,
  quantity,
  className,
  icon,
}) => {
  return (
    <div
      className={`${!className ? "stats-card" : className} stats-card rounded-lg cursor-cell`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div className="relative flex items-center justify-center">
            {/* Enhanced transparent glassmorphism background behind the icon */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-lg shadow-md"
              style={{
                zIndex: 0,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 100%)",
                backdropFilter: "blur(10px)",
              }}
            ></div>
            <span className="relative z-10 opacity-80">{icon}</span>
          </div>
          <div className="flex flex-col items-end">
            <h6 className="text-xs md:text-base lg:text-sm font-medium opacity-90">
              {name}
            </h6>
            <div className="stats-number">{quantity}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;

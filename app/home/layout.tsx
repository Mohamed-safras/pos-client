import Greetings from "components/Greetings";
import RecentOrders from "./recentorders";
import AnalyticsCard from "components/AnalyticsCard";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Calculator from "components/Calculator";

const Layout = () => {
  return (
    <section className="bg-[var(--background-variant-dark)] p-6 flex flex-col md:flex-row gap-6">
      <div className="flex-1 md:flex-2/3">
        <Greetings />
        <div className="mt-6 flex flex-row gap-4 items-center">
          <AnalyticsCard
            title="Total Earnings"
            percentage={12.34}
            value="$12,345"
            icon={<MonetizationOnIcon />}
          />
          <AnalyticsCard
            title="In Progress"
            percentage={1.6}
            value="5"
            icon={<HourglassEmptyIcon />}
          />
        </div>
        {/* recent orders */}
        <div className="bg-[var(--background)] mt-6 p-4 rounded-lg">
          <RecentOrders />
        </div>
      </div>

      <div className="bg-[var(--background)] rounded-lg text-[var(--foreground)] flex-1 md:flex-1/3 p-4">
        <Calculator />
      </div>
    </section>
  );
};

export default Layout;

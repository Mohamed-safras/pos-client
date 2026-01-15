import SearchIcon from "@mui/icons-material/Search";
import OrderList from "components/OrderList";
import { Link } from "react-router";

const RecentOrders = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Recent Orders</h2>
        <Link
          to="/app/orders"
          className="text-xs text-[var(--color-blue)] cursor-pointer"
        >
          View all
        </Link>
      </div>

      <div className="rounded-lg">
        <div className="flex items-center space-x-2 bg-[#1f1f1f] rounded-xl px-5 py-2 mb-4 md:min-w-[300px] lg:min-w-[400px]">
          <SearchIcon className="text-[var(--foreground)]" />
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none w-full text-xs bg-transparent text-white placeholder-[var(--foreground-variant)]"
          />
        </div>
        <p className="text-[var(--muted-foreground)] text-sm">
          No recent orders found.
        </p>
        <div className="overflow-y-scroll max-h-80">
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
        </div>
      </div>
    </>
  );
};

export default RecentOrders;

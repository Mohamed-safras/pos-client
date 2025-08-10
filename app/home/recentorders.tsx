import React from "react";

const RecentOrders = () => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
      <div className="rounded-lg">
        <p className="text-[var(--muted-foreground)] text-sm">
          No recent orders found.
        </p>
      </div>
    </>
  );
};

export default RecentOrders;

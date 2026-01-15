import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { fetchOrders } from "store/slices/ordersSlice";
import { Search, Filter } from "lucide-react";
import type { Route } from "./+types/orders";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Order History" },
    { name: "description", content: "View past orders" },
  ];
}

const Orders = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order History</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search Orders..."
              className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 w-64 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium transition-colors bg-white shadow-sm">
            <Filter size={20} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          Loading orders...
        </div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1">
          <div className="overflow-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                    Order ID
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                    Customer
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                    Date
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                    Amount
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                    Payment
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(order.orderDate).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-bold">
                      $
                      {typeof order.totalAmount === "number"
                        ? order.totalAmount.toFixed(2)
                        : order.totalAmount}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {order.paymentType}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-400"
                    >
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;

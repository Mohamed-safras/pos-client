import React from "react";

interface HeaderProps {
  onAddProduct: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddProduct }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold">Products</h2>
      <div className="flex gap-4">
        <select className="border px-3 py-1 rounded-md text-sm">
          <option value="mostSell">Most Sell</option>
          <option value="mostView">Most Viewed</option>
        </select>
        <button
          onClick={onAddProduct}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Product
        </button>
      </div>
    </div>
  );
};

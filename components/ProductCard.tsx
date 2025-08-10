import React from "react";
import type { Product } from "types";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="flex flex-wrap md:flex-nowrap items-center gap-4 p-4 border rounded-md shadow-sm hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded"
      />
      <div className="flex-1 min-w-[180px]">
        <h3 className="font-semibold text-base md:text-lg">{product.name}</h3>
        <p className="text-sm md:text-base text-gray-600">{product.price}</p>
        <p className={`text-sm mt-1 ${getStatusColor(product.status)}`}>
          {product.status}
        </p>
      </div>
      <div className="text-right space-y-1 min-w-[120px]">
        <p>
          <strong>Sold:</strong> {product.sellCount}
        </p>
        <p>
          <strong>Views:</strong> {product.viewCount}
        </p>
        <p>
          <strong>Earning:</strong> {product.earning}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

const getStatusColor = (status: Product["status"]) => {
  switch (status) {
    case "Available":
      return "text-green-600";
    case "Out of stock":
      return "text-red-500";
    case "Active":
      return "text-blue-500";
  }
};

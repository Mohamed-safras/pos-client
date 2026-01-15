import React from "react";
import type { Product } from "../types";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const isAvailable = product.status === "Available";

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col h-full">
      <div className="relative mb-3 overflow-hidden rounded-xl h-40">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Status Badge */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
          <div
            className={`w-2 h-2 rounded-full ${isAvailable ? "bg-green-500" : "bg-red-500"}`}
          />
          <span className="text-[10px] font-semibold text-gray-700 uppercase tracking-wide">
            {product.status}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-800 text-lg leading-tight line-clamp-1">
            {product.name}
          </h3>
          <span className="font-bold text-base text-gray-900">
            {product.price}
          </span>
        </div>

        {/* Placeholder for description if we had it, or spacer */}
        <div className="flex-1"></div>

        <button
          onClick={() => onAddToCart(product)}
          disabled={!isAvailable}
          className={`w-full mt-4 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors ${
            isAvailable
              ? "bg-[#1f1f1f] text-white hover:bg-gray-800 active:scale-[0.98]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isAvailable ? (
            <>
              <Plus size={18} />
              Add to Cart
            </>
          ) : (
            "Not Available"
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

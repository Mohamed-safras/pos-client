import React from "react";
import type { Product } from "../types";
import { Plus } from "lucide-react";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden pb-10">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                Product
              </th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                Price
              </th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                Status
              </th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                Stock
              </th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => {
              const isAvailable = product.status === "Available";
              return (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-bold text-gray-800">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 font-bold text-gray-900">
                    {product.price}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isAvailable ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <span className="text-sm font-medium text-gray-600">
                        {product.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {product.stock}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => onAddToCart(product)}
                      disabled={!isAvailable}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                        isAvailable
                          ? "bg-[#1f1f1f] text-white hover:bg-gray-800"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {isAvailable ? (
                        <>
                          <Plus size={16} />
                          Add
                        </>
                      ) : (
                        "Unavailable"
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;

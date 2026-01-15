import React from "react";
import { MoreHorizontal } from "lucide-react";
import type { Product } from "../types";

interface DishCardProps {
  product: Product;
  categoryName?: string;
  selected?: boolean;
  onToggleSelect: (id: number) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (id: number) => void;
}

const DishCard: React.FC<DishCardProps> = ({
  product,
  categoryName = "Dish",
  selected = false,
  onToggleSelect,
  onEdit,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all group relative animate-fade-in-up">
      <div className="flex justify-between items-start mb-4">
        <div className="relative z-10">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleSelect?.(product.id)}
            className="w-5 h-5 rounded-md border-gray-300 text-[#1f1f1f] focus:ring-[#1f1f1f] cursor-pointer"
          />
        </div>
        <div className="relative z-20">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MoreHorizontal size={20} />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              ></div>
              <div className="absolute right-0 top-8 w-32 bg-white rounded-xl shadow-xl border border-gray-100 z-30 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={() => {
                    onEdit?.(product);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete?.(product.id);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full shadow-lg mb-4 overflow-hidden border-4 border-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <span className="text-xs font-semibold text-gray-400 tracking-wide uppercase mb-1">
          {categoryName}
        </span>
        <h3 className="font-bold text-gray-800 text-base mb-2 line-clamp-2 h-12 flex items-center">
          {product.name}
        </h3>
        <p className="font-extrabold text-gray-900 text-lg">{product.price}</p>
      </div>
    </div>
  );
};

export default DishCard;

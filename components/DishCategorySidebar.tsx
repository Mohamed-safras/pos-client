import React from "react";
import type { LucideIcon } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon?: string; // We'll render emojis or images as per design
  count: number;
}

interface DishCategorySidebarProps {
  categories: Category[];
  selectedId: string;
  onSelectCallback: (id: string) => void;
}

// Helper to render icon based on string or just hardcode for demo
const CategoryItem = ({
  category,
  isActive,
  onClick,
}: {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-200 group ${
      isActive
        ? "bg-white border border-[#1f1f1f] shadow-sm"
        : "bg-white border border-transparent hover:bg-gray-50"
    }`}
  >
    <div className="flex items-center gap-3">
      <span className="text-xl">{category.icon}</span>
      <span
        className={`font-semibold ${
          isActive
            ? "text-[#1f1f1f]"
            : "text-gray-500 group-hover:text-gray-800"
        }`}
      >
        {category.name}
      </span>
    </div>
    <span
      className={`text-sm font-bold w-8 h-8 flex items-center justify-center rounded-lg ${
        isActive ? "bg-[#1f1f1f] text-white" : "bg-gray-100 text-gray-500"
      }`}
    >
      {category.count}
    </span>
  </button>
);

const DishCategorySidebar: React.FC<DishCategorySidebarProps> = ({
  categories,
  selectedId,
  onSelectCallback,
}) => {
  return (
    <div className="w-80 flex flex-col h-full pr-6 border-r border-gray-100 bg-[#fafafa]">
      <h2 className="text-xl font-bold text-gray-800 mb-6 pl-2">
        Dishes Category
      </h2>
      <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-4">
        {categories.map((cat) => (
          <CategoryItem
            key={cat.id}
            category={cat}
            isActive={cat.id === selectedId}
            onClick={() => onSelectCallback(cat.id)}
          />
        ))}
      </div>

      <div className="pt-4 mt-auto">
        <button className="w-full py-4 rounded-2xl bg-[#1f1f1f] text-white font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg active:scale-95">
          <span className="text-xl font-light">+</span>
          Add New Category
        </button>
      </div>
    </div>
  );
};

export default DishCategorySidebar;

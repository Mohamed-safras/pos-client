import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Search, RefreshCcw, LayoutGrid, List } from "lucide-react";
import CategoryFilter from "components/CategoryFilter";
import ProductGrid from "components/ProductGrid";
import ProductList from "components/ProductList";
import CartSidebar from "components/CartSidebar";
import { addToCart } from "store/slices/cartSlice";
import type { Product } from "types";

// Mock Data
const CATEGORIES = [
  "All",
  "Beverages",
  "Main Course",
  "Dessert",
  "Appetizer",
  "Pasta",
  "Salad",
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Butter Chicken",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2940&auto=format&fit=crop",
    price: "$12.64",
    status: "Available",
    sellCount: 120,
    viewCount: 500,
    earning: "$1500",
    stock: 20,
  },
  {
    id: 2,
    name: "French Fries",
    image:
      "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=2825&auto=format&fit=crop",
    price: "$7.50",
    status: "Available",
    sellCount: 300,
    viewCount: 800,
    earning: "$2250",
    stock: 50,
  },
  {
    id: 3,
    name: "Roast Beef",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2940&auto=format&fit=crop",
    price: "$29.00",
    status: "Available",
    sellCount: 50,
    viewCount: 200,
    earning: "$1450",
    stock: 10,
  },
  {
    id: 4,
    name: "Sauerkraut",
    image:
      "https://images.unsplash.com/photo-1584285116773-67756f4dc9e8?q=80&w=2835&auto=format&fit=crop",
    price: "$11.55",
    status: "Available",
    sellCount: 80,
    viewCount: 300,
    earning: "$924",
    stock: 15,
  },
  {
    id: 5,
    name: "Beef Kebab",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2787&auto=format&fit=crop",
    price: "$14.95",
    status: "Out of stock",
    sellCount: 90,
    viewCount: 400,
    earning: "$1345",
    stock: 0,
  },
  {
    id: 6,
    name: "Fish and Chips",
    image:
      "https://images.unsplash.com/photo-1579208575657-c52968460141?q=80&w=2787&auto=format&fit=crop",
    price: "$23.05",
    status: "Available",
    sellCount: 150,
    viewCount: 600,
    earning: "$3457",
    stock: 30,
  },
  {
    id: 7,
    name: "Wagyu Steak",
    image:
      "https://images.unsplash.com/photo-1544025162-d76690b67f14?q=80&w=2788&auto=format&fit=crop",
    price: "$31.17",
    status: "Available",
    sellCount: 150,
    viewCount: 600,
    earning: "$3457",
    stock: 30,
  },
  {
    id: 8,
    name: "Chicken Ramen",
    image:
      "https://images.unsplash.com/photo-1557872943-16a5acbcbce8?q=80&w=2888&auto=format&fit=crop",
    price: "$17.70",
    status: "Available",
    sellCount: 150,
    viewCount: 600,
    earning: "$3457",
    stock: 30,
  },
];

const Pos = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts =
    selectedCategory === "All"
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter(
          (p) =>
            p.status ===
            "Available" /* Just mock filter actually doing nothing relevant to cat yet */
        );
  // In real app, products would have category field. Mock just returns all or some interaction.

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] gap-6 p-6 bg-gray-50 overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-6 shrink-0">
          <h1 className="text-2xl font-bold text-gray-800">Menu Order</h1>
          <div className="flex gap-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search Menu..."
                className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 w-64 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
              />
            </div>
            <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-white text-gray-600 transition-colors bg-white shadow-sm">
              <RefreshCcw size={20} />
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6 shrink-0">
          <CategoryFilter
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Products Grid - Scrollable */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-gray-800">Choose Dishes</h2>
            <div className="flex gap-2 p-1 bg-white rounded-lg border border-gray-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#1f1f1f] text-white shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-[#1f1f1f] text-white shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          ) : (
            <ProductList
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          )}
        </div>
      </div>

      {/* Right Sidebar - Cart */}
      <div className="w-[400px] shrink-0 h-full">
        <CartSidebar />
      </div>
    </div>
  );
};

export default Pos;

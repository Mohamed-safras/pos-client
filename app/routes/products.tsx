import { useEffect, useState } from "react";
// import { Header } from "~/products/Header"; // Removed old header
// import { ProductTable } from "~/products/producttable"; // Removed old table
import ProductForm from "components/ProductForm";
import DishCategorySidebar from "components/DishCategorySidebar";
import DishCard from "components/DishCard";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { fetchProducts, createProduct } from "store/slices/productsSlice";
import { Search, Plus, LayoutGrid, List, Filter } from "lucide-react";
import type { Route } from "./+types/products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Manage Dishes" },
    { name: "description", content: "Manage restaurant menu and products" },
  ];
}

// Mock Categories based on Image
const MOCK_CATEGORIES = [
  { id: "all", name: "All Dishes", icon: "🍛", count: 154 },
  { id: "breakfast", name: "Breakfast", icon: "🥞", count: 12 },
  { id: "beef", name: "Beef Dishes", icon: "🥩", count: 5 },
  { id: "biryani", name: "Biryani", icon: "🍚", count: 8 },
  { id: "chicken", name: "Chicken Dishes", icon: "🍗", count: 10 },
  { id: "dessert", name: "Desserts", icon: "🍰", count: 19 },
  { id: "dinner", name: "Dinner", icon: "🥧", count: 8 },
  { id: "drinks", name: "Drinks", icon: "🍹", count: 15 },
];

export default function Products() {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null); // Product to edit
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    // 1. Search Query
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // 2. Category Filter (Simple mapping for demo)
    // If 'all', return true
    if (selectedCategory === "all") return matchesSearch;

    // We try to match the category name from sidebar to product category
    // Sidebar IDs: breakfast, beef, etc.
    // Product Categories (from Form): Main Course, Beverages, etc.
    // This is a loose match for demo purposes since data might not align perfectly
    const categoryName =
      MOCK_CATEGORIES.find((c) => c.id === selectedCategory)?.name || "";

    // Check if product category includes the selected category id or name (loose matching)
    const productCat = (product.category || "").toLowerCase();
    const targetCat = selectedCategory.toLowerCase();
    const targetName = categoryName.toLowerCase();

    // Example: 'beef' matches if product category contains 'beef'
    const matchesCategory =
      productCat.includes(targetCat) ||
      productCat.includes(targetName) ||
      (selectedCategory === "dinner" &&
        (productCat === "main" || productCat === "main course")); // mapping example

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    setEditingProduct(null); // Clear editing state
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm("Are you sure you want to delete this dish?")) {
      try {
        // Assuming deleteProduct action exists in slice
        await dispatch({ type: "products/deleteProduct", payload: id });
      } catch (e) {
        console.error("Delete failed", e);
      }
    }
  };

  const handleToggleSelect = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleFormSubmit = async (data: any) => {
    try {
      if (editingProduct) {
        // Update
        await dispatch({
          type: "products/updateProduct",
          payload: { id: editingProduct.id, product: data },
        });
      } else {
        // Create
        await dispatch(createProduct(data)).unwrap();
      }
      setIsFormOpen(false);
      setEditingProduct(null);
    } catch (err) {
      console.error("Failed to save product:", err);
    }
  };

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] gap-6 p-6 bg-[#fafafa]">
      {/* Sidebar Area */}
      <DishCategorySidebar
        categories={MOCK_CATEGORIES}
        selectedId={selectedCategory}
        onSelectCallback={setSelectedCategory}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-8 shrink-0">
          <h1 className="text-2xl font-bold text-gray-800">Manage Dishes</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-4 py-3 rounded-2xl border border-gray-200 w-80 focus:ring-2 focus:ring-[#1f1f1f] focus:border-transparent outline-none transition-all bg-white"
              />
            </div>
            <button
              onClick={handleAddProduct}
              className="px-6 py-3 rounded-2xl bg-[#00B087] text-white font-bold hover:bg-[#009e7a] transition-colors shadow-md flex items-center gap-2"
            >
              <Plus size={20} />
              Add New Dishes
            </button>
          </div>
        </div>

        {/* Category Header & Controls */}
        <div className="flex justify-between items-center mb-6 shrink-0">
          <h2 className="text-xl font-bold text-gray-800">
            {MOCK_CATEGORIES.find((c) => c.id === selectedCategory)?.name ||
              "All Dishes"}
            <span className="text-gray-400 font-medium ml-2 text-lg">
              ({filteredProducts.length})
            </span>
          </h2>
          <div className="flex gap-3">
            <div className="flex gap-1 bg-white p-1 rounded-xl border border-gray-200">
              <button className="p-2 rounded-lg bg-[#00B087] text-white shadow-sm">
                <LayoutGrid size={18} />
              </button>
              <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600">
                <List size={18} />
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {loading ? (
            <div className="h-64 flex items-center justify-center text-gray-400">
              Loading dishes...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
              {/* Special "Add New" Card */}
              <button
                onClick={handleAddProduct}
                className="bg-white rounded-2xl p-4 border-2 border-dashed border-[#00B087]/50 flex flex-col items-center justify-center gap-4 text-[#00B087] hover:bg-[#00B087]/5 transition-colors group h-full min-h-[300px]"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#00B087] text-white flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg shadow-[#00B087]/30">
                  <Plus size={32} />
                </div>
                <span className="font-bold text-lg max-w-[140px] text-center">
                  Add New Dish to{" "}
                  {MOCK_CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                </span>
              </button>

              {filteredProducts.map((product) => (
                <DishCard
                  key={product.id}
                  product={product}
                  categoryName={product.category || "Dish"}
                  selected={selectedProducts.includes(product.id)}
                  onToggleSelect={handleToggleSelect}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {isFormOpen && (
        <ProductForm
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={editingProduct}
        />
      )}
    </div>
  );
}

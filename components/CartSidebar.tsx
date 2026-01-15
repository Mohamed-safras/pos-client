import React, { useMemo, useState } from "react";
import { Trash2, Plus, Minus, CreditCard, User, Utensils } from "lucide-react";
import { type CartItem } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../store/slices/cartSlice";
import { createOrder } from "../store/slices/ordersSlice";

const CartSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const [selectedOrderType, setSelectedOrderType] = useState("Dine-in");
  const [selectedTable, setSelectedTable] = useState("A-12");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const { subtotal, tax, discount, total } = useMemo(() => {
    const sub = cartItems.reduce((acc, item) => {
      const price = parseFloat(item.product.price.replace(/[^0-9.]/g, ""));
      return acc + price * item.quantity;
    }, 0);

    const taxVal = sub * 0.1; // 10% tax
    const discountVal = 0; // Fixed discount for now
    const totalVal = sub + taxVal - discountVal;

    return {
      subtotal: sub,
      tax: taxVal,
      discount: discountVal,
      total: totalVal,
    };
  }, [cartItems]);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    const orderData = {
      paymentType: paymentMethod,
      orderItems: cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      // In a real app, we'd also send orderType and tableNo
    };

    try {
      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-l-2xl shadow-xl h-full flex flex-col w-[400px] border-l border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center mb-1">
          <h2 className="font-bold text-xl text-gray-800">Order Summary</h2>
          <span className="text-gray-400 text-sm font-medium">#B12309</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Utensils size={48} className="mb-4 opacity-20" />
            <p>No items in cart</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.product.id} className="flex gap-4 group">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-800 line-clamp-1">
                    {item.product.name}
                  </h4>
                  <span className="font-bold text-gray-900">
                    {item.product.price}
                  </span>
                </div>
                {/* Variant notes placeholder */}
                <p className="text-xs text-gray-400 mb-2">Note: None</p>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            productId: item.product.id,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                      className="w-6 h-6 flex items-center justify-center rounded-md bg-white shadow-sm hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            productId: item.product.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                      className="w-6 h-6 flex items-center justify-center rounded-md bg-[#1f1f1f] text-white shadow-sm hover:bg-black transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.product.id))}
                    className="ml-auto text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-500 text-sm">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-800">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-gray-500 text-sm">
            <span>Tax (10%)</span>
            <span className="font-semibold text-gray-800">
              ${tax.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-gray-500 text-sm border-b border-dashed border-gray-300 pb-3">
            <span>Discount</span>
            <span className="font-semibold text-green-500">
              -${discount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 pt-1">
            <span>Total Payment</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Order Details Selectors */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
            <span className="text-sm font-medium text-gray-600 pl-1">
              Order Type
            </span>
            <select
              value={selectedOrderType}
              onChange={(e) => setSelectedOrderType(e.target.value)}
              className="bg-transparent text-sm font-bold text-gray-800 outline-none cursor-pointer"
            >
              <option value="Dine-in">Dine-in</option>
              <option value="Take Away">Take Away</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>
          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
            <span className="text-sm font-medium text-gray-600 pl-1">
              Table No.
            </span>
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              className="bg-transparent text-sm font-bold text-gray-800 outline-none cursor-pointer"
            >
              <option value="A-12">A-12</option>
              <option value="A-13">A-13</option>
              <option value="B-01">B-01</option>
            </select>
          </div>
          {/* Simple Payment Method Toggle for Demo */}
          <div className="flex bg-white p-1 rounded-xl border border-gray-200">
            {["Cash", "Card", "UPI"].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${paymentMethod === method ? "bg-[#1f1f1f] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
          className="w-full bg-[#1f1f1f] text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-all shadow-lg shadow-gray-200 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;

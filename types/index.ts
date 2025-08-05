export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category?: string;
  createdAt: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  orderDate: string;
  totalAmount: number;
  paymentType: string;
  status: string;
  orderItems: OrderItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SalesReport {
  orders: Order[];
  totalSales: number;
  orderCount: number;
  startDate: string;
  endDate: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export type PaymentType = "CASH" | "CARD" | "UPI" | "BANK_TRANSFER";
export type OrderStatus = "COMPLETED" | "PENDING" | "CANCELLED";

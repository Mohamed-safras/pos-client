export interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  status: "Available" | "Out of stock" | "Active";
  sellCount: number;
  viewCount: number;
  earning: string;
  stock: number;
  category?: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  customerName: string;
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

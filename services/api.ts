import axios, { type AxiosResponse } from "axios";
import type { Order, Product, SalesReport } from "types";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Mock Data for fallback
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
];

// Product API calls
// NOTE: switching to mock implementation for demo purposes as no backend is running
export const productAPI = {
  getAll: (): Promise<AxiosResponse<Product[]>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: MOCK_PRODUCTS,
          status: 200,
          statusText: "OK",
          headers: {},
          config: {} as any,
        });
      }, 500);
    });
  },
  getById: (id: number): Promise<AxiosResponse<Product>> =>
    api.get(`/products/${id}`),
  create: (
    product: Omit<Product, "id" | "createdAt">
  ): Promise<AxiosResponse<Product>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct = {
          ...product,
          id: Math.floor(Math.random() * 1000),
        } as Product;
        MOCK_PRODUCTS.push(newProduct);
        resolve({
          data: newProduct,
          status: 201,
          statusText: "Created",
          headers: {},
          config: {} as any,
        });
      }, 500);
    });
  },
  update: (
    id: number,
    product: Partial<Product>
  ): Promise<AxiosResponse<Product>> => api.put(`/products/${id}`, product),
  delete: (id: number): Promise<AxiosResponse<void>> =>
    api.delete(`/products/${id}`),
  getByCategory: (category: string): Promise<AxiosResponse<Product[]>> =>
    api.get(`/products/category/${category}`),
  search: (name: string): Promise<AxiosResponse<Product[]>> =>
    api.get(`/products/search?name=${name}`),
  getLowStock: (threshold: number = 10): Promise<AxiosResponse<Product[]>> =>
    api.get(`/products/low-stock?threshold=${threshold}`),
  getOutOfStock: (): Promise<AxiosResponse<Product[]>> =>
    api.get("/products/out-of-stock"),
};

// Order API calls
// Mock Orders
// Mock Orders
const MOCK_ORDERS: Order[] = [
  {
    id: 1001,
    customerName: "Walk-in Customer",
    totalAmount: 45.5,
    status: "Completed",
    paymentType: "Cash",
    orderDate: "2023-10-25T10:30:00Z",
    orderItems: [],
  },
  {
    id: 1002,
    customerName: "Table 5",
    totalAmount: 120.0,
    status: "Pending",
    paymentType: "Card",
    orderDate: "2023-10-25T11:15:00Z",
    orderItems: [],
  },
];

const MOCK_SALES_REPORT: SalesReport = {
  orders: MOCK_ORDERS,
  totalSales: 15600.5,
  orderCount: 145,
  startDate: "2023-10-01",
  endDate: "2023-10-31",
};

// Order API calls
export const orderAPI = {
  getAll: (): Promise<AxiosResponse<Order[]>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: MOCK_ORDERS,
          status: 200,
          statusText: "OK",
          headers: {},
          config: {} as any,
        });
      }, 500);
    });
  },
  getById: (id: number): Promise<AxiosResponse<Order>> =>
    api.get(`/orders/${id}`),
  create: (order: {
    paymentType: string;
    orderItems: Array<{ productId: number; quantity: number }>;
  }): Promise<AxiosResponse<Order>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder = {
          id: Math.floor(Math.random() * 10000),
          customerName: "New Customer",
          totalAmount: 0, // Should be calc
          status: "Pending",
          paymentType: order.paymentType,
          orderDate: new Date().toISOString(),
          orderItems: [],
        } as any;
        MOCK_ORDERS.unshift(newOrder);
        resolve({
          data: newOrder,
          status: 201,
          statusText: "Created",
          headers: {},
          config: {} as any,
        });
      }, 500);
    });
  },
  getByPaymentType: (paymentType: string): Promise<AxiosResponse<Order[]>> =>
    api.get(`/orders/payment-type/${paymentType}`),
  getSalesReport: (
    startDate?: string,
    endDate?: string
  ): Promise<AxiosResponse<SalesReport>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: MOCK_SALES_REPORT,
          status: 200,
          statusText: "OK",
          headers: {},
          config: {} as any,
        });
      }, 500);
    });
  },
  getDailyReport: (): Promise<AxiosResponse<SalesReport>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            ...MOCK_SALES_REPORT,
            totalSales: 540.0,
            orderCount: 12,
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
          },
          status: 200,
          statusText: "OK",
          headers: {},
          config: {} as any,
        });
      }, 500);
    });
  },
  getWeeklyReport: (): Promise<AxiosResponse<SalesReport>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: { ...MOCK_SALES_REPORT, totalSales: 3500.0, orderCount: 85 },
          status: 200,
          statusText: "OK",
          headers: {},
          config: {} as any,
        });
      }, 500);
    });
  },
  getMonthlyReport: (): Promise<AxiosResponse<SalesReport>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: MOCK_SALES_REPORT,
          status: 200,
          statusText: "OK",
          headers: {},
          config: {} as any,
        });
      }, 500);
    });
  },
};

// Error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    if (error.response?.status === 404) {
      throw new Error("Resource not found");
    } else if (error.response?.status === 400) {
      throw new Error(error.response.data?.message || "Bad request");
    } else if (error.response?.status >= 500) {
      throw new Error("Server error. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
);

export default api;

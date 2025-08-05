import axios, { AxiosResponse } from "axios";
import { Product, Order, SalesReport } from "../types";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Product API calls
export const productAPI = {
  getAll: (): Promise<AxiosResponse<Product[]>> => api.get("/products"),
  getById: (id: number): Promise<AxiosResponse<Product>> =>
    api.get(`/products/${id}`),
  create: (
    product: Omit<Product, "id" | "createdAt">
  ): Promise<AxiosResponse<Product>> => api.post("/products", product),
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
export const orderAPI = {
  getAll: (): Promise<AxiosResponse<Order[]>> => api.get("/orders"),
  getById: (id: number): Promise<AxiosResponse<Order>> =>
    api.get(`/orders/${id}`),
  create: (order: {
    paymentType: string;
    orderItems: Array<{ productId: number; quantity: number }>;
  }): Promise<AxiosResponse<Order>> => api.post("/orders", order),
  getByPaymentType: (paymentType: string): Promise<AxiosResponse<Order[]>> =>
    api.get(`/orders/payment-type/${paymentType}`),
  getSalesReport: (
    startDate?: string,
    endDate?: string
  ): Promise<AxiosResponse<SalesReport>> => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    return api.get(`/orders/report?${params.toString()}`);
  },
  getDailyReport: (): Promise<AxiosResponse<SalesReport>> =>
    api.get("/orders/report/daily"),
  getWeeklyReport: (): Promise<AxiosResponse<SalesReport>> =>
    api.get("/orders/report/weekly"),
  getMonthlyReport: (): Promise<AxiosResponse<SalesReport>> =>
    api.get("/orders/report/monthly"),
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

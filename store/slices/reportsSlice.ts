import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { orderAPI } from "../../services/api";
import type { SalesReport } from "types";

interface ReportsState {
  dailyReport: SalesReport | null;
  weeklyReport: SalesReport | null;
  monthlyReport: SalesReport | null;
  customReport: SalesReport | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReportsState = {
  dailyReport: null,
  weeklyReport: null,
  monthlyReport: null,
  customReport: null,
  loading: false,
  error: null,
};

export const fetchDailyReport = createAsyncThunk(
  "reports/fetchDailyReport",
  async () => {
    const response = await orderAPI.getDailyReport();
    return response.data;
  }
);

export const fetchWeeklyReport = createAsyncThunk(
  "reports/fetchWeeklyReport",
  async () => {
    const response = await orderAPI.getWeeklyReport();
    return response.data;
  }
);

export const fetchMonthlyReport = createAsyncThunk(
  "reports/fetchMonthlyReport",
  async () => {
    const response = await orderAPI.getMonthlyReport();
    return response.data;
  }
);

export const fetchCustomReport = createAsyncThunk(
  "reports/fetchCustomReport",
  async ({ startDate, endDate }: { startDate: string; endDate: string }) => {
    const response = await orderAPI.getSalesReport(startDate, endDate);
    return response.data;
  }
);

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyReport.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyReport = action.payload;
      })
      .addCase(fetchDailyReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch daily report";
      })
      .addCase(fetchWeeklyReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeeklyReport.fulfilled, (state, action) => {
        state.loading = false;
        state.weeklyReport = action.payload;
      })
      .addCase(fetchWeeklyReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch weekly report";
      })
      .addCase(fetchMonthlyReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonthlyReport.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyReport = action.payload;
      })
      .addCase(fetchMonthlyReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch monthly report";
      })
      .addCase(fetchCustomReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomReport.fulfilled, (state, action) => {
        state.loading = false;
        state.customReport = action.payload;
      })
      .addCase(fetchCustomReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch custom report";
      });
  },
});

export const { clearError } = reportsSlice.actions;
export default reportsSlice.reducer;

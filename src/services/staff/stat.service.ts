import type { StatsOverviewResponse } from "@constant/response/StatsOverviewResponse";
import httpClient from "..";
import type { MonthlyRevenueResponse } from "@constant/response/MonthlyRevenueResponse";
import type { MonthlyBookingStatsResponse } from "@constant/response/MonthlyBookingStatsResponse";
import type { RevenueOccupancyStatsResponse } from "@constant/response/RevenueOccupancyStatsResponse";
import type { ReviewStatsResponse } from "@constant/response/ReviewStatsResponse";
import type { ApiResponse } from "@constant/response/ApiResponse";
import type { BookingResponse } from "@constant/response/BookingResponse";
import type { SearchFilter } from "@constant/internal/SearchFilter";

const BASE_URL = "/staff/stats";

class StaffStatService {
  static async getOverview(): Promise<StatsOverviewResponse> {
    const { data } = await httpClient.get(`${BASE_URL}/overview`);

    return data;
  }

  static async getReviewStats(): Promise<ReviewStatsResponse> {
    const { data } = await httpClient.get(`${BASE_URL}/reviews`);

    return data;
  }

  static async getRevenue(): Promise<MonthlyRevenueResponse> {
    const { data } = await httpClient.get(`${BASE_URL}/revenue`);

    return data;
  }

  static async getBookings(
    month?: string,
  ): Promise<MonthlyBookingStatsResponse> {
    const { data } = await httpClient.get(`${BASE_URL}/bookings`, {
      params: { month },
    });

    return data;
  }

  static async getOccupancy(): Promise<RevenueOccupancyStatsResponse> {
    const { data } = await httpClient.get(`${BASE_URL}/occupancy`);

    return data;
  }

  static async getCheckins(
    params?: SearchFilter,
  ): Promise<ApiResponse<BookingResponse[]>> {
    return await httpClient.get(`${BASE_URL}/checkins`, {
      params,
    });
  }

  static async getCheckouts(
    params?: SearchFilter,
  ): Promise<ApiResponse<BookingResponse[]>> {
    return await httpClient.get(`${BASE_URL}/checkouts`, {
      params,
    });
  }
}

export default StaffStatService;

export interface MonthlyBookingStatsResponse {
  month: string;

  total: number;

  success: number;

  cancelled: number;

  cancelRate: number;
}

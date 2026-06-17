export interface MonthlyRevenueResponse {
  months: MonthlyRevenueItemResponse[];
}

export interface MonthlyRevenueItemResponse {
  month: string; 

  label: string; 

  revenue: number;
}

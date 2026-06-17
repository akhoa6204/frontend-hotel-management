export interface StatsOverviewResponse {
  todayBookings: number;

  totalRooms: number;

  availableRooms: number;

  occupancyPct: number;

  weekRevenue: number;

  newCustomers: number;

  bookingsDeltaPct?: number;

  occupancyDeltaPct?: number;

  availableRoomsDelta?: number;

  weekRevenueDeltaPct?: number;

  newCustomersDelta?: number;

  totalCleanRooms?: number;
}

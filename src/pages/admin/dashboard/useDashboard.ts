import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import StaffStatService from "@services/staff/stat.service";
import { SearchFilter } from "@constant/internal/SearchFilter";

const PAGE_SIZE = 5;
const REVENUE_MONTHS = 6;

const SUMMARY_QK = ["dashboard", "summary"] as const;
const MONTHLY_KPIS_QK = ["dashboard", "monthly-kpis"] as const;
const MONTHLY_REVENUE_QK = (m: number) =>
  ["dashboard", "monthly-revenue", m] as const;
const CHECKINS_QK = (p: SearchFilter) =>
  ["dashboard", "checkins", p.page, p.limit] as const;
const CHECKOUTS_QK = (p: SearchFilter) =>
  ["dashboard", "checkouts", p.page, p.limit] as const;
const MONTHLY_BOOKING_STATS_QK = [
  "dashboard",
  "monthly-booking-stats",
] as const;
const TOP_CUSTOMERS_QK = (month?: string) =>
  ["dashboard", "top-customers", month ?? "current"] as const;

const useDashboard = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  // phân trang
  const [checkinPage, setCheckinPage] = useState<number>(1);
  const [checkoutPage, setCheckoutPage] = useState<number>(1);

  const checkinsParams: SearchFilter = { page: checkinPage, limit: PAGE_SIZE };
  const checkoutsParams: SearchFilter = {
    page: checkoutPage,
    limit: PAGE_SIZE,
  };

  // 1) Summary
  const { data: summary, isLoading: loadingSummary } = useQuery({
    queryKey: SUMMARY_QK,
    queryFn: StaffStatService.getOverview,
    staleTime: 30_000,
    retry: 1,
  });

  // 2) Công suất phòng / KPI doanh thu hiện tại
  const { data: monthlyKpis, isLoading: loadingMonthlyKpis } = useQuery({
    queryKey: MONTHLY_KPIS_QK,
    queryFn: StaffStatService.getOccupancy,
    staleTime: 30_000,
    retry: 1,
  });

  // 3) Doanh thu hiện tại
  const { data: monthlyRevenue, isLoading: loadingMonthlyRevenue } = useQuery({
    queryKey: MONTHLY_REVENUE_QK(REVENUE_MONTHS),
    queryFn: StaffStatService.getRevenue,
    staleTime: 60_000,
    retry: 1,
  });

  // 4) Check-ins
  const { data: checkinsRes, isLoading: loadingCheckins } = useQuery({
    queryKey: CHECKINS_QK(checkinsParams),
    queryFn: () => StaffStatService.getCheckins(checkinsParams),
    staleTime: 15_000,
    retry: 1,
  });
  const checkins = checkinsRes?.data || [];
  const checkinsMeta = checkinsRes?.pagination;

  // 5) Check-outs
  const { data: checkoutsRes, isLoading: loadingCheckouts } = useQuery({
    queryKey: CHECKOUTS_QK(checkoutsParams),
    queryFn: () => StaffStatService.getCheckouts(checkoutsParams),
    staleTime: 15_000,
    retry: 1,
  });
  const checkouts = checkoutsRes?.data ?? [];
  const checkoutsMeta = checkoutsRes?.pagination;

  // 6) Thống kê booking theo tháng
  const { data: monthlyBookingStats, isLoading: loadingMonthlyBookingStats } =
    useQuery({
      queryKey: MONTHLY_BOOKING_STATS_QK,
      queryFn: () => StaffStatService.getBookings(),
      staleTime: 30_000,
      retry: 1,
    });

  // handlers
  const handleChangeCheckinPage = (page: number) => setCheckinPage(page);
  const handleChangeCheckoutPage = (page: number) => setCheckoutPage(page);

  const handleCheckin = (id: string) => {
    navigate("/manager/bookings", {
      state: { bookingId: id, action: "CHECK_IN" },
    });
  };
  const handleCheckout = (id: string) => {
    navigate("/manager/bookings", {
      state: { bookingId: id, action: "CHECK_OUT" },
    });
  };

  // utils
  const refetchAll = async () => {
    await Promise.all([
      qc.invalidateQueries({ queryKey: SUMMARY_QK }),
      qc.invalidateQueries({ queryKey: MONTHLY_KPIS_QK }),
      qc.invalidateQueries({ queryKey: MONTHLY_REVENUE_QK(REVENUE_MONTHS) }),
      qc.invalidateQueries({ queryKey: CHECKINS_QK(checkinsParams) }),
      qc.invalidateQueries({ queryKey: CHECKOUTS_QK(checkoutsParams) }),
      qc.invalidateQueries({ queryKey: MONTHLY_BOOKING_STATS_QK }),
    ]);
  };

  return {
    // summary
    summary,
    loadingSummary,

    // monthly KPIs
    monthlyKpis,
    loadingMonthlyKpis,

    // monthly revenue
    monthlyRevenue,
    loadingMonthlyRevenue,

    // monthly stats
    monthlyBookingStats,
    loadingMonthlyBookingStats,

    // checkins
    checkins,
    loadingCheckins,
    checkinsMeta,
    handleChangeCheckinPage,

    // checkouts
    checkouts,
    loadingCheckouts,
    checkoutsMeta,
    handleChangeCheckoutPage,

    // const
    PAGE_SIZE,

    // actions
    handleCheckin,
    handleCheckout,

    // utils
    refetchAll,
  };
};

export default useDashboard;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import type { SearchFilter } from "@constant/internal/SearchFilter";
import StaffStatService from "@services/staff/stat.service";

const PAGE_SIZE = 5;

const SUMMARY_QK = ["dashboard", "summary"] as const;
const CHECKINS_QK = (p: SearchFilter) =>
  ["dashboard", "checkins", p.page, p.limit] as const;
const CHECKOUTS_QK = (p: SearchFilter) =>
  ["dashboard", "checkouts", p.page, p.limit] as const;

const useFrontDesk = () => {
  const navigate = useNavigate();

  const [checkinPage, setCheckinPage] = useState<number>(1);
  const [checkoutPage, setCheckoutPage] = useState<number>(1);

  const checkinsParams: SearchFilter = { page: checkinPage, limit: PAGE_SIZE };
  const checkoutsParams: SearchFilter = {
    page: checkoutPage,
    limit: PAGE_SIZE,
  };

  const { data: summary, isLoading: loadingSummary, isError: summaryError, refetch: refetchSummary } = useQuery({
    queryKey: SUMMARY_QK,
    queryFn: StaffStatService.getOverview,
    staleTime: 30_000,
    retry: 1,
  });

  const { data: checkinsRes, isLoading: loadingCheckins, isError: checkinsError, refetch: refetchCheckins } = useQuery({
    queryKey: CHECKINS_QK(checkinsParams),
    queryFn: () => StaffStatService.getCheckins(checkinsParams),
    staleTime: 15_000,
    retry: 1,
  });
  const checkins = checkinsRes?.data ?? [];
  const checkinsMeta = checkinsRes?.pagination;

  const { data: checkoutsRes, isLoading: loadingCheckouts, isError: checkoutsError, refetch: refetchCheckouts } = useQuery({
    queryKey: CHECKOUTS_QK(checkoutsParams),
    queryFn: () => StaffStatService.getCheckouts(checkoutsParams),
    staleTime: 15_000,
    retry: 1,
  });
  const checkouts = checkoutsRes?.data ?? [];
  const checkoutsMeta = checkoutsRes?.pagination;

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

  const retry = () => Promise.all([
    refetchSummary(),
    refetchCheckins(),
    refetchCheckouts(),
  ]);

  return {
    summary,
    loadingSummary,
    summaryError,
    checkins,
    loadingCheckins,
    checkinsError,
    checkinsMeta,
    handleChangeCheckinPage,
    checkouts,
    loadingCheckouts,
    checkoutsError,
    checkoutsMeta,
    handleChangeCheckoutPage,
    handleCheckin,
    handleCheckout,
    retry,
  };
};

export default useFrontDesk;

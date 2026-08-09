import MyReviewService from "@services/me/review.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 5;

const useMyReview = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["my-reviews", page],
    queryFn: () => MyReviewService.getList({ page, limit: PAGE_SIZE }),
  });

  const reviews = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 0;

  return {
    reviews,
    totalPages,
    page,
    onChangePage: setPage,
    loading: isLoading,
    error: isError,
    retry: refetch,
    onClickReviewCard: (id: number, bookingId: string) =>
      navigate(`/account/reviews/${id}`, { state: { bookingId } }),
  };
};

export default useMyReview;

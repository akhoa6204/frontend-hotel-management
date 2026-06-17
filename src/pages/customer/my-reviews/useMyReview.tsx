import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sleep } from "@utils/sleep";
import MyReviewService from "@services/me/review.service";

const PAGE_SIZE = 5;

const useMyReview = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["my-reviews", page],
    queryFn: async () => {
      return MyReviewService.getList({
        page,
        limit: PAGE_SIZE,
      });
    },
  });

  const reviews = data?.data ?? [];
  const meta = data?.pagination;
  const totalPages = meta?.totalPages ?? 0;

  const onChangePage = (page: number) => setPage(page);
  const onClickReviewCard = (id: number) => navigate(`/account/reviews/${id}`);

  return {
    reviews,
    totalPages,
    page,
    onChangePage,
    loading: isLoading,
    fetching: isFetching,
    onClickReviewCard,
  };
};

export default useMyReview;

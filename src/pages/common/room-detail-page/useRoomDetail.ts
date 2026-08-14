import GuestReviewService from "@services/guest/review.service";
import GuestRoomTypeService from "@services/guest/roomType.service";
import { useQuery } from "@tanstack/react-query";
import { buildDefaultSearchParams } from "@utils/dateRange";
import type { SearchBookingFilter } from "@constant/internal/SearchBookingFilter";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useRoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reviewPage, setReviewPage] = useState(1);
  const reviewLimit = 6;

  useEffect(() => {
    if (!id) navigate("/");
  }, [id, navigate]);

  const {
    data: room,
    isLoading: loadingRoom,
    isFetching: fetchingRoom,
  } = useQuery({
    queryKey: ["room-detail", id],
    queryFn: async () => {
      return GuestRoomTypeService.getById(Number(id));
    },
    enabled: !!id,
  });

  const { data: relatedRoomsResponse, isLoading: loadingRelatedRooms } = useQuery({
    queryKey: ["related-room-types", id],
    queryFn: () => GuestRoomTypeService.getList({
      page: 1,
      limit: 4,
      ...buildDefaultSearchParams(),
    }),
    enabled: !!id,
  });

  const {
    data: reviewsResponse,
    isLoading: loadingReviews,
    isFetching: fetchingReviews,
  } = useQuery({
    queryKey: ["room-reviews", id, reviewPage, reviewLimit],
    queryFn: async () => {
      return GuestReviewService.getReviewsByRoomType({
        roomTypeId: Number(id),
        page: reviewPage,
        limit: reviewLimit,
      });
    },
    enabled: !!id,
  });

  const {
    data: reviewStats,
    isLoading: loadingStats,
    isFetching: fetchingStats,
  } = useQuery({
    queryKey: ["room-review-stats", id],
    queryFn: async () => {
      return GuestReviewService.getOverviewReviewsByRoomType(Number(id));
    },
    enabled: !!id,
  });

  const reviews = reviewsResponse?.data ?? [];
  const meta = reviewsResponse?.pagination;

  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 0;

  const handleChangePage = (page: number) => setReviewPage(page);

  const relatedRooms = (relatedRoomsResponse?.data ?? [])
    .filter((relatedRoom) => relatedRoom.id !== Number(id))
    .slice(0, 3);

  const handleBookingRoom = (selection?: SearchBookingFilter) => {
    const dateRange = selection ?? buildDefaultSearchParams(room?.capacity);
    navigate("/search", {
      state: { ...dateRange, roomTypeId: Number(id) },
    });
  };

  const handleRelatedRoomBooking = (roomTypeId: number, capacity: number) => {
    navigate("/search", {
      state: { ...buildDefaultSearchParams(capacity), roomTypeId },
    });
  };

  return {
    /** Data */
    room,
    reviews,
    reviewStats,
    reviewMeta: meta,
    totalReviewPages: totalPages,
    reviewPage,
    relatedRooms,

    loadingRoom,
    loadingReviews,
    loadingStats,
    loadingRelatedRooms,
    fetchingRoom,
    fetchingReviews,
    fetchingStats,

    handleChangePage,
    handleBookingRoom,
    handleRelatedRoomBooking,
  };
};

export default useRoomDetail;

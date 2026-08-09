import type { ReviewResponse } from "@constant/response/ReviewResponse";
import useSnackbar from "@hooks/useSnackbar";
import MyBookingService from "@services/me/booking.service";
import MyReviewService from "@services/me/review.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export type RatingField =
  | "overall"
  | "amenities"
  | "cleanliness"
  | "comfort"
  | "locationScore"
  | "valueForMoney"
  | "hygiene";

export type ReviewForm = Required<
  Pick<
    ReviewResponse,
    | RatingField
    | "comment"
  >
>;

export type ReviewFormErrors = Partial<Record<RatingField, string>>;
export type ReviewMode = "view" | "create";

const EMPTY_FORM: ReviewForm = {
  overall: 0,
  amenities: 0,
  cleanliness: 0,
  comfort: 0,
  locationScore: 0,
  valueForMoney: 0,
  hygiene: 0,
  comment: "",
};

const RATING_FIELDS: RatingField[] = [
  "overall",
  "amenities",
  "cleanliness",
  "comfort",
  "locationScore",
  "valueForMoney",
  "hygiene",
];

const useReviewDetail = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { state } = useLocation();
  const bookingId = (state as { bookingId?: string } | null)?.bookingId;
  const mode: ReviewMode = id === "create" ? "create" : "view";
  const reviewId = mode === "view" && id ? Number(id) : undefined;
  const validReviewId = reviewId !== undefined && Number.isFinite(reviewId);
  const [createForm, setCreateForm] = useState<ReviewForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<ReviewFormErrors>({});
  const { alert, closeSnackbar, showError } = useSnackbar();

  const reviewQuery = useQuery({
    queryKey: ["review-detail", reviewId],
    queryFn: () => MyReviewService.getById(reviewId as number),
    enabled: mode === "view" && validReviewId,
  });

  const bookingQuery = useQuery({
    queryKey: ["booking-detail", bookingId],
    queryFn: () => MyBookingService.getById(bookingId as string),
    enabled: mode === "create" && !!bookingId,
  });

  const review = reviewQuery.data;
  const booking = mode === "view" ? review?.booking : bookingQuery.data;
  const form: ReviewForm | undefined =
    mode === "create"
      ? createForm
      : review
        ? {
            overall: review.overall ?? 0,
            amenities: review.amenities ?? 0,
            cleanliness: review.cleanliness ?? 0,
            comfort: review.comfort ?? 0,
            locationScore: review.locationScore ?? 0,
            valueForMoney: review.valueForMoney ?? 0,
            hygiene: review.hygiene ?? 0,
            comment: review.comment ?? "",
          }
        : undefined;

  const handleRatingChange = (field: RatingField, value: number) => {
    if (mode !== "create") return;
    setCreateForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleCommentChange = (comment: string) => {
    if (mode !== "create") return;
    setCreateForm((current) => ({ ...current, comment }));
  };

  const submitMutation = useMutation({
    mutationFn: () => {
      if (!bookingId) throw new Error("Missing booking ID");
      return MyReviewService.create({ bookingId, ...createForm });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["my-reviews"] }),
        queryClient.invalidateQueries({ queryKey: ["booking-detail", bookingId] }),
        queryClient.invalidateQueries({ queryKey: ["my-bookings"] }),
      ]);
      navigate("/account/reviews", { replace: true });
    },
    onError: () => showError("Không thể gửi đánh giá lúc này. Vui lòng thử lại."),
  });

  const handleSubmit = () => {
    if (mode !== "create") return;
    const nextErrors = RATING_FIELDS.reduce<ReviewFormErrors>((result, field) => {
      if (createForm[field] < 1) result[field] = "Vui lòng chọn mức đánh giá.";
      return result;
    }, {});

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    submitMutation.mutate();
  };

  const onBack = () =>
    mode === "create" && bookingId
      ? navigate(`/account/bookings/${bookingId}`)
      : navigate("/account/reviews");
  const onCancel = () => navigate("/account/reviews");

  const missingRequiredContext = !id || (mode === "create" && !bookingId) || (mode === "view" && !validReviewId);
  const isLoading = reviewQuery.isLoading || bookingQuery.isLoading;
  const isError = missingRequiredContext || reviewQuery.isError || bookingQuery.isError;

  return {
    mode,
    review,
    booking,
    form,
    errors,
    handleRatingChange,
    handleCommentChange,
    handleSubmit,
    onBack,
    onCancel,
    isLoading,
    isError,
    isSubmitting: submitMutation.isPending,
    alert,
    closeSnackbar,
  };
};

export default useReviewDetail;

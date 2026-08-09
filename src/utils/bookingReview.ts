import type { BookingResponse } from "@constant/response/BookingResponse";
import type { ReviewResponse } from "@constant/response/ReviewResponse";

export type BookingReviewAction =
  | { type: "write"; bookingId: string }
  | { type: "view"; reviewId: number }
  | { type: "none" };

export const getBookingReviewAction = (
  booking: Pick<BookingResponse, "status" | "hasReview">,
  bookingId: string,
  review?: Pick<ReviewResponse, "id">,
): BookingReviewAction => {
  if (booking.status !== "CHECKED_OUT") return { type: "none" };
  if (review) return { type: "view", reviewId: review.id };
  if (booking.hasReview) return { type: "none" };
  return { type: "write", bookingId };
};

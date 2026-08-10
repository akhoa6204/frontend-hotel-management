import { Box, Breadcrumbs, Container, Link as MuiLink, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useRoomDetail from "./useRoomDetail";

import ImageGallery from "./components/image-gallery";
import RoomDescription from "./components/room-description";
import ReviewSection from "./components/review-section";

// Skeletons

import Pager from "@components/pager";
import ImageGallerySkeleton from "./components/ImageGallerySkeleton";
import RoomDescriptionSkeleton from "./components/RoomDescriptionSkeleton";
import ReviewSectionSkeleton from "./components/ReviewSectionSkeleton";
import RelatedRooms from "./components/related-rooms";
import { useTranslation } from "react-i18next";

const RoomDetail = () => {
  const { t } = useTranslation("client");
  const {
    room,
    reviews,
    reviewStats,
    reviewPage,
    totalReviewPages,
    relatedRooms,
    handleChangePage,

    loadingRoom,
    loadingReviews,
    loadingStats,
    loadingRelatedRooms,
    handleBookingRoom,
    handleRelatedRoomBooking,
  } = useRoomDetail();

  const loadingRoomBlock = loadingRoom && !room;
  const loadingReviewBlock =
    (loadingReviews || loadingStats) && !reviews.length;

  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
    <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 5 }, pb: { xs: 8, md: 12 } }}>
      <Breadcrumbs aria-label={t("roomDetail.breadcrumbs.label")} sx={{ mb: 2.5, color: "text.secondary", fontSize: 14 }}><MuiLink component={Link} to="/" underline="hover">{t("roomDetail.breadcrumbs.home")}</MuiLink><MuiLink component={Link} to="/#rooms" underline="hover">{t("roomDetail.breadcrumbs.rooms")}</MuiLink><Typography variant="body2" color="text.primary">{room?.name || t("roomDetail.breadcrumbs.details")}</Typography></Breadcrumbs>
      {loadingRoomBlock ? (
        <ImageGallerySkeleton />
      ) : (
        <ImageGallery images={room?.roomTypeImages ?? []} roomName={room?.name ?? t("roomDetail.fallbackRoomName")} />
      )}

      <Box>
        {loadingRoomBlock || !room ? (
          <RoomDescriptionSkeleton />
        ) : (
          <RoomDescription
            name={room.name}
            description={room.description}
            capacity={room.capacity}
            basePrice={room.basePrice}
            discount={room.discountAmount || 0}
            amenities={room.amenities}
            rating={reviewStats?.avgOverall || 0}
            totalReviews={reviewStats?.totalReviews || 0}
            handleBookingRoom={handleBookingRoom}
          />
        )}
      </Box>

      {/* ===== REVIEW ===== */}
      <Box component="section" aria-label={t("roomDetail.reviews.sectionLabel")}>
        {loadingReviewBlock ? (
          <ReviewSectionSkeleton />
        ) : reviews.length === 0 ? (
          <Box sx={{ py: 4.5, borderTop: "1px solid", borderColor: "divider" }}><Typography component="h2" variant="h2" sx={{ fontSize: { xs: 28, md: 32 } }}>{t("roomDetail.reviews.sectionLabel")}</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>{t("roomDetail.reviews.empty")}</Typography></Box>
        ) : (
          <>
            <ReviewSection stats={reviewStats} reviews={reviews} />

            {totalReviewPages > 1 && (
              <Box mt={4} display="flex" justifyContent="center">
                <Pager
                  page={reviewPage}
                  totalPages={totalReviewPages}
                  onChange={handleChangePage}
                  siblingCount={1}
                  boundaryCount={1}
                />
              </Box>
            )}
          </>
        )}
      </Box>
      <RelatedRooms rooms={relatedRooms} loading={loadingRelatedRooms} onBooking={(relatedRoom) => handleRelatedRoomBooking(relatedRoom.id, relatedRoom.capacity)} />
    </Container>
    </Box>
  );
};

export default RoomDetail;

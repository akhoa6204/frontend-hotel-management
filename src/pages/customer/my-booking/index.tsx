import { Box, Button, Stack, Tab, Tabs, Typography } from "@mui/material";
import GlobalSnackbar from "@components/GlobalSnackbar";
import Pager from "@components/pager";
import CancelBookingDialog from "../booking-detail/components/CancelBookingDialog";
import BookingCard from "./components/BookingCard";
import BookingCardSkeleton from "./components/BookingCardSkeleton";
import NoBooking from "./components/NoBooking";
import useMyBooking, { type BookingTab } from "./useMyBooking";
import { diffNights } from "@utils/format";
import { useTranslation } from "react-i18next";

const MyBookingPage = () => {
  const { t } = useTranslation("client");
  const {
    tab,
    changeTab,
    bookings,
    page,
    totalPages,
    setPage,
    loading,
    error,
    retry,
    onSelectBooking,
    onReview,
    onViewReview,
    reviews,
    onReBook,
    cancelOpen,
    bookingToCancel,
    cancelReason,
    setCancelReason,
    openCancelDialog,
    closeCancelDialog,
    confirmCancel,
    cancelLoading,
    alert,
    closeSnackbar,
  } = useMyBooking();

  return (
    <Box sx={{ width: 1, pb: { xs: 4, md: 7 } }}>
      <Box component="header" sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography sx={{ color: "primary.main", fontSize: 12, fontWeight: 700, letterSpacing: ".16em", mb: 1 }}>
          {t("myBookings.hero.eyebrow")}
        </Typography>
        <Typography component="h1" sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 32, md: 42 }, lineHeight: 1.15 }}>
          {t("myBookings.hero.title")}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1.25, maxWidth: 650, lineHeight: 1.7 }}>
          {t("myBookings.hero.description")}
        </Typography>
      </Box>

      <Tabs
        value={tab}
        onChange={(_, value: BookingTab) => changeTab(value)}
        aria-label={t("myBookings.aria.bookingCategories")}
        variant="scrollable"
        scrollButtons={false}
        sx={{
          minHeight: 44,
          mb: { xs: 3, md: 4 },
          borderBottom: "1px solid rgba(23, 60, 75, 0.10)",
          "& .MuiTabs-indicator": { height: 2, borderRadius: 2 },
          "& .MuiTab-root": {
            minHeight: 44,
            minWidth: "auto",
            px: 0,
            mr: { xs: 3, sm: 4.5 },
            color: "text.secondary",
            fontSize: 14,
            fontWeight: 550,
            textTransform: "none",
            "&.Mui-selected": { color: "primary.main", fontWeight: 700 },
          },
        }}
      >
        <Tab value="upcoming" label={t("myBookings.tabs.upcoming")} />
        <Tab value="done" label={t("myBookings.tabs.done")} />
        <Tab value="cancelled" label={t("myBookings.tabs.cancelled")} />
      </Tabs>

      {loading ? (
        <Stack spacing={{ xs: 2.5, md: 3 }} aria-label={t("myBookings.aria.loadingBookings")}>
          {Array.from({ length: 3 }).map((_, index) => <BookingCardSkeleton key={index} />)}
        </Stack>
      ) : error ? (
        <Box sx={{ py: { xs: 6, md: 8 }, borderTop: "1px solid", borderColor: "divider" }}>
          <Typography component="h2" sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 24 }}>
            {t("myBookings.states.loadErrorTitle")}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1, mb: 2.5 }}>
            {t("myBookings.states.loadErrorDescription")}
          </Typography>
          <Button variant="outlined" onClick={() => retry()}>{t("myBookings.actions.retry")}</Button>
        </Box>
      ) : bookings.length === 0 ? (
        <NoBooking step={tab} />
      ) : (
        <>
          <Stack spacing={{ xs: 2.5, md: 3 }}>
            {bookings.map((booking) => {
              const review = reviews?.find((item) => item.bookingId === booking.id);
              return (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  reviewId={review?.id}
                  onCancel={tab === "upcoming" ? () => openCancelDialog(booking) : undefined}
                  onClick={() => onSelectBooking(booking.id)}
                  onReview={() => onReview(booking.id)}
                  onViewReview={review ? () => onViewReview(review.id) : undefined}
                  onReBook={() => onReBook(booking.room.roomType.id, diffNights(booking.checkInDate, booking.checkOutDate))}
                />
              );
            })}
          </Stack>

          {totalPages > 1 && (
            <Box sx={{ mt: 4, display: "flex", justifyContent: { xs: "center", sm: "flex-end" } }}>
              <Pager page={page} totalPages={totalPages} onChange={setPage} />
            </Box>
          )}
        </>
      )}

      {bookingToCancel && (
        <CancelBookingDialog
          open={cancelOpen}
          onClose={closeCancelDialog}
          onConfirm={confirmCancel}
          reason={cancelReason}
          onChangeReason={setCancelReason}
          loading={cancelLoading}
        />
      )}

      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </Box>
  );
};

export default MyBookingPage;

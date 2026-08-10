import Pager from "@components/pager";
import { useBookingManagementContext } from "@context/booking-management";
import type { BookingResponse } from "@constant/response/BookingResponse";
import type { BookingStatus } from "@enums/BookingStatus";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import { diffNights } from "@utils/format";
import { useTranslation } from "react-i18next";

const StatusChip = ({ status }: { status: BookingStatus }) => {
  const { t } = useTranslation("bookings");
  const map: Record<
    string,
    {
      background: string;
      color: string;
    }
  > = {
    PENDING: { background: "#FFF5E5", color: "#9A6518" },
    CONFIRMED: { background: "#EAF6F0", color: "#246548" },
    CANCELLED: { background: "#FDECEC", color: "#A43B3B" },
    CHECKED_IN: { background: "#EAF4FF", color: "#1D6FC2" },
    CHECKED_OUT: { background: "#F2F4F7", color: "#475467" },
  };
  const s = map[status] || map.PENDING;
  return (
    <Chip size="small" label={t(`status.${status}`)} sx={{ height: 26, borderRadius: 999, bgcolor: s.background, color: s.color, fontSize: 12, fontWeight: 600, border: 0 }} />
  );
};
export default function BookingTable() {
  const { t } = useTranslation(["bookings", "common"]);
  const {
    bookings,
    loadingBookingList: isLoading,
    bookingListError,
    onView,
    pagination,
    handleChangePage,
  } = useBookingManagementContext();
  const renderSkeleton = () =>
    Array.from({ length: 6 }).map((_, i) => (
      <TableRow key={i}>
        {Array.from({ length: 11 }).map((_, j) => (
          <TableCell key={j}>
            <Skeleton />
          </TableCell>
        ))}
      </TableRow>
    ));

  return (
    <>
      <TableContainer
        className="admin-scrollbar"
        component={Paper}
        sx={{
          borderRadius: "12px",
          border: "1px solid #E4E7EC",
          overflow: "hidden",
          overflowX: "auto",
        }}
        elevation={0}
      >
        <Table sx={{ minWidth: 1100 }}>
          <TableHead sx={{ backgroundColor: "#F9FAFB", "& th": { color: "#475467", fontSize: 12.5, fontWeight: 650, py: 1.4, borderColor: "#E4E7EC" } }}>
            <TableRow>
              <TableCell
                sx={{
                  position: "sticky",
                  left: 0,
                  background: "#F9FAFB",
                  zIndex: 2,
                  fontWeight: 600,
                }}
              >
                {t("columns.code", { ns: "bookings" })}
              </TableCell>

              <TableCell>{t("columns.guest", { ns: "bookings" })}</TableCell>
              <TableCell>{t("fields.phone", { ns: "common" })}</TableCell>
              <TableCell>{t("columns.room", { ns: "bookings" })}</TableCell>
              <TableCell>{t("columns.checkIn", { ns: "bookings" })}</TableCell>
              <TableCell>{t("columns.checkOut", { ns: "bookings" })}</TableCell>
              <TableCell>{t("columns.nights", { ns: "bookings" })}</TableCell>
              <TableCell>{t("fields.status", { ns: "common" })}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              renderSkeleton()
            ) : bookingListError ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                  <Typography fontWeight={600}>{t("list.loadError", { ns: "bookings" })}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{t("list.retryHint", { ns: "bookings" })}</Typography>
                </TableCell>
              </TableRow>
            ) : Array.isArray(bookings) && bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                  <Typography fontWeight={600}>{t("list.empty", { ns: "bookings" })}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{t("list.emptyHint", { ns: "bookings" })}</Typography>
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((item: BookingResponse) => {
                const nights = diffNights(item.checkInDate, item.checkOutDate);

                return (
                  <TableRow
                    key={item.id}
                    hover
                    sx={{ cursor: "pointer", height: 56, "& td": { py: 1.25, fontSize: 13.5, borderColor: "#E4E7EC" }, "&:hover": { bgcolor: "#F8FBFF" } }}
                    onClick={() => onView(item.id)}
                  >
                    <TableCell
                      sx={{
                        position: "sticky",
                        left: 0,
                        background: "#fff",
                        zIndex: 1,
                        fontWeight: 600,

                        ".MuiTableRow-root:hover &": {
                          backgroundColor: "#F8FBFF",
                        },
                      }}
                    >
                      {item.bookingCode}
                    </TableCell>

                    <TableCell>
                      <Typography fontWeight={500}>{item.guestName}</Typography>
                    </TableCell>

                    <TableCell>{item.guestPhone}</TableCell>

                    <TableCell>
                      {item.room.name} – {item.room.roomType.name}
                    </TableCell>

                    <TableCell>
                      {new Date(item.checkInDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      {new Date(item.checkOutDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell>{nights}</TableCell>

                    <TableCell><StatusChip status={item.status} /></TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {(pagination?.totalPages || 1) > 1 ? (
        <Box mt={1.5} display="flex" justifyContent="center">
          <Pager
            page={pagination?.page || 1}
            totalPages={pagination?.totalPages || 1}
            onChange={handleChangePage}
            siblingCount={1}
            boundaryCount={1}
          />
        </Box>
      ) : undefined}
    </>
  );
}

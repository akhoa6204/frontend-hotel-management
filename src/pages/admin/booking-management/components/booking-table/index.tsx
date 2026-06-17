import Pager from "@components/pager";
import { useBookingManagementContext } from "@context/booking-management";
import { BookingResponse } from "@constant/response/BookingResponse";
import { BookingStatus } from "@enums/BookingStatus";
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

const StatusChip = (status: BookingStatus) => {
  const map: Record<
    string,
    {
      label: string;
      color: "default" | "primary" | "warning" | "error" | "info" | "success";
    }
  > = {
    PENDING: { label: "Chờ xác nhận", color: "warning" },
    CONFIRMED: { label: "Đã xác nhận", color: "success" },
    CANCELLED: { label: "Đã hủy", color: "error" },
    CHECKED_IN: { label: "Đang ở", color: "primary" },
    CHECKED_OUT: { label: "Đã trả phòng", color: "default" },
  };
  const s = map[status] || map.PENDING;
  return (
    <Chip size="small" label={s.label} color={s.color} variant="outlined" />
  );
};
export default function BookingTable() {
  const {
    bookings,
    loadingBookingList: isLoading,
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
        component={Paper}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          overflowX: "auto",
        }}
        elevation={1}
      >
        <Table sx={{ minWidth: 1100 }}>
          <TableHead sx={{ backgroundColor: "#2E90FA0d" }}>
            <TableRow>
              <TableCell
                sx={{
                  position: "sticky",
                  left: 0,
                  background: "#fff",
                  zIndex: 2,
                  fontWeight: 600,
                  backgroundColor: "#2E90FA0d",
                }}
              >
                Mã
              </TableCell>

              <TableCell>Khách</TableCell>
              <TableCell>Điện thoại</TableCell>
              <TableCell>Phòng</TableCell>
              <TableCell>Check-in</TableCell>
              <TableCell>Check-out</TableCell>
              <TableCell>Đêm</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              renderSkeleton()
            ) : Array.isArray(bookings) && bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} align="center" sx={{ py: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Không có booking nào
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((item: BookingResponse) => {
                const nights = diffNights(item.checkInDate, item.checkOutDate);

                return (
                  <TableRow
                    key={item.id}
                    hover
                    sx={{ cursor: "pointer" }}
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
                          backgroundColor: "rgba(0,0,0,0.004)",
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

                    <TableCell>{StatusChip(item.status)}</TableCell>
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

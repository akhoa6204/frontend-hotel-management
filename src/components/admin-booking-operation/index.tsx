import type { BookingResponse } from "@constant/response/BookingResponse";
import type { BookingStatus } from "@enums/BookingStatus";
import { Button, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

export type BookingOperationContext = "CHECK_IN" | "CHECK_OUT";

interface Props {
  booking: BookingResponse;
  context: BookingOperationContext;
  onAction: () => void;
  loading?: boolean;
}

const statusPresentation: Record<BookingStatus, { color: string; background: string }> = {
  PENDING: { color: "#475467", background: "#F2F4F7" },
  CONFIRMED: { color: "#1D6FC2", background: "#EAF4FF" },
  CHECKED_IN: { color: "#246548", background: "#EAF6F0" },
  CHECKED_OUT: { color: "#246548", background: "#EAF6F0" },
  CANCELLED: { color: "#A43B3B", background: "#FDECEC" },
};

const getEligibleActionKey = (booking: BookingResponse, context: BookingOperationContext) => {
  if (context === "CHECK_IN" && booking.status === "CONFIRMED") return "operations.actions.checkIn";
  if (context === "CHECK_OUT" && booking.status === "CHECKED_IN" && booking.inspected) return "operations.actions.checkOut";
  return null;
};

const AdminBookingOperation = ({ booking, context, onAction, loading = false }: Props) => {
  const { t } = useTranslation(["dashboard", "common"]);
  const actionKey = getEligibleActionKey(booking, context);
  const actionLabel = actionKey ? t(actionKey, { ns: "dashboard" }) : null;

  if (actionLabel) {
    return (
      <Button
        variant="contained"
        size="small"
        disabled={loading}
        aria-label={t("operations.actionFor", {
          ns: "dashboard",
          action: actionLabel,
          target: booking.guestName || t("operations.roomTarget", {
            ns: "dashboard",
            room: booking.room?.name ?? t("operations.unknownRoom", { ns: "dashboard" }),
          }),
        })}
        onClick={onAction}
        sx={{
          minWidth: 104,
          minHeight: { xs: 40, sm: 34 },
          px: 1.75,
          flexShrink: 0,
          borderRadius: "8px",
          bgcolor: "#2E90FA",
          color: "#FFFFFF",
          fontSize: 13,
          fontWeight: 600,
          "&:hover": { bgcolor: "#1570CD" },
          "&:focus-visible": { outline: "2px solid #2E90FA", outlineOffset: 2 },
        }}
      >
        {loading ? t("states.updating", { ns: "common" }) : actionLabel}
      </Button>
    );
  }

  const status = statusPresentation[booking.status];

  return (
    <Chip
      label={t(`operations.status.${booking.status}`, { ns: "dashboard" })}
      size="small"
      sx={{
        height: 25,
        flexShrink: 0,
        border: 0,
        bgcolor: status.background,
        color: status.color,
        fontSize: 11.75,
        fontWeight: 600,
        "& .MuiChip-label": { px: 1.1 },
      }}
    />
  );
};

export default AdminBookingOperation;

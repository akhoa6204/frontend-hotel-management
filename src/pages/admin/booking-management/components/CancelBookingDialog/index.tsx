import {
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useBookingManagementContext } from "@context/booking-management";
import { useTranslation } from "react-i18next";

const CancelBookingDialog = () => {
  const { t } = useTranslation(["bookings", "common"]);
  const {
    cancelOpen,
    closeCancelDialog,
    confirmCancel,
    cancelReason,
    setCancelReason,
  } = useBookingManagementContext();
  return (
    <Dialog
      open={cancelOpen}
      onClose={closeCancelDialog}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, p: 0, overflow: "visible" },
      }}
    >
      {/* Close control */}
      <IconButton
        size="small"
        onClick={confirmCancel}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <DialogContent sx={{ pt: 5, pb: 3, px: 4 }}>
        {/* Destructive action icon */}
        <Box display="flex" justifyContent="center" mb={2}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "#FFE5E5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ErrorOutlineIcon sx={{ color: "#E53935" }} />
          </Box>
        </Box>

        {/* Title and description */}
        <Typography
          align="center"
          fontWeight={600}
          mb={0.5}
          variant="subtitle1"
        >
          {t("cancelDialog.title", { ns: "bookings" })}
        </Typography>
        <Typography
          align="center"
          variant="body2"
          color="text.secondary"
          mb={3}
        >
          {t("cancelDialog.description", { ns: "bookings" })}
        </Typography>

        {/* Cancellation reason */}
        <Stack spacing={1} mb={3}>
          <Typography variant="body2" fontWeight={500}>
            {t("cancelDialog.reason", { ns: "bookings" })}{" "}
            <Box component="span" sx={{ color: "error.main" }}>
              *
            </Box>
          </Typography>
          <TextField
            multiline
            minRows={3}
            fullWidth
            placeholder={t("cancelDialog.reasonPlaceholder", { ns: "bookings" })}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </Stack>

        {/* Dialog actions */}
        <Stack spacing={1.2} direction={"row"}>
          <Button
            variant="contained"
            fullWidth
            onClick={confirmCancel}
            sx={{
              bgcolor: "#E53935",
              textTransform: "none",
              "&:hover": { bgcolor: "#C62828" },
            }}
          >
            {t("cancelDialog.confirm", { ns: "bookings" })}
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={closeCancelDialog}
            sx={{
              textTransform: "none",
              bgcolor: "#fafafa",
            }}
          >
            {t("cancelDialog.keep", { ns: "bookings" })}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CancelBookingDialog;

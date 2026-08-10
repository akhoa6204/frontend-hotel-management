import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { BookingTab } from "../../useMyBooking";
import { useTranslation } from "react-i18next";

const NoBooking = ({ step }: { step: BookingTab }) => {
  const navigate = useNavigate();
  const { t } = useTranslation("client");
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, borderTop: "1px solid rgba(23, 60, 75, 0.10)" }}>
      <Typography component="h2" sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 23, md: 26 } }}>{t(`myBookings.empty.${step}.title`)}</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 560, lineHeight: 1.7 }}>{t(`myBookings.empty.${step}.description`)}</Typography>
      {step === "upcoming" && <Button variant="contained" onClick={() => navigate("/search")} sx={{ mt: 2.5 }}>{t("myBookings.actions.exploreRooms")}</Button>}
    </Box>
  );
};

export default NoBooking;

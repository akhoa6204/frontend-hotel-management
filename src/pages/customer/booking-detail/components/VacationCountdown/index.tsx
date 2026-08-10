import { CheckInImg } from "@assets/images";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const VacationCountdown = ({
  checkIn,
  onCancel,
}: {
  checkIn: string;
  onCancel?: () => void;
}) => {
  const { t } = useTranslation("client");
  const countdown = dayjs(checkIn)
    .startOf("day")
    .diff(dayjs().startOf("day"), "day");

  return (
    <Paper elevation={0} sx={{ mb: 1.5 }}>
      <Stack
        sx={{ px: 2.5, py: 4 }}
        alignItems="center"
        justifyContent={"center"}
      >
        {countdown > 0 ? (
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, fontSize: 24, textAlign: " center", mb: 2 }}
          >
            {t("bookingDetail.countdown.upcoming", { count: countdown })}
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 24 }}>
            {t("bookingDetail.countdown.today")}
          </Typography>
        )}

        <Box
          component="img"
          src={CheckInImg}
          alt={t("bookingDetail.countdown.imageAlt")}
          sx={{ width: 100, mt: 3, objectFit: "cover" }}
        />
      </Stack>
      <Divider />
      <Box sx={{ px: 2, py: 2.5, textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ py: 0.5, px: 2, borderRadius: 1 }}
          onClick={(e) => {
            e.stopPropagation();
            onCancel?.();
          }}
        >
          {t("bookingDetail.actions.cancelBooking")}
        </Button>
      </Box>
    </Paper>
  );
};

export default VacationCountdown;

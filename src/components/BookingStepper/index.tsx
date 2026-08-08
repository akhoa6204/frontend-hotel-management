import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { Box, Stack, Typography } from "@mui/material";

interface BookingStepperProps {
  activeStep: number;
}

const steps = ["Bạn chọn", "Đặt phòng", "Thanh toán"];

const BookingStepper = ({ activeStep = 1 }: BookingStepperProps) => (
  <Box component="nav" aria-label="Tiến trình đặt phòng" sx={{ py: { xs: 3, md: 3.5 } }}>
    <Stack direction="row" alignItems="flex-start" sx={{ width: 1 }}>
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const completed = stepNumber < activeStep;
        const active = stepNumber === activeStep;
        const last = index === steps.length - 1;

        return (
          <Stack key={label} direction="row" alignItems="flex-start" sx={{ flex: last ? "0 0 auto" : 1, minWidth: 0 }}>
            <Stack alignItems="center" spacing={0.75}>
              <Box
                aria-current={active ? "step" : undefined}
                sx={{
                  display: "grid",
                  placeItems: "center",
                  width: 27,
                  height: 27,
                  borderRadius: "50%",
                  border: "1px solid",
                  borderColor: active || completed ? "primary.main" : "#c8c9c6",
                  bgcolor: completed ? "primary.main" : active ? "#fff" : "transparent",
                  color: completed ? "#fff" : active ? "primary.main" : "text.secondary",
                  fontSize: 12,
                  fontWeight: 750,
                }}
              >
                {completed ? <CheckRoundedIcon sx={{ fontSize: 17 }} /> : stepNumber}
              </Box>
              <Typography
                variant="caption"
                sx={{ color: active ? "#183746" : "text.secondary", fontWeight: active ? 700 : 500, whiteSpace: "nowrap" }}
              >
                {label}
              </Typography>
            </Stack>
            {!last && (
              <Box sx={{ flex: 1, height: 1, mx: { xs: 1.25, sm: 2.5 }, mt: "13px", bgcolor: completed ? "primary.main" : "#d8d6cf" }} />
            )}
          </Stack>
        );
      })}
    </Stack>
  </Box>
);

export default BookingStepper;

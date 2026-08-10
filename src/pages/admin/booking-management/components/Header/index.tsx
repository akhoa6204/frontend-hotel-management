import { useBookingManagementContext } from "@context/booking-management";
import { Add, Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation("bookings");
  const { openDialog, handleSearchBooking } = useBookingManagementContext();
  return (
    <Box sx={{ mb: 2.5 }}>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", sm: "flex-start" }} gap={2}>
        <Box>
          <Typography component="h1" sx={{ color: "#163B47", fontSize: { xs: 26, md: 29 }, lineHeight: 1.25, fontWeight: 700 }}>
            {t("title")}
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, color: "#667085" }}>
            {t("subtitle")}
          </Typography>
        </Box>
        <Button startIcon={<Add />} variant="contained" onClick={() => openDialog("CREATE")} sx={{ minHeight: 42, borderRadius: "8px", alignSelf: { sm: "center" } }}>
          {t("create")}
        </Button>
      </Stack>

      <Stack sx={{ mt: 2.5 }}>
        <TextField
          size="small"
          placeholder={t("search")}
          onChange={handleSearchBooking}
          sx={{ width: { xs: "100%", sm: 480 }, "& .MuiOutlinedInput-root": { height: 42, bgcolor: "#FFFFFF", borderRadius: "8px" } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Box>
  );
};
export default Header;

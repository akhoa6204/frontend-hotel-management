import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const policies = [
  { labelKey: "quietHours", valueKey: "quietHoursValue", icon: NightsStayOutlinedIcon },
  { labelKey: "pets", valueKey: "petsValue", icon: PetsOutlinedIcon },
];

const RulesCard = () => {
  const { t } = useTranslation("client");

  return (
  <Box component="section" aria-labelledby="stay-policies-title">
    <Typography id="stay-policies-title" component="h2" sx={{ fontSize: { xs: 24, md: 27 }, fontWeight: 650, color: "text.primary" }}>
      {t("booking.policies.title")}
    </Typography>
    <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.7 }}>
      {t("booking.policies.description")}
    </Typography>
    <Stack spacing={1.75} sx={{ mt: 2.5 }}>
      {policies.map(({ labelKey, valueKey, icon: Icon }) => (
        <Stack key={labelKey} direction="row" spacing={1.5} alignItems="center">
          <Icon sx={{ color: "primary.main", fontSize: 21 }} />
          <Typography sx={{ minWidth: { sm: 170 }, color: "text.secondary" }}>{t(`booking.policies.${labelKey}`)}</Typography>
          <Typography fontWeight={650} color="text.primary">{t(`booking.policies.${valueKey}`)}</Typography>
        </Stack>
      ))}
    </Stack>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 2.5, lineHeight: 1.7 }}>
      {t("booking.policies.confirmation")}
    </Typography>
  </Box>
  );
};

export default RulesCard;

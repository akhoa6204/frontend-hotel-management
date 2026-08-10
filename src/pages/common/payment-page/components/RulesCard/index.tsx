import { List, ListItem, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const RulesCard = () => {
  const { t } = useTranslation("client");
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
      }}
      variant="outlined"
    >
      <Typography variant="h6" fontWeight={700} mb={1.5}>
        {t("payment.legacy.rulesTitle")}
      </Typography>

      <Typography variant="body2" mb={1}>
        {t("payment.legacy.rulesDescription")}
      </Typography>

      <List dense sx={{ mb: 1, pl: 2 }}>
        <ListItem
          sx={{ display: "list-item", listStyleType: "disc", pl: 0, py: 0.5 }}
        >
          <Typography variant="body2">
            {t("payment.legacy.quietHours", { start: "22:00", end: "06:00" })}
          </Typography>
        </ListItem>
        <ListItem
          sx={{ display: "list-item", listStyleType: "disc", pl: 0, py: 0.5 }}
        >
          <Typography variant="body2">{t("payment.legacy.noPets")}</Typography>
        </ListItem>
      </List>

      <Typography variant="body2" fontWeight={600}>
        {t("payment.legacy.rulesConfirmation")}
      </Typography>
    </Paper>
  );
};

export default RulesCard;

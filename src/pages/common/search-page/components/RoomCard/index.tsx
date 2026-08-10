import { Box, Paper, Stack, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface Props {
  image: string;
  name: string;
  capacity: number;
}

const RoomCard: React.FC<Props> = ({ image, name, capacity }) => {
  const { t } = useTranslation("client");
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid #E0E0E0",
        mb: 2.5,
      }}
    >
      {/* Ảnh */}
      <Box
        component="img"
        src={image}
        alt={t("search.legacyRoomCard.imageAlt", { room: name })}
        sx={{
          width: "100%",
          objectFit: "cover",
        }}
      />

      {/* Thông tin */}
      <Box
        sx={{
          borderTop: "1px solid #E0E0E0",
          p: 2.5,
          mb: 3,
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={1}>
          {t("search.legacyRoomCard.name", { room: name })}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Person fontSize="small" />
          <Typography variant="body2">{t("search.legacyRoomCard.capacity", { count: capacity })}</Typography>
        </Stack>
      </Box>
    </Paper>
  );
};

export default RoomCard;

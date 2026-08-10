import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
  Divider,
  Box,
  Chip,
} from "@mui/material";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import { useNavigate } from "react-router-dom";
import { fmtVND } from "@utils/format";
import { useTranslation } from "react-i18next";

interface Props {
  id: number;
  name: string;
  type: string;
  price: number;
  discount?: number;
  capacity: number;
  image: string;
  isAvailable?: boolean;
  onBooking?: () => void;
}

const RoomCard = ({
  id,
  name,
  type,
  price,
  discount = 0,
  capacity,
  image,
  isAvailable,
  onBooking,
}: Props) => {
  const { t } = useTranslation("client");
  const navigate = useNavigate();
  const onNavigate = () => {
    navigate(`/room-detail/${id}`);
  };
  return (
    <Card
      sx={{
        borderRadius: 3,
        bgcolor: "#FAFAFA",
        overflow: "hidden",
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { boxShadow: 4, transform: "translateY(-2px)" },
      }}
      onClick={onNavigate}
    >
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{
          width: "100%",
          height: 336,
          objectFit: "cover",
        }}
      />

      <CardContent>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {name}
              </Typography>

              {isAvailable !== undefined && (
                <Chip
                  size="small"
                  label={t(isAvailable ? "shared.roomCard.available" : "shared.roomCard.soldOut")}
                  color={isAvailable ? "success" : "error"}
                  variant="outlined"
                />
              )}
            </Stack>

            <Stack direction="row" spacing={1}>
              <PeopleAltRoundedIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {t("shared.roomCard.capacity", { count: capacity })}
              </Typography>

              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

              <ApartmentRoundedIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {type}
              </Typography>
            </Stack>
          </Box>
          <Button
            variant="contained"
            color="primary"
            disabled={isAvailable === false}
            onClick={(e) => {
              e.stopPropagation();
              onBooking?.();
            }}
          >
            {t(isAvailable === false ? "shared.roomCard.soldOut" : "shared.roomCard.bookRoom")}
          </Button>
        </Stack>
      </CardContent>

      <Stack direction="row" alignItems={"center"} p={2} spacing={1}>
        {discount ? (
          <>
            {" "}
            <Typography
              fontSize={16}
              fontWeight={700}
              sx={{ color: "#ccc", textDecoration: "line-through" }}
            >
              {fmtVND(price)} VND
            </Typography>
            <Typography fontSize={16} fontWeight={700}>
              <small className="text-[#ccc]">-</small>
            </Typography>
            <Typography fontSize={16} fontWeight={700} color="primary">
              {fmtVND(Number(price) - Number(discount))} VND
            </Typography>
          </>
        ) : (
          <Typography color="primary" fontWeight={700} fontSize={18}>
            {price.toLocaleString("vn-VN")} VND
          </Typography>
        )}
      </Stack>
    </Card>
  );
};

export default RoomCard;

import {
  Box,
  Grid,
  Typography,
  Stack,
  Button,
  Card,
  CardMedia,
  Chip,
  Rating,
} from "@mui/material";

import AcUnitIcon from "@mui/icons-material/AcUnit";
import AirIcon from "@mui/icons-material/Air";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DeskIcon from "@mui/icons-material/Desk";
import WeekendIcon from "@mui/icons-material/Weekend";
import BalconyIcon from "@mui/icons-material/Balcony";
import WindowIcon from "@mui/icons-material/Window";
import TvIcon from "@mui/icons-material/Tv";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import MovieIcon from "@mui/icons-material/Movie";
import CableIcon from "@mui/icons-material/Cable";
import WifiIcon from "@mui/icons-material/Wifi";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import ShowerIcon from "@mui/icons-material/Shower";
import BathtubIcon from "@mui/icons-material/Bathtub";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import BathroomIcon from "@mui/icons-material/Bathroom";
import KitchenIcon from "@mui/icons-material/Kitchen";
import KettleIcon from "@mui/icons-material/EmojiFoodBeverage";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";

import { Call, CallRounded, Check, Person } from "@mui/icons-material";
import { fmtVND } from "@utils/format";
import { AmenityResponse } from "@constant/response/AmenityResponse";

type Props = {
  name: string;
  description?: string | null;
  capacity: number;
  basePrice: number;
  discount: number;
  amenities?: AmenityResponse[];
  rating: number;
  handleBookingRoom: () => void;
};

const iconColor = "#2E90FA";

const amenityIconMap: Record<string, React.JSX.Element> = {
  WIFI: <WifiIcon sx={{ color: iconColor }} />,
  TV: <TvIcon sx={{ color: iconColor }} />,
  AIR_CONDITIONER: <AcUnitIcon sx={{ color: iconColor }} />,
  BATHTUB: <BathtubIcon sx={{ color: iconColor }} />,
  MINI_BAR: <KitchenIcon sx={{ color: iconColor }} />,
  BALCONY: <BalconyIcon sx={{ color: iconColor }} />,
  HAIR_DRYER: <LocalLaundryServiceIcon sx={{ color: iconColor }} />,
  SAFE_BOX: <LocalHotelIcon sx={{ color: iconColor }} />,
  COFFEE_MACHINE: <KettleIcon sx={{ color: iconColor }} />,
  OCEAN_VIEW: <WindowIcon sx={{ color: iconColor }} />,
  WORK_DESK: <DeskIcon sx={{ color: iconColor }} />,
  WARDROBE: <CheckroomIcon sx={{ color: iconColor }} />,
  KETTLE: <KettleIcon sx={{ color: iconColor }} />,
  SMART_TV: <SmartDisplayIcon sx={{ color: iconColor }} />,
  NETFLIX: <MovieIcon sx={{ color: iconColor }} />,
  SOFA: <WeekendIcon sx={{ color: iconColor }} />,
  DINING_TABLE: <DeskIcon sx={{ color: iconColor }} />,
  SHOWER: <ShowerIcon sx={{ color: iconColor }} />,
  SLIPPERS: <CheckroomIcon sx={{ color: iconColor }} />,
  BATHROBE: <CheckroomIcon sx={{ color: iconColor }} />,
};

function normalizeAmenityLabel(label: string) {
  return label.trim().toUpperCase().replaceAll(" ", "_").replaceAll("-", "_");
}

function getAmenityIcon(label: string) {
  const key = normalizeAmenityLabel(label);

  return (
    amenityIconMap[key] ?? <CheckCircleOutlineIcon sx={{ color: iconColor }} />
  );
}

const RoomDescription = ({
  name,
  description,
  capacity,
  basePrice,
  discount,
  amenities,
  rating,
  handleBookingRoom,
}: Props) => {
  const safeAmenities = amenities?.slice(0, 6) ?? [];

  return (
    <Box mt={6}>
      {/* Header + ảnh + box giá */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box mb={2.5}>
            <Typography variant="h5" fontWeight={700} mb={1}>
              Phòng {name}
            </Typography>
            <Stack direction={"row"} alignContent={"center"} spacing={1}>
              <Chip
                icon={<Person />}
                label={`${capacity} người`}
                sx={{
                  p: 1,
                  bgcolor: "#2E90FA0d",
                  color: "#2E90FA",
                  "& .MuiChip-icon": {
                    color: "#2E90FA",
                  },
                }}
                size="small"
              />
              <Rating value={rating} precision={0.1} readOnly />
            </Stack>
          </Box>
          {/* Tiện nghi */}
          {!!safeAmenities.length && (
            <Box
              sx={{
                borderRadius: 2,
                border: "1px solid #eee",
                p: 2.5,
                mb: 2.5,
              }}
            >
              <Typography variant="h6" fontWeight={700} mb={2}>
                Tiện nghi được cung cấp
              </Typography>

              <Grid container spacing={2}>
                {safeAmenities.map((a) => (
                  <Grid key={a.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      {getAmenityIcon(a.label)}
                      <Typography variant="body2">{a.label}</Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          {/* Mô tả */}
          {description && (
            <Box sx={{ borderRadius: 2, border: "1px solid #eee", p: 2.5 }}>
              <Typography variant="h6" fontWeight={700} mb={1}>
                Mô tả
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Box>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              borderRadius: 3,
              p: 2.5,
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography fontSize={14}>Giá/ phòng/ đêm từ</Typography>
            <Stack direction={"row"} spacing={1} justifyContent={"center"}>
              {discount ? (
                <>
                  <Typography
                    fontSize={16}
                    fontWeight={700}
                    sx={{ color: "#ccc", textDecoration: "line-through" }}
                  >
                    {fmtVND(basePrice)} VND
                  </Typography>
                  <Typography fontSize={16} fontWeight={700}>
                    -
                  </Typography>
                </>
              ) : (
                ""
              )}
              <Typography fontSize={16} fontWeight={700} color="primary">
                {fmtVND(Number(basePrice) - Number(discount))} VND
              </Typography>
            </Stack>
            <Stack
              fontSize={12}
              direction={"row"}
              gap={0.5}
              alignContent={"center"}
            >
              <Check sx={{ color: iconColor }} fontSize="small" />
              Miễn phí huỷ phòng trước 1 ngày
            </Stack>

            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 999 }}
              fullWidth
              onClick={handleBookingRoom}
            >
              Đặt phòng
            </Button>
            <Button
              variant="contained"
              // color="primary"
              sx={{ borderRadius: 999, bgcolor: "#2E90FA0d", color: "#2E90FA" }}
              fullWidth
            >
              <CallRounded sx={{ color: iconColor, mr: 1 }} fontSize="small" />
              Liên hệ ngay
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomDescription;

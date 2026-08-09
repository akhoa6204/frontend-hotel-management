import { useState } from "react";
import { BgRoom } from "@assets/images";
import type { QuoteResponse } from "@constant/response/QuoteResponse";
import type { RoomResponse } from "@constant/response/RoomResponse";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { diffNights, fmtVND, formatDate } from "@utils/format";
import { ArrowForward } from "@mui/icons-material";

interface Props {
  room: RoomResponse;
  checkIn: string;
  checkOut: string;
  pricing?: QuoteResponse;
  loadingPricing: boolean;
  submitting: boolean;
}

const inappropriateImagePattern = /(meme|joke|giphy|tenor|\.gif(?:\?|$))/i;

const ReservationSummary = ({
  room,
  checkIn,
  checkOut,
  pricing,
  loadingPricing,
  submitting,
}: Props) => {
  const [imageFailed, setImageFailed] = useState(false);
  const suitableImage = room.roomType.roomTypeImages?.find(
    (image) =>
      image.url &&
      !inappropriateImagePattern.test(`${image.url} ${image.alt ?? ""}`),
  );
  const image = imageFailed || !suitableImage ? BgRoom : suitableImage.url;
  const nights = pricing?.nights ?? diffNights(checkIn, checkOut);
  const promotion = pricing?.promotion ?? pricing?.autoPromotion;

  return (
    <Box
      component="aside"
      aria-labelledby="reservation-summary-title"
      sx={{
        position: { md: "sticky" },
        top: { md: 96 },
        overflow: "hidden",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        boxShadow: "0 18px 50px rgba(13,52,66,.09)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 1,
          aspectRatio: { xs: "16 / 7", sm: "16 / 6", md: "16 / 9" },
          overflow: "hidden",
          bgcolor: "#e3e0d9",
        }}
      >
        <Box
          component="img"
          src={image}
          alt={suitableImage?.alt || `Phòng ${room.roomType.name}`}
          onError={() => setImageFailed(true)}
          sx={{
            position: "absolute",
            inset: 0,
            display: "block",
            width: 1,
            height: 1,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Box>

      <Box sx={{ p: { xs: 2.5, sm: 3, md: 3.25 } }}>
        <Typography
          id="reservation-summary-title"
          sx={{
            color: "primary.main",
            letterSpacing: 1.8,
            fontSize: 11,
            fontWeight: 750,
          }}
        >
          KỲ NGHỈ CỦA BẠN
        </Typography>
        <Typography
          component="h2"
          sx={{
            mt: 1,
            fontFamily: "Georgia, serif",
            fontSize: { xs: 25, md: 28 },
            lineHeight: 1.2,
            color: "text.primary",
          }}
        >
          {room.roomType.name}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mt: 1.25, color: "text.secondary" }}
        >
          <PeopleAltOutlinedIcon sx={{ fontSize: 19 }} />
          <Typography variant="body2">
            Sức chứa tối đa {room.roomType.capacity} khách
          </Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            columnGap: { xs: 1.5, sm: 2.5 },
          }}
        >
          {/* Check-in */}
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block" }}
            >
              Nhận phòng
            </Typography>

            <Typography
              fontWeight={700}
              color="text.primary"
              sx={{
                mt: 0.5,
                fontSize: { xs: 15, sm: 16 },
                whiteSpace: "nowrap",
              }}
            >
              {formatDate(checkIn)}
            </Typography>
          </Box>

          {/* Center */}
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={0.75}
            sx={{
              minWidth: { xs: 80, sm: 100 },
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            <ArrowForward
              sx={{
                color: "primary.main",
                fontSize: 22,
              }}
            />

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                whiteSpace: "nowrap",
                fontSize: { xs: 12, sm: 13 },
              }}
            >
              {nights} đêm
            </Typography>
          </Stack>

          {/* Check-out */}
          <Box sx={{ textAlign: "right" }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block" }}
            >
              Trả phòng
            </Typography>

            <Typography
              fontWeight={700}
              color="text.primary"
              sx={{
                mt: 0.5,
                fontSize: { xs: 15, sm: 16 },
                whiteSpace: "nowrap",
              }}
            >
              {formatDate(checkOut)}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 3 }} />

        <Typography
          component="h3"
          sx={{ fontSize: 17, fontWeight: 700, color: "text.primary" }}
        >
          Tóm tắt giá
        </Typography>
        <Stack spacing={1.25} sx={{ mt: 2 }}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography color="text.secondary">Giá phòng</Typography>
            <Typography fontWeight={600}>
              {fmtVND(pricing?.subtotal ?? 0)} VND
            </Typography>
          </Stack>
          {(pricing?.totalDiscount ?? 0) > 0 && (
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Box>
                <Typography color="text.secondary">Ưu đãi</Typography>
                {promotion?.name && (
                  <Typography variant="caption" color="text.secondary">
                    {promotion.name}
                  </Typography>
                )}
              </Box>
              <Typography fontWeight={600} color="success.main">
                − {fmtVND(pricing?.totalDiscount ?? 0)} VND
              </Typography>
            </Stack>
          )}
        </Stack>

        <Divider sx={{ my: 2.5 }} />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          spacing={2}
        >
          <Typography fontWeight={700} color="text.primary">
            Tổng cộng
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 24, md: 27 },
              fontWeight: 750,
              color: "text.primary",
              whiteSpace: "nowrap",
            }}
          >
            {fmtVND(pricing?.finalTotal ?? 0)} VND
          </Typography>
        </Stack>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={!pricing || loadingPricing || submitting}
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{ mt: 3, minHeight: 50, borderRadius: 1.25, fontWeight: 700 }}
        >
          {submitting ? "Đang tạo đặt phòng…" : "Tiếp theo thanh toán"}
        </Button>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "block",
            mt: 1.5,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          Bạn sẽ kiểm tra bước thanh toán trước khi hoàn tất.
        </Typography>
      </Box>
    </Box>
  );
};

export default ReservationSummary;

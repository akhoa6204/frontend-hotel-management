import { MoreVert, StarRounded } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import type { ReviewResponse } from "@constant/response/ReviewResponse";
import { useTranslation } from "react-i18next";

interface Props {
  review: ReviewResponse;
  isLast: boolean;
  disabled?: boolean;
  onToggleStatus: (review: ReviewResponse) => void;
}

const ReviewCard = ({ review, isLast, disabled = false, onToggleStatus }: Props) => {
  const { t, i18n } = useTranslation("reviews");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isPublished = Boolean(review.active);
  const roomName = review.booking.room?.name;
  const roomType = review.booking.room?.roomType?.name;
  const metadata = [
    roomName ? t("room", { name: roomName }) : undefined,
    roomType,
    dayjs(review.createdAt).format(
      i18n.resolvedLanguage === "en" ? "MM/DD/YYYY" : "DD/MM/YYYY",
    ),
  ]
    .filter(Boolean)
    .join(" · ");

  const handleAction = () => {
    setAnchorEl(null);
    onToggleStatus(review);
  };

  return (
    <Box
      component="article"
      sx={{
        px: { xs: 2, sm: 2.25 },
        py: 2,
        borderBottom: isLast ? 0 : "1px solid #EAECF0",
      }}
    >
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={1.5}>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ color: "#1F2937", fontSize: 13.5, fontWeight: 650, lineHeight: 1.45 }}>
            {review.booking.guestName}
          </Typography>
          <Typography sx={{ mt: 0.25, color: "#667085", fontSize: 12.25, lineHeight: 1.45 }}>
            {metadata}
          </Typography>
        </Box>

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1 }} sx={{ flexShrink: 0 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.35}
            aria-label={t("ratingAriaLabel", { value: Number(review.overall).toFixed(1) })}
          >
            <StarRounded aria-hidden sx={{ color: "#C98520", fontSize: 17 }} />
            <Typography sx={{ color: "#344054", fontSize: 13, fontWeight: 650, fontVariantNumeric: "tabular-nums" }}>
              {Number(review.overall).toFixed(1)}
            </Typography>
          </Stack>
          <Chip
            label={isPublished ? t("visible") : t("hiddenStatus")}
            size="small"
            sx={{
              height: 25,
              border: 0,
              bgcolor: isPublished ? "#EAF6F0" : "#F2F4F7",
              color: isPublished ? "#246548" : "#475467",
              fontSize: 11.75,
              fontWeight: 600,
              "& .MuiChip-label": { px: 1.1 },
            }}
          />
          <IconButton
            size="small"
            disabled={disabled}
            aria-label={t("actions.openMenu", { name: review.booking.guestName })}
            aria-controls={anchorEl ? `review-actions-${review.id}` : undefined}
            aria-haspopup="menu"
            aria-expanded={anchorEl ? "true" : undefined}
            onClick={(event) => setAnchorEl(event.currentTarget)}
            sx={{ color: "#667085" }}
          >
            <MoreVert fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <Typography
        sx={{
          mt: 1.15,
          color: "#344054",
          fontSize: 13.5,
          lineHeight: 1.55,
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
        }}
      >
        {review.comment}
      </Typography>

      <Menu
        id={`review-actions-${review.id}`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{ paper: { className: "admin-scrollbar", sx: { width: 190, border: "1px solid #E4E7EC", borderRadius: "8px", boxShadow: "0 8px 24px rgba(16,24,40,0.10)" } } }}
      >
        <MenuItem
          onClick={handleAction}
          sx={{ minHeight: 38, color: isPublished ? "#9A6518" : "#1D6FC2", fontSize: 13.5 }}
        >
          {isPublished ? t("actions.hide") : t("actions.show")}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ReviewCard;

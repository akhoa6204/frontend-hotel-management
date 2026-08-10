import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Check, DeleteOutline, EditOutlined, MoreVert, PeopleAltOutlined } from "@mui/icons-material";
import type { RoomStatus } from "@enums/RoomStatus";
import type { RoomResponse } from "@constant/response/RoomResponse";
import { ImageHotel } from "@assets/images";
import { useTranslation } from "react-i18next";

const STATUS_VIEW: Record<RoomStatus, { background: string; color: string; dot: string }> = {
  VACANT_CLEAN: { background: "#EAF6F0", color: "#246548", dot: "#2E7D5B" },
  VACANT_DIRTY: { background: "#FFF5E5", color: "#9A6518", dot: "#C98520" },
  OCCUPIED_CLEAN: { background: "#EAF4FF", color: "#1D6FC2", dot: "#2E90FA" },
  OCCUPIED_DIRTY: { background: "#FFF5E5", color: "#9A6518", dot: "#C98520" },
  OUT_OF_SERVICE: { background: "#FDECEC", color: "#A43B3B", dot: "#C94A4A" },
};

interface Props {
  room: RoomResponse;
  onEdit?: (room: RoomResponse) => void;
  onDelete?: (id: number) => void | Promise<void>;
  onEditStatus?: (id: number, status: RoomStatus) => void | Promise<void>;
}

const RoomCard = ({ room, onEdit, onDelete, onEditStatus }: Props) => {
  const { t, i18n } = useTranslation(["rooms", "common"]);
  const [statusAnchor, setStatusAnchor] = useState<HTMLElement | null>(null);
  const [actionsAnchor, setActionsAnchor] = useState<HTMLElement | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const image = room.roomType?.roomTypeImages?.[0]?.url || ImageHotel;
  const currentStatus = room.status || "VACANT_CLEAN";
  const status = STATUS_VIEW[currentStatus];
  const statusOptions: RoomStatus[] = currentStatus === "OUT_OF_SERVICE"
    ? ["VACANT_CLEAN"]
    : [currentStatus, "OUT_OF_SERVICE"];
  const formattedPrice = Number(room.roomType?.basePrice || 0).toLocaleString(
    i18n.resolvedLanguage === "en" ? "en-US" : "vi-VN",
  );

  const changeStatus = async (nextStatus: RoomStatus) => {
    if (nextStatus === currentStatus || updatingStatus) {
      setStatusAnchor(null);
      return;
    }

    setUpdatingStatus(true);
    try {
      await onEditStatus?.(room.id, nextStatus);
    } finally {
      setUpdatingStatus(false);
      setStatusAnchor(null);
    }
  };

  return (
    <Card variant="outlined" sx={{ height: "100%", overflow: "hidden", borderColor: "#E4E7EC", borderRadius: "11px", bgcolor: "#FFFFFF", boxShadow: "none", transition: "border-color 120ms ease", "&:hover": { borderColor: "#D0D5DD" } }}>
      <CardMedia component="img" image={image} alt={t("aria.roomImage", { name: room.name })} sx={{ width: "100%", height: { xs: 112, sm: 124 }, objectFit: "cover" }} />

      <CardContent sx={{ p: 1.75, "&:last-child": { pb: 1.75 } }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={1}>
          <Box minWidth={0}>
            <Typography sx={{ color: "#1F2937", fontSize: 18, lineHeight: 1.3, fontWeight: 700, overflowWrap: "anywhere" }}>{room.name}</Typography>
            <Typography sx={{ mt: 0.35, color: "#667085", fontSize: 12, lineHeight: 1.4, fontWeight: 650, letterSpacing: "0.035em" }}>{room.roomType?.name}</Typography>
          </Box>
          <IconButton aria-label={t("aria.roomActions", { name: room.name })} size="small" onClick={(event) => setActionsAnchor(event.currentTarget)} sx={{ width: 32, height: 32, color: "#667085" }}><MoreVert fontSize="small" /></IconButton>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1} sx={{ mt: 1.5 }}>
          <Chip
            component="button"
            clickable
            disabled={updatingStatus}
            onClick={(event) => setStatusAnchor(event.currentTarget)}
            label={updatingStatus ? t("states.updating", { ns: "common" }) : t(`status.${currentStatus}`, { ns: "rooms" })}
            size="small"
            sx={{ height: 25, maxWidth: "100%", border: 0, borderRadius: 999, bgcolor: status.background, color: status.color, fontSize: 11.5, fontWeight: 650, "& .MuiChip-label": { px: 1.1 } }}
          />
          <Stack direction="row" alignItems="center" spacing={0.5} flexShrink={0}>
            <PeopleAltOutlined sx={{ color: "#98A2B3", fontSize: 17 }} />
            <Typography sx={{ color: "#667085", fontSize: 12.5 }}>{t("guests", { count: room.roomType?.capacity || 0 })}</Typography>
          </Stack>
        </Stack>

        <Typography sx={{ mt: 1.25, pt: 1.25, borderTop: "1px solid #EAECF0", color: "#1F2937", fontSize: 13.5, fontWeight: 650 }}>
          {formattedPrice} {t("currency")} <Box component="span" sx={{ color: "#667085", fontWeight: 400 }}>{t("perNight")}</Box>
        </Typography>
      </CardContent>

      <Menu anchorEl={statusAnchor} open={Boolean(statusAnchor)} onClose={() => setStatusAnchor(null)} MenuListProps={{ "aria-label": t("aria.updateRoomStatus", { name: room.name }), dense: true }} slotProps={{ paper: { sx: { width: 210, mt: 0.75, p: 0.5, borderRadius: "8px", boxShadow: "0 8px 24px rgba(16, 24, 40, 0.14)" } } }}>
        <Typography sx={{ px: 1.25, py: 0.75, color: "#667085", fontSize: 11.5, fontWeight: 650 }}>{t("fields.status")}</Typography>
        {statusOptions.map((option) => {
          const optionView = STATUS_VIEW[option];
          const selected = option === currentStatus;
          return (
            <MenuItem key={option} selected={selected} disabled={updatingStatus} onClick={() => changeStatus(option)} sx={{ minHeight: 38, px: 1.25, gap: 1, borderRadius: "6px", fontSize: 13 }}>
              <Box sx={{ width: 8, height: 8, flexShrink: 0, borderRadius: "50%", bgcolor: optionView.dot }} />
              <Typography sx={{ flex: 1, fontSize: 13, fontWeight: selected ? 650 : 500 }}>{t(`status.${option}`, { ns: "rooms" })}</Typography>
              {selected && <Check sx={{ color: "primary.main", fontSize: 17 }} />}
              {updatingStatus && !selected && <CircularProgress size={14} />}
            </MenuItem>
          );
        })}
      </Menu>

      <Menu anchorEl={actionsAnchor} open={Boolean(actionsAnchor)} onClose={() => setActionsAnchor(null)} MenuListProps={{ "aria-label": t("aria.roomActions", { name: room.name }), dense: true }} slotProps={{ paper: { sx: { width: 180, mt: 0.5, p: 0.5, borderRadius: "8px", boxShadow: "0 8px 24px rgba(16, 24, 40, 0.14)" } } }}>
        <MenuItem onClick={() => { setActionsAnchor(null); onEdit?.(room); }} sx={{ minHeight: 38, gap: 1, borderRadius: "6px", fontSize: 13 }}><EditOutlined sx={{ fontSize: 18, color: "#667085" }} />{t("actions.edit", { ns: "common" })}</MenuItem>
        <MenuItem onClick={() => { setActionsAnchor(null); onDelete?.(room.id); }} sx={{ minHeight: 38, gap: 1, borderRadius: "6px", color: "error.main", fontSize: 13 }}><DeleteOutline sx={{ fontSize: 18 }} />{t("actions.delete", { ns: "rooms" })}</MenuItem>
      </Menu>
    </Card>
  );
};

export default RoomCard;

import { useState } from "react";
import { DeleteOutline, EditOutlined, MoreVert } from "@mui/icons-material";
import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { RoomTypeResponse } from "@constant/response/RoomTypeResponse";
import { useTranslation } from "react-i18next";

interface Props {
  rows: RoomTypeResponse[];
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
  onEdit: (id: number) => void;
  onDelete: (roomType: RoomTypeResponse) => void;
}

export default function RoomTypeTable({ rows, loading = false, error = false, onRetry, onEdit, onDelete }: Props) {
  const { t, i18n } = useTranslation(["roomTypes", "common"]);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [activeRow, setActiveRow] = useState<RoomTypeResponse | null>(null);

  const closeMenu = () => {
    setMenuAnchor(null);
    setActiveRow(null);
  };

  return (
    <TableContainer component={Paper} elevation={0} className="admin-scrollbar" sx={{ border: "1px solid #E4E7EC", borderRadius: "11px", overflowX: "auto" }}>
      <Table sx={{ minWidth: 720 }}>
        <TableHead sx={{ bgcolor: "#F9FAFB", "& th": { height: 46, py: 1, color: "#475467", borderColor: "#EAECF0", fontSize: 12.5, fontWeight: 650 } }}>
          <TableRow><TableCell width={100}>{t("columns.id", { ns: "roomTypes" })}</TableCell><TableCell>{t("columns.name", { ns: "roomTypes" })}</TableCell><TableCell>{t("columns.capacity", { ns: "roomTypes" })}</TableCell><TableCell align="right">{t("columns.pricePerNight", { ns: "roomTypes" })}</TableCell><TableCell align="right" width={72}>{t("columns.actions", { ns: "roomTypes" })}</TableCell></TableRow>
        </TableHead>
        <TableBody>
          {loading ? Array.from({ length: 6 }).map((_, index) => <TableRow key={index} sx={{ height: 54 }}>{Array.from({ length: 5 }).map((__, cell) => <TableCell key={cell}><Skeleton width={cell === 1 ? "60%" : cell === 4 ? 28 : 72} /></TableCell>)}</TableRow>) : error ? (
            <TableRow><TableCell colSpan={5} align="center" sx={{ py: 6 }}><Typography fontWeight={650}>{t("states.loadError", { ns: "roomTypes" })}</Typography>{onRetry && <Typography component="button" onClick={onRetry} sx={{ mt: 1, p: 0, border: 0, bgcolor: "transparent", color: "primary.main", fontSize: 13, fontWeight: 650, cursor: "pointer" }}>{t("actions.retry", { ns: "common" })}</Typography>}</TableCell></TableRow>
          ) : rows.length === 0 ? (
            <TableRow><TableCell colSpan={5} align="center" sx={{ py: 6 }}><Typography fontWeight={650}>{t("states.empty", { ns: "roomTypes" })}</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{t("states.emptyHint", { ns: "roomTypes" })}</Typography></TableCell></TableRow>
          ) : rows.map((roomType) => (
            <TableRow key={roomType.id} hover onClick={() => onEdit(roomType.id)} sx={{ height: 56, cursor: "pointer", "& td": { py: 1, borderColor: "#EAECF0", color: "#1F2937", fontSize: 13.5 }, "&:hover": { bgcolor: "#F9FAFB" } }}>
              <TableCell>{roomType.id}</TableCell>
              <TableCell sx={{ fontWeight: 650 }}>{roomType.name}</TableCell>
              <TableCell>{t("guests", { ns: "roomTypes", count: roomType.capacity })}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>{Number(roomType.basePrice).toLocaleString(i18n.resolvedLanguage === "en" ? "en-US" : "vi-VN")} {t("currency", { ns: "roomTypes" })}</TableCell>
              <TableCell align="right"><IconButton size="small" aria-label={t("aria.rowActions", { ns: "roomTypes", name: roomType.name })} onClick={(event) => { event.stopPropagation(); setMenuAnchor(event.currentTarget); setActiveRow(roomType); }} sx={{ width: 32, height: 32, color: "#667085" }}><MoreVert fontSize="small" /></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu} MenuListProps={{ "aria-label": activeRow ? t("aria.rowActions", { ns: "roomTypes", name: activeRow.name }) : t("aria.actions", { ns: "roomTypes" }), dense: true }} slotProps={{ paper: { sx: { width: 190, mt: 0.5, p: 0.5, borderRadius: "8px", boxShadow: "0 8px 24px rgba(16, 24, 40, 0.14)" } } }}>
        <MenuItem onClick={() => { if (activeRow) onEdit(activeRow.id); closeMenu(); }} sx={{ minHeight: 38, gap: 1, borderRadius: "6px", fontSize: 13 }}><EditOutlined sx={{ color: "#667085", fontSize: 18 }} />{t("actions.edit", { ns: "roomTypes" })}</MenuItem>
        <MenuItem onClick={() => { if (activeRow) onDelete(activeRow); closeMenu(); }} sx={{ minHeight: 38, gap: 1, borderRadius: "6px", color: "error.main", fontSize: 13 }}><DeleteOutline sx={{ fontSize: 18 }} />{t("actions.delete", { ns: "roomTypes" })}</MenuItem>
      </Menu>
    </TableContainer>
  );
}

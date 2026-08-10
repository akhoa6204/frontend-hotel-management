import Pager from "@components/pager";
import type { RoomResponse } from "@constant/response/RoomResponse";
import { Close, Search } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  data: RoomResponse[];
  loading: boolean;
  selectedId: string | number | null;
  q?: string;
  page?: number;
  totalPages?: number;
  onClose: () => void;
  onSearch?: (value: string) => void;
  onPageChange: (page: number) => void;
  onSelect: (room: RoomResponse) => void;
}

export default function AvailableRoomDialog({ open, data, loading, selectedId, q, page, totalPages, onClose, onSearch, onPageChange, onSelect }: Props) {
  const { t } = useTranslation(["bookings", "common"]);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: "12px", maxHeight: "82dvh", overflow: "hidden" } }}>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ px: 3, pt: 2.5, pb: 2, borderBottom: "1px solid #E4E7EC" }}>
        <Box>
          <Typography variant="h6" fontWeight={700}>{t("roomPicker.title", { ns: "bookings" })}</Typography>
          <Typography variant="body2" color="text.secondary">{t("roomPicker.subtitle", { ns: "bookings" })}</Typography>
        </Box>
        <IconButton aria-label={t("actions.close", { ns: "common" })} onClick={onClose} size="small"><Close /></IconButton>
      </Stack>
      <DialogContent className="admin-scrollbar" sx={{ p: 3, overflowY: "auto" }}>
        <TextField value={q ?? ""} onChange={(event) => onSearch?.(event.target.value)} size="small" placeholder={t("roomPicker.search", { ns: "bookings" })} sx={{ width: { xs: "100%", sm: 360 }, mb: 2, "& .MuiOutlinedInput-root": { height: 40, borderRadius: "8px" } }} InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }} />
        <Box className="admin-scrollbar" sx={{ border: "1px solid #E4E7EC", borderRadius: "10px", overflowX: "auto" }}>
          <Table sx={{ minWidth: 620 }}>
            <TableHead sx={{ bgcolor: "#F9FAFB", "& th": { color: "#475467", fontSize: 12.5, fontWeight: 650 } }}><TableRow><TableCell>{t("roomPicker.columns.room", { ns: "bookings" })}</TableCell><TableCell>{t("roomPicker.columns.roomType", { ns: "bookings" })}</TableCell><TableCell>{t("roomPicker.columns.capacity", { ns: "bookings" })}</TableCell><TableCell align="right">{t("fields.actions", { ns: "common" })}</TableCell></TableRow></TableHead>
            <TableBody>
              {loading ? <TableRow><TableCell colSpan={4}><Stack alignItems="center" py={4} spacing={1}><CircularProgress size={24} /><Typography variant="body2" color="text.secondary">{t("roomPicker.loading", { ns: "bookings" })}</Typography></Stack></TableCell></TableRow> : data.length === 0 ? <TableRow><TableCell colSpan={4} align="center" sx={{ py: 5 }}><Typography fontWeight={600}>{t("roomPicker.empty", { ns: "bookings" })}</Typography><Typography variant="body2" color="text.secondary">{t("roomPicker.emptyHint", { ns: "bookings" })}</Typography></TableCell></TableRow> : data.map((room) => <TableRow hover key={room.id} selected={room.id === selectedId} onClick={() => onSelect(room)} sx={{ cursor: "pointer", height: 54 }}><TableCell sx={{ fontWeight: 650 }}>{room.name}</TableCell><TableCell>{room.roomType.name}</TableCell><TableCell>{t("roomPicker.guests", { ns: "bookings", count: room.roomType.capacity })}</TableCell><TableCell align="right"><Typography component="span" color="primary.main" fontSize={13} fontWeight={650}>{t("roomPicker.select", { ns: "bookings" })}</Typography></TableCell></TableRow>)}
            </TableBody>
          </Table>
        </Box>
        {(totalPages ?? 1) > 1 && <Box display="flex" justifyContent="center" mt={2}><Pager page={page ?? 1} totalPages={totalPages ?? 1} onChange={onPageChange} /></Box>}
      </DialogContent>
    </Dialog>
  );
}

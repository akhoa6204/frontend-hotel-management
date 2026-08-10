import type { DialogMode } from "@constant/internal/DialogState";
import type { HousekeepingUpdateRequest } from "@constant/request/HousekeepingUpdateRequest";
import type { HouseKeepingTaskResponse } from "@constant/response/HousekeepingResponse";
import type { HousekeepingTaskStatus } from "@enums/HousekeepingTaskStatus";
import {
  Box,
  Button,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
interface Props {
  tasks: HouseKeepingTaskResponse[];
  onStatusChange: (data: HousekeepingUpdateRequest) => Promise<unknown>;
  onRowClick: (mode: DialogMode, id?: number) => void;
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  updating: boolean;
}
const statusOptions: HousekeepingTaskStatus[] = [
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
];

const statusStyles: Record<HousekeepingTaskStatus, { color: string; bgcolor: string }> = {
  PENDING: { color: "#9A6700", bgcolor: "#FFF6D8" },
  IN_PROGRESS: { color: "#175CD3", bgcolor: "#EAF4FF" },
  COMPLETED: { color: "#027A48", bgcolor: "#ECFDF3" },
};

const formatCreatedAt = (value: string, locale: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return { date: "—", time: "" };
  return {
    date: date.toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" }),
    time: date.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" }),
  };
};

const StatusChip = ({ status, onClick, disabled }: { status: HousekeepingTaskStatus; onClick?: (event: React.MouseEvent<HTMLElement>) => void; disabled?: boolean }) => {
  const { t } = useTranslation("housekeeping");
  return <Chip label={t(`status.${status}`)} onClick={onClick} disabled={disabled} size="small" sx={{ height: 25, borderRadius: "999px", fontSize: 12, fontWeight: 600, ...statusStyles[status], "& .MuiChip-label": { px: 1.15 } }} />;
};

export default function HousekeepingTaskTable({
  tasks = [],
  onRowClick,
  onStatusChange,
  loading,
  error,
  onRetry,
  updating,
}: Props) {
  const { t, i18n } = useTranslation(["housekeeping", "common"]);
  const [statusMenu, setStatusMenu] = useState<{ anchor: HTMLElement; task: HouseKeepingTaskResponse } | null>(null);
  const dateLocale = i18n.resolvedLanguage === "en" ? "en-US" : "vi-VN";
  const columnKeys = ["room", "assignee", "task", "status", "createdAt"] as const;

  const openTask = (task: HouseKeepingTaskResponse) =>
    onRowClick(task.status === "COMPLETED" ? "VIEW" : "EDIT", task.id);

  return (
    <>
    <TableContainer component={Paper} sx={{ display: { xs: "none", md: "block" }, border: "1px solid #E4E7EC", borderRadius: "12px", boxShadow: "none", overflow: "hidden" }}>
      <Table size="small">
        <TableHead sx={{ bgcolor: "#F9FAFB" }}>
          <TableRow>
            {columnKeys.map((key) => <TableCell key={key} sx={{ py: 1.25, color: "#667085", fontSize: 12, fontWeight: 700 }}>{t(`columns.${key}`, { ns: "housekeeping" })}</TableCell>)}
          </TableRow>
        </TableHead>

        {/* BODY */}
        <TableBody>
          {loading && Array.from({ length: 6 }).map((_, index) => <TableRow key={index}>{Array.from({ length: 5 }).map((__, cell) => <TableCell key={cell} sx={{ py: 1.5 }}><Skeleton width={cell === 4 ? 90 : "75%"} /></TableCell>)}</TableRow>)}
          {!loading && !error && tasks.map((task) => {
            const created = formatCreatedAt(task.createdAt, dateLocale);
            return (
            <TableRow
              key={task.id}
              hover
              tabIndex={0}
              onClick={() => openTask(task)}
              onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openTask(task); } }}
              sx={{ cursor: "pointer", "&:last-child td": { borderBottom: 0 }, "&:hover": { bgcolor: "#F9FAFB" }, "& td": { height: 56, py: 1 } }}
            >
              {/* ROOM */}
              <TableCell>
                <Typography sx={{ color: "#1F2937", fontSize: 13.5, fontWeight: 700 }}>{task.room?.name || "—"}</Typography>
              </TableCell>

              {/* STAFF */}
              <TableCell>
                {task.staff ? (
                  <Typography sx={{ color: "#344054", fontSize: 13.5, fontWeight: 500 }}>{task.staff.fullName}</Typography>
                ) : (
                  <Typography component="span" sx={{ color: "#C27A14", fontSize: 12.5, fontWeight: 600 }}>{t("unassigned", { ns: "housekeeping" })}</Typography>
                )}
              </TableCell>

              <TableCell sx={{ color: "#344054", fontSize: 13.5, fontWeight: 500 }}>{t(`types.${task.type}`, { ns: "housekeeping" })}</TableCell>

              {/* STATUS */}
              <TableCell><StatusChip status={task.status} disabled={updating} onClick={task.status === "COMPLETED" ? undefined : (event) => { event.stopPropagation(); setStatusMenu({ anchor: event.currentTarget, task }); }} /></TableCell>

              {/* WORK DATE */}
              <TableCell><Typography sx={{ color: "#344054", fontSize: 13 }}>{created.date}</Typography><Typography sx={{ color: "#98A2B3", fontSize: 12 }}>{created.time}</Typography></TableCell>
            </TableRow>
          )})}

          {!loading && (error || tasks.length === 0) && (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                <Typography sx={{ color: "#344054", fontSize: 14, fontWeight: 600 }}>{t(error ? "states.loadError" : "states.empty", { ns: "housekeeping" })}</Typography>
                <Typography sx={{ mt: 0.5, color: "#667085", fontSize: 13 }}>{t(error ? "states.loadErrorHint" : "states.emptyHint", { ns: "housekeeping" })}</Typography>
                {error && <Button size="small" onClick={onRetry} sx={{ mt: 1 }}>{t("actions.retry", { ns: "common" })}</Button>}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <Stack spacing={1} sx={{ display: { xs: "flex", md: "none" } }}>
      {loading && Array.from({ length: 4 }).map((_, index) => <Card key={index} variant="outlined" sx={{ p: 1.5, borderColor: "#E4E7EC", borderRadius: "10px", boxShadow: "none" }}><Skeleton width="45%" /><Skeleton width="70%" /><Skeleton width="55%" /></Card>)}
      {!loading && !error && tasks.map((task) => { const created = formatCreatedAt(task.createdAt, dateLocale); return <Card key={task.id} component="button" onClick={() => openTask(task)} variant="outlined" sx={{ width: "100%", p: 1.5, borderColor: "#E4E7EC", borderRadius: "10px", boxShadow: "none", bgcolor: "#FFFFFF", textAlign: "left", cursor: "pointer" }}><Stack direction="row" justifyContent="space-between" gap={1}><Typography sx={{ color: "#1F2937", fontSize: 14, fontWeight: 700 }}>{task.room?.name || "—"}</Typography><StatusChip status={task.status} /></Stack><Typography sx={{ mt: 0.5, color: "#344054", fontSize: 13, fontWeight: 600 }}>{t(`types.${task.type}`, { ns: "housekeeping" })}</Typography><Stack direction="row" justifyContent="space-between" gap={1} sx={{ mt: 0.75 }}><Typography sx={{ color: task.staff ? "#667085" : "#C27A14", fontSize: 12.5, fontWeight: task.staff ? 400 : 600 }}>{task.staff?.fullName || t("unassigned", { ns: "housekeeping" })}</Typography><Typography sx={{ color: "#98A2B3", fontSize: 12 }}>{created.date} · {created.time}</Typography></Stack></Card>; })}
      {!loading && (error || tasks.length === 0) && <Box sx={{ py: 5, px: 2, textAlign: "center", border: "1px solid #E4E7EC", borderRadius: "10px", bgcolor: "#FFFFFF" }}><Typography sx={{ color: "#344054", fontSize: 14, fontWeight: 600 }}>{t(error ? "states.loadError" : "states.empty", { ns: "housekeeping" })}</Typography><Typography sx={{ mt: 0.5, color: "#667085", fontSize: 13 }}>{t(error ? "states.loadErrorHint" : "states.emptyHint", { ns: "housekeeping" })}</Typography>{error && <Button size="small" onClick={onRetry} sx={{ mt: 1 }}>{t("actions.retry", { ns: "common" })}</Button>}</Box>}
    </Stack>
    <Menu anchorEl={statusMenu?.anchor} open={Boolean(statusMenu)} onClose={() => setStatusMenu(null)} PaperProps={{ sx: { width: 205, mt: 0.5, border: "1px solid #E4E7EC", borderRadius: "8px", boxShadow: "0 8px 24px rgba(16,24,40,0.10)" } }}>
      <Typography sx={{ px: 1.5, py: 0.75, color: "#667085", fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>{t("columns.status", { ns: "housekeeping" })}</Typography>
      {statusOptions.map((option) => <MenuItem key={option} selected={statusMenu?.task.status === option} disabled={updating} onClick={async () => { if (!statusMenu) return; const task = statusMenu.task; setStatusMenu(null); if (task.status !== option) await onStatusChange({ id: task.id, status: option }); }} sx={{ minHeight: 38, fontSize: 13.5 }}>{t(`status.${option}`, { ns: "housekeeping" })}</MenuItem>)}
    </Menu>
    </>
  );
}

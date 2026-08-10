import { EditOutlined, LockResetOutlined, MoreVert, PersonOffOutlined, PersonOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { UserShortResponse } from "@constant/response/UserShortResponse";

interface Props {
  rows: UserShortResponse[];
  isLoading: boolean;
  isError?: boolean;
  hasSearch?: boolean;
  statusUpdating?: boolean;
  onRetry?: () => void;
  onEdit?: (id: string) => void;
  onResetPassword?: (id: string) => void;
  onToggle?: (employee: UserShortResponse) => void;
  onCreate?: () => void;
}

const StatusChip = ({ active }: { active: boolean }) => {
  const { t } = useTranslation("staff");
  return (
  <Chip
    label={t(active ? "status.active" : "status.inactive")}
    size="small"
    sx={{
      height: 25,
      border: 0,
      bgcolor: active ? "#EAF6F0" : "#F2F4F7",
      color: active ? "#246548" : "#475467",
      fontSize: 11.75,
      fontWeight: 600,
      "& .MuiChip-label": { px: 1.1 },
    }}
  />
  );
};

const EmployeeTable = ({ rows, isLoading, isError = false, hasSearch = false, statusUpdating = false, onRetry, onEdit, onResetPassword, onToggle, onCreate }: Props) => {
  const { t } = useTranslation(["staff", "common"]);
  const [menuState, setMenuState] = useState<{ anchor: HTMLElement; employee: UserShortResponse } | null>(null);

  const closeMenu = () => setMenuState(null);
  const selectAction = (action: (employee: UserShortResponse) => void) => {
    if (menuState) action(menuState.employee);
    closeMenu();
  };

  const emptyState = (
    <Stack alignItems="center" sx={{ px: 2, py: 5 }}>
      <Typography sx={{ color: "#344054", fontSize: 14, fontWeight: 600 }}>
        {t(isError ? "empty.loadError" : hasSearch ? "empty.noMatch" : "empty.noData", { ns: "staff" })}
      </Typography>
      <Typography sx={{ mt: 0.4, color: "#667085", fontSize: 13 }}>
        {t(isError ? "empty.retryHint" : hasSearch ? "empty.searchHint" : "empty.createHint", { ns: "staff" })}
      </Typography>
      {isError && onRetry && <Button size="small" onClick={onRetry} sx={{ mt: 1 }}>{t("actions.retry", { ns: "common" })}</Button>}
      {!isError && !hasSearch && onCreate && <Button size="small" onClick={onCreate} sx={{ mt: 1 }}>{t("create", { ns: "staff" })}</Button>}
    </Stack>
  );

  return (
    <>
      <TableContainer component={Paper} className="admin-scrollbar" sx={{ display: { xs: "none", sm: "block" }, border: "1px solid #E4E7EC", borderRadius: "11px", boxShadow: "none", overflowX: "auto" }}>
        <Table size="small" sx={{ minWidth: 820 }}>
          <TableHead sx={{ bgcolor: "#F9FAFB", "& th": { height: 46, py: 1, color: "#475467", fontSize: 12, fontWeight: 650, whiteSpace: "nowrap" } }}>
            <TableRow>
              <TableCell sx={{ width: "24%" }}>{t("columns.employee", { ns: "staff" })}</TableCell>
              <TableCell sx={{ width: "17%" }}>{t("columns.phone", { ns: "staff" })}</TableCell>
              <TableCell sx={{ width: "25%" }}>{t("columns.email", { ns: "staff" })}</TableCell>
              <TableCell sx={{ width: "16%" }}>{t("columns.position", { ns: "staff" })}</TableCell>
              <TableCell sx={{ width: "14%" }}>{t("columns.status", { ns: "staff" })}</TableCell>
              <TableCell align="center" sx={{ width: 76 }}>{t("columns.actions", { ns: "staff" })}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && Array.from({ length: 6 }).map((_, row) => (
              <TableRow key={row}>{Array.from({ length: 6 }).map((__, cell) => <TableCell key={cell} sx={{ py: 1.4 }}><Skeleton width={cell === 0 ? 150 : "70%"} /></TableCell>)}</TableRow>
            ))}
            {!isLoading && !isError && rows.map((employee) => (
              <TableRow
                key={employee.id}
                hover
                tabIndex={0}
                onClick={() => onEdit?.(employee.id)}
                onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onEdit?.(employee.id); } }}
                sx={{ cursor: onEdit ? "pointer" : "default", "& td": { height: 58, py: 1 }, "&:last-child td": { borderBottom: 0 }, "&:hover": { bgcolor: "#F9FAFB" } }}
              >
                <TableCell><Typography sx={{ maxWidth: 220, color: "#1F2937", fontSize: 13.5, fontWeight: 650, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{employee.fullName}</Typography></TableCell>
                <TableCell sx={{ color: "#475467", fontSize: 13 }}>{employee.phone?.trim() || "—"}</TableCell>
                <TableCell><Typography sx={{ maxWidth: 250, color: "#475467", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{employee.email || "—"}</Typography></TableCell>
                <TableCell><Typography sx={{ color: "#344054", fontSize: 13, fontWeight: 500 }}>{t(`roles.${employee.roleName}`, { ns: "common", defaultValue: employee.roleName })}</Typography></TableCell>
                <TableCell><StatusChip active={employee.active} /></TableCell>
                <TableCell align="center"><IconButton aria-label={t("aria.openActions", { ns: "staff", name: employee.fullName })} size="small" onClick={(event) => { event.stopPropagation(); setMenuState({ anchor: event.currentTarget, employee }); }} sx={{ color: "#667085" }}><MoreVert fontSize="small" /></IconButton></TableCell>
              </TableRow>
            ))}
            {!isLoading && (isError || rows.length === 0) && <TableRow><TableCell colSpan={6}>{emptyState}</TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={1} sx={{ display: { xs: "flex", sm: "none" } }}>
        {isLoading && Array.from({ length: 5 }).map((_, index) => <Card key={index} variant="outlined" sx={{ p: 1.5, borderColor: "#E4E7EC", borderRadius: "10px", boxShadow: "none" }}><Skeleton width="55%" /><Skeleton width="38%" /><Skeleton width="70%" /></Card>)}
        {!isLoading && !isError && rows.map((employee) => (
          <Card key={employee.id} role="button" tabIndex={0} variant="outlined" onClick={() => onEdit?.(employee.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onEdit?.(employee.id); } }} sx={{ p: 1.5, borderColor: "#E4E7EC", borderRadius: "10px", boxShadow: "none", cursor: "pointer" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={1}>
              <Box sx={{ minWidth: 0 }}><Typography sx={{ color: "#1F2937", fontSize: 14, fontWeight: 650, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{employee.fullName}</Typography><Typography sx={{ mt: 0.2, color: "#667085", fontSize: 12.5 }}>{t(`roles.${employee.roleName}`, { ns: "common", defaultValue: employee.roleName })}</Typography></Box>
              <Stack direction="row" alignItems="center" spacing={0.25}><StatusChip active={employee.active} /><IconButton aria-label={t("aria.openActions", { ns: "staff", name: employee.fullName })} size="small" onClick={(event) => { event.stopPropagation(); setMenuState({ anchor: event.currentTarget, employee }); }}><MoreVert fontSize="small" /></IconButton></Stack>
            </Stack>
            <Typography sx={{ mt: 0.9, color: "#475467", fontSize: 12.75 }}>{employee.phone?.trim() || "—"}</Typography>
            <Typography sx={{ mt: 0.15, color: "#475467", fontSize: 12.75, overflowWrap: "anywhere" }}>{employee.email || "—"}</Typography>
          </Card>
        ))}
        {!isLoading && (isError || rows.length === 0) && <Card variant="outlined" sx={{ borderColor: "#E4E7EC", borderRadius: "10px", boxShadow: "none" }}>{emptyState}</Card>}
      </Stack>

      <Menu anchorEl={menuState?.anchor} open={Boolean(menuState)} onClose={closeMenu} slotProps={{ paper: { className: "admin-scrollbar", sx: { width: 220, p: 0.5, border: "1px solid #E4E7EC", borderRadius: "8px", boxShadow: "0 8px 24px rgba(16,24,40,0.10)" } } }}>
        <MenuItem onClick={() => selectAction((employee) => onEdit?.(employee.id))} sx={{ minHeight: 38, gap: 1, borderRadius: "6px", fontSize: 13.5 }}><EditOutlined sx={{ color: "#667085", fontSize: 18 }} />{t("actions.edit", { ns: "staff" })}</MenuItem>
        <MenuItem onClick={() => selectAction((employee) => onResetPassword?.(employee.id))} sx={{ minHeight: 38, gap: 1, borderRadius: "6px", fontSize: 13.5 }}><LockResetOutlined sx={{ color: "#667085", fontSize: 18 }} />{t("actions.resetPassword", { ns: "staff" })}</MenuItem>
        {menuState?.employee.roleName !== "ADMIN" && <MenuItem disabled={statusUpdating} onClick={() => selectAction((employee) => onToggle?.(employee))} sx={{ minHeight: 38, gap: 1, borderRadius: "6px", color: menuState?.employee.active ? "#9A6518" : "#1D6FC2", fontSize: 13.5 }}>{menuState?.employee.active ? <PersonOffOutlined sx={{ fontSize: 18 }} /> : <PersonOutline sx={{ fontSize: 18 }} />}{t(menuState?.employee.active ? "actions.deactivate" : "actions.activate", { ns: "staff" })}</MenuItem>}
      </Menu>
    </>
  );
};

export default EmployeeTable;

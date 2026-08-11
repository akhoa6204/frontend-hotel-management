import type { StaffShiftImportRowRequest } from "@constant/request/StaffShiftImportRequest";
import type {
  StaffShiftImportPreviewResponse,
  StaffShiftImportRowResponse,
  StaffShiftValidationCode,
} from "@constant/response/StaffShiftImportResponse";
import type { ShiftResponse } from "@constant/response/ShiftResponse";
import { Close, DeleteOutline, Search, UploadFile } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import StaffShiftService from "@services/staff/shift.service";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getShiftVisual } from "../../shift-visual";

interface Props {
  open: boolean;
  shifts: ShiftResponse[];
  onClose: () => void;
  onImported: (count: number) => void;
}

type StatusFilter = "ALL" | "VALID" | "INVALID";

const toRequest = (row: StaffShiftImportRowResponse): StaffShiftImportRowRequest => ({
  rowNumber: row.rowNumber,
  email: row.email,
  workDate: row.workDate,
  shiftCode: row.shiftCode,
  originalEmail: row.originalEmail,
  originalWorkDate: row.originalWorkDate,
  originalShiftCode: row.originalShiftCode,
});

const errorMessage = (error: unknown, fallback: string) => {
  if (typeof error !== "object" || error === null) return fallback;
  const value = error as { message?: string; response?: { data?: { message?: string } } };
  return value.response?.data?.message || value.message || fallback;
};

export default function StaffShiftImportDialog({
  open,
  shifts,
  onClose,
  onImported,
}: Props) {
  const { t } = useTranslation("schedules");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [preview, setPreview] = useState<StaffShiftImportPreviewResponse | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [failure, setFailure] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [previewSearch, setPreviewSearch] = useState("");
  const shiftLabel = (shift: ShiftResponse) =>
    t(`shifts.${shift.code}`, { defaultValue: shift.name });

  const applyPreview = (data: StaffShiftImportPreviewResponse, focusErrors = false) => {
    setPreview(data);
    setPage(0);
    setFailure("");
    if (focusErrors) {
      setStatusFilter(data.summary.invalidRows > 0 ? "INVALID" : "ALL");
    } else if (data.summary.invalidRows === 0 && statusFilter === "INVALID") {
      setStatusFilter("ALL");
    }
  };

  const previewMutation = useMutation({
    mutationFn: StaffShiftService.previewImport,
    onSuccess: (data) => applyPreview(data, true),
    onError: (error) => setFailure(errorMessage(error, t("import.errors.preview"))),
  });
  const revalidateMutation = useMutation({
    mutationFn: StaffShiftService.revalidateImport,
    onSuccess: (data) => applyPreview(data),
    onError: (error) => setFailure(errorMessage(error, t("import.errors.revalidate"))),
  });
  const confirmMutation = useMutation({
    mutationFn: StaffShiftService.confirmImport,
    onSuccess: (data) => onImported(data.imported),
    onError: (error) => setFailure(errorMessage(error, t("import.errors.confirm"))),
  });

  useEffect(() => {
    if (!open) {
      setPreview(null);
      setPage(0);
      setFailure("");
      setStatusFilter("ALL");
      setPreviewSearch("");
    }
  }, [open]);

  const rows = useMemo(() => preview?.rows || [], [preview]);
  const filteredRows = useMemo(() => {
    const search = previewSearch.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesStatus = statusFilter === "ALL"
        || (statusFilter === "VALID" ? row.status === "VALID" : row.status !== "VALID");
      const matchesSearch = !search
        || row.email.toLowerCase().includes(search)
        || row.employee?.fullName?.toLowerCase().includes(search);
      return matchesStatus && matchesSearch;
    });
  }, [previewSearch, rows, statusFilter]);
  const visibleRows = useMemo(
    () => filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredRows, page, rowsPerPage],
  );
  const busy = previewMutation.isPending || revalidateMutation.isPending || confirmMutation.isPending;
  const canConfirm = Boolean(preview && rows.length > 0 && preview.summary.invalidRows === 0
    && rows.every((row) => row.status === "VALID"));

  const updateRow = (rowNumber: number, field: "email" | "workDate" | "shiftCode", value: string) => {
    setPreview((current) => current && ({
      ...current,
      summary: { ...current.summary, invalidRows: Math.max(current.summary.invalidRows, 1) },
      rows: current.rows.map((row) => row.rowNumber === rowNumber ? {
        ...row,
        [field]: value,
        employee: field === "email" ? null : row.employee,
        shift: field === "shiftCode" ? null : row.shift,
        status: "EDITED",
        validationErrors: [],
      } : row),
    }));
  };

  const removeRow = (rowNumber: number) => {
    const remainingRows = preview?.rows.filter((row) => row.rowNumber !== rowNumber) || [];
    setPreview((current) => {
      if (!current) return current;
      const nextRows = current.rows.filter((row) => row.rowNumber !== rowNumber);
      const validRows = nextRows.filter((row) => row.status === "VALID").length;
      const dates = nextRows.map((row) => row.workDate)
        .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value))
        .sort();
      return {
        ...current,
        rows: nextRows,
        summary: {
          totalRows: nextRows.length,
          validRows,
          invalidRows: nextRows.length - validRows,
        },
        dateRange: {
          startDate: dates[0] || null,
          endDate: dates[dates.length - 1] || null,
        },
      };
    });
    if (statusFilter === "INVALID" && remainingRows.every((row) => row.status === "VALID")) {
      setStatusFilter("ALL");
    }
    setPage(0);
  };

  const revalidate = () => {
    if (!preview) return;
    revalidateMutation.mutate({ rows: preview.rows.map(toRequest) });
  };

  const confirm = () => {
    if (!preview || !canConfirm) return;
    confirmMutation.mutate({ rows: preview.rows.map(toRequest) });
  };

  const renderErrors = (errors: StaffShiftValidationCode[]) =>
    errors.map((code) => t(`import.validation.${code}`)).join("; ");

  return (
    <Dialog
      open={open}
      onClose={busy ? undefined : onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="xl"
      PaperProps={{
        className: "diamond-sea-admin",
        sx: {
          height: { md: "calc(100dvh - 48px)" },
          maxHeight: { md: "calc(100dvh - 48px)" },
          borderRadius: { xs: 0, md: "12px" },
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle sx={{ flexShrink: 0, px: 2.5, py: 2, borderBottom: "1px solid #E4E7EC" }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={2}>
          <Box>
            <Typography component="h2" sx={{ color: "#1F2937", fontSize: 19, fontWeight: 700 }}>
              {t("import.title")}
            </Typography>
            <Typography sx={{ mt: 0.25, color: "#667085", fontSize: 13 }}>
              {t("import.subtitle")}
            </Typography>
          </Box>
          <IconButton aria-label={t("import.close")} disabled={busy} onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ display: "flex", minHeight: 0, flex: 1, flexDirection: "column", p: 0, overflow: "hidden" }}>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} gap={1.5}
          sx={{ flexShrink: 0, px: 2.5, py: 1.5, borderBottom: "1px solid #EAECF0", bgcolor: "#F9FAFB" }}>
          <Button component="label" variant="outlined" startIcon={<UploadFile />} disabled={busy}>
            {preview ? t("import.replaceFile") : t("import.chooseFile")}
            <input hidden type="file" accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) previewMutation.mutate(file);
                event.target.value = "";
              }} />
          </Button>
          {preview && (
            <Stack direction="row" gap={1} flexWrap="wrap">
              <Chip clickable onClick={() => { setStatusFilter("ALL"); setPage(0); }}
                color={statusFilter === "ALL" ? "primary" : "default"}
                variant={statusFilter === "ALL" ? "filled" : "outlined"}
                label={t("import.summary.total", { count: preview.summary.totalRows })} />
              <Chip clickable onClick={() => { setStatusFilter("VALID"); setPage(0); }}
                color="success" variant={statusFilter === "VALID" ? "filled" : "outlined"}
                label={t("import.summary.valid", { count: preview.summary.validRows })} />
              <Chip clickable onClick={() => { setStatusFilter("INVALID"); setPage(0); }}
                color="error" variant={statusFilter === "INVALID" ? "filled" : "outlined"}
                label={t("import.summary.invalid", { count: preview.summary.invalidRows })} />
              {preview.dateRange.startDate && preview.dateRange.endDate && (
                <Chip variant="outlined" label={`${preview.dateRange.startDate} – ${preview.dateRange.endDate}`} />
              )}
            </Stack>
          )}
          {busy && <CircularProgress size={22} sx={{ ml: { sm: "auto" } }} />}
        </Stack>

        {preview && (
          <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} gap={1.5}
            sx={{ flexShrink: 0, px: 2.5, py: 1.25, borderBottom: "1px solid #EAECF0" }}>
            <TextField size="small" value={previewSearch} placeholder={t("import.search")}
              onChange={(event) => { setPreviewSearch(event.target.value); setPage(0); }}
              slotProps={{ input: { startAdornment: <Search sx={{ mr: 1, color: "#98A2B3", fontSize: 20 }} /> } }}
              sx={{ width: { xs: "100%", sm: 360 } }} />
            <Typography sx={{ color: "#667085", fontSize: 13 }}>
              {t("import.filteredCount", { count: filteredRows.length })}
            </Typography>
            {preview.summary.invalidRows > 0 && statusFilter !== "INVALID" && (
              <Button size="small" color="error" onClick={() => { setStatusFilter("INVALID"); setPage(0); }}>
                {t("import.reviewErrors", { count: preview.summary.invalidRows })}
              </Button>
            )}
          </Stack>
        )}

        {failure && <Alert severity="error" sx={{ mx: 2.5, mt: 1.5 }}>{failure}</Alert>}

        {!preview ? (
          <Stack alignItems="center" justifyContent="center" sx={{ flex: 1, p: 4, textAlign: "center" }}>
            <UploadFile sx={{ mb: 1.5, color: "#98A2B3", fontSize: 42 }} />
            <Typography sx={{ color: "#344054", fontWeight: 650 }}>{t("import.empty")}</Typography>
            <Typography sx={{ mt: 0.5, color: "#667085", fontSize: 13 }}>{t("import.formatHint")}</Typography>
          </Stack>
        ) : (
          <TableContainer sx={{ minHeight: 0, flex: 1, overflow: "auto" }}>
            <Table stickyHeader size="small" sx={{ minWidth: 1180 }}>
              <TableHead sx={{ "& th": { bgcolor: "#F9FAFB", color: "#475467", fontSize: 12, fontWeight: 700 } }}>
                <TableRow>
                  <TableCell>{t("import.columns.row")}</TableCell>
                  <TableCell>{t("import.columns.employee")}</TableCell>
                  <TableCell>{t("import.columns.email")}</TableCell>
                  <TableCell>{t("import.columns.workDate")}</TableCell>
                  <TableCell>{t("import.columns.shift")}</TableCell>
                  <TableCell>{t("import.columns.status")}</TableCell>
                  <TableCell>{t("import.columns.error")}</TableCell>
                  <TableCell align="right">{t("import.columns.action")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((row) => {
                  const editable = row.status !== "VALID";
                  const rowShiftVisual = row.shift
                    ? getShiftVisual(row.shift.code)
                    : null;
                  return (
                    <TableRow key={row.rowNumber} hover sx={{ "& td": { py: 1, borderColor: "#EAECF0" } }}>
                      <TableCell>{row.rowNumber}</TableCell>
                      <TableCell>{row.employee?.fullName || "—"}</TableCell>
                      <TableCell sx={{ minWidth: 250 }}>
                        {editable ? <TextField fullWidth size="small" value={row.email}
                          onChange={(event) => updateRow(row.rowNumber, "email", event.target.value)} /> : row.email}
                      </TableCell>
                      <TableCell sx={{ minWidth: 155 }}>
                        {editable ? <TextField fullWidth size="small" type="date" value={row.workDate}
                          onChange={(event) => updateRow(row.rowNumber, "workDate", event.target.value)} /> : row.workDate}
                      </TableCell>
                      <TableCell sx={{ minWidth: 220 }}>
                        {editable ? (
                          <TextField select fullWidth size="small" value={row.shiftCode}
                            onChange={(event) => updateRow(row.rowNumber, "shiftCode", event.target.value)}>
                            {!shifts.some((shift) => shift.code === row.shiftCode) && row.shiftCode && (
                              <MenuItem value={row.shiftCode}>
                                <Box sx={{ width: 8, height: 8, mr: 1, flexShrink: 0, borderRadius: "50%", bgcolor: getShiftVisual(row.shiftCode).accent }} />
                                {t("import.unknownShift")}
                              </MenuItem>
                            )}
                            {shifts.map((shift) => {
                              const shiftVisual = getShiftVisual(shift.code);
                              return (
                                <MenuItem key={shift.id} value={shift.code}>
                                  <Box sx={{ width: 8, height: 8, mr: 1, flexShrink: 0, borderRadius: "50%", bgcolor: shiftVisual.accent }} />
                                  {shiftLabel(shift)}
                                </MenuItem>
                              );
                            })}
                          </TextField>
                        ) : row.shift && rowShiftVisual ? (
                          <Chip
                            size="small"
                            label={shiftLabel(row.shift)}
                            sx={{
                              height: 26,
                              bgcolor: rowShiftVisual.background,
                              border: `1px solid ${rowShiftVisual.border}`,
                              color: rowShiftVisual.text,
                              fontSize: 12,
                              fontWeight: 650,
                            }}
                          />
                        ) : t("import.unknownShift")}
                      </TableCell>
                      <TableCell>
                        <Chip size="small" color={row.status === "VALID" ? "success" : row.status === "EDITED" ? "warning" : "error"}
                          label={t(`import.status.${row.status}`)} />
                      </TableCell>
                      <TableCell sx={{ minWidth: 230, color: "#A43B3B", fontSize: 12.5 }}>
                        {renderErrors(row.validationErrors) || "—"}
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" gap={0.5}>
                          {editable && <Button size="small" disabled={busy} onClick={revalidate}>{t("import.revalidate")}</Button>}
                          <Tooltip title={t("import.removeRow")}>
                            <span>
                              <IconButton size="small" color="error" disabled={busy}
                                aria-label={t("import.removeRowLabel", { row: row.rowNumber })}
                                onClick={() => removeRow(row.rowNumber)}>
                                <DeleteOutline fontSize="small" />
                              </IconButton>
                            </span>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>

      <Box sx={{ flexShrink: 0, borderTop: "1px solid #E4E7EC", bgcolor: "#FFFFFF" }}>
        {preview && rows.length > 0 && (
          <TablePagination component="div" count={filteredRows.length} page={page} rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10, 20, 50]} onPageChange={(_, value) => setPage(value)}
            onRowsPerPageChange={(event) => { setRowsPerPage(Number(event.target.value)); setPage(0); }} />
        )}
        <DialogActions sx={{ px: 2.5, py: 1.5, borderTop: preview ? "1px solid #EAECF0" : 0 }}>
          <Button variant="outlined" disabled={busy} onClick={onClose}>{t("import.cancel")}</Button>
          {preview && <Button variant="outlined" disabled={busy} onClick={revalidate}>{t("import.revalidateAll")}</Button>}
          <Button variant="contained" disabled={busy || !canConfirm} onClick={confirm}>
            {confirmMutation.isPending ? t("import.confirming") : t("import.confirm")}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

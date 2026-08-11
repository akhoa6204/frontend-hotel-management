import useShift from "./useShift";
import WeeklyScheduleCalendar from "./components/weekly-schedule-calendar";
import { GlobalSnackbar, EntityPickerDialog } from "@components";
import CreateShiftDialog from "./components/create-shift-dialog";
import StaffShiftImportDialog from "./components/staff-shift-import-dialog";
import {
  Box,
  Button,
  ButtonBase,
  IconButton,
  InputAdornment,
  MenuItem,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add, ArrowBack, ArrowForward, Search, UploadFile } from "@mui/icons-material";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ShiftManagement = () => {
  const { t } = useTranslation(["schedules", "common"]);
  const {
    shifts,
    shiftDefinitions,
    nextWeek,
    prevWeek,
    start,
    end,
    onRemove,
    onImportSuccess,
    canEdit,
    alert,
    closeSnackbar,

    form,
    openDialog,
    closeDialog,
    onSubmit,
    open,
    onChangeForm,
    filters,
    setFilters,
    applyDateRange,
    hasNextPage,
    loadMore,
    isLoadingMore,

    options,
    meta,

    selectedId,

    openEntityPickerDialog,
    openPicker,
    closePicker,
    select,

    onChangePage,
    onSearchEmployee,
    filtersEmployee,
    isLoadingEmployees,
    isLoading,
    isError,
    refetch,
    isCreating,
    isRemoving,
    isLoadingDefinitions,
  } = useShift();
  const [rangeAnchor, setRangeAnchor] = useState<HTMLElement | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [draftRange, setDraftRange] = useState({ start, end });
  const invalidDraftRange =
    !draftRange.start ||
    !draftRange.end ||
    dayjs(draftRange.end).isBefore(draftRange.start, "day");

  const openRangePicker = (event: React.MouseEvent<HTMLElement>) => {
    setDraftRange({ start, end });
    setRangeAnchor(event.currentTarget);
  };

  const closeRangePicker = () => setRangeAnchor(null);

  const applyRange = () => {
    if (invalidDraftRange) return;
    applyDateRange(draftRange.start, draftRange.end);
    closeRangePicker();
  };

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        gap={2}
        sx={{ mb: 2.5 }}
      >
        <Box>
          <Typography component="h1" sx={{ color: "#163B47", fontSize: { xs: 26, md: 29 }, lineHeight: 1.25, fontWeight: 700 }}>{t("title", { ns: "schedules" })}</Typography>
          <Typography sx={{ mt: 0.5, color: "#667085", fontSize: 13.5 }}>{t("subtitle", { ns: "schedules" })}</Typography>
        </Box>
        {canEdit && (
          <Stack direction={{ xs: "column", sm: "row" }} gap={1}>
            <Button startIcon={<UploadFile />} variant="outlined" onClick={() => setImportOpen(true)} sx={{ minHeight: 42, borderRadius: "8px" }}>
              {t("import.action", { ns: "schedules" })}
            </Button>
            <Button startIcon={<Add />} variant="contained" onClick={() => openDialog(null)} sx={{ minHeight: 42, borderRadius: "8px" }}>
              {t("create", { ns: "schedules" })}
            </Button>
          </Stack>
        )}
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "nowrap",
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "space-between",
          gap: { xs: 1.5, md: 1.5, lg: 2 },
          width: "100%",
        }}
      >
        {canEdit && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                sm: "minmax(280px, 1fr) 180px",
                md: "minmax(280px, 1fr) minmax(160px, 180px)",
              },
              width: { xs: "100%", md: "clamp(500px, 55vw, 680px)" },
              height: { xs: "auto", sm: 42 },
              flexShrink: 1,
              bgcolor: "#FFFFFF",
              border: "1px solid #D0D5DD",
              borderRadius: "8px",
              overflow: "hidden",
              transition: "border-color 120ms ease, box-shadow 120ms ease",
              "&:focus-within": {
                borderColor: "#2E90FA",
                boxShadow: "0 0 0 2px rgba(46, 144, 250, 0.08)",
              },
            }}
          >
            <TextField
              size="small"
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  height: 40,
                  bgcolor: "transparent",
                  borderRadius: 0,
                  px: 1.5,
                  "& fieldset": { border: 0 },
                  "&:hover fieldset, &.Mui-focused fieldset": { border: 0 },
                },
                "& .MuiInputBase-input": { py: 0, fontSize: 13.5 },
                "& .MuiInputAdornment-root": { color: "#667085" },
              }}
              value={filters.q}
              onChange={(e) =>
                setFilters((pre) => ({ ...pre, q: e.target.value }))
              }
              placeholder={t("search", { ns: "schedules" })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              select
              size="small"
              defaultValue="ALL"
              sx={{
                width: "100%",
                borderTop: { xs: "1px solid #EAECF0", sm: 0 },
                borderLeft: { xs: 0, sm: "1px solid #EAECF0" },
                "& .MuiOutlinedInput-root": {
                  height: 40,
                  bgcolor: "transparent",
                  borderRadius: 0,
                  "& fieldset": { border: 0 },
                  "&:hover fieldset, &.Mui-focused fieldset": { border: 0 },
                },
                "& .MuiSelect-select": { py: 0, pl: 1.5, fontSize: 13.5 },
              }}
              value={filters.position}
              onChange={(e) =>
                setFilters((pre) => ({ ...pre, position: e.target.value as typeof filters.position }))
              }
            >
              <MenuItem value="ALL">{t("allPositions", { ns: "schedules" })}</MenuItem>
              <MenuItem value="RECEPTIONIST">{t("roles.RECEPTIONIST", { ns: "common" })}</MenuItem>
              <MenuItem value="HOUSEKEEPING">{t("roles.HOUSEKEEPING", { ns: "common" })}</MenuItem>
              <MenuItem value="ADMIN">{t("roles.MANAGER", { ns: "common" })}</MenuItem>
            </TextField>
          </Box>
        )}

        <Box display="flex" justifyContent={{ xs: "stretch", md: "flex-end" }} sx={{ flexShrink: 0 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "40px minmax(200px, 1fr) 40px",
              alignItems: "center",
              width: { xs: "100%", md: "clamp(280px, 30vw, 320px)" },
              height: 42,
              borderRadius: "8px",
              border: "1px solid #D0D5DD",
              bgcolor: "#FFFFFF",
              overflow: "hidden",
            }}
          >
            <IconButton aria-label={t("previousRange", { ns: "schedules" })} size="small" onClick={prevWeek} sx={{ width: 40, height: 40, borderRadius: 0, color: "#667085", "&:hover": { bgcolor: "#F9FAFB" } }}>
              <ArrowBack fontSize="small" />
            </IconButton>

            <ButtonBase
              aria-label={t("chooseRange", { ns: "schedules" })}
              aria-haspopup="dialog"
              aria-expanded={Boolean(rangeAnchor)}
              onClick={openRangePicker}
              sx={{
                height: 40,
                px: 1.25,
                color: "#344054",
                fontSize: 13.5,
                fontWeight: 600,
                textAlign: "center",
                whiteSpace: "nowrap",
                borderLeft: "1px solid #EAECF0",
                borderRight: "1px solid #EAECF0",
                "&:hover": { bgcolor: "#F9FAFB", color: "#1D6FC2" },
              }}
            >
              {dayjs(start).format("DD/MM/YYYY")} –{" "}
              {dayjs(end).format("DD/MM/YYYY")}
            </ButtonBase>

            <IconButton aria-label={t("nextRange", { ns: "schedules" })} size="small" onClick={nextWeek} sx={{ width: 40, height: 40, borderRadius: 0, color: "#667085", "&:hover": { bgcolor: "#F9FAFB" } }}>
              <ArrowForward fontSize="small" />
            </IconButton>
          </Box>
          <Popover
            open={Boolean(rangeAnchor)}
            anchorEl={rangeAnchor}
            onClose={closeRangePicker}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  width: { xs: "calc(100vw - 32px)", sm: 360 },
                  maxWidth: 360,
                  p: 2,
                  border: "1px solid #E4E7EC",
                  borderRadius: "10px",
                  boxShadow: "0 10px 28px rgba(16, 24, 40, 0.14)",
                },
              },
            }}
          >
            <Stack spacing={2}>
              <Typography sx={{ color: "#1F2937", fontSize: 14, fontWeight: 650 }}>
                {t("chooseRange", { ns: "schedules" })}
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  label={t("fromDate", { ns: "schedules" })}
                  value={draftRange.start}
                  onChange={(event) =>
                    setDraftRange((previous) => ({ ...previous, start: event.target.value }))
                  }
                  slotProps={{ inputLabel: { shrink: true }, htmlInput: { max: draftRange.end || undefined } }}
                />
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  label={t("toDate", { ns: "schedules" })}
                  value={draftRange.end}
                  onChange={(event) =>
                    setDraftRange((previous) => ({ ...previous, end: event.target.value }))
                  }
                  slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: draftRange.start || undefined } }}
                />
              </Stack>
              <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <Button size="small" variant="outlined" onClick={closeRangePicker}>
                  {t("actions.cancel", { ns: "common" })}
                </Button>
                <Button size="small" variant="contained" disabled={invalidDraftRange} onClick={applyRange}>
                  {t("applyRange", { ns: "schedules" })}
                </Button>
              </Stack>
            </Stack>
          </Popover>
        </Box>
      </Box>
      <WeeklyScheduleCalendar
        shifts={shifts || []}
        start={start}
        end={end}
        onRemove={onRemove}
        onAdd={openDialog}
        canEdit={canEdit}
        loading={isLoading}
        error={isError}
        onRetry={() => refetch()}
        removing={isRemoving}
      />
      {canEdit && hasNextPage && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="outlined"
            disabled={isLoadingMore}
            onClick={() => void loadMore()}
          >
            {isLoadingMore
              ? t("loadingMore", { ns: "schedules" })
              : t("loadMore", { ns: "schedules" })}
          </Button>
        </Box>
      )}
      <CreateShiftDialog
        shifts={shiftDefinitions || []}
        open={open}
        onClose={closeDialog}
        workDate={form.workDate}
        shiftId={Number(form.shiftId)}
        onChangeShift={onChangeForm}
        staff={form.staff || null}
        onSubmit={onSubmit}
        options={options}
        isMoreOptions={(meta?.totalPages ?? 0) > 1}
        seeMore={openPicker}
        saving={isCreating}
        loadingDefinitions={isLoadingDefinitions}
      />
      <StaffShiftImportDialog
        open={importOpen}
        shifts={shiftDefinitions || []}
        onClose={() => setImportOpen(false)}
        onImported={(count) => {
          setImportOpen(false);
          onImportSuccess(count);
        }}
      />

      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />

      <EntityPickerDialog
        open={openEntityPickerDialog}
        data={options}
        selectedId={selectedId || null}
        onClose={closePicker}
        title={t("picker.title", { ns: "schedules" })}
        columns={[
          { label: t("picker.columns.name", { ns: "schedules" }), name: "fullName" },
          { label: t("picker.columns.phone", { ns: "schedules" }), name: "phone" },
          { label: t("picker.columns.email", { ns: "schedules" }), name: "email" },
          { label: t("picker.columns.position", { ns: "schedules" }), name: "staff.position" },
        ]}
        onSelect={(row) => {
          select(row);
          onChangeForm("staff", row);
        }}
        onPageChange={onChangePage}
        totalPages={meta?.totalPages}
        page={meta?.page}
        onSearch={onSearchEmployee}
        q={filtersEmployee.q}
        loading={isLoadingEmployees}
      />
    </>
  );
};

export default ShiftManagement;

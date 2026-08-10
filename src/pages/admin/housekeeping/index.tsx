import useHouseKeeping from "./useHouseKeeping";
import HousekeepingTaskTable from "./components/housekeeping-task-table";
import { EntityPickerDialog, GlobalSnackbar, Pager } from "@components";
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import HousekeepingUpsertDialog from "./components/housekeeping-upsert-dialog";
import type { HousekeepingTaskStatus } from "@enums/HousekeepingTaskStatus";
import { useTranslation } from "react-i18next";

const HouseKeeping = () => {
  const { t } = useTranslation(["housekeeping", "common"]);
  const {
    tasks,
    meta,
    isLoading,
    isError,
    refetch,
    isUpdatingTask,
    isCreatingTask,
    notHouseKeeping,
    filters,
    onChangeFilter,
    handleChangePage,
    handleUpdateTask,

    alert,
    closeSnackbar,

    open,
    mode,
    onOpen,
    form,
    errors,
    onChange,
    onSubmit,
    onClose,
    canEditForm,
    optionsRoom,
    isMoreRoom,
    openPickerRoom,
    optionsStaff,
    isMoreStaff,
    openPickerStaff,
    loadingTask,

    rooms,
    openEntityPickerRoomDialog,
    onClosePickerRoom,
    selectedIdRoom,
    filtersRoom,
    onSearchRoom,
    metaRooms,
    onPageChangeRoom,
    selectRoom,
    loadingRooms,

    staffs,
    openEntityPickerStaffDialog,
    onClosePickerStaff,
    selectedIdStaff,
    filtersStaff,
    onSearchStaff,
    metaStaffs,
    onPageChangeStaff,
    selectStaff,
    loadingStaffs,
    staffOptionsError,
    refetchStaffOptions,
  } = useHouseKeeping();

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
          <Typography
            component="h1"
            sx={{ color: "#163B47", fontSize: { xs: 26, md: 29 }, lineHeight: 1.25, fontWeight: 700 }}
          >
            {t("title", { ns: "housekeeping" })}
          </Typography>
          <Typography sx={{ mt: 0.5, color: "#667085", fontSize: 13.5 }}>
            {t("subtitle", { ns: "housekeeping" })}
          </Typography>
        </Box>
        {notHouseKeeping && (
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => onOpen("CREATE")}
            sx={{ minHeight: 42, borderRadius: "8px", alignSelf: { sm: "center" } }}
          >
            {t("create", { ns: "housekeeping" })}
          </Button>
        )}
      </Stack>
      <Box
        sx={{
          mb: 2,
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            sm: "minmax(280px, 1fr) 180px",
          },
          width: { xs: "100%", md: "clamp(520px, 58vw, 720px)" },
          minHeight: 42,
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
            fullWidth
            size="small"
            placeholder={t("search", { ns: "housekeeping" })}
            value={filters.q ?? ""}
            onChange={(e) => onChangeFilter("q", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{
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
          />
          <TextField
            select
            size="small"
            value={filters.status}
            onChange={(e) =>
              onChangeFilter(
                "status",
                e.target.value as HousekeepingTaskStatus | "ALL",
              )
            }
            fullWidth
            sx={{
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
          >
            <MenuItem value={"ALL"}>{t("status.all", { ns: "common" })}</MenuItem>
            <MenuItem value={"PENDING"}>{t("status.PENDING", { ns: "housekeeping" })}</MenuItem>
            <MenuItem value={"IN_PROGRESS"}>{t("status.IN_PROGRESS", { ns: "housekeeping" })}</MenuItem>
            <MenuItem value={"COMPLETED"}>{t("status.COMPLETED", { ns: "housekeeping" })}</MenuItem>
          </TextField>
      </Box>

      <HousekeepingTaskTable
        tasks={tasks}
        onStatusChange={handleUpdateTask}
        onRowClick={onOpen}
        loading={isLoading}
        error={isError}
        onRetry={() => refetch()}
        updating={isUpdatingTask}
      />
      {(meta?.totalPages || 1) > 1 && (
        <Box mt={2} display="flex" justifyContent="center">
          <Pager
            page={meta?.page || 1}
            totalPages={meta?.totalPages || 1}
            onChange={handleChangePage}
          />
        </Box>
      )}
      <HousekeepingUpsertDialog
        open={open}
        mode={mode}
        form={form}
        errors={errors}
        onChange={onChange}
        onSubmit={onSubmit}
        onClose={onClose}
        canEdit={canEditForm}
        optionsRoom={optionsRoom}
        isMoreRoom={isMoreRoom}
        onOpenPickerRoom={openPickerRoom}
        optionsStaff={optionsStaff}
        isMoreStaff={isMoreStaff}
        onOpenPickerStaff={openPickerStaff}
        loadingTask={loadingTask}
        notHouseKeeping={notHouseKeeping}
        saving={isCreatingTask || isUpdatingTask}
        loadingStaffOptions={loadingStaffs}
        staffOptionsError={staffOptionsError}
        onRetryStaffOptions={() => refetchStaffOptions()}
      />

      <EntityPickerDialog
        data={rooms}
        onClose={onClosePickerRoom}
        open={openEntityPickerRoomDialog}
        selectedId={selectedIdRoom}
        title={t("pickers.roomsTitle", { ns: "housekeeping" })}
        columns={[
          { label: t("pickers.roomColumns.name", { ns: "housekeeping" }), name: "name" },
          { label: t("pickers.roomColumns.type", { ns: "housekeeping" }), name: "roomType.name" },
          { label: t("pickers.roomColumns.capacity", { ns: "housekeeping" }), name: "roomType.capacity" },
        ]}
        q={filtersRoom.q}
        onSearch={onSearchRoom}
        page={metaRooms?.page}
        totalPages={metaRooms?.totalPages}
        onPageChange={onPageChangeRoom}
        onSelect={(row) => {
          selectRoom(row);
          onChange("roomId", row.id);
        }}
        loading={loadingRooms}
      />

      <EntityPickerDialog
        data={staffs}
        onClose={onClosePickerStaff}
        open={openEntityPickerStaffDialog}
        selectedId={selectedIdStaff}
        title={t("pickers.staffTitle", { ns: "housekeeping" })}
        columns={[
          { label: t("pickers.staffColumns.name", { ns: "housekeeping" }), name: "fullName" },
          { label: t("pickers.staffColumns.phone", { ns: "housekeeping" }), name: "phone" },
          { label: t("pickers.staffColumns.email", { ns: "housekeeping" }), name: "email" },
          { label: t("pickers.staffColumns.position", { ns: "housekeeping" }), name: "staff.position" },
        ]}
        onSelect={(row) => {
          selectStaff(row);
          onChange("staffId", row.id);
        }}
        q={filtersStaff.q}
        onSearch={onSearchStaff}
        page={metaStaffs?.page}
        totalPages={metaStaffs?.totalPages}
        onPageChange={onPageChangeStaff}
        loading={loadingStaffs}
      />

      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </>
  );
};

export default HouseKeeping;

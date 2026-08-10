import {
  Box,
  Grid,
  TextField,
  Typography,
  Stack,
  InputAdornment,
  Button,
} from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { GlobalSnackbar } from "@components";
import RoomTabs from "./components/RoomTabs";
import RoomUpsertDialog from "./components/RoomUpsertDialog";
import RoomCard from "./components/RoomCard";
import RoomCardSkeleton from "./components/RoomCardSkeleton";
import Pager from "@components/pager";
import useRoomManagement from "./useRoomManagement";
import { useTranslation } from "react-i18next";

export default function RoomManagement() {
  const { t } = useTranslation(["rooms", "common"]);
  const {
    rooms,
    isRoomLoading,
    paginationMetadata,
    roomTypeLabels,
    activeTabValue,
    handleChangeTab,
    handleChangePage,
    filters,
    handleSearchByName,

    // dialog & form
    dialogState,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    formValues,
    formErrors,
    handleFormChange,
    submitUpsert,
    roomTypes,
    deleteRoom,

    alert,
    closeSnackbar,

    editStatusRoomHandler,
    isRoomError,
    refetchRooms,
    isSubmitting,
    isRoomDetailLoading,
  } = useRoomManagement();

  const totalPages = Math.max(
    1,
    Math.ceil(
      (paginationMetadata?.total ?? 0) / (paginationMetadata?.limit ?? 6),
    ),
  );
  const currentPage = paginationMetadata?.page ?? 1;

  return (
    <>
      <Box>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "stretch", sm: "center" }} justifyContent="space-between" gap={2} sx={{ mb: 2.5 }}>
          <Box>
            <Typography component="h1" sx={{ color: "#163B47", fontSize: { xs: 26, md: 29 }, lineHeight: 1.25, fontWeight: 700 }}>{t("title", { ns: "rooms" })}</Typography>
            <Typography sx={{ mt: 0.5, color: "#667085", fontSize: 13.5 }}>{t("subtitle", { ns: "rooms" })}</Typography>
          </Box>
          <Button startIcon={<Add />} variant="contained" onClick={openCreateDialog} sx={{ minHeight: 42, borderRadius: "8px", alignSelf: { sm: "center" } }}>{t("create", { ns: "rooms" })}</Button>
        </Stack>

        <Stack direction="row" spacing={1.5} sx={{ mb: 2 }}>
          <TextField
            size="small"
            placeholder={t("search", { ns: "rooms" })}
            value={filters.q || ""}
            onChange={(e) => handleSearchByName(e.target.value)}
            sx={{ width: { xs: "100%", sm: 420 }, "& .MuiOutlinedInput-root": { height: 42, bgcolor: "#FFFFFF", borderRadius: "8px" } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <RoomTabs
          types={roomTypeLabels}
          value={activeTabValue}
          onChange={handleChangeTab}
        />

        <Box mt={2.25}>
          {isRoomLoading ? (
            <Grid container spacing={2}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
                  <RoomCardSkeleton />
                </Grid>
              ))}
            </Grid>
          ) : isRoomError ? (
            <Box sx={{ py: 7, textAlign: "center", bgcolor: "#FFFFFF", border: "1px solid #E4E7EC", borderRadius: "11px" }}>
              <Typography fontWeight={650}>{t("loadError", { ns: "rooms" })}</Typography>
              <Button variant="outlined" size="small" onClick={() => refetchRooms()} sx={{ mt: 1.5, borderRadius: "8px" }}>{t("actions.retry", { ns: "common" })}</Button>
            </Box>
          ) : rooms.length === 0 ? (
            <Box sx={{ py: 7, textAlign: "center", bgcolor: "#FFFFFF", border: "1px solid #E4E7EC", borderRadius: "11px" }}><Typography fontWeight={650}>{t("empty", { ns: "rooms" })}</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{t("emptyHint", { ns: "rooms" })}</Typography></Box>
          ) : (
            <>
              <Grid container spacing={2}>
                {rooms.map((room) => (
                  <Grid key={room.id} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
                    <RoomCard
                      room={room}
                      onEdit={() => openEditDialog(room.id)}
                      onDelete={deleteRoom}
                      onEditStatus={editStatusRoomHandler}
                    />
                  </Grid>
                ))}
              </Grid>
              {totalPages > 1 && (
                <Box mt={2} display="flex" justifyContent="center">
                  <Pager
                    page={currentPage}
                    totalPages={totalPages}
                    onChange={handleChangePage}
                  />
                </Box>
              )}
            </>
          )}
        </Box>

        <RoomUpsertDialog
          state={dialogState}
          roomTypes={roomTypes}
          values={formValues}
          errors={formErrors}
          onChange={handleFormChange}
          onSubmit={submitUpsert}
          onClose={closeDialog}
          submitting={isSubmitting}
          loading={isRoomDetailLoading}
        />
      </Box>

      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </>
  );
}

import { useState } from "react";
import { Add, Search } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { GlobalSnackbar } from "@components";
import type { RoomTypeResponse } from "@constant/response/RoomTypeResponse";
import Pager from "@components/pager";
import RoomTypeTable from "./components/room-type-table";
import RoomTypeUpsertView from "./components/RoomTypeUpsertView";
import useRoomTypesManagement from "./useRoomTypesManagement";
import { useTranslation } from "react-i18next";

const RoomTypeManagement = () => {
  const { t } = useTranslation(["roomTypes", "common"]);
  const [deleteTarget, setDeleteTarget] = useState<RoomTypeResponse | null>(null);
  const {
    showAddButton, roomTypes, isLoading, isError, refetch, meta, filters, handleSearch, handleChangePage,
    dialogState, form, errors, onChange, onCreateDialog, onEditDialog, onClose, onSubmit, handleDeleteRoomType,
    amenityOptions, isAmenitiesLoading, amenitiesError, isDetailLoading, isSaving, isDeleting,
    onPickFiles, onRemoveImage, alert, closeSnackbar,
  } = useRoomTypesManagement();

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await handleDeleteRoomType(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <>
      <Box>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "stretch", sm: "center" }} justifyContent="space-between" gap={2} sx={{ mb: 2.5 }}>
          <Box><Typography component="h1" sx={{ color: "#163B47", fontSize: { xs: 26, md: 29 }, lineHeight: 1.25, fontWeight: 700 }}>{t("title", { ns: "roomTypes" })}</Typography><Typography sx={{ mt: 0.5, color: "#667085", fontSize: 13.5 }}>{t("subtitle", { ns: "roomTypes" })}</Typography></Box>
          {showAddButton && <Button startIcon={<Add />} variant="contained" onClick={onCreateDialog} sx={{ minHeight: 42, borderRadius: "8px", alignSelf: { sm: "center" } }}>{t("create", { ns: "roomTypes" })}</Button>}
        </Stack>

        <TextField size="small" placeholder={t("search", { ns: "roomTypes" })} value={filters.q} onChange={(event) => handleSearch(event.target.value)} sx={{ width: { xs: "100%", sm: 420 }, mb: 2, "& .MuiOutlinedInput-root": { height: 42, bgcolor: "#FFFFFF", borderRadius: "8px" } }} InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }} />

        <RoomTypeTable rows={roomTypes} loading={isLoading} error={isError} onRetry={() => refetch()} onEdit={onEditDialog} onDelete={setDeleteTarget} />
        {(meta?.totalPages || 1) > 1 && <Box mt={2} display="flex" justifyContent="center"><Pager page={meta?.page || 1} totalPages={meta?.totalPages || 1} onChange={handleChangePage} /></Box>}

        <RoomTypeUpsertView state={dialogState} values={form} errors={errors} onChange={onChange} amenityOptions={amenityOptions || []} amenitiesLoading={isAmenitiesLoading} amenitiesError={Boolean(amenitiesError)} loading={isDetailLoading} saving={isSaving} onPickFiles={onPickFiles} onRemoveImage={onRemoveImage} onClose={onClose} onSubmit={onSubmit} />
      </Box>

      <Dialog open={Boolean(deleteTarget)} onClose={isDeleting ? undefined : () => setDeleteTarget(null)} maxWidth="xs" fullWidth PaperProps={{ sx: { width: 470, maxWidth: "calc(100vw - 24px)", borderRadius: "12px" } }}>
        <DialogTitle sx={{ px: 2.5, pt: 2.25, pb: 1, color: "#1F2937", fontSize: 18, fontWeight: 700 }}>{t("deleteDialog.title", { ns: "roomTypes", name: deleteTarget?.name })}</DialogTitle>
        <DialogContent sx={{ px: 2.5, py: 1 }}><Typography sx={{ color: "#667085", fontSize: 13.5, lineHeight: 1.6 }}>{t("deleteDialog.description", { ns: "roomTypes" })}</Typography></DialogContent>
        <DialogActions sx={{ px: 2.5, py: 1.75, borderTop: "1px solid #EAECF0" }}><Button variant="outlined" disabled={isDeleting} onClick={() => setDeleteTarget(null)} sx={{ minHeight: 40, borderRadius: "8px", borderColor: "#D0D5DD", color: "#344054" }}>{t("actions.cancel", { ns: "common" })}</Button><Button variant="contained" color="error" disabled={isDeleting} onClick={confirmDelete} sx={{ minHeight: 40, borderRadius: "8px" }}>{isDeleting ? t("states.deleting", { ns: "common" }) : t("actions.delete", { ns: "roomTypes" })}</Button></DialogActions>
      </Dialog>

      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </>
  );
};

export default RoomTypeManagement;

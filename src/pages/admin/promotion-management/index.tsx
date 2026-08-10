import { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, InputAdornment, Typography } from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { GlobalSnackbar } from "@components";
import type { PromotionResponse } from "@constant/response/PromotionResponse";
import Pager from "@components/pager";
import PromotionsTable from "./components/PromotionsTable";
import usePromotionManagement from "./usePromotionManagement";
import PromotionUpsertDialog from "./components/PromotionUpsertDialog";
import { useTranslation } from "react-i18next";

export default function PromotionManagement() {
  const { t } = useTranslation(["promotions", "common"]);
  const {
    rows,
    meta,
    isLoading,
    isError,
    refetch,

    // query
    filters,
    handleSearch,
    handleChangePage,

    // dialog + form
    dialogState,
    form,
    onChangeField,
    onCreateDialog,
    onEditDialog,
    onClose,
    onSubmit,

    // optional
    handleDeletePromotion,
    isLoadingPromotion,
    isSaving,
    isDeleting,

    alert,
    closeSnackbar,
  } = usePromotionManagement();
  const [deleteTarget, setDeleteTarget] = useState<PromotionResponse | null>(null);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await handleDeletePromotion(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "stretch", sm: "center" }} justifyContent="space-between" gap={2} sx={{ mb: 2.5 }}>
        <Box><Typography component="h1" sx={{ color: "#163B47", fontSize: { xs: 26, md: 29 }, lineHeight: 1.25, fontWeight: 700 }}>{t("title", { ns: "promotions" })}</Typography><Typography sx={{ mt: 0.5, color: "#667085", fontSize: 13.5 }}>{t("subtitle", { ns: "promotions" })}</Typography></Box>
        <Button startIcon={<Add />} variant="contained" onClick={onCreateDialog} sx={{ minHeight: 42, borderRadius: "8px", alignSelf: { sm: "center" } }}>{t("create", { ns: "promotions" })}</Button>
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1.5}
        sx={{ mb: 2 }}
      >
        <TextField
          size="small"
          placeholder={t("search", { ns: "promotions" })}
          value={filters.q}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: "100%", sm: 460 }, "& .MuiOutlinedInput-root": { height: 42, bgcolor: "#FFFFFF", borderRadius: "8px" } }}
        />
      </Stack>

      <PromotionsTable
        rows={rows}
        loading={isLoading}
        error={isError}
        onRetry={() => refetch()}
        onEdit={(id) => onEditDialog(id)}
        onDelete={setDeleteTarget}
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

      <PromotionUpsertDialog
        open={dialogState.open}
        mode={dialogState.mode ?? "CREATE"}
        values={form}
        onChange={onChangeField}
        onClose={onClose}
        onSubmit={onSubmit}
        loading={isLoadingPromotion}
        saving={isSaving}
      />

      <Dialog open={Boolean(deleteTarget)} onClose={isDeleting ? undefined : () => setDeleteTarget(null)} maxWidth="xs" fullWidth PaperProps={{ sx: { width: 470, maxWidth: "calc(100vw - 24px)", borderRadius: "12px" } }}>
        <DialogTitle sx={{ px: 2.5, pt: 2.25, pb: 1, color: "#1F2937", fontSize: 18, fontWeight: 700 }}>{t("deleteDialog.title", { ns: "promotions", name: deleteTarget?.code || deleteTarget?.name || t("entity", { ns: "promotions" }) })}</DialogTitle>
        <DialogContent sx={{ px: 2.5, py: 1 }}><Typography sx={{ color: "#667085", fontSize: 13.5, lineHeight: 1.6 }}>{t("deleteDialog.description", { ns: "promotions" })}</Typography></DialogContent>
        <DialogActions sx={{ px: 2.5, py: 1.75, borderTop: "1px solid #EAECF0" }}><Button variant="outlined" disabled={isDeleting} onClick={() => setDeleteTarget(null)} sx={{ minHeight: 40, borderRadius: "8px", borderColor: "#D0D5DD", color: "#344054" }}>{t("actions.cancel", { ns: "common" })}</Button><Button variant="contained" color="error" disabled={isDeleting} onClick={confirmDelete} sx={{ minHeight: 40, borderRadius: "8px" }}>{isDeleting ? t("deleteDialog.deleting", { ns: "promotions" }) : t("actions.delete", { ns: "promotions" })}</Button></DialogActions>
      </Dialog>
      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </Box>
  );
}

import { useState } from "react";
import { GlobalSnackbar, Pager } from "@components/index";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import useService from "./useService";
import ServiceTable from "./components/service-table";
import ServiceDialog from "./components/service-dialog";
import { Add, Search } from "@mui/icons-material";
import type { ServiceResponse } from "@constant/response/ServiceResponse";
import { useTranslation } from "react-i18next";

const ServiceManagement = () => {
  const { t } = useTranslation(["services", "common"]);
  const {
    services,
    meta,

    loadingServices,
    loadingServiceDetail,
    servicesError,
    refetchServices,
    creatingService,
    updatingService,
    removingService,

    filters,
    onChangeFilter,

    dialog,
    openDialog,
    onEdit,
    closeDialog,

    form,
    onChangeField,
    onSubmit,

    removeServiceHandler,

    alert,
    closeSnackbar,
  } = useService();
  const [deleteTarget, setDeleteTarget] = useState<ServiceResponse | null>(null);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await removeServiceHandler(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "stretch", sm: "center" }} justifyContent="space-between" gap={2} sx={{ mb: 2.5 }}>
        <Box><Typography component="h1" sx={{ color: "#163B47", fontSize: { xs: 26, md: 29 }, lineHeight: 1.25, fontWeight: 700 }}>{t("title", { ns: "services" })}</Typography><Typography sx={{ mt: 0.5, color: "#667085", fontSize: 13.5 }}>{t("subtitle", { ns: "services" })}</Typography></Box>
        <Button startIcon={<Add />} variant="contained" onClick={() => openDialog("CREATE")} sx={{ minHeight: 42, borderRadius: "8px", alignSelf: { sm: "center" } }}>{t("create", { ns: "services" })}</Button>
      </Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1.5}
        sx={{ mb: 2 }}
      >
        <TextField
          size="small"
          placeholder={t("search", { ns: "services" })}
          value={filters.q}
          onChange={(e) => onChangeFilter("q", e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: "100%", sm: 420 }, "& .MuiOutlinedInput-root": { height: 42, bgcolor: "#FFFFFF", borderRadius: "8px" } }}
        />
      </Stack>

      <ServiceTable
        data={services}
        loading={loadingServices}
        error={servicesError}
        onRetry={() => refetchServices()}
        onDelete={setDeleteTarget}
        onRowClick={onEdit}
      />

      <ServiceDialog
        open={dialog.open}
        mode={dialog.mode}
        form={form}
        loading={loadingServiceDetail}
        onClose={closeDialog}
        onChange={onChangeField}
        onSubmit={onSubmit}
        saving={creatingService || updatingService}
      />

      <Dialog open={Boolean(deleteTarget)} onClose={removingService ? undefined : () => setDeleteTarget(null)} maxWidth="xs" fullWidth PaperProps={{ sx: { width: 470, maxWidth: "calc(100vw - 24px)", borderRadius: "12px" } }}>
        <DialogTitle sx={{ px: 2.5, pt: 2.25, pb: 1, color: "#1F2937", fontSize: 18, fontWeight: 700 }}>{t("deleteDialog.title", { ns: "services", name: deleteTarget?.name })}</DialogTitle>
        <DialogContent sx={{ px: 2.5, py: 1 }}><Typography sx={{ color: "#667085", fontSize: 13.5, lineHeight: 1.6 }}>{t("deleteDialog.description", { ns: "services" })}</Typography></DialogContent>
        <DialogActions sx={{ px: 2.5, py: 1.75, borderTop: "1px solid #EAECF0" }}><Button variant="outlined" disabled={removingService} onClick={() => setDeleteTarget(null)} sx={{ minHeight: 40, borderRadius: "8px", borderColor: "#D0D5DD", color: "#344054" }}>{t("actions.cancel", { ns: "common" })}</Button><Button variant="contained" color="error" disabled={removingService} onClick={confirmDelete} sx={{ minHeight: 40, borderRadius: "8px" }}>{removingService ? t("states.deleting", { ns: "common" }) : t("actions.delete", { ns: "services" })}</Button></DialogActions>
      </Dialog>

      {(meta?.totalPages || 1) > 1 && (
        <Box mt={2} display="flex" justifyContent="center">
          <Pager
            page={meta?.page || 1}
            totalPages={meta?.totalPages || 1}
            onChange={(page) => onChangeFilter("page", page)}
          />
        </Box>
      )}
      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </>
  );
};

export default ServiceManagement;

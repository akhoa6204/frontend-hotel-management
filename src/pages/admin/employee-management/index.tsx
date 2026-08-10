import { Add, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { GlobalSnackbar, Pager } from "@components";
import type { UserShortResponse } from "@constant/response/UserShortResponse";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeUpserDialog from "./components/EmployeeUpserDialog";
import useEmployee from "./useEmployee";
import { useTranslation } from "react-i18next";

const EmployeeManagement = () => {
  const { t } = useTranslation(["staff", "common"]);
  const {
    employees,
    isLoading,
    isError,
    refetch,
    filters,
    onChangeFilters,
    meta,
    onEdit,
    onResetPassword,
    onToggle,
    employeeForm,
    isLoadingEmployee,
    onCloseDialog,
    onOpenDialog,
    alert,
    closeSnackbar,
    dialogState,
    onChangeEmployeeForm,
    onSubmitEmployeeForm,
    tab,
    onChangeTab,
    isSaving,
  } = useEmployee();
  const [statusTarget, setStatusTarget] = useState<UserShortResponse | null>(null);

  const createEmployee = () => onOpenDialog("CREATE");
  const requestStatusChange = (employee: UserShortResponse) => {
    if (employee.active) {
      setStatusTarget(employee);
      return;
    }
    void onToggle(employee.id, true);
  };
  const confirmDeactivation = async () => {
    if (!statusTarget) return;
    const updated = await onToggle(statusTarget.id, false);
    if (updated) setStatusTarget(null);
  };

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "stretch", sm: "center" }} justifyContent="space-between" gap={2} sx={{ mb: 2.5 }}>
        <Box><Typography component="h1" sx={{ color: "#163B47", fontSize: { xs: 26, md: 29 }, lineHeight: 1.25, fontWeight: 700 }}>{t("title", { ns: "staff" })}</Typography><Typography sx={{ mt: 0.5, color: "#667085", fontSize: 13.5 }}>{t("subtitle", { ns: "staff" })}</Typography></Box>
        <Button startIcon={<Add />} variant="contained" onClick={createEmployee} sx={{ minHeight: 42, borderRadius: "8px", alignSelf: { sm: "center" } }}>{t("create", { ns: "staff" })}</Button>
      </Stack>

      <TextField
        size="small"
        placeholder={t("search", { ns: "staff" })}
        value={filters.q ?? ""}
        onChange={(event) => onChangeFilters("q", event.target.value)}
        InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
        sx={{ width: { xs: "100%", sm: 480 }, mb: 2, "& .MuiOutlinedInput-root": { height: 42, bgcolor: "#FFFFFF", borderRadius: "8px" } }}
      />

      <EmployeeTable
        rows={employees}
        isLoading={isLoading}
        isError={isError}
        hasSearch={Boolean(filters.q?.trim())}
        statusUpdating={isSaving}
        onRetry={() => refetch()}
        onEdit={onEdit}
        onResetPassword={onResetPassword}
        onToggle={requestStatusChange}
        onCreate={createEmployee}
      />

      <EmployeeUpserDialog
        open={dialogState.open}
        mode={dialogState.mode}
        onClose={onCloseDialog}
        onSave={onSubmitEmployeeForm}
        onChange={onChangeEmployeeForm}
        employeeData={employeeForm}
        tab={tab}
        onTabChange={onChangeTab}
        loading={isLoadingEmployee}
        saving={isSaving}
      />

      {(meta?.totalPages || 1) > 1 && (
        <Box mt={2} display="flex" justifyContent="center">
          <Pager page={meta?.page || 1} totalPages={meta?.totalPages || 1} onChange={(page) => onChangeFilters("page", page)} />
        </Box>
      )}

      <Dialog open={Boolean(statusTarget)} onClose={isSaving ? undefined : () => setStatusTarget(null)} maxWidth="xs" fullWidth aria-labelledby="deactivate-staff-title" PaperProps={{ sx: { width: 470, maxWidth: "calc(100vw - 24px)", borderRadius: "12px" } }}>
        <DialogTitle id="deactivate-staff-title" sx={{ px: 2.5, pt: 2.25, pb: 1, color: "#1F2937", fontSize: 18, fontWeight: 700 }}>{t("deactivateDialog.title", { ns: "staff" })}</DialogTitle>
        <DialogContent sx={{ px: 2.5, py: 1 }}><Typography sx={{ color: "#667085", fontSize: 13.5, lineHeight: 1.6 }}>{t("deactivateDialog.description", { ns: "staff", name: statusTarget?.fullName })}</Typography></DialogContent>
        <DialogActions sx={{ px: 2.5, py: 1.75, borderTop: "1px solid #EAECF0" }}><Button variant="outlined" disabled={isSaving} onClick={() => setStatusTarget(null)} sx={{ minHeight: 40, borderRadius: "8px", borderColor: "#D0D5DD", color: "#344054" }}>{t("actions.cancel", { ns: "common" })}</Button><Button variant="contained" color="warning" disabled={isSaving} onClick={confirmDeactivation} sx={{ minHeight: 40, borderRadius: "8px" }}>{isSaving ? t("states.updating", { ns: "common" }) : t("actions.deactivate", { ns: "staff" })}</Button></DialogActions>
      </Dialog>

      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </Box>
  );
};

export default EmployeeManagement;

import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import type { DialogMode } from "@constant/internal/DialogState";
import type { EmployeeForm } from "../../useEmployee";
import EmployeeInfoTab from "./employee-info-tab";
import EmployeePasswordTab from "./employee-password-tab";

interface Props {
  open: boolean;
  mode?: DialogMode;
  onClose: () => void;
  onSave: (event: FormEvent<HTMLFormElement>) => void;
  onChange: <K extends keyof EmployeeForm>(field: K, value: EmployeeForm[K]) => void;
  employeeData: EmployeeForm;
  tab?: "info" | "password";
  onTabChange: (tab: "info" | "password") => void;
  loading?: boolean;
  saving?: boolean;
}

const EmployeeUpserDialog = ({ open, mode, onClose, onSave, onChange, employeeData, tab = "info", onTabChange, loading = false, saving = false }: Props) => {
  const { t } = useTranslation(["staff", "common"]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isEdit = mode === "EDIT";
  const isPasswordTab = isEdit && tab === "password";

  return (
    <Dialog open={open} onClose={saving ? undefined : onClose} maxWidth={false} fullScreen={fullScreen} aria-labelledby="employee-dialog-title" PaperProps={{ sx: { width: 680, maxWidth: fullScreen ? "100%" : "calc(100vw - 32px)", borderRadius: fullScreen ? 0 : "12px", overflow: "hidden" } }}>
      <Box component="form" onSubmit={onSave} noValidate sx={{ display: "flex", minHeight: 0, flexDirection: "column" }}>
        <DialogTitle id="employee-dialog-title" sx={{ position: "relative", px: { xs: 2, sm: 2.5 }, pt: 2.25, pb: 1.5, pr: 7, borderBottom: isEdit ? 0 : "1px solid #EAECF0", mb: 2.5 }}>
          <Typography component="span" sx={{ display: "block", color: "#1F2937", fontSize: 19, fontWeight: 700 }}>{t(isEdit ? "editDialog.title" : "createDialog.title", { ns: "staff" })}</Typography>
          {isEdit && employeeData.fullName && <Typography component="span" sx={{ display: "block", mt: 0.35, color: "#667085", fontSize: 12.75 }}>{employeeData.fullName} · {t(`roles.${employeeData.roleName}`, { ns: "common", defaultValue: employeeData.roleName })}</Typography>}
          {!isEdit && <Typography component="span" sx={{ display: "block", mt: 0.35, color: "#667085", fontSize: 12.75 }}>{t("createDialog.subtitle", { ns: "staff" })}</Typography>}
          <IconButton aria-label={t("aria.closeDialog", { ns: "staff" })} disabled={saving} onClick={onClose} size="small" sx={{ position: "absolute", top: 15, right: 16, color: "#667085" }}><Close fontSize="small" /></IconButton>
        </DialogTitle>

        {isEdit && <Tabs value={tab} onChange={(_, value: "info" | "password") => onTabChange(value)} aria-label={t("aria.editContent", { ns: "staff" })} sx={{ minHeight: 44, px: { xs: 1, sm: 2 }, borderTop: "1px solid #EAECF0", borderBottom: "1px solid #EAECF0", "& .MuiTab-root": { minHeight: 44, px: 2, color: "#667085", fontSize: 13, fontWeight: 600 }, "& .Mui-selected": { color: "#1D6FC2" }, "& .MuiTabs-indicator": { height: 2 } }}><Tab label={t("editDialog.tabs.information", { ns: "staff" })} value="info" /><Tab label={t("editDialog.tabs.password", { ns: "staff" })} value="password" /></Tabs>}

        <DialogContent className="admin-scrollbar" sx={{ px: { xs: 2, sm: 2.5 }, py: 2.25 }}>
          {loading && isEdit ? <Box><Skeleton height={42} /><Skeleton height={42} sx={{ mt: 1.5 }} /><Skeleton height={90} sx={{ mt: 1.5 }} /></Box> : isPasswordTab ? <EmployeePasswordTab value={employeeData.newPassword ?? ""} disabled={saving} onChange={onChange} /> : <EmployeeInfoTab employeeData={employeeData} onChange={onChange} isViewMode={isEdit} disabled={saving} />}
        </DialogContent>

        <DialogActions sx={{ px: { xs: 2, sm: 2.5 }, py: 1.75, borderTop: "1px solid #EAECF0" }}>
          <Button variant="outlined" disabled={saving} onClick={onClose} sx={{ minHeight: 40, borderRadius: "8px", borderColor: "#D0D5DD", color: "#344054" }}>{t("actions.cancel", { ns: "common" })}</Button>
          <Button type="submit" variant="contained" disabled={loading || saving} sx={{ minHeight: 40, borderRadius: "8px" }}>{saving ? t("states.updating", { ns: "common" }) : !isEdit ? t("createDialog.create", { ns: "staff" }) : isPasswordTab ? t("editDialog.resetPassword", { ns: "staff" }) : t("actions.saveChanges", { ns: "common" })}</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EmployeeUpserDialog;

import { LockOutlined } from "@mui/icons-material";
import { Box, Chip, Grid, InputLabel, Stack, Switch, TextField, Typography } from "@mui/material";
import type { EmployeeForm } from "../../useEmployee";
import { useTranslation } from "react-i18next";

interface Props {
  employeeData: EmployeeForm;
  onChange: <K extends keyof EmployeeForm>(field: K, value: EmployeeForm[K]) => void;
  isViewMode: boolean;
  disabled?: boolean;
}

const fieldLabelSx = { mb: 0.65, color: "#344054", fontSize: 12.5, fontWeight: 600 };
const fieldSx = { "& .MuiOutlinedInput-root": { minHeight: 42, borderRadius: "8px" } };

const EmployeeInfoTab = ({ employeeData, onChange, isViewMode, disabled = false }: Props) => {
  const { t } = useTranslation(["staff", "common"]);
  const isAdmin = employeeData.roleName === "ADMIN";

  return (
    <Stack spacing={2.25}>
      <Typography sx={{ color: "#667085", fontSize: 11.75, fontWeight: 700, letterSpacing: "0.06em" }}>{t("editDialog.employeeInformation", { ns: "staff" })}</Typography>
      <Grid container columnSpacing={2} rowSpacing={1.75}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputLabel htmlFor="employee-full-name" sx={fieldLabelSx}>{t("editDialog.fullName", { ns: "staff" })}</InputLabel>
          <TextField id="employee-full-name" fullWidth size="small" value={employeeData.fullName || ""} disabled={disabled} onChange={(event) => onChange("fullName", event.target.value)} sx={fieldSx} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputLabel htmlFor="employee-phone" sx={fieldLabelSx}>{t("editDialog.phone", { ns: "staff" })}</InputLabel>
          <TextField id="employee-phone" fullWidth size="small" value={employeeData.phone || ""} disabled={disabled} onChange={(event) => onChange("phone", event.target.value)} sx={fieldSx} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputLabel htmlFor="employee-email" sx={fieldLabelSx}>{t("editDialog.email", { ns: "staff" })}</InputLabel>
          <TextField id="employee-email" fullWidth size="small" type="email" value={employeeData.email || ""} disabled={disabled} onChange={(event) => onChange("email", event.target.value)} sx={fieldSx} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputLabel id="employee-role-label" htmlFor="employee-role" sx={fieldLabelSx}>{t("editDialog.position", { ns: "staff" })}</InputLabel>
          {isViewMode && isAdmin ? (
            <>
              <Stack id="employee-role" role="textbox" aria-readonly="true" aria-labelledby="employee-role-label" direction="row" alignItems="center" justifyContent="space-between" sx={{ minHeight: 42, px: 1.5, bgcolor: "#F9FAFB", border: "1px solid #E4E7EC", borderRadius: "8px" }}>
                <Typography sx={{ color: "#344054", fontSize: 13.5, fontWeight: 500 }}>{t("roles.ADMIN", { ns: "common" })}</Typography>
                <LockOutlined aria-hidden sx={{ color: "#98A2B3", fontSize: 18 }} />
              </Stack>
              <Typography sx={{ mt: 0.55, color: "#667085", fontSize: 12, lineHeight: 1.45 }}>{t("editDialog.roleCannotChange", { ns: "staff" })}</Typography>
            </>
          ) : (
            <TextField
              id="employee-role"
              name="roleName"
              select
              fullWidth
              size="small"
              value={employeeData.roleName}
              disabled={disabled}
              onChange={(event) => onChange("roleName", event.target.value as EmployeeForm["roleName"])}
              slotProps={{ select: { native: true, inputProps: { "aria-label": t("editDialog.position", { ns: "staff" }) } } }}
              sx={fieldSx}
            >
              {employeeData.roleName === "USER" && <option value="USER">{t("roles.USER", { ns: "common" })}</option>}
              <option value="MANAGER">{t("roles.MANAGER", { ns: "common" })}</option>
              <option value="RECEPTIONIST">{t("roles.RECEPTIONIST", { ns: "common" })}</option>
              <option value="HOUSEKEEPING">{t("roles.HOUSEKEEPING", { ns: "common" })}</option>
            </TextField>
          )}
        </Grid>
      </Grid>

      {isViewMode && (
        <Box sx={{ pt: 2, borderTop: "1px solid #EAECF0" }}>
          <Typography sx={{ mb: 0.75, color: "#667085", fontSize: 11.75, fontWeight: 700, letterSpacing: "0.06em" }}>{t("editDialog.permissionsAndAccess", { ns: "staff" })}</Typography>
          <Stack divider={<Box sx={{ borderTop: "1px solid #EAECF0" }} />}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} sx={{ py: 1.4 }}>
              <Box><Typography sx={{ color: "#344054", fontSize: 13.5, fontWeight: 600 }}>{t("editDialog.adminPermission", { ns: "staff" })}</Typography><Typography sx={{ mt: 0.25, color: "#667085", fontSize: 12.25, lineHeight: 1.45 }}>{isAdmin ? t("editDialog.adminPermissionDescription", { ns: "staff" }) : t("editDialog.noAdminPermissionDescription", { ns: "staff" })}</Typography></Box>
              <Chip icon={isAdmin ? <LockOutlined /> : undefined} label={isAdmin ? t("editDialog.required", { ns: "staff" }) : t("editDialog.notGranted", { ns: "staff" })} size="small" sx={{ height: 26, flexShrink: 0, bgcolor: isAdmin ? "#EAF4FF" : "#F2F4F7", color: isAdmin ? "#1D6FC2" : "#475467", fontSize: 11.75, fontWeight: 600, "& .MuiChip-icon": { color: "#1D6FC2", fontSize: 15 } }} />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} sx={{ py: 1.4 }}>
              <Box><Typography sx={{ color: "#344054", fontSize: 13.5, fontWeight: 600 }}>{t("editDialog.accountStatus", { ns: "staff" })}</Typography><Typography sx={{ mt: 0.25, color: "#667085", fontSize: 12.25, lineHeight: 1.45 }}>{employeeData.active ? t("editDialog.accountActiveDescription", { ns: "staff" }) : t("editDialog.accountInactiveDescription", { ns: "staff" })}</Typography></Box>
              {isAdmin ? <Chip icon={<LockOutlined />} label={t(employeeData.active ? "status.active" : "status.inactive", { ns: "staff" })} size="small" sx={{ height: 26, flexShrink: 0, bgcolor: employeeData.active ? "#EAF6F0" : "#F2F4F7", color: employeeData.active ? "#246548" : "#475467", fontSize: 11.75, fontWeight: 600, "& .MuiChip-icon": { color: "inherit", fontSize: 15 } }} /> : <Switch checked={Boolean(employeeData.active)} disabled={disabled} onChange={(event) => onChange("active", event.target.checked)} inputProps={{ "aria-label": t("editDialog.accountStatus", { ns: "staff" }) }} />}
            </Stack>
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

export default EmployeeInfoTab;

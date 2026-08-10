import { LockOutlined } from "@mui/icons-material";
import { Box, Button, Grid, InputLabel, Stack, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import type { AdminProfileErrors, AdminProfileForm } from "../../useAdminProfile";

interface Props {
  form: AdminProfileForm;
  errors: AdminProfileErrors;
  roleLabel: string;
  editing: boolean;
  saving: boolean;
  dirty: boolean;
  onChange: <K extends keyof AdminProfileForm>(field: K, value: AdminProfileForm[K]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onEdit: () => void;
  onCancel: () => void;
}

const labelSx = { mb: 0.65, color: "#344054", fontSize: 12.5, fontWeight: 600 };
const inputSx = { "& .MuiOutlinedInput-root": { minHeight: 42, borderRadius: "8px", bgcolor: "#FFFFFF" } };

const ProfileInformation = ({ form, errors, roleLabel, editing, saving, dirty, onChange, onSubmit, onEdit, onCancel }: Props) => {
  const { t } = useTranslation(["profile", "common"]);
  const informationRows = [
    [t("fullName", { ns: "profile" }), form.fullName],
    [t("fields.phone", { ns: "common" }), form.phone],
    [t("fields.email", { ns: "common" }), form.email],
  ];

  if (!editing) {
    return (
      <Box component="section" aria-labelledby="admin-profile-information">
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
          <Typography id="admin-profile-information" sx={{ color: "#667085", fontSize: 11.75, fontWeight: 700, letterSpacing: "0.08em" }}>{t("informationEyebrow", { ns: "profile" })}</Typography>
          <Button variant="outlined" onClick={onEdit} sx={{ minHeight: 38, borderRadius: "8px", borderColor: "#D0D5DD", color: "#344054" }}>{t("editInformation", { ns: "profile" })}</Button>
        </Stack>
        <Box component="dl" sx={{ m: 0, mt: 2.5, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, columnGap: 4, rowGap: 2.5 }}>
          {informationRows.map(([label, value], index) => (
            <Box key={label} sx={{ minWidth: 0, gridColumn: index === 2 ? { sm: "1 / -1" } : "auto" }}>
              <Typography component="dt" sx={{ color: "#667085", fontSize: 12, fontWeight: 600 }}>{label}</Typography>
              <Typography component="dd" sx={{ m: 0, mt: 0.55, color: "#1F2937", fontSize: 14, fontWeight: 500, overflowWrap: "anywhere" }}>{value?.trim() || "—"}</Typography>
            </Box>
          ))}
          <Box sx={{ minWidth: 0, gridColumn: { sm: "1 / -1" } }}>
            <Typography component="dt" sx={{ color: "#667085", fontSize: 12, fontWeight: 600 }}>{t("role", { ns: "profile" })}</Typography>
            <Stack component="dd" direction="row" alignItems="center" spacing={0.6} sx={{ m: 0, mt: 0.55, color: "#1F2937" }}><Typography sx={{ fontSize: 14, fontWeight: 500 }}>{roleLabel}</Typography><LockOutlined aria-label={t("roleReadOnly", { ns: "profile" })} sx={{ color: "#98A2B3", fontSize: 16 }} /></Stack>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={onSubmit} noValidate aria-labelledby="admin-profile-information">
      <Typography id="admin-profile-information" sx={{ color: "#667085", fontSize: 11.75, fontWeight: 700, letterSpacing: "0.08em" }}>{t("informationEyebrow", { ns: "profile" })}</Typography>
      <Grid container columnSpacing={2} rowSpacing={1.75} sx={{ mt: 0.5 }}>
        <Grid size={{ xs: 12, sm: 6 }}><InputLabel htmlFor="admin-profile-name" sx={labelSx}>{t("fullName", { ns: "profile" })}</InputLabel><TextField id="admin-profile-name" fullWidth size="small" autoComplete="name" value={form.fullName} error={Boolean(errors.fullName)} helperText={errors.fullName} disabled={saving} onChange={(event) => onChange("fullName", event.target.value)} sx={inputSx} /></Grid>
        <Grid size={{ xs: 12, sm: 6 }}><InputLabel htmlFor="admin-profile-phone" sx={labelSx}>{t("fields.phone", { ns: "common" })}</InputLabel><TextField id="admin-profile-phone" fullWidth size="small" autoComplete="tel" value={form.phone} error={Boolean(errors.phone)} helperText={errors.phone} disabled={saving} onChange={(event) => onChange("phone", event.target.value.replace(/[^0-9]/g, ""))} sx={inputSx} /></Grid>
        <Grid size={{ xs: 12, sm: 6 }}><InputLabel htmlFor="admin-profile-email" sx={labelSx}>{t("fields.email", { ns: "common" })}</InputLabel><TextField id="admin-profile-email" fullWidth size="small" type="email" autoComplete="email" value={form.email} error={Boolean(errors.email)} helperText={errors.email} disabled={saving} onChange={(event) => onChange("email", event.target.value)} sx={inputSx} /></Grid>
        <Grid size={{ xs: 12, sm: 6 }}><InputLabel id="admin-profile-role-label" sx={labelSx}>{t("role", { ns: "profile" })}</InputLabel><Stack role="textbox" aria-readonly="true" aria-labelledby="admin-profile-role-label" direction="row" alignItems="center" justifyContent="space-between" sx={{ minHeight: 42, px: 1.5, bgcolor: "#F9FAFB", border: "1px solid #E4E7EC", borderRadius: "8px" }}><Typography sx={{ color: "#344054", fontSize: 13.5, fontWeight: 500 }}>{roleLabel}</Typography><LockOutlined aria-hidden sx={{ color: "#98A2B3", fontSize: 18 }} /></Stack><Typography sx={{ mt: 0.55, color: "#667085", fontSize: 12 }}>{t("roleManaged", { ns: "profile" })}</Typography></Grid>
      </Grid>
      <Stack direction={{ xs: "column-reverse", sm: "row" }} justifyContent="flex-end" gap={1} sx={{ mt: 2.5, pt: 2, borderTop: "1px solid #EAECF0", "& .MuiButton-root": { minHeight: 40, borderRadius: "8px", width: { xs: "100%", sm: "auto" } } }}><Button variant="outlined" disabled={saving} onClick={onCancel} sx={{ borderColor: "#D0D5DD", color: "#344054" }}>{t("actions.cancel", { ns: "common" })}</Button><Button type="submit" variant="contained" disabled={saving || !dirty}>{saving ? t("states.saving", { ns: "common" }) : t("actions.saveChanges", { ns: "common" })}</Button></Stack>
    </Box>
  );
};

export default ProfileInformation;

import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, InputLabel, Stack, TextField, Typography } from "@mui/material";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import type { AdminPasswordErrors, AdminPasswordForm } from "../../useAdminProfile";

type PasswordField = "password" | "newPassword" | "confirmPassword";

interface Props {
  form: AdminPasswordForm;
  errors: AdminPasswordErrors;
  saving: boolean;
  onChange: <K extends keyof AdminPasswordForm>(field: K, value: AdminPasswordForm[K]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const fields: Array<{ name: PasswordField; labelKey: string; autoComplete: string }> = [
  { name: "password", labelKey: "currentPassword", autoComplete: "current-password" },
  { name: "newPassword", labelKey: "newPassword", autoComplete: "new-password" },
  { name: "confirmPassword", labelKey: "confirmPassword", autoComplete: "new-password" },
];

const ProfileSecurity = ({ form, errors, saving, onChange, onSubmit }: Props) => {
  const { t } = useTranslation(["profile", "common"]);
  const [visibleFields, setVisibleFields] = useState<Partial<Record<PasswordField, boolean>>>({});

  return (
    <Box component="form" onSubmit={onSubmit} noValidate aria-labelledby="admin-profile-security" sx={{ maxWidth: 580 }}>
      <Typography id="admin-profile-security" sx={{ color: "#667085", fontSize: 11.75, fontWeight: 700, letterSpacing: "0.08em" }}>{t("securityEyebrow", { ns: "profile" })}</Typography>
      <Typography sx={{ mt: 0.6, color: "#667085", fontSize: 12.75 }}>{t("securityDescription", { ns: "profile" })}</Typography>
      <Stack spacing={1.75} sx={{ mt: 2.25 }}>
        {fields.map((field) => {
          const visible = Boolean(visibleFields[field.name]);
          const label = t(field.labelKey, { ns: "profile" });
          return (
            <Box key={field.name}>
              <InputLabel htmlFor={`admin-${field.name}`} sx={{ mb: 0.65, color: "#344054", fontSize: 12.5, fontWeight: 600 }}>{label}</InputLabel>
              <TextField
                id={`admin-${field.name}`}
                fullWidth
                size="small"
                type={visible ? "text" : "password"}
                autoComplete={field.autoComplete}
                value={form[field.name]}
                error={Boolean(errors[field.name])}
                helperText={errors[field.name]}
                disabled={saving}
                onChange={(event) => onChange(field.name, event.target.value)}
                InputProps={{ endAdornment: <InputAdornment position="end"><IconButton edge="end" disabled={saving} aria-label={t(visible ? "hidePassword" : "showPassword", { ns: "profile", field: label.toLocaleLowerCase() })} onClick={() => setVisibleFields((current) => ({ ...current, [field.name]: !visible }))}>{visible ? <VisibilityOffOutlined fontSize="small" /> : <VisibilityOutlined fontSize="small" />}</IconButton></InputAdornment> }}
                sx={{ "& .MuiOutlinedInput-root": { minHeight: 42, borderRadius: "8px", bgcolor: "#FFFFFF" } }}
              />
            </Box>
          );
        })}
      </Stack>
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2.5, pt: 2, borderTop: "1px solid #EAECF0" }}><Button type="submit" variant="contained" disabled={saving} sx={{ minHeight: 40, borderRadius: "8px", width: { xs: "100%", sm: "auto" } }}>{saving ? t("states.updating", { ns: "common" }) : t("changePassword", { ns: "profile" })}</Button></Stack>
    </Box>
  );
};

export default ProfileSecurity;

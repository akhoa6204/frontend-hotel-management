import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import type { Form } from "../../useAccountProfilePage";
import { useTranslation } from "react-i18next";

type PasswordField = "password" | "newPassword" | "confirmPassword";

interface Props {
  form: Pick<Form, PasswordField>;
  errors: Partial<Record<PasswordField, string>>;
  saving: boolean;
  onChangeField: <K extends keyof Form>(field: K, value: Form[K]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const fields: Array<{ labelKey: string; name: PasswordField; autoComplete: string }> = [
  { labelKey: "profile.fields.currentPassword", name: "password", autoComplete: "current-password" },
  { labelKey: "profile.fields.newPassword", name: "newPassword", autoComplete: "new-password" },
  { labelKey: "profile.fields.confirmPassword", name: "confirmPassword", autoComplete: "new-password" },
];

const ChangePasswordTab = ({ form, onChangeField, onSubmit, errors, saving }: Props) => {
  const { t } = useTranslation("client");
  return (
  <Box component="section" aria-labelledby="account-security-title">
    <Typography id="account-security-title" component="h2" sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 24, sm: 27 } }}>
      {t("profile.security.title")}
    </Typography>
    <Typography color="text.secondary" variant="body2" sx={{ mt: 0.65, maxWidth: 600, lineHeight: 1.65 }}>
      {t("profile.security.description")}
    </Typography>

    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3.5, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
      <Stack spacing={2.5}>
        {fields.map((field) => (
          <TextField
            key={field.name}
            fullWidth
            label={t(field.labelKey)}
            type="password"
            autoComplete={field.autoComplete}
            value={form[field.name] ?? ""}
            error={Boolean(errors[field.name])}
            helperText={errors[field.name]}
            onChange={(event) => onChangeField(field.name, event.target.value)}
          />
        ))}
        <Stack direction="row" justifyContent="flex-end" sx={{ pt: 1 }}>
          <Button type="submit" variant="contained" disabled={saving} sx={{ minHeight: 44, width: { xs: 1, sm: "auto" } }}>
            {saving ? t("profile.actions.updating") : t("profile.actions.changePassword")}
          </Button>
        </Stack>
      </Stack>
    </Box>
  </Box>
  );
};

export default ChangePasswordTab;

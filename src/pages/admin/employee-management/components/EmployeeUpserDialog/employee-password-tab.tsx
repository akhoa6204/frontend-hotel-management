import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, InputLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { EmployeeForm } from "../../useEmployee";

interface Props {
  value: string;
  disabled?: boolean;
  onChange: <K extends keyof EmployeeForm>(field: K, value: EmployeeForm[K]) => void;
}

const EmployeePasswordTab = ({ value, disabled = false, onChange }: Props) => {
  const { t } = useTranslation("staff");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box component="section" aria-labelledby="employee-password-title">
      <Typography id="employee-password-title" sx={{ color: "#1F2937", fontSize: 15, fontWeight: 650 }}>{t("editDialog.resetPassword")}</Typography>
      <Typography sx={{ mt: 0.4, color: "#667085", fontSize: 12.75, lineHeight: 1.5 }}>{t("editDialog.resetPasswordDescription")}</Typography>
      <Box sx={{ mt: 2.25 }}>
        <InputLabel htmlFor="employee-new-password" sx={{ mb: 0.65, color: "#344054", fontSize: 12.5, fontWeight: 600 }}>{t("editDialog.newPassword")}</InputLabel>
        <TextField
          id="employee-new-password"
          fullWidth
          size="small"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          value={value}
          disabled={disabled}
          placeholder={t("editDialog.newPasswordPlaceholder")}
          onChange={(event) => onChange("newPassword", event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" disabled={disabled} aria-label={t(showPassword ? "editDialog.hidePassword" : "editDialog.showPassword")} onClick={() => setShowPassword((current) => !current)}>
                  {showPassword ? <VisibilityOffOutlined fontSize="small" /> : <VisibilityOutlined fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ "& .MuiOutlinedInput-root": { minHeight: 42, borderRadius: "8px" } }}
        />
      </Box>
    </Box>
  );
};

export default EmployeePasswordTab;

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  label: string;
  name: string;
  value: string;
  error?: string;
  autoComplete: "current-password" | "new-password";
  disabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const AuthPasswordField = ({ label, name, value, error, autoComplete, disabled, onChange }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      label={label}
      name={name}
      type={visible ? "text" : "password"}
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error}
      autoComplete={autoComplete}
      disabled={disabled}
      fullWidth
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="button"
                edge="end"
                onClick={() => setVisible((current) => !current)}
                aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {visible ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default AuthPasswordField;

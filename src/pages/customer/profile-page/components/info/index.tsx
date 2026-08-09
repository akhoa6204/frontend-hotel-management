import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import type { Form } from "../../useAccountProfilePage";

type InfoField = "fullName" | "email" | "phone";

interface Props {
  form: Pick<Form, InfoField>;
  errors: Partial<Record<InfoField, string>>;
  editing: boolean;
  saving: boolean;
  onChange: <K extends keyof Form>(field: K, value: Form[K]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onEdit: () => void;
  onCancel: () => void;
}

const fields: Array<{ name: InfoField; label: string; autoComplete: string; type?: string }> = [
  { name: "fullName", label: "Họ và tên", autoComplete: "name" },
  { name: "email", label: "Email", autoComplete: "email", type: "email" },
  { name: "phone", label: "Số điện thoại", autoComplete: "tel", type: "tel" },
];

const InfoTab = ({ form, errors, editing, saving, onChange, onSubmit, onEdit, onCancel }: Props) => {
  const handleChange = (field: InfoField, value: string) => {
    onChange(field, field === "phone" ? value.replace(/[^0-9]/g, "") : value);
  };

  return (
    <Box component="section" aria-labelledby="personal-information-title">
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "flex-end" }} gap={2}>
        <Box>
          <Typography id="personal-information-title" component="h2" sx={{ color: "text.primary", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 24, sm: 27 } }}>
            Thông tin cá nhân
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 0.65, lineHeight: 1.65 }}>
            Thông tin liên hệ giúp khách sạn chuẩn bị và hỗ trợ kỳ nghỉ của bạn.
          </Typography>
        </Box>
        {!editing && (
          <Button variant="outlined" onClick={onEdit} sx={{ alignSelf: { xs: "flex-start", sm: "auto" } }}>
            Chỉnh sửa thông tin
          </Button>
        )}
      </Stack>

      {editing ? (
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3.5, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
          <Stack spacing={2.5}>
            {fields.map((field) => (
              <TextField
                key={field.name}
                fullWidth
                label={field.label}
                type={field.type}
                autoComplete={field.autoComplete}
                value={form[field.name] ?? ""}
                onChange={(event) => handleChange(field.name, event.target.value)}
                error={Boolean(errors[field.name])}
                helperText={errors[field.name]}
                inputProps={field.name === "phone" ? { inputMode: "numeric", pattern: "[0-9]*" } : undefined}
              />
            ))}
            <Stack direction={{ xs: "column-reverse", sm: "row" }} justifyContent="flex-end" spacing={1.25} sx={{ pt: 1, "& .MuiButton-root": { minHeight: 44, width: { xs: 1, sm: "auto" } } }}>
              <Button variant="text" onClick={onCancel} disabled={saving}>Hủy</Button>
              <Button type="submit" variant="contained" disabled={saving}>
                {saving ? "Đang lưu…" : "Lưu thay đổi"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      ) : (
        <Box component="dl" sx={{ m: 0, mt: 3.5, pt: 3, borderTop: "1px solid", borderColor: "divider", display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, columnGap: 5, rowGap: { xs: 2.5, sm: 3 } }}>
          {fields.map((field) => (
            <Box key={field.name} sx={{ minWidth: 0, gridColumn: field.name === "fullName" ? { sm: "1 / -1" } : "auto" }}>
              <Typography component="dt" sx={{ color: "text.secondary", fontSize: 12, fontWeight: 650, letterSpacing: ".08em", textTransform: "uppercase" }}>
                {field.label}
              </Typography>
              <Typography component="dd" sx={{ m: 0, mt: 0.7, color: "#263F49", fontSize: 16, lineHeight: 1.55, overflowWrap: "anywhere" }}>
                {form[field.name]?.trim() || "Chưa cập nhật"}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default InfoTab;

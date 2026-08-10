import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { DialogMode } from "@constant/internal/DialogState";
import type { ServiceForm } from "../../useService";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  mode?: DialogMode;
  form: ServiceForm;
  loading?: boolean;
  saving: boolean;
  onClose: () => void;
  onChange: <K extends keyof ServiceForm>(
    field: K,
    value: ServiceForm[K],
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    minHeight: 42,
    borderRadius: "8px",
    bgcolor: "#FFFFFF",
  },
};

const formatPrice = (value: number, locale: string) =>
  Number.isFinite(value) ? value.toLocaleString(locale) : "";

const parsePrice = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
};

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <InputLabel shrink sx={{ color: "#344054", fontSize: 13, fontWeight: 600 }}>
    {children}
  </InputLabel>
);

const ServiceDialog = ({
  open,
  mode,
  form,
  loading = false,
  saving,
  onClose,
  onChange,
  onSubmit,
}: Props) => {
  const { t, i18n } = useTranslation(["services", "common"]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isEdit = mode === "EDIT";
  const numberLocale = i18n.resolvedLanguage === "en" ? "en-US" : "vi-VN";

  return (
    <Dialog
      open={open}
      onClose={loading || saving ? undefined : onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        className: "diamond-sea-admin",
        sx: {
          width: 610,
          maxWidth: { sm: "calc(100vw - 32px)" },
          borderRadius: { xs: 0, sm: "12px" },
          overflow: "hidden",
        },
      }}
    >
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ display: "flex", minHeight: 0, flexDirection: "column" }}
      >
        <DialogTitle
          sx={{
            px: { xs: 2, sm: 2.5 },
            py: 2,
            borderBottom: "1px solid #EAECF0",
            mb: 2.5,
          }}
        >
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            gap={2}
          >
            <Box>
              <Typography
                component="h2"
                sx={{ color: "#1F2937", fontSize: 18, fontWeight: 700 }}
              >
                {isEdit
                  ? t("editDialog.title", { ns: "services" })
                  : t("createDialog.title", { ns: "services" })}
              </Typography>
              <Typography sx={{ mt: 0.35, color: "#667085", fontSize: 13 }}>
                {isEdit
                  ? form.name || t("editDialog.subtitle", { ns: "services" })
                  : t("createDialog.subtitle", { ns: "services" })}
              </Typography>
            </Box>
            <IconButton
              aria-label={t("actions.close", { ns: "common" })}
              size="small"
              onClick={onClose}
              disabled={loading || saving}
              sx={{ mt: -0.5, mr: -0.75, color: "#667085" }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent
          className="diamond-sea-admin"
          sx={{ px: { xs: 2, sm: 2.5 }, py: 2.25, overflowY: "auto" }}
        >
          {loading ? (
            <Grid container spacing={2}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Grid key={index} size={index > 1 ? 12 : { xs: 12, sm: 6 }}>
                  <Skeleton width="35%" />
                  <Skeleton height={index === 2 ? 88 : 48} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FieldLabel>{t("form.name", { ns: "services" })}</FieldLabel>
                <TextField
                  value={form.name || ""}
                  placeholder={t("form.namePlaceholder", { ns: "services" })}
                  onChange={(event) => onChange("name", event.target.value)}
                  fullWidth
                  size="small"
                  sx={fieldSx}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FieldLabel>{t("form.price", { ns: "services" })}</FieldLabel>
                <TextField
                  value={formatPrice(form.basePrice, numberLocale)}
                  onChange={(event) =>
                    onChange("basePrice", parsePrice(event.target.value))
                  }
                  fullWidth
                  size="small"
                  inputProps={{
                    inputMode: "numeric",
                    "aria-label": t("form.priceAriaLabel", { ns: "services" }),
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">VND</InputAdornment>
                    ),
                  }}
                  sx={fieldSx}
                />
              </Grid>
              <Grid size={12}>
                <FieldLabel>{t("form.description", { ns: "services" })}</FieldLabel>
                <TextField
                  value={form.description || ""}
                  placeholder={t("form.descriptionPlaceholder", { ns: "services" })}
                  onChange={(event) =>
                    onChange("description", event.target.value)
                  }
                  fullWidth
                  size="small"
                  multiline
                  minRows={3}
                  maxRows={4}
                  sx={{
                    ...fieldSx,
                    "& .MuiInputBase-root": {
                      minHeight: 88,
                      alignItems: "flex-start",
                    },
                  }}
                />
              </Grid>
              <Grid size={12}>
                <FieldLabel>{t("form.type", { ns: "services" })}</FieldLabel>
                <TextField
                  select
                  value={form.type || "SERVICE"}
                  onChange={(event) =>
                    onChange("type", event.target.value as ServiceForm["type"])
                  }
                  fullWidth
                  size="small"
                  sx={fieldSx}
                >
                  <MenuItem value="SERVICE">{t("types.SERVICE", { ns: "services" })}</MenuItem>
                  <MenuItem value="EXTRA_FEE">{t("types.EXTRA_FEE", { ns: "services" })}</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            px: { xs: 2, sm: 2.5 },
            py: 1.75,
            gap: 1,
            borderTop: "1px solid #EAECF0",
            flexDirection: { xs: "column-reverse", sm: "row" },
            "& > :not(style) ~ :not(style)": { ml: 0 },
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={loading || saving}
            sx={{
              minHeight: 40,
              width: { xs: "100%", sm: "auto" },
              borderRadius: "8px",
              borderColor: "#D0D5DD",
              color: "#344054",
            }}
          >
            {t("actions.cancel", { ns: "common" })}
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={loading || saving}
            sx={{
              minHeight: 40,
              width: { xs: "100%", sm: "auto" },
              borderRadius: "8px",
            }}
          >
            {saving
              ? t("states.saving", { ns: "common" })
              : isEdit
                ? t("editDialog.submit", { ns: "services" })
                : t("createDialog.submit", { ns: "services" })}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ServiceDialog;

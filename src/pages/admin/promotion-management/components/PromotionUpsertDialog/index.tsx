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
import type { DiscountType } from "@enums/DiscountType";
import type { PromotionScope } from "@enums/PromotionScope";
import type { PromotionForm } from "../../usePromotionManagement";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  mode: DialogMode;
  values: PromotionForm;
  onChange: <K extends keyof PromotionForm>(
    field: K,
    value: PromotionForm[K],
  ) => void;
  onClose: () => void;
  onSubmit: () => void;
  loading: boolean;
  saving: boolean;
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    minHeight: 42,
    borderRadius: "8px",
    bgcolor: "#FFFFFF",
  },
};

const formatNumeric = (value: number | undefined, locale: string) =>
  value == null || Number.isNaN(value) ? "" : value.toLocaleString(locale);

const parseNumeric = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
};

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <InputLabel shrink sx={{ color: "#344054", fontSize: 13, fontWeight: 600 }}>
    {children}
  </InputLabel>
);

const Section = ({
  title,
  children,
  last = false,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) => (
  <Box
    sx={{
      pb: last ? 0 : 2.25,
      mb: last ? 0 : 2.25,
      borderBottom: last ? 0 : "1px solid #EAECF0",
    }}
  >
    <Typography
      sx={{
        mb: 1.75,
        color: "#667085",
        fontSize: 11.5,
        fontWeight: 700,
        letterSpacing: "0.055em",
        textTransform: "uppercase",
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default function PromotionUpsertDialog({
  open,
  mode,
  values,
  onChange,
  onClose,
  onSubmit,
  loading,
  saving,
}: Props) {
  const { t, i18n } = useTranslation(["promotions", "common"]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isCreate = mode === "CREATE";
  const identity = values.code || values.name;
  const numberLocale = i18n.resolvedLanguage === "en" ? "en-US" : "vi-VN";

  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: "diamond-sea-admin",
        sx: {
          width: 820,
          maxWidth: { sm: "calc(100vw - 32px)" },
          maxHeight: { sm: "88dvh" },
          borderRadius: { xs: 0, sm: "12px" },
          overflow: "hidden",
        },
      }}
    >
      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
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
                {isCreate
                  ? t("createDialog.title", { ns: "promotions" })
                  : t("editDialog.title", { ns: "promotions" })}
              </Typography>
              {!isCreate && identity && (
                <Typography sx={{ mt: 0.35, color: "#667085", fontSize: 13 }}>
                  {identity}
                </Typography>
              )}
            </Box>
            <IconButton
              aria-label={t("actions.close", { ns: "common" })}
              size="small"
              onClick={onClose}
              disabled={saving}
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
          {loading && !isCreate ? (
            <Stack spacing={2}>
              {Array.from({ length: 4 }).map((_, section) => (
                <Box key={section}>
                  <Skeleton width={180} />
                  <Grid container spacing={2} sx={{ mt: 0.5 }}>
                    {Array.from({ length: 4 }).map((__, field) => (
                      <Grid key={field} size={{ xs: 12, sm: 6 }}>
                        <Skeleton height={48} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Stack>
          ) : (
            <>
              <Section title={t("form.generalInformation", { ns: "promotions" })}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FieldLabel>{t("form.promotionType", { ns: "promotions" })}</FieldLabel>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      value={values.autoApplied ? "true" : "false"}
                      onChange={(event) =>
                        onChange("autoApplied", event.target.value === "true")
                      }
                      sx={fieldSx}
                    >
                      <MenuItem value="false">{t("form.codePromotion", { ns: "promotions" })}</MenuItem>
                      <MenuItem value="true">{t("form.automaticPromotion", { ns: "promotions" })}</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FieldLabel>{t("form.programName", { ns: "promotions" })}</FieldLabel>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder={t("form.programNamePlaceholder", { ns: "promotions" })}
                      value={values.name}
                      onChange={(event) => onChange("name", event.target.value)}
                      sx={fieldSx}
                    />
                  </Grid>
                  {!values.autoApplied && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FieldLabel>{t("form.promotionCode", { ns: "promotions" })}</FieldLabel>
                      <TextField
                        fullWidth
                        size="small"
                        value={values.code ?? ""}
                        onChange={(event) =>
                          onChange("code", event.target.value)
                        }
                        sx={fieldSx}
                      />
                    </Grid>
                  )}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FieldLabel>{t("form.priority", { ns: "promotions" })}</FieldLabel>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      inputProps={{ min: 0 }}
                      value={values.priority}
                      onChange={(event) =>
                        onChange("priority", Number(event.target.value) || 0)
                      }
                      helperText={t("form.priorityHint", { ns: "promotions" })}
                      sx={fieldSx}
                    />
                  </Grid>
                  <Grid size={12}>
                    <FieldLabel>{t("form.description", { ns: "promotions" })}</FieldLabel>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      minRows={2}
                      maxRows={3}
                      value={values.description}
                      onChange={(event) =>
                        onChange("description", event.target.value)
                      }
                      sx={{
                        ...fieldSx,
                        "& .MuiInputBase-root": {
                          minHeight: 76,
                          alignItems: "flex-start",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Section>

              <Section title={t("form.discountConfiguration", { ns: "promotions" })}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FieldLabel>{t("form.discountType", { ns: "promotions" })}</FieldLabel>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      value={values.discountType}
                      onChange={(event) =>
                        onChange(
                          "discountType",
                          event.target.value as DiscountType,
                        )
                      }
                      sx={fieldSx}
                    >
                      <MenuItem value="PERCENTAGE">{t("form.percentage", { ns: "promotions" })}</MenuItem>
                      <MenuItem value="FIXED_AMOUNT">{t("form.fixedAmount", { ns: "promotions" })}</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FieldLabel>{t("form.discountValue", { ns: "promotions" })}</FieldLabel>
                    {values.discountType === "PERCENTAGE" ? (
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        inputProps={{ min: 0 }}
                        value={values.discountValue}
                        onChange={(event) =>
                          onChange(
                            "discountValue",
                            Number(event.target.value) || 0,
                          )
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                        }}
                        sx={fieldSx}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        size="small"
                        value={formatNumeric(values.discountValue, numberLocale)}
                        onChange={(event) =>
                          onChange(
                            "discountValue",
                            parseNumeric(event.target.value),
                          )
                        }
                        inputProps={{ inputMode: "numeric" }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">VND</InputAdornment>
                          ),
                        }}
                        sx={fieldSx}
                      />
                    )}
                  </Grid>
                  {values.discountType === "PERCENTAGE" && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FieldLabel>{t("form.maximumDiscount", { ns: "promotions" })}</FieldLabel>
                      <TextField
                        fullWidth
                        size="small"
                        value={formatNumeric(values.maxDiscountAmount, numberLocale)}
                        onChange={(event) =>
                          onChange(
                            "maxDiscountAmount",
                            parseNumeric(event.target.value),
                          )
                        }
                        inputProps={{ inputMode: "numeric" }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">VND</InputAdornment>
                          ),
                        }}
                        helperText={t("form.optional", { ns: "promotions" })}
                        sx={fieldSx}
                      />
                    </Grid>
                  )}
                </Grid>
              </Section>

              <Section title={t("form.conditionsAndScope", { ns: "promotions" })}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FieldLabel>{t("form.scope", { ns: "promotions" })}</FieldLabel>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      value={values.scope}
                      onChange={(event) =>
                        onChange("scope", event.target.value as PromotionScope)
                      }
                      sx={fieldSx}
                    >
                      <MenuItem value="INVOICE">{t("scopes.INVOICE", { ns: "promotions" })}</MenuItem>
                      <MenuItem value="ROOM">{t("scopes.ROOM", { ns: "promotions" })}</MenuItem>
                      <MenuItem value="SERVICE">{t("scopes.SERVICE", { ns: "promotions" })}</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FieldLabel>{t("form.minimumOrderValue", { ns: "promotions" })}</FieldLabel>
                    <TextField
                      fullWidth
                      size="small"
                      value={formatNumeric(values.minTotal, numberLocale)}
                      onChange={(event) =>
                        onChange("minTotal", parseNumeric(event.target.value))
                      }
                      inputProps={{ inputMode: "numeric" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">VND</InputAdornment>
                        ),
                      }}
                      helperText={t("form.optional", { ns: "promotions" })}
                      sx={fieldSx}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FieldLabel>{t("form.usageLimit", { ns: "promotions" })}</FieldLabel>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      inputProps={{ min: 0 }}
                      value={values.quotaTotal}
                      onChange={(event) =>
                        onChange("quotaTotal", Number(event.target.value) || 0)
                      }
                      sx={fieldSx}
                    />
                  </Grid>
                  {!values.autoApplied && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FieldLabel>{t("form.stackPromotions", { ns: "promotions" })}</FieldLabel>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        value={values.stackable ? "true" : "false"}
                        onChange={(event) =>
                          onChange("stackable", event.target.value === "true")
                        }
                        sx={fieldSx}
                      >
                        <MenuItem value="true">{t("form.allow", { ns: "promotions" })}</MenuItem>
                        <MenuItem value="false">{t("form.no", { ns: "promotions" })}</MenuItem>
                      </TextField>
                    </Grid>
                  )}
                </Grid>
              </Section>

              <Section title={t("form.validityPeriod", { ns: "promotions" })} last>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FieldLabel>{t("form.startDate", { ns: "promotions" })}</FieldLabel>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      value={values.startDate}
                      onChange={(event) =>
                        onChange("startDate", event.target.value)
                      }
                      sx={fieldSx}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FieldLabel>{t("form.endDate", { ns: "promotions" })}</FieldLabel>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      value={values.endDate}
                      onChange={(event) =>
                        onChange("endDate", event.target.value)
                      }
                      sx={fieldSx}
                    />
                  </Grid>
                </Grid>
              </Section>
            </>
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
            disabled={saving}
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
            disabled={saving || loading}
            sx={{
              minHeight: 40,
              width: { xs: "100%", sm: "auto" },
              borderRadius: "8px",
            }}
          >
            {saving
              ? t("states.saving", { ns: "common" })
              : isCreate
                ? t("createDialog.submit", { ns: "promotions" })
                : t("editDialog.submit", { ns: "promotions" })}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

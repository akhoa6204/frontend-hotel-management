import { Add, Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { DialogState } from "@constant/internal/DialogState";
import type { AmenityResponse } from "@constant/response/AmenityResponse";
import type { UpsertFormRoomType } from "../../useRoomTypesManagement";
import { useTranslation } from "react-i18next";

interface Props {
  state: DialogState;
  values: UpsertFormRoomType;
  errors: Partial<Record<keyof UpsertFormRoomType, string>>;
  onChange: <K extends keyof UpsertFormRoomType>(
    field: K,
    value: UpsertFormRoomType[K],
  ) => void;
  amenityOptions: AmenityResponse[];
  amenitiesLoading: boolean;
  amenitiesError: boolean;
  loading: boolean;
  saving: boolean;
  onPickFiles: (files: File[]) => void;
  onRemoveImage: (index: number) => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography
    sx={{
      pb: 1,
      mb: 1.75,
      borderBottom: "1px solid #EAECF0",
      color: "#475467",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.045em",
    }}
  >
    {children}
  </Typography>
);

export default function RoomTypeUpsertView({
  state,
  values,
  errors,
  onChange,
  amenityOptions,
  amenitiesLoading,
  amenitiesError,
  loading,
  saving,
  onPickFiles,
  onRemoveImage,
  onClose,
  onSubmit,
}: Props) {
  const { t } = useTranslation(["roomTypes", "common"]);
  const editing = state.mode === "EDIT";
  const selectedAmenities = amenityOptions.filter((amenity) =>
    (values.amenities || []).includes(amenity.id),
  );
  const images = values.roomTypeImagesResponse || [];

  return (
    <Dialog
      open={state.open}
      onClose={saving ? undefined : onClose}
      maxWidth={false}
      fullWidth
      PaperProps={{
        sx: {
          width: { xs: "calc(100vw - 24px)", sm: 780 },
          maxWidth: "calc(100vw - 24px)",
          maxHeight: "88dvh",
          m: 0,
          borderRadius: "12px",
          overflow: "hidden",
        },
      }}
    >
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ display: "flex", flex: 1, minHeight: 0, flexDirection: "column" }}
      >
        <DialogTitle
          sx={{
            px: { xs: 2, sm: 2.75 },
            py: 2,
            borderBottom: "1px solid #E4E7EC",
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
                sx={{ color: "#1F2937", fontSize: 19, fontWeight: 700 }}
              >
                {t(editing ? "editDialog.title" : "createDialog.title", {
                  ns: "roomTypes",
                })}
              </Typography>
              {editing && values.name && (
                <Typography sx={{ mt: 0.35, color: "#667085", fontSize: 12.5 }}>
                  {values.name}
                  {values.roomTypeId
                    ? ` · ${t("editDialog.code", { ns: "roomTypes", code: values.roomTypeId })}`
                    : ""}
                </Typography>
              )}
            </Box>
            <IconButton
              aria-label={t("actions.close", { ns: "common" })}
              size="small"
              disabled={saving}
              onClick={onClose}
              sx={{ width: 34, height: 34, color: "#667085" }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent
          className="admin-scrollbar"
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            px: { xs: 2, sm: 2.75 },
            py: 2.25,
          }}
        >
          {loading && editing ? (
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1.25}
              sx={{ minHeight: 320 }}
            >
              <CircularProgress size={26} />
              <Typography variant="body2" color="text.secondary">
                {t("states.loadingDetails", { ns: "roomTypes" })}
              </Typography>
            </Stack>
          ) : (
            <Stack spacing={2.75}>
              <Box>
                <SectionTitle>
                  {t("createDialog.generalInformation", { ns: "roomTypes" })}
                </SectionTitle>
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <InputLabel
                      shrink
                      sx={{ color: "#475467", fontSize: 13, fontWeight: 600 }}
                    >
                      {t("createDialog.name", { ns: "roomTypes" })}
                    </InputLabel>
                    <TextField
                      fullWidth
                      size="small"
                      value={values.name ?? ""}
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                      onChange={(event) => onChange("name", event.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <InputLabel
                      shrink
                      sx={{ color: "#475467", fontSize: 13, fontWeight: 600 }}
                    >
                      {t("createDialog.guestCount", { ns: "roomTypes" })}
                    </InputLabel>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      value={values.capacity ?? ""}
                      error={Boolean(errors.capacity)}
                      helperText={errors.capacity}
                      onChange={(event) =>
                        onChange(
                          "capacity",
                          Number(event.target.value) || undefined,
                        )
                      }
                      inputProps={{ min: 1 }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <InputLabel
                      shrink
                      sx={{ color: "#475467", fontSize: 13, fontWeight: 600 }}
                    >
                      {t("createDialog.price", { ns: "roomTypes" })}
                    </InputLabel>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      value={values.basePrice ?? ""}
                      error={Boolean(errors.basePrice)}
                      helperText={errors.basePrice}
                      onChange={(event) =>
                        onChange(
                          "basePrice",
                          Number(event.target.value) || undefined,
                        )
                      }
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                  <Grid size={12}>
                    <InputLabel
                      shrink
                      sx={{ color: "#475467", fontSize: 13, fontWeight: 600 }}
                    >
                      {t("createDialog.description", { ns: "roomTypes" })}
                    </InputLabel>
                    <TextField
                      fullWidth
                      size="small"
                      value={values.description ?? ""}
                      onChange={(event) =>
                        onChange("description", event.target.value)
                      }
                      multiline
                      minRows={3}
                      maxRows={4}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <SectionTitle>
                  {t("createDialog.servicesAndAmenities", { ns: "roomTypes" })}
                </SectionTitle>
                <Typography
                  sx={{ mt: -0.75, mb: 1.25, color: "#667085", fontSize: 12.5 }}
                >
                  {t("createDialog.amenitiesHint", { ns: "roomTypes" })}
                </Typography>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  loading={amenitiesLoading}
                  options={amenityOptions}
                  value={selectedAmenities}
                  onChange={(_, newValue) =>
                    onChange(
                      "amenities",
                      newValue.map((item) => item.id),
                    )
                  }
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderOption={(props, option, { selected }) => (
                    <li {...props} key={option.id}>
                      <Checkbox
                        size="small"
                        checked={selected}
                        sx={{ mr: 0.75, p: 0.5 }}
                      />
                      {option.label}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder={
                        selectedAmenities.length
                          ? ""
                          : t("createDialog.chooseServicesAndAmenities", {
                              ns: "roomTypes",
                            })
                      }
                      error={amenitiesError}
                      helperText={
                        amenitiesError
                          ? t("states.amenitiesLoadError", { ns: "roomTypes" })
                          : undefined
                      }
                    />
                  )}
                  renderValue={(selected, getItemProps) =>
                    selected.map((option, index) => {
                      const { key, ...itemProps } = getItemProps({ index });
                      return (
                        <Chip
                          key={key}
                          {...itemProps}
                          label={option.label}
                          size="small"
                          sx={{
                            height: 28,
                            borderRadius: "7px",
                            bgcolor: "#F2F4F7",
                            color: "#475467",
                            fontSize: 12,
                            fontWeight: 600,
                            "& .MuiChip-deleteIcon": {
                              color: "#98A2B3",
                              fontSize: 17,
                            },
                          }}
                        />
                      );
                    })
                  }
                  slotProps={{
                    paper: {
                      className: "admin-scrollbar",
                      sx: {
                        maxHeight: 280,
                        borderRadius: "8px",
                        boxShadow: "0 8px 24px rgba(16, 24, 40, 0.14)",
                      },
                    },
                  }}
                />
              </Box>

              <Box>
                <SectionTitle>
                  {t("createDialog.images", { ns: "roomTypes" })}
                </SectionTitle>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(2, minmax(0, 1fr))",
                      sm: "repeat(auto-fill, minmax(140px, 1fr))",
                    },
                    gap: 1.25,
                  }}
                >
                  {images.map((image, index) => (
                    <Box
                      key={`${image.url}-${index}`}
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                        aspectRatio: "4 / 3",
                        borderRadius: "8px",
                        bgcolor: "#F2F4F7",
                      }}
                    >
                      <Box
                        component="img"
                        src={image.url}
                        alt={
                          image.alt ||
                          t("aria.imageAlt", {
                            ns: "roomTypes",
                            index: index + 1,
                          })
                        }
                        sx={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <IconButton
                        aria-label={t("aria.removeImage", {
                          ns: "roomTypes",
                          index: index + 1,
                        })}
                        size="small"
                        onClick={() => onRemoveImage(index)}
                        sx={{
                          position: "absolute",
                          top: 6,
                          right: 6,
                          width: 26,
                          height: 26,
                          bgcolor: "rgba(0,0,0,0.55)",
                          color: "#FFFFFF",
                          "&:hover": { bgcolor: "rgba(0,0,0,0.72)" },
                        }}
                      >
                        <Close sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  ))}

                  {images.length < 8 && (
                    <Box
                      component="label"
                      sx={{
                        aspectRatio: "4 / 3",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0.5,
                        border: "1px dashed #D0D5DD",
                        borderRadius: "8px",
                        bgcolor: "#F9FAFB",
                        color: "#667085",
                        cursor: "pointer",
                        transition: "all 120ms ease",
                        "&:hover": {
                          borderColor: "#2E90FA",
                          bgcolor: "#F0F7FF",
                          color: "#1D6FC2",
                        },
                      }}
                    >
                      <Add sx={{ fontSize: 22 }} />
                      <Typography sx={{ fontSize: 12.5, fontWeight: 650 }}>
                        {t("createDialog.addImage", { ns: "roomTypes" })}
                      </Typography>
                      <Box
                        component="input"
                        type="file"
                        multiple
                        accept="image/*"
                        hidden
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                          onPickFiles(Array.from(event.target.files || []));
                          event.target.value = "";
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </Stack>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            flexDirection: { xs: "column-reverse", sm: "row" },
            alignItems: "stretch",
            px: { xs: 2, sm: 2.75 },
            py: 1.5,
            gap: 1,
            borderTop: "1px solid #EAECF0",
            "& > :not(style) ~ :not(style)": { ml: 0 },
          }}
        >
          <Button
            variant="outlined"
            disabled={saving}
            onClick={onClose}
            sx={{
              minHeight: 40,
              borderRadius: "8px",
              borderColor: "#D0D5DD",
              color: "#344054",
            }}
          >
            {t("actions.cancel", { ns: "common" })}
          </Button>
          <Button
            variant="contained"
            disabled={saving || (editing && loading)}
            type="submit"
            sx={{ minHeight: 40, borderRadius: "8px" }}
          >
            {saving
              ? t("states.saving", { ns: "common" })
              : editing
                ? t("actions.saveChanges", { ns: "common" })
                : t("createDialog.create", { ns: "roomTypes" })}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

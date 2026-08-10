import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { DialogState } from "@constant/internal/DialogState";
import type { RoomUpdateRequest } from "@constant/request/RoomUpdateRequest";
import type { RoomTypeResponse } from "@constant/response/RoomTypeResponse";
import { useTranslation } from "react-i18next";

interface Props {
  state: DialogState;
  roomTypes: RoomTypeResponse[];
  values: RoomUpdateRequest;
  errors: Partial<Record<keyof RoomUpdateRequest, string>>;
  onChange: (
    field: keyof RoomUpdateRequest,
    value: RoomUpdateRequest[keyof RoomUpdateRequest],
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  submitting: boolean;
  loading: boolean;
}

export default function RoomUpsertDialog({
  state,
  roomTypes,
  values,
  errors,
  onChange,
  onSubmit,
  onClose,
  submitting,
  loading,
}: Props) {
  const { t, i18n } = useTranslation(["rooms", "common"]);
  const selectedType = roomTypes.find(
    (roomType) => roomType.id === Number(values.roomTypeId),
  );
  const editing = state.mode === "EDIT";
  const numberLocale = i18n.resolvedLanguage === "en" ? "en-US" : "vi-VN";

  return (
    <Dialog
      open={state.open}
      onClose={submitting ? undefined : onClose}
      maxWidth={false}
      fullWidth
      PaperProps={{
        sx: {
          width: { xs: "calc(100vw - 24px)", sm: 620 },
          maxWidth: "calc(100vw - 24px)",
          maxHeight: "86dvh",
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
            px: { xs: 2, sm: 2.5 },
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
                {t(editing ? "editDialog.title" : "createDialog.title", { ns: "rooms" })}
              </Typography>
              <Typography sx={{ mt: 0.35, color: "#667085", fontSize: 12.5 }}>
                {editing && values.name
                  ? `${values.name}${selectedType ? ` · ${selectedType.name}` : ""}`
                  : t("createDialog.subtitle", { ns: "rooms" })}
              </Typography>
            </Box>
            <IconButton
              aria-label={t("actions.close", { ns: "common" })}
              size="small"
              disabled={submitting}
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
            px: { xs: 2, sm: 2.5 },
            py: 2.25,
          }}
        >
          {loading && editing ? (
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1.25}
              sx={{ minHeight: 220 }}
            >
              <CircularProgress size={26} />
              <Typography variant="body2" color="text.secondary">
                {t("states.loadingRoomInformation", { ns: "rooms" })}
              </Typography>
            </Stack>
          ) : (
            <Stack spacing={2.5}>
              <Box>
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
                  {t("createDialog.information", { ns: "rooms" })}
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <InputLabel
                      shrink
                      sx={{ color: "#475467", fontSize: 13, fontWeight: 600 }}
                    >
                      {t("createDialog.roomName", { ns: "rooms" })}
                    </InputLabel>
                    <TextField
                      fullWidth
                      placeholder={t("createDialog.roomNamePlaceholder", { ns: "rooms" })}
                      value={values.name ?? ""}
                      onChange={(event) => onChange("name", event.target.value)}
                      size="small"
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <InputLabel
                      shrink
                      sx={{ color: "#475467", fontSize: 13, fontWeight: 600 }}
                    >
                      {t("createDialog.roomType", { ns: "rooms" })}
                    </InputLabel>
                    <Select
                      fullWidth
                      size="small"
                      displayEmpty
                      value={values.roomTypeId ?? ""}
                      onChange={(event) =>
                        onChange(
                          "roomTypeId",
                          Number(event.target.value) || undefined,
                        )
                      }
                    >
                      <MenuItem value="" disabled>
                        {t("createDialog.chooseRoomType", { ns: "rooms" })}
                      </MenuItem>
                      {roomTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.roomTypeId && (
                      <Typography sx={{ mt: 0.5, color: "error.main", fontSize: 12 }} role="alert">
                        {errors.roomTypeId}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Box>

              {selectedType && (
                <Box>
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
                    {t("editDialog.roomTypeInformation", { ns: "rooms" })}
                  </Typography>
                  <Grid container spacing={2.5}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography sx={{ color: "#667085", fontSize: 12.5 }}>
                        {t("editDialog.price", { ns: "rooms" })}
                      </Typography>
                      <Typography
                        sx={{
                          mt: 0.4,
                          color: "#1F2937",
                          fontSize: 14,
                          fontWeight: 650,
                        }}
                      >
                        {Number(selectedType.basePrice).toLocaleString(numberLocale)}{" "}
                        {t("pricePerNight", { ns: "rooms" })}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography sx={{ color: "#667085", fontSize: 12.5 }}>
                        {t("editDialog.capacity", { ns: "rooms" })}
                      </Typography>
                      <Typography
                        sx={{
                          mt: 0.4,
                          color: "#1F2937",
                          fontSize: 14,
                          fontWeight: 650,
                        }}
                      >
                        {t("guests", { ns: "rooms", count: selectedType.capacity })}
                      </Typography>
                    </Grid>
                    <Grid size={12}>
                      <Typography sx={{ color: "#667085", fontSize: 12.5 }}>
                        {t("editDialog.amenities", { ns: "rooms" })}
                      </Typography>
                      {selectedType.amenities?.length ? (
                        <Stack
                          direction="row"
                          flexWrap="wrap"
                          gap={0.75}
                          sx={{ mt: 0.75 }}
                        >
                          {selectedType.amenities.map((amenity) => (
                            <Chip
                              key={amenity.id || amenity.label}
                              label={amenity.label}
                              size="small"
                              sx={{
                                height: 26,
                                borderRadius: 999,
                                bgcolor: "#F2F4F7",
                                color: "#475467",
                                fontSize: 12,
                                fontWeight: 550,
                              }}
                            />
                          ))}
                        </Stack>
                      ) : (
                        <Typography
                          sx={{ mt: 0.4, color: "#98A2B3", fontSize: 13 }}
                        >
                          {t("states.noAmenities", { ns: "rooms" })}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Stack>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            px: { xs: 2, sm: 2.5 },
            py: 1.5,
            borderTop: "1px solid #E4E7EC",
          }}
        >
          <Button
            variant="outlined"
            disabled={submitting}
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
            disabled={submitting || (editing && loading)}
            type="submit"
            sx={{ minHeight: 40, borderRadius: "8px" }}
          >
            {submitting
              ? t("states.saving", { ns: "common" })
              : editing
                ? t("actions.saveChanges", { ns: "common" })
                : t("createDialog.create", { ns: "rooms" })}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

import EntityPickerField from "@components/entity-picker-field";
import type { DialogMode } from "@constant/internal/DialogState";
import type { RoomResponse } from "@constant/response/RoomResponse";
import type { UserShortResponse } from "@constant/response/UserShortResponse";
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
  InputLabel,
  MenuItem,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { TaskForm } from "../../useHouseKeeping";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  mode?: DialogMode;
  form: TaskForm;
  errors: Partial<Record<keyof TaskForm, string>>;
  onChange: <K extends keyof TaskForm>(field: K, value: TaskForm[K]) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  canEdit: boolean;
  optionsRoom: RoomResponse[];
  isMoreRoom: boolean;
  onOpenPickerRoom: () => void;
  optionsStaff: UserShortResponse[];
  isMoreStaff: boolean;
  onOpenPickerStaff: () => void;
  loadingTask: boolean;
  notHouseKeeping: boolean;
  saving: boolean;
  loadingStaffOptions: boolean;
  staffOptionsError: boolean;
  onRetryStaffOptions: () => void;
}

const DetailValue = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Box>
    <Typography
      sx={{
        mb: 0.4,
        color: "#667085",
        fontSize: 11.5,
        fontWeight: 700,
        letterSpacing: "0.035em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        color: "#1F2937",
        fontSize: 13.5,
        fontWeight: 600,
        overflowWrap: "anywhere",
      }}
    >
      {children || "—"}
    </Typography>
  </Box>
);

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    minHeight: 42,
    borderRadius: "8px",
    bgcolor: "#FFFFFF",
  },
};

const formatDetailDate = (value: string | undefined, locale: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const HousekeepingUpsertDialog = ({
  open,
  mode,
  form,
  errors,
  onChange,
  onSubmit,
  onClose,
  canEdit,
  optionsRoom,
  isMoreRoom,
  onOpenPickerRoom,
  optionsStaff,
  isMoreStaff,
  onOpenPickerStaff,
  loadingTask,
  notHouseKeeping,
  saving,
  loadingStaffOptions,
  staffOptionsError,
  onRetryStaffOptions,
}: Props) => {
  const { t, i18n } = useTranslation(["housekeeping", "common"]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isCreate = mode === "CREATE";
  const roomName =
    form.room?.name ||
    optionsRoom.find((room) => room.id === form.roomId)?.name;
  const roomType = form.room?.roomType?.name;
  const staffName =
    form.staff?.fullName ||
    optionsStaff.find((staff) => staff.id === form.staffId)?.fullName;
  const taskType = form.type ? t(`types.${form.type}`, { ns: "housekeeping" }) : "—";
  const canAssignStaff = !isCreate && canEdit && notHouseKeeping;
  const dateLocale = i18n.resolvedLanguage === "en" ? "en-US" : "vi-VN";

  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: "diamond-sea-admin",
        sx: {
          width: 600,
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
                {t(isCreate ? "createTitle" : "taskTitle", { ns: "housekeeping" })}
              </Typography>
              <Typography sx={{ mt: 0.35, color: "#667085", fontSize: 13 }}>
                {isCreate
                  ? t("createSubtitle", { ns: "housekeeping" })
                  : loadingTask
                    ? t("loadingDetail", { ns: "housekeeping" })
                    : `${roomName || "—"} · ${taskType}`}
              </Typography>
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
          {loadingTask && !isCreate ? (
            <Grid container spacing={2}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6 }}>
                  <Skeleton width="38%" />
                  <Skeleton height={28} />
                </Grid>
              ))}
            </Grid>
          ) : isCreate ? (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InputLabel
                  shrink
                  sx={{ color: "#344054", fontSize: 13, fontWeight: 600 }}
                >
                  {t("room", { ns: "housekeeping" })}
                </InputLabel>
                <EntityPickerField
                  name="roomId"
                  value={form.roomId}
                  onChange={(_, value) => onChange("roomId", Number(value))}
                  onOpenPicker={onOpenPickerRoom}
                  isMoreOptions={isMoreRoom}
                  placeholder={t("chooseRoom", { ns: "housekeeping" })}
                  error={Boolean(errors.roomId)}
                  helperText={errors.roomId}
                  size="small"
                  disabled={!canEdit || !notHouseKeeping}
                >
                  {optionsRoom.map((room) => (
                    <MenuItem key={room.id} value={room.id}>
                      {room.name} · {room.roomType.name}
                    </MenuItem>
                  ))}
                </EntityPickerField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InputLabel
                  shrink
                  sx={{ color: "#344054", fontSize: 13, fontWeight: 600 }}
                >
                  {t("assignee", { ns: "housekeeping" })}
                </InputLabel>
                <EntityPickerField
                  name="staffId"
                  value={form.staffId}
                  onChange={(_, value) => onChange("staffId", String(value))}
                  onOpenPicker={onOpenPickerStaff}
                  isMoreOptions={isMoreStaff}
                  placeholder={t("chooseStaff", { ns: "housekeeping" })}
                  error={Boolean(errors.staffId)}
                  helperText={errors.staffId}
                  size="small"
                  disabled={!canEdit || !notHouseKeeping}
                >
                  {optionsStaff.map((staff) => (
                    <MenuItem key={staff.id} value={staff.id}>
                      {staff.fullName}
                    </MenuItem>
                  ))}
                </EntityPickerField>
              </Grid>
              <Grid size={12}>
                <InputLabel
                  shrink
                  sx={{ color: "#344054", fontSize: 13, fontWeight: 600 }}
                >
                  {t("taskType", { ns: "housekeeping" })}
                </InputLabel>
                <TextField
                  select
                  size="small"
                  value={form.type}
                  onChange={(event) =>
                    onChange("type", event.target.value as TaskForm["type"])
                  }
                  fullWidth
                  disabled={!canEdit || !notHouseKeeping}
                  sx={fieldSx}
                >
                  <MenuItem value="CLEANING">{t("types.CLEANING", { ns: "housekeeping" })}</MenuItem>
                  <MenuItem value="INSPECTION">{t("types.INSPECTION", { ns: "housekeeping" })}</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          ) : (
            <Stack spacing={2.25}>
              <Box>
                <Typography
                  sx={{
                    mb: 1.5,
                    color: "#667085",
                    fontSize: 11.5,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {t("taskInformation", { ns: "housekeeping" })}
                </Typography>
                <Grid container spacing={{ xs: 1.75, sm: 2.25 }}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DetailValue label={t("room", { ns: "housekeeping" })}>
                      {roomName}
                      {roomType ? ` · ${roomType}` : ""}
                    </DetailValue>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DetailValue label={t("taskType", { ns: "housekeeping" })}>{taskType}</DetailValue>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    {canAssignStaff ? (
                      <Box>
                        <InputLabel
                          shrink
                          sx={{
                            color: "#667085",
                            fontSize: 11.5,
                            fontWeight: 700,
                            letterSpacing: "0.035em",
                            textTransform: "uppercase",
                          }}
                        >
                          {t("assignee", { ns: "housekeeping" })}
                        </InputLabel>
                        <EntityPickerField
                          name="staffId"
                          value={form.staffId}
                          onChange={(_, value) =>
                            onChange("staffId", String(value))
                          }
                          onOpenPicker={onOpenPickerStaff}
                          isMoreOptions={isMoreStaff}
                          placeholder={
                            loadingStaffOptions
                              ? t("loadingStaff", { ns: "housekeeping" })
                              : t("chooseAssignee", { ns: "housekeeping" })
                          }
                          size="small"
                          disabled={
                            loadingStaffOptions || staffOptionsError || saving
                          }
                        >
                          {!loadingStaffOptions &&
                            !staffOptionsError &&
                            optionsStaff.length === 0 && (
                              <MenuItem value="" disabled>
                                {t("noStaff", { ns: "housekeeping" })}
                              </MenuItem>
                            )}
                          {optionsStaff
                            .filter(
                              (staff) =>
                                staff.active || staff.id === form.staffId,
                            )
                            .map((staff) => (
                            <MenuItem
                              key={staff.id}
                              value={staff.id}
                              disabled={!staff.active}
                            >
                              {staff.fullName}
                            </MenuItem>
                            ))}
                        </EntityPickerField>
                        {staffOptionsError && (
                          <Stack
                            direction="row"
                            alignItems="center"
                            gap={0.5}
                            sx={{ mt: 0.5 }}
                          >
                            <Typography sx={{ color: "#B42318", fontSize: 12 }}>
                              {t("staffLoadError", { ns: "housekeeping" })}
                            </Typography>
                            <Button
                              size="small"
                              onClick={onRetryStaffOptions}
                              sx={{ minWidth: 0, p: 0.25, fontSize: 12 }}
                            >
                              {t("actions.retry", { ns: "common" })}
                            </Button>
                          </Stack>
                        )}
                      </Box>
                    ) : (
                      <DetailValue label={t("assignee", { ns: "housekeeping" })}>
                        {staffName || (
                          <Box component="span" sx={{ color: "#C27A14" }}>
                            {t("unassigned", { ns: "housekeeping" })}
                          </Box>
                        )}
                      </DetailValue>
                    )}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DetailValue label={t("createdAt", { ns: "housekeeping" })}>
                      {formatDetailDate(form.createdAt, dateLocale)}
                    </DetailValue>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ pt: 2, borderTop: "1px solid #EAECF0" }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <InputLabel
                      shrink
                      sx={{ color: "#344054", fontSize: 13, fontWeight: 600 }}
                    >
                      {t("fields.status", { ns: "common" })}
                    </InputLabel>
                    <TextField
                      select
                      size="small"
                      value={form.status}
                      onChange={(event) =>
                        onChange(
                          "status",
                          event.target.value as TaskForm["status"],
                        )
                      }
                      fullWidth
                      disabled={!canEdit}
                      sx={fieldSx}
                    >
                      <MenuItem value="PENDING">{t("status.PENDING", { ns: "housekeeping" })}</MenuItem>
                      <MenuItem value="IN_PROGRESS">{t("status.IN_PROGRESS", { ns: "housekeeping" })}</MenuItem>
                      <MenuItem value="COMPLETED">{t("status.COMPLETED", { ns: "housekeeping" })}</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid size={12}>
                    <InputLabel
                      shrink
                      sx={{ color: "#344054", fontSize: 13, fontWeight: 600 }}
                    >
                      {t("notes", { ns: "housekeeping" })}
                    </InputLabel>
                    <TextField
                      fullWidth
                      size="small"
                      value={form.note ?? ""}
                      multiline
                      minRows={3}
                      maxRows={4}
                      placeholder={t("notesPlaceholder", { ns: "housekeeping" })}
                      onChange={(event) => onChange("note", event.target.value)}
                      disabled={!canEdit}
                      sx={{
                        ...fieldSx,
                        "& .MuiInputBase-root": {
                          minHeight: 100,
                          alignItems: "flex-start",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Stack>
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
            color="inherit"
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
            {t(canEdit ? "actions.cancel" : "actions.close", { ns: "common" })}
          </Button>
          {canEdit && (
            <Button
              variant="contained"
              type="submit"
              disabled={saving}
              sx={{
                minHeight: 40,
                width: { xs: "100%", sm: "auto" },
                borderRadius: "8px",
              }}
            >
              {saving
                ? t("states.saving", { ns: "common" })
                : isCreate
                  ? t("create", { ns: "housekeeping" })
                  : t("actions.saveChanges", { ns: "common" })}
            </Button>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default HousekeepingUpsertDialog;

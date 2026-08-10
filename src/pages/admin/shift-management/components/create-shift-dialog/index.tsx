import { EntityPickerField } from "@components";
import type { ShiftResponse } from "@constant/response/ShiftResponse";
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
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { formatTime } from "@utils/format";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
  shifts: ShiftResponse[];
  workDate: string;
  staff: UserShortResponse | null;
  shiftId: string | number;
  onChangeShift: <K extends "shiftId" | "staff" | "workDate">(
    field: K,
    value: {
      shiftId: number | null;
      staff?: UserShortResponse;
      workDate: string;
    }[K],
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  options: UserShortResponse[];
  isMoreOptions: boolean;
  seeMore: () => void;
  saving: boolean;
  loadingDefinitions: boolean;
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    minHeight: 42,
    borderRadius: "8px",
    bgcolor: "#FFFFFF",
  },
};

export default function CreateShiftDialog({
  open,
  onClose,
  shifts,
  staff,
  workDate,
  shiftId,
  onChangeShift,
  onSubmit,
  options,
  isMoreOptions,
  seeMore,
  saving,
  loadingDefinitions,
}: Props) {
  const { t } = useTranslation(["schedules", "common"]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        className: "diamond-sea-admin",
        sx: {
          width: 570,
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
                {t("create", { ns: "schedules" })}
              </Typography>
              <Typography sx={{ mt: 0.35, color: "#667085", fontSize: 13 }}>
                {t("dialogSubtitle", { ns: "schedules" })}
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
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <InputLabel
                shrink
                sx={{ color: "#344054", fontSize: 13, fontWeight: 600 }}
              >
                {t("staff", { ns: "schedules" })}
              </InputLabel>
              <EntityPickerField
                name="staffId"
                value={staff?.id ?? ""}
                isMoreOptions={isMoreOptions}
                onChange={(_, value) => {
                  const employee = options.find(
                    (option) => option.id === value,
                  );
                  if (employee) onChangeShift("staff", employee);
                }}
                onOpenPicker={seeMore}
                placeholder={t("chooseStaff", { ns: "schedules" })}
                size="small"
                disabled={saving}
              >
                {options
                  .filter((option) => option.active || option.id === staff?.id)
                  .map((option) => (
                    <MenuItem
                      key={option.id}
                      value={option.id}
                      disabled={!option.active}
                    >
                      {option.fullName} · {t(`roles.${option.roleName}`, { ns: "common" })}
                    </MenuItem>
                  ))}
              </EntityPickerField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <InputLabel
                shrink
                sx={{ color: "#344054", fontSize: 13, fontWeight: 600 }}
              >
                {t("workDate", { ns: "schedules" })}
              </InputLabel>
              <TextField
                value={workDate}
                fullWidth
                size="small"
                type="date"
                onChange={(event) =>
                  onChangeShift("workDate", event.target.value)
                }
                disabled={saving}
                sx={fieldSx}
              />
            </Grid>
            <Grid size={12}>
              <InputLabel
                shrink
                sx={{ color: "#344054", fontSize: 13, fontWeight: 600 }}
              >
                {t("shift", { ns: "schedules" })}
              </InputLabel>
              <TextField
                select
                size="small"
                value={shiftId}
                onChange={(event) =>
                  onChangeShift("shiftId", Number(event.target.value))
                }
                fullWidth
                disabled={saving || loadingDefinitions}
                sx={fieldSx}
              >
                {loadingDefinitions && (
                  <MenuItem value={shiftId} disabled>
                    {t("loadingShifts", { ns: "schedules" })}
                  </MenuItem>
                )}
                {!loadingDefinitions && shifts.length === 0 && (
                  <MenuItem value="" disabled>
                    {t("noShifts", { ns: "schedules" })}
                  </MenuItem>
                )}
                {shifts.map((shift) => (
                  <MenuItem key={shift.id} value={shift.id}>
                    {t(`shifts.${shift.code}`, {
                      ns: "schedules",
                      defaultValue: shift.name,
                    })} · {formatTime(shift.startTime)} –{" "}
                    {formatTime(shift.endTime)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
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
            disabled={
              saving || loadingDefinitions || !staff || !shiftId || !workDate
            }
            sx={{
              minHeight: 40,
              width: { xs: "100%", sm: "auto" },
              borderRadius: "8px",
            }}
          >
            {saving ? t("states.creating", { ns: "common" }) : t("create", { ns: "schedules" })}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

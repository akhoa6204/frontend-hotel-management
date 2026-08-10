import { useMemo, useState } from "react";
import { Add, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import type { AssignmentInfoResponse } from "@constant/response/AssignmentInfoResponse";
import type { StaffShiftResponse } from "@constant/response/StaffShiftResponse";
import type { UserShortResponse } from "@constant/response/UserShortResponse";
import type { UserRole } from "@enums/UserRole";
import { formatTime } from "@utils/format";
import { useTranslation } from "react-i18next";

interface Props {
  shifts: StaffShiftResponse[];
  start: string;
  onAdd?: (staff: UserShortResponse) => void;
  onRemove: (id: number) => Promise<unknown>;
  canEdit: boolean;
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  removing: boolean;
}

const getAssignmentsByDate = (
  assignments: AssignmentInfoResponse[],
  date: string,
) =>
  assignments.filter(
    (assignment) => dayjs(assignment.workDate).format("YYYY-MM-DD") === date,
  );

const weekdayKeys = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const ScheduleSkeleton = () => (
  <>
    {Array.from({ length: 5 }).map((_, row) => (
      <Box
        key={row}
        sx={{
          display: "grid",
          gridTemplateColumns: "210px repeat(7, 160px)",
          minHeight: 98,
        }}
      >
        <Box
          sx={{
            p: 1.5,
            borderRight: "1px solid #EAECF0",
            borderBottom: "1px solid #EAECF0",
          }}
        >
          <Skeleton width="72%" />
          <Skeleton width="45%" />
        </Box>
        {Array.from({ length: 7 }).map((__, column) => (
          <Box
            key={column}
            sx={{
              p: 1,
              borderRight: "1px solid #EAECF0",
              borderBottom: "1px solid #EAECF0",
            }}
          >
            {column === row % 7 && <Skeleton variant="rounded" height={62} />}
          </Box>
        ))}
      </Box>
    ))}
  </>
);

export default function WeeklyScheduleCalendar({
  shifts,
  start,
  onAdd,
  onRemove,
  canEdit,
  loading,
  error,
  onRetry,
  removing,
}: Props) {
  const { t } = useTranslation(["schedules", "common"]);
  const [removeTarget, setRemoveTarget] =
    useState<AssignmentInfoResponse | null>(null);
  const weekDays = useMemo(() => {
    const startDate = dayjs(start, "YYYY-MM-DD").startOf("day");
    return Array.from({ length: 7 }, (_, index) =>
      startDate.add(index, "day"),
    );
  }, [start]);

  const confirmRemove = async () => {
    if (!removeTarget) return;
    await onRemove(removeTarget.id);
    setRemoveTarget(null);
  };

  return (
    <>
      <Box
        className="diamond-sea-admin"
        sx={{
          mt: 2,
          width: "100%",
          overflowX: "auto",
          border: "1px solid #E4E7EC",
          borderRadius: "12px",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box sx={{ minWidth: 1330 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "210px repeat(7, 160px)",
              minHeight: 60,
              bgcolor: "#F9FAFB",
              borderBottom: "1px solid #EAECF0",
            }}
          >
            <Box
              sx={{
                position: "sticky",
                left: 0,
                zIndex: 3,
                display: "flex",
                alignItems: "center",
                px: 1.75,
                bgcolor: "#F9FAFB",
                borderRight: "1px solid #EAECF0",
              }}
            >
              <Typography
                sx={{ color: "#475467", fontSize: 12, fontWeight: 700 }}
              >
                {t("staff", { ns: "schedules" })}
              </Typography>
            </Box>
            {weekDays.map((day, index) => {
              const isToday = day.isSame(dayjs(), "day");
              return (
                <Stack
                  key={day.format("YYYY-MM-DD")}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    borderRight: "1px solid #EAECF0",
                    bgcolor: isToday ? "#F2F8FF" : "transparent",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#344054",
                      fontSize: 13,
                      fontWeight: 650,
                      textTransform: "capitalize",
                    }}
                  >
                    {t(`weekdays.${weekdayKeys[index]}`, { ns: "schedules" })}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.2,
                      color: isToday ? "#2E90FA" : "#98A2B3",
                      fontSize: 11.5,
                      fontWeight: isToday ? 700 : 500,
                    }}
                  >
                    {day.format("DD/MM")}
                  </Typography>
                </Stack>
              );
            })}
          </Box>

          {loading ? (
            <ScheduleSkeleton />
          ) : error ? (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ minHeight: 240, p: 3 }}
            >
              <Typography
                sx={{ color: "#344054", fontSize: 14, fontWeight: 600 }}
              >
                {t("loadError", { ns: "schedules" })}
              </Typography>
              <Typography sx={{ mt: 0.4, color: "#667085", fontSize: 13 }}>
                {t("loadHint", { ns: "schedules" })}
              </Typography>
              <Button size="small" onClick={onRetry} sx={{ mt: 1 }}>
                {t("actions.retry", { ns: "common" })}
              </Button>
            </Stack>
          ) : shifts.length === 0 ? (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ minHeight: 220, p: 3 }}
            >
              <Typography
                sx={{ color: "#344054", fontSize: 14, fontWeight: 600 }}
              >
                {t("empty", { ns: "schedules" })}
              </Typography>
              <Typography sx={{ mt: 0.4, color: "#667085", fontSize: 13 }}>
                {t("emptyHint", { ns: "schedules" })}
              </Typography>
            </Stack>
          ) : (
            shifts.map((item) => (
              <Box
                key={item.staff.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "210px repeat(7, 160px)",
                  minHeight: 98,
                }}
              >
                <Box
                  sx={{
                    position: "sticky",
                    left: 0,
                    zIndex: 2,
                    px: 1.75,
                    py: 1.5,
                    bgcolor: "#FFFFFF",
                    borderRight: "1px solid #EAECF0",
                    borderBottom: "1px solid #EAECF0",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#1F2937",
                      fontSize: 13.5,
                      fontWeight: 650,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {item.staff.fullName}
                  </Typography>
                  <Typography sx={{ mt: 0.25, color: "#667085", fontSize: 12 }}>
                    {t(`roles.${item.staff.roleName}`, { ns: "common" })}
                  </Typography>
                </Box>
                {weekDays.map((day) => {
                  const assignments = getAssignmentsByDate(
                    item.assignments || [],
                    day.format("YYYY-MM-DD"),
                  );
                  const isToday = day.isSame(dayjs(), "day");
                  return (
                    <Box
                      key={day.format("YYYY-MM-DD")}
                      sx={{
                        position: "relative",
                        minHeight: 98,
                        p: 0.75,
                        bgcolor: isToday ? "#FCFDFF" : "#FFFFFF",
                        borderRight: "1px solid #EAECF0",
                        borderBottom: "1px solid #EAECF0",
                        transition: "background-color 120ms ease",
                        "&:hover": { bgcolor: "#F9FAFB" },
                        "&:hover .schedule-add": { opacity: 1 },
                      }}
                    >
                      <Stack spacing={0.75}>
                        {assignments.map((assignment) => (
                          <Box
                            key={assignment.id}
                            sx={{
                              position: "relative",
                              px: 1,
                              py: 0.8,
                              border: "1px solid #D6E9FC",
                              borderRadius: "7px",
                              bgcolor: "#EFF7FF",
                            }}
                          >
                            <Typography
                              sx={{
                                pr: canEdit ? 2 : 0,
                                color: "#175CD3",
                                fontSize: 12.5,
                                fontWeight: 650,
                              }}
                            >
                              {t(`shifts.${assignment.shift.code}`, {
                                ns: "schedules",
                                defaultValue: assignment.shift.name,
                              })}
                            </Typography>
                            <Typography
                              sx={{
                                mt: 0.15,
                                color: "#344054",
                                fontSize: 11.5,
                                fontWeight: 500,
                              }}
                            >
                              {formatTime(assignment.shift.startTime)} –{" "}
                              {formatTime(assignment.shift.endTime)}
                            </Typography>
                            <Typography
                              sx={{ mt: 0.1, color: "#667085", fontSize: 11.5 }}
                            >
                              {t(`roles.${assignment.position as UserRole}`, { ns: "common" })}
                            </Typography>
                            {canEdit && (
                              <IconButton
                                aria-label={t("removeFor", {
                                  ns: "schedules",
                                  shift: t(`shifts.${assignment.shift.code}`, {
                                    ns: "schedules",
                                    defaultValue: assignment.shift.name,
                                  }),
                                  name: item.staff.fullName,
                                })}
                                size="small"
                                onClick={() => setRemoveTarget(assignment)}
                                sx={{
                                  position: "absolute",
                                  top: 2,
                                  right: 2,
                                  width: 24,
                                  height: 24,
                                  color: "#667085",
                                  opacity: 0.7,
                                  "&:hover": {
                                    color: "#B42318",
                                    bgcolor: "#FEF3F2",
                                    opacity: 1,
                                  },
                                }}
                              >
                                <Close sx={{ fontSize: 14 }} />
                              </IconButton>
                            )}
                          </Box>
                        ))}
                      </Stack>
                      {canEdit && (
                        <IconButton
                          className="schedule-add"
                          aria-label={t("addFor", { ns: "schedules", name: item.staff.fullName, date: day.format("DD/MM/YYYY") })}
                          size="small"
                          onClick={() => onAdd?.(item.staff)}
                          sx={{
                            position: assignments.length
                              ? "relative"
                              : "absolute",
                            inset: assignments.length ? "auto" : 0,
                            m: assignments.length ? "6px auto 0" : "auto",
                            display: "flex",
                            width: 28,
                            height: 28,
                            color: "#2E90FA",
                            bgcolor: "#EAF4FF",
                            opacity: { xs: 1, md: assignments.length ? 0 : 0 },
                            transition: "opacity 120ms ease",
                            "&:focus-visible": { opacity: 1 },
                            "&:hover": { bgcolor: "#DCEEFF" },
                          }}
                        >
                          <Add sx={{ fontSize: 16 }} />
                        </IconButton>
                      )}
                    </Box>
                  );
                })}
              </Box>
            ))
          )}
        </Box>
      </Box>

      <Dialog
        open={Boolean(removeTarget)}
        onClose={removing ? undefined : () => setRemoveTarget(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            width: 460,
            maxWidth: "calc(100vw - 24px)",
            borderRadius: "12px",
          },
        }}
      >
        <DialogTitle
          sx={{
            px: 2.5,
            pt: 2.25,
            pb: 1,
            color: "#1F2937",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          {t("removeTitle", { ns: "schedules" })}
        </DialogTitle>
        <DialogContent sx={{ px: 2.5, py: 1 }}>
          <Typography
            sx={{ color: "#667085", fontSize: 13.5, lineHeight: 1.6 }}
          >
            {t("removeDescription", { ns: "schedules" })}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{ px: 2.5, py: 1.75, borderTop: "1px solid #EAECF0" }}
        >
          <Button
            variant="outlined"
            disabled={removing}
            onClick={() => setRemoveTarget(null)}
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
            color="error"
            disabled={removing}
            onClick={confirmRemove}
            sx={{ minHeight: 40, borderRadius: "8px" }}
          >
            {removing ? t("removing", { ns: "schedules" }) : t("remove", { ns: "schedules" })}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

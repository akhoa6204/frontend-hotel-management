import {
  Box,
  Typography,
  Stack,
  CircularProgress,
  Grid,
  TextField,
  MenuItem,
  List,
  ListItemButton,
  Button,
} from "@mui/material";
import { formatDate } from "@utils/format";
import Pager from "@components/pager";
import { Add } from "@mui/icons-material";
import type { HouseKeepingTaskResponse } from "@constant/response/HousekeepingResponse";
import { useBookingManagementContext } from "@context/booking-management";
import type { HousekeepingTaskStatus } from "@enums/HousekeepingTaskStatus";
import { useTranslation } from "react-i18next";

export default function HousekeepingTab() {
  const { t } = useTranslation(["bookings", "common"]);
  const {
    canEdit,
    handleCreateTask,
    loadingHousekeepingList,
    housekeepingList,
    onSelectTask,
    selectedTaskId,
    metaHousekeepingList,
    onChangePageHousekeeping,
    loadingHousekeepingDetail,
    housekeepingDetail,
    handleUpdateTask,
    bookingDetail,
  } = useBookingManagementContext();
  return (
    <Grid container spacing={{ xs: 3, md: 2.5 }}>
      <Grid size={{ xs: 12, md: 5 }} sx={{ borderRight: { md: "1px solid #E4E7EC" }, pr: { md: 2.5 } }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={2}
          flexWrap={"wrap"}
        >
          <Typography fontSize={15} fontWeight={650}>
            {t("detail.housekeepingWork", { ns: "bookings" })}
          </Typography>
          {canEdit && (
            <Button
              variant="outlined"
              size="small"
              sx={{ minHeight: 34, py: 0.25, px: 1.25, borderRadius: "8px" }}
              onClick={() => {
                if (!bookingDetail?.id || !bookingDetail?.room?.id) return;

                handleCreateTask({
                  roomId: bookingDetail.room.id,
                  type: "CLEANING",
                  bookingId: bookingDetail.id,
                });
              }}
            >
              <Add sx={{ fontSize: 20, marginRight: 0.5 }} />
              {t("detail.addTask", { ns: "bookings" })}
            </Button>
          )}
        </Stack>
        {loadingHousekeepingList && !housekeepingList ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ height: 200 }}
          >
            <CircularProgress size={24} />
            <Typography variant="body2">{t("detail.loadingHousekeeping", { ns: "bookings" })}</Typography>
          </Stack>
        ) : Array.isArray(housekeepingList) && housekeepingList.length === 0 ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ height: 200 }}
          >
            <Typography variant="body2" color="text.secondary">
              {t("detail.noHousekeepingTasks", { ns: "bookings" })}
            </Typography>
          </Stack>
        ) : (
          <List className="admin-scrollbar" disablePadding sx={{ minHeight: 280, maxHeight: 360, overflowY: "auto", mt: 1 }}>
            {Array.isArray(housekeepingList)
              ? housekeepingList.map((task: HouseKeepingTaskResponse) => (
                  <ListItemButton
                    key={task.id}
                    onClick={() => onSelectTask?.(task.id)}
                    selected={task.id === selectedTaskId}
                    sx={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      px: 1.25,
                      py: 1.25,
                      borderLeft: "3px solid transparent",
                      borderBottom: "1px solid #E4E7EC",
                      "&.Mui-selected": { bgcolor: "#EAF4FF", borderLeftColor: "#2E90FA" },
                      "&.Mui-selected:hover": { bgcolor: "#EAF4FF" },
                    }}
                  >
                    <Typography fontWeight={500}>
                      {t(`housekeepingTypes.${task.type}`, { ns: "bookings" })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(task.completedAt || task.startedAt, {
                        withTime: true,
                      })}
                    </Typography>
                  </ListItemButton>
                ))
              : ""}
          </List>
        )}
        {(metaHousekeepingList?.totalPages || 1) > 1 && (
          <Box display="flex" justifyContent="center">
            <Pager
              totalPages={metaHousekeepingList?.totalPages || 1}
              page={metaHousekeepingList?.page || 1}
              onChange={onChangePageHousekeeping}
            />
          </Box>
        )}
      </Grid>

      <Grid size={{ xs: 12, md: 7 }}>
        {loadingHousekeepingDetail ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ mt: 6 }}
          >
            <CircularProgress size={24} />
            <Typography variant="body2">{t("detail.loadingHousekeeping", { ns: "bookings" })}</Typography>
          </Stack>
        ) : (
          housekeepingDetail &&
          selectedTaskId && (
            <Stack spacing={2.5}>
              <Box><Typography fontSize={15} fontWeight={650}>{t("detail.housekeepingTaskDetail", { ns: "bookings" })}</Typography><Typography variant="body2" color="text.secondary">{t("detail.housekeepingTaskDetailHint", { ns: "bookings" })}</Typography></Box>
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {t("detail.taskType", { ns: "bookings" })}
                  </Typography>
                  <Typography>
                    {t(`housekeepingTypes.${housekeepingDetail.type}`, { ns: "bookings" })}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {t("detail.status", { ns: "bookings" })}
                  </Typography>
                  <TextField
                    select
                    size="small"
                    disabled={!canEdit}
                    value={housekeepingDetail.status}
                    onChange={(e) =>
                      handleUpdateTask({
                        id: housekeepingDetail.id,
                        status: e.target.value as HousekeepingTaskStatus,
                      })
                    }
                    sx={{ minWidth: 180 }}
                  >
                    <MenuItem value="PENDING">{t("housekeepingStatus.PENDING", { ns: "bookings" })}</MenuItem>
                    <MenuItem value="IN_PROGRESS">{t("housekeepingStatus.IN_PROGRESS", { ns: "bookings" })}</MenuItem>
                    <MenuItem value="COMPLETED">{t("housekeepingStatus.COMPLETED", { ns: "bookings" })}</MenuItem>
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {t("detail.assignee", { ns: "bookings" })}
                  </Typography>
                  <Typography>
                    {housekeepingDetail.staff?.fullName ?? t("detail.unassigned", { ns: "bookings" })}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {t("detail.workDate", { ns: "bookings" })}
                  </Typography>
                  <Typography>
                    {formatDate(
                      housekeepingDetail.completedAt ||
                        housekeepingDetail.startedAt,
                      { withTime: true },
                    )}
                  </Typography>
                </Grid>
              </Grid>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  {t("detail.housekeepingNotes", { ns: "bookings" })}
                </Typography>
                <Box sx={{ mt: 0.75 }}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    disabled={!canEdit}
                    placeholder={t("detail.housekeepingNotesPlaceholder", { ns: "bookings" })}
                    value={housekeepingDetail.note || ""}
                    onChange={(e) =>
                      handleUpdateTask({
                        id: housekeepingDetail.id,
                        note: e.target.value,
                      })
                    }
                  />
                </Box>
              </Box>
            </Stack>
          ) || <Box sx={{ minHeight: 280, display: "grid", placeItems: "center", textAlign: "center" }}><Box><Typography fontWeight={600}>{t("detail.chooseTask", { ns: "bookings" })}</Typography><Typography variant="body2" color="text.secondary">{t("detail.chooseTaskHint", { ns: "bookings" })}</Typography></Box></Box>
        )}
      </Grid>
    </Grid>
  );
}

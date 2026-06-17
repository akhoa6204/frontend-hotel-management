import { HouseKeepingTask, TaskStatus, TaskType } from "@constant/types";
import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
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
import { HouseKeepingTaskResponse } from "@constant/response/HousekeepingResponse";
import { useBookingManagementContext } from "@context/booking-management";
import { HousekeepingTaskStatus } from "@enums/HousekeepingTaskStatus";

export default function HousekeepingTab() {
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
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={2}
          flexWrap={"wrap"}
        >
          <Typography fontWeight={600} mb={1}>
            Danh sách công việc
          </Typography>
          {canEdit && (
            <Button
              variant="contained"
              sx={{ py: 0.25, px: 2, borderRadius: 1.5 }}
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
              Thêm mới
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
            <Typography variant="body2">Đang tải dữ liệu...</Typography>
          </Stack>
        ) : Array.isArray(housekeepingList) && housekeepingList.length === 0 ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ height: 200 }}
          >
            <Typography variant="body2" color="text.secondary">
              Không có công việc buồng phòng
            </Typography>
          </Stack>
        ) : (
          <List sx={{ height: 360 }}>
            {Array.isArray(housekeepingList)
              ? housekeepingList.map((t: HouseKeepingTaskResponse) => (
                  <ListItemButton
                    key={t.id}
                    onClick={() => onSelectTask?.(t.id)}
                    selected={t.id === selectedTaskId}
                    sx={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      px: 2,
                      py: 1.5,
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <Typography fontWeight={500}>
                      {t.type === "CLEANING" ? "Dọn phòng" : "Kiểm tra phòng"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(t.completedAt || t.startedAt, {
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

      <Grid size={{ xs: 12, md: 8 }}>
        {loadingHousekeepingDetail ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ mt: 6 }}
          >
            <CircularProgress size={24} />
            <Typography variant="body2">Đang tải dữ liệu...</Typography>
          </Stack>
        ) : (
          housekeepingDetail &&
          selectedTaskId && (
            <Stack spacing={3}>
              <Typography fontWeight={600}>Danh sách công việc</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Loại công việc
                  </Typography>
                  <Typography>
                    {housekeepingDetail.type === "CLEANING"
                      ? "Dọn phòng"
                      : "Kiểm tra phòng"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Trạng thái
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
                    <MenuItem value="PENDING">Chờ thực hiện</MenuItem>
                    <MenuItem value="IN_PROGRESS">Đang kiểm tra</MenuItem>
                    <MenuItem value="COMPLETED">Hoàn thành</MenuItem>
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Nhân viên phụ trách
                  </Typography>
                  <Typography>
                    {housekeepingDetail.staff?.fullName ?? "Chưa phân công"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Ngày làm việc
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
                  Ghi chú buồng phòng
                </Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    disabled={!canEdit}
                    placeholder="Nhập ghi chú buồng phòng..."
                    value={housekeepingDetail.note || ""}
                    onChange={(e) =>
                      handleUpdateTask({
                        id: housekeepingDetail.id,
                        note: e.target.value,
                      })
                    }
                  />
                </Paper>
              </Box>
            </Stack>
          )
        )}
      </Grid>
    </Grid>
  );
}

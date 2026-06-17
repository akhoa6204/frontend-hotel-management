import { DialogMode } from "@constant/internal/DialogState";
import { HousekeepingUpdateRequest } from "@constant/request/HousekeepingUpdateRequest";
import { HouseKeepingTaskResponse } from "@constant/response/HousekeepingResponse";
import { HousekeepingTaskStatus } from "@enums/HousekeepingTaskStatus";
import { HousekeepingTaskType } from "@enums/HousekeepingTaskType";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ChipProps,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { formatDate } from "@utils/format";

const typeLabel: Record<HousekeepingTaskType, string> = {
  CLEANING: "Dọn phòng",
  INSPECTION: "Kiểm tra phòng",
};
interface Props {
  tasks: HouseKeepingTaskResponse[];
  onStatusChange: (data: HousekeepingUpdateRequest) => void;
  onRowClick: (mode: DialogMode, id?: number) => void;
}
export default function HousekeepingTaskTable({
  tasks = [],
  onRowClick,
  onStatusChange,
}: Props) {
  return (
    <TableContainer component={Paper} className="rounded-xl shadow">
      <Table>
        {/* HEADER */}
        <TableHead sx={{ bgcolor: "#2E90FA0d" }}>
          <TableRow>
            <TableCell className="font-semibold">Số Phòng</TableCell>
            <TableCell className="font-semibold">Người thực hiện</TableCell>
            <TableCell className="font-semibold">Loại nhiệm vụ</TableCell>
            <TableCell className="font-semibold">Trạng thái</TableCell>
            <TableCell className="font-semibold">Ngày tạo</TableCell>
          </TableRow>
        </TableHead>

        {/* BODY */}
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              hover
              onClick={
                task.status === "COMPLETED"
                  ? () => onRowClick("VIEW", task.id)
                  : () => onRowClick("EDIT", task.id)
              }
            >
              {/* ROOM */}
              <TableCell>
                <div className="font-medium">Phòng {task.room?.name}</div>
              </TableCell>

              {/* STAFF */}
              <TableCell>
                {task.staff ? (
                  task.staff?.fullName
                ) : (
                  <span className="text-gray-400 italic">
                    Chưa được phân công
                  </span>
                )}
              </TableCell>

              <TableCell>{typeLabel[task.type]}</TableCell>

              {/* STATUS */}
              {task.status === "COMPLETED" ? (
                <TableCell>
                  <Typography>Hoàn thành</Typography>
                </TableCell>
              ) : (
                <TableCell>
                  <TextField
                    select
                    size="small"
                    value={task.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      onStatusChange({
                        id: task.id,
                        status: e.target.value as HousekeepingTaskStatus,
                      });
                    }}
                    sx={{ minWidth: 140 }}
                  >
                    <MenuItem value="PENDING">Đang đợi</MenuItem>
                    <MenuItem value="IN_PROGRESS">Đang thực hiện</MenuItem>
                    <MenuItem value="COMPLETED">Hoàn thành</MenuItem>
                  </TextField>
                </TableCell>
              )}

              {/* WORK DATE */}
              <TableCell>
                {formatDate(task.createdAt, { withTime: true })}
              </TableCell>
            </TableRow>
          ))}

          {tasks.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <div className="py-10 text-gray-400">No housekeeping tasks</div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

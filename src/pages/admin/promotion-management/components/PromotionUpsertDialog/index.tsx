import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  InputLabel,
  Autocomplete,
  Chip,
} from "@mui/material";
import { PromotionForm } from "../../usePromotionManagement";
import { DiscountType } from "src/enums/DiscountType";
import { PromotionScope } from "src/enums/PromotionScope";
import { DialogMode } from "@constant/internal/DialogState";

type Props = {
  open: boolean;
  mode: DialogMode;
  values: PromotionForm;
  roomTypes: { id: number; name: string }[];
  onChange: <K extends keyof PromotionForm>(
    field: K,
    v: PromotionForm[K],
  ) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export default function PromotionUpsertDialog({
  open,
  mode,
  values,
  roomTypes,
  onChange,
  onClose,
  onSubmit,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {mode === "CREATE" ? "Tạo khuyến mãi" : "Xem khuyến mãi"}
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Grid container spacing={2}>
          {/* Loại khuyến mãi */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel shrink>Loại khuyến mãi</InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              value={values.autoApplied ? "true" : "false"}
              onChange={(e) =>
                onChange("autoApplied", e.target.value === "true")
              }
              SelectProps={{ native: true }}
            >
              <option value="false">Mã khuyến mãi</option>
              <option value="true">Tự áp dụng</option>
            </TextField>
          </Grid>

          {/* Tên chương trình */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel shrink>Tên chương trình</InputLabel>
            <TextField
              fullWidth
              size="small"
              placeholder={"Ví dụ: Khuyến mãi Cuối Tuần"}
              value={values.name}
              onChange={(e) => onChange("name", e.target.value)}
            />
          </Grid>
          {/* Mô tả */}
          <Grid size={12}>
            <InputLabel shrink>Mô tả</InputLabel>
            <TextField
              fullWidth
              size="small"
              value={values.description}
              onChange={(e) => onChange("description", e.target.value)}
            />
          </Grid>

          {/* Mã khuyến mãi (chỉ CODE) */}
          {!values.autoApplied && (
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel shrink>Mã khuyến mãi</InputLabel>
              <TextField
                fullWidth
                size="small"
                value={values.code}
                onChange={(e) => onChange("code", e.target.value)}
              />
            </Grid>
          )}

          {/* Ưu tiên áp dụng */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel shrink>Ưu tiên (số nhỏ ưu tiên cao)</InputLabel>
            <TextField
              fullWidth
              size="small"
              type="number"
              inputProps={{ min: 0 }}
              value={values.priority}
              onChange={(e) =>
                onChange("priority", Number(e.target.value) || 0)
              }
            />
          </Grid>

          {/* Loại giảm giá */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel shrink>Loại giảm giá</InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              value={values.discountType}
              onChange={(e) =>
                onChange("discountType", e.target.value as DiscountType)
              }
              SelectProps={{ native: true }}
            >
              <option value="PERCENT">Phần trăm (%)</option>
              <option value="FIXED">Số tiền (VND)</option>
            </TextField>
          </Grid>

          {/* Giá trị giảm */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel shrink>Giá trị giảm</InputLabel>
            <TextField
              fullWidth
              size="small"
              type="number"
              inputProps={{ min: 0 }}
              value={values.discountValue}
              onChange={(e) =>
                onChange("discountValue", Number(e.target.value) || 0)
              }
            />
          </Grid>

          {/* Trần giảm giá (chỉ khi %) */}
          {values.discountType === "PERCENTAGE" && (
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel shrink>Giảm tối đa (VND) (không bắt buộc)</InputLabel>
              <TextField
                fullWidth
                size="small"
                type="number"
                inputProps={{ min: 0 }}
                value={values.maxDiscountAmount}
                onChange={(e) =>
                  onChange("maxDiscountAmount", Number(e.target.value) || 0)
                }
              />
            </Grid>
          )}

          {/* Scope */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel shrink>Phạm vi áp dụng</InputLabel>

            <TextField
              select
              fullWidth
              size="small"
              value={values.scope}
              onChange={(e) =>
                onChange("scope", e.target.value as PromotionScope)
              }
              SelectProps={{ native: true }}
            >
              <option value="INVOICE">Toàn bộ</option>
              <option value="ROOM">Tiền phòng</option>
              <option value="SERVICE">Tiền dịch vụ</option>
            </TextField>
          </Grid>

          {/* Min total */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel shrink>
              Giá trị đơn tối thiểu (VND) (không bắt buộc)
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              type="number"
              value={values.minTotal ?? ""}
              onChange={(e) =>
                onChange("minTotal", Number(e.target.value) || 0)
              }
            />
          </Grid>

          {/* Số lượng mã giảm giá */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel shrink>Số lượng mã giảm giá</InputLabel>
            <TextField
              fullWidth
              size="small"
              type="number"
              inputProps={{ min: 0 }}
              value={values.quotaTotal}
              onChange={(e) =>
                onChange("quotaTotal", Number(e.target.value) || 0)
              }
            />
          </Grid>

          {!values.autoApplied && (
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel shrink>Gộp khuyến mãi</InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                value={values.stackable ? "true" : "false"}
                onChange={(e) =>
                  onChange("stackable", e.target.value === "true")
                }
                SelectProps={{ native: true }}
              >
                <option value="true">Cho phép</option>
                <option value="false">Không</option>
              </TextField>
            </Grid>
          )}

          {/* Ngày bắt đầu */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel shrink>Ngày bắt đầu</InputLabel>
            <TextField
              fullWidth
              size="small"
              type="date"
              value={values.startDate}
              onChange={(e) => onChange("startDate", e.target.value)}
            />
          </Grid>

          {/* Ngày kết thúc */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel shrink>Ngày kết thúc</InputLabel>
            <TextField
              fullWidth
              size="small"
              type="date"
              value={values.endDate}
              onChange={(e) => onChange("endDate", e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          {mode === "CREATE" ? "Tạo mã khuyến mãi" : "Lưu"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import { Box, Stack, Typography } from "@mui/material";

const policies = [
  { label: "Thời gian yên lặng", value: "22:00–06:00", icon: NightsStayOutlinedIcon },
  { label: "Thú cưng", value: "Không được phép", icon: PetsOutlinedIcon },
];

const RulesCard = () => (
  <Box component="section" aria-labelledby="stay-policies-title">
    <Typography id="stay-policies-title" component="h2" sx={{ fontSize: { xs: 24, md: 27 }, fontWeight: 650, color: "#183746" }}>
      Quy tắc lưu trú
    </Typography>
    <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.7 }}>
      Vui lòng xem lại các quy tắc hiện áp dụng cho kỳ nghỉ này.
    </Typography>
    <Stack spacing={1.75} sx={{ mt: 2.5 }}>
      {policies.map(({ label, value, icon: Icon }) => (
        <Stack key={label} direction="row" spacing={1.5} alignItems="center">
          <Icon sx={{ color: "primary.main", fontSize: 21 }} />
          <Typography sx={{ minWidth: { sm: 170 }, color: "#425866" }}>{label}</Typography>
          <Typography fontWeight={650} color="#183746">{value}</Typography>
        </Stack>
      ))}
    </Stack>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 2.5, lineHeight: 1.7 }}>
      Khi tiếp tục, bạn xác nhận đã xem lại các quy tắc lưu trú trên.
    </Typography>
  </Box>
);

export default RulesCard;

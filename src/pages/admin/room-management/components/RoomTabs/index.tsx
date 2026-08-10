import { Tabs, Tab, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  types: string[];
  value: string;
  onChange: (val: string) => void;
};

const RoomTabs: React.FC<Props> = ({ types, value, onChange }) => {
  const { t } = useTranslation("rooms");

  return (
    <Box className="admin-scrollbar" sx={{ maxWidth: "100%", overflowX: "auto" }}>
      <Tabs
        value={value}
        onChange={(_, v) => onChange(v)}
        variant="scrollable"
        scrollButtons="auto"
        aria-label={t("aria.roomTypeTabs")}
        sx={{
          minHeight: 36,
          "& .MuiTabs-flexContainer": { gap: 0.75 },
          "& .MuiTab-root": { minWidth: "auto", minHeight: 34, px: 1.5, py: 0.5, borderRadius: "8px", color: "#667085", fontSize: 12.5, fontWeight: 600, textTransform: "capitalize" },
          "& .MuiTab-root.Mui-selected": { bgcolor: "#EAF4FF", color: "#1D6FC2" },
          "& .MuiTabs-indicator": { display: "none" },
        }}
      >
        <Tab label={t("allRoomTypes")} value="ALL" />
        {types.map((t) => (
          <Tab key={t} label={t} value={t} />
        ))}
      </Tabs>
    </Box>
  );
};
export default RoomTabs;

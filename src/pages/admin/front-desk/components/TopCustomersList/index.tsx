import { Paper, Box, Typography, Avatar } from "@mui/material";
import { formatMoneyShort } from "@utils/format";
import { useTranslation } from "react-i18next";

interface TopCustomerItem {
  rank: number;
  name: string;
  bookings: number;
  totalPaid: number;
}

interface TopCustomersData {
  items: TopCustomerItem[];
}

export default function TopCustomersList({
  data,
  loading,
}: {
  data?: TopCustomersData;
  loading?: boolean;
}) {
  const { t } = useTranslation("receptionist");

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2.5 }}>
      <Typography sx={{ fontWeight: 600, fontSize: 20, mb: 1.5 }}>
        {t("topCustomers.title")}
      </Typography>

      {loading ? (
        <Typography color="text.secondary" sx={{ py: 2 }}>
          {t("states.loading")}
        </Typography>
      ) : !data?.items?.length ? (
        <Typography color="text.secondary" sx={{ py: 2 }}>
          {t("states.noData")}
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {data.items.map((c, idx) => (
            <Box
              key={`${c.rank}-${c.name}-${idx}`}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1.5,
                border: "1px solid",
                borderColor: "#2E90FA",
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: "#2E90FA",
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  {c.rank}
                </Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>{c.name}</Typography>
                  <Typography variant="body2" color="primary">
                    {t("topCustomers.bookingCount", { count: c.bookings })}
                  </Typography>
                </Box>
              </Box>

              <Typography sx={{ fontWeight: 700 }} color="primary">
                {formatMoneyShort(c.totalPaid)}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
}
